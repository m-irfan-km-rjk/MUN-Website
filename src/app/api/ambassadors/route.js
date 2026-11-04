// Campus Ambassador points, read live from the TKMMUN_CA_Registration_Count Google Sheet ("Summary" tab).
// The sheet must stay shared as "anyone with the link can view" for this to work.
export const dynamic = "force-dynamic";

const SHEET_ID = "1pujtVlEcXXEmo48Me1f7DZQnw-WvaUGBAz9-SaRcz14";
const SHEET_NAME = "Summary";

function parseCsv(csv) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  const text = csv.replace(/^﻿/, "");
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

export async function GET() {
  try {
    const url = new URL(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq`);
    url.searchParams.set("tqx", "out:csv");
    url.searchParams.set("sheet", SHEET_NAME);
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`Sheet request failed: ${response.status}`);

    const [header, ...rows] = parseCsv(await response.text());
    const col = (names) => header.findIndex((h) => names.includes(h.toLowerCase().trim()));
    const codeI = col(["ca code"]);
    const nameI = col(["campus ambassador"]);
    const collegeI = col(["ca college"]);
    const pointsI = col(["counted registrations"]);
    if ([codeI, nameI, pointsI].includes(-1)) throw new Error("Sheet columns not recognised");

    // Only real ambassador rows: skips the Total row, blank rows and the Notes underneath.
    const ambassadors = rows
      .filter((r) => /^TKMMUM\d+$/i.test(r[codeI] ?? "") && (r[nameI] ?? "").trim())
      .map((r) => ({
        code: r[codeI].toUpperCase(),
        name: r[nameI].trim(),
        college: (r[collegeI] ?? "").trim(),
        points: Number.parseInt(r[pointsI], 10) || 0,
      }))
      .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));

    // Competition ranking: equal points share a rank (1, 2, 2, 4 ...).
    const ranked = ambassadors.map((a) => ({ ...a, rank: 1 + ambassadors.filter((o) => o.points > a.points).length }));

    return Response.json(ranked, { headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" } });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 502 });
  }
}
