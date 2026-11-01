const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1T841BPrCqErxEnLeAhfqgWSJVuXhSdpDxqLQ6kgvoD0/export?format=csv";

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
    const response = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`Spreadsheet request failed: ${response.status}`);

    const csv = await response.text();
    const [header, ...rows] = parseCsv(csv);
    const countryIndex = header.findIndex((cell) => cell.toUpperCase() === "COUNTRY" || !cell);
    const statusIndex = header.findIndex((cell) => cell.toUpperCase() === "STATUS");

    const countries = rows
      .filter((row) => row[0]?.trim() && row[0].toUpperCase() !== "STATUS")
      .map((row) => {
        const name = (countryIndex >= 0 ? row[countryIndex] : row[0])?.trim();
        const sheetStatus = (statusIndex >= 0 ? row[statusIndex] : row[1])?.trim().toUpperCase();
        const allotted = sheetStatus !== "AVAILABLE";

        return { name, status: allotted ? "allotted" : "available" };
      })
      .filter((row) => row.name);

    const url = new URL(request.url);
    const query = url.searchParams.get("q")?.trim().toLowerCase();
    const status = url.searchParams.get("status")?.trim().toLowerCase();

    const filtered = countries.filter((country) => {
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
