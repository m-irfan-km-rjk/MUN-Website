const SHEET_ID = "1T841BPrCqErxEnLeAhfqgWSJVuXhSdpDxqLQ6kgvoD0";

const committeeSheets = {
  unga: "UNGA",
  unhrc: "UNHRC",
  "war-cabinet": "War Cabinet",
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
  return csv
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map((line) => {
      const cells = [];
      let value = "";
      let quoted = false;

      for (let index = 0; index < line.length; index += 1) {
        const character = line[index];
        if (character === '"' && line[index + 1] === '"') {
          value += '"';
          index += 1;
        } else if (character === '"') {
          quoted = !quoted;
        } else if (character === "," && !quoted) {
          cells.push(value.trim());
          value = "";
        } else {
          value += character;
        }
      }

      cells.push(value.trim());
      return cells;
    });
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("q")?.trim().toLowerCase();
    const status = url.searchParams.get("status")?.trim().toLowerCase();
    const committee = url.searchParams.get("committee")?.trim().toLowerCase();
    const selectedSheets = committeeSheets[committee]
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

      return rows
        .filter((row) => row[nameIndex >= 0 ? nameIndex : 0]?.trim())
        .map((row) => {
          const name = (nameIndex >= 0 ? row[nameIndex] : row[0])?.trim();
          const detailParts = [
            constituencyIndex >= 0 ? row[constituencyIndex]?.trim() : "",
            allianceIndex >= 0 ? row[allianceIndex]?.trim() : "",
          ].filter(Boolean);
          return {
            committee: committeeKey,
            name,
            detail: detailParts.join(" - "),
            status: normalizeStatus(statusIndex >= 0 ? row[statusIndex] : row[1]),
          };
        })
        .filter((row) => row.name && row.status);
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
