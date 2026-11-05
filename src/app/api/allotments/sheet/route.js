const SHEET_ID = "1T841BPrCqErxEnLeAhfqgWSJVuXhSdpDxqLQ6kgvoD0";

// These must match the tab names in the Google Sheet EXACTLY (including the trailing space on "War Cabinet ").
// If a name doesn't match, Google silently returns the FIRST tab instead, so a wrong name shows another committee's data.
const committeeSheets = {
  unga: "UNGA SPECPOL",
  unhrc: "UNHRC",
  "war-cabinet": "War Cabinet ",
  ip: "IP",
  kla: "KLA",
};

function normalizeStatus(value) {
  const status = value?.trim().toUpperCase() || "";
  if (!status) return null;
  if (status === "AVAILABLE") return "available";
  if (
    status === "ALLOTED NOT CONFIRMED" ||
    status === "ALLOTED, NOT CONFIRMED" ||
    status === "ALLOTED BUT NOT CONFIRMED"
  ) return "allotted-not-confirmed";
  return "allotted";
}

function parseCsv(csv) {
  // Quote-aware: an empty quoted cell ("") must read as empty, not as an escaped quote.
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  const text = csv.replace(/^\uFEFF/, "");
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { value += '"'; i += 1; }
      else if (c === '"') quoted = false;
      else value += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(value.trim()); value = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i += 1;
      row.push(value.trim()); rows.push(row); row = []; value = "";
    } else value += c;
  }
  if (value || row.length) { row.push(value.trim()); rows.push(row); }
  return rows;
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("q")?.trim().toLowerCase();
    const status = url.searchParams.get("status")?.trim().toLowerCase();
    const committee = url.searchParams.get("committee")?.trim().toLowerCase();
    const selectedSheets = committee === "others" || !committee
      ? Object.entries(committeeSheets)
      : committeeSheets[committee]
      ? [[committee, committeeSheets[committee]]]
      : [];

    const committees = await Promise.all(selectedSheets.map(async ([committeeKey, sheetName]) => {
      const sheetUrl = new URL(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq`);
      sheetUrl.searchParams.set("tqx", "out:csv");
      sheetUrl.searchParams.set("sheet", sheetName);
      const response = await fetch(sheetUrl, { cache: "no-store" });
      if (!response.ok) throw new Error(`Spreadsheet request failed for ${sheetName}: ${response.status}`);

      const csv = await response.text();
      const [header, ...rows] = parseCsv(csv);
      const normalizedHeader = header.map((cell) => cell.toUpperCase().trim());
      const nameIndex = normalizedHeader.findIndex((cell) =>
        ["COUNTRY", "PORTFOLIO", "PORTFOLIOS", "MEMBER"].includes(cell)
      );
      const statusIndex = normalizedHeader.findIndex((cell) => cell === "STATUS");
      const constituencyIndex = normalizedHeader.findIndex((cell) => cell === "CONSTITUENCY");
      const allianceIndex = normalizedHeader.findIndex((cell) => cell === "ALLIANCE");

      // Some tabs (War Cabinet) split the list under bloc headings such as "WESTERN BLOC" / "EASTERN BLOC":
      // a row with a name ending in "bloc" and no status starts a new bloc for the rows beneath it.
      let bloc = null;
      const seats = [];
      for (const row of rows) {
        const name = (nameIndex >= 0 ? row[nameIndex] : row[0])?.trim();
        if (!name) continue;
        const rawStatus = statusIndex >= 0 ? row[statusIndex] : row[1];
        if (!rawStatus?.trim() && /\bbloc$/i.test(name)) {
          bloc = name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
          continue;
        }
        const status = normalizeStatus(rawStatus);
        if (!status) continue;
        const detailParts = [
          constituencyIndex >= 0 ? row[constituencyIndex]?.trim() : "",
          allianceIndex >= 0 ? row[allianceIndex]?.trim() : "",
          bloc ?? "",
        ].filter(Boolean);
        seats.push({ committee: committeeKey, name, detail: detailParts.join(" - "), status, bloc });
      }
      return seats;
    }));

    const allocations = committees.flat();
    const filtered = allocations.filter((country) => {
      const matchesQuery = !query || country.name.toLowerCase().includes(query);
      const matchesStatus = !status || status === "all" || country.status === status;
      return matchesQuery && matchesStatus;
    });

    return Response.json(filtered, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error("Allotment sheet fetch failed:", error);
    return Response.json([], { status: 200 });
  }
}
