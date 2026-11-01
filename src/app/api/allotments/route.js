import { connectDB } from "@/lib/mongodb";
import Allotment from "@/models/Allotment";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim();
    const committee = searchParams.get("committee")?.trim();
    const filter = {};

    if (committee && committee !== "All") filter.committee = committee;
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { delegation: { $regex: query, $options: "i" } },
        { committee: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
      ];
    }

    const allotments = await Allotment.find(filter).sort({ committee: 1, country: 1, name: 1 }).limit(500);
    return Response.json(allotments);
  } catch (error) {
    console.error("Allotment GET failed:", error);
    return Response.json([], { status: 200 });
  }
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  if (!body.name || !body.delegation || !body.committee) {
    return Response.json({ success: false, message: "Name, delegation and committee are required" }, { status: 400 });
  }
  const allotment = await Allotment.create(body);
  return Response.json({ success: true, allotment }, { status: 201 });
}
