import { connectDB } from "@/lib/mongodb";
import Allotment from "@/models/Allotment";

export async function PUT(req, { params }) {
  await connectDB();
  const body = await req.json();
  const allotment = await Allotment.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
  if (!allotment) return Response.json({ success: false, message: "Allotment not found" }, { status: 404 });
  return Response.json({ success: true, allotment });
}

export async function DELETE(_req, { params }) {
  await connectDB();
  const allotment = await Allotment.findByIdAndDelete(params.id);
  if (!allotment) return Response.json({ success: false, message: "Allotment not found" }, { status: 404 });
  return Response.json({ success: true });
}
