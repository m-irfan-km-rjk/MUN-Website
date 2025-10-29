import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

export async function GET() {
  await connectDB();
  const news = await News.find().sort({ _id: -1 });
  return Response.json(news);
}

export async function POST(req) {
  await connectDB();
  const { title, content } = await req.json();

  if (!title || !content) {
    return Response.json({ success: false, message: "Missing fields" }, { status: 400 });
  }

  const newNews = await News.create({ title, content });
  return Response.json({ success: true, news: newNews }, { status: 201 });
}

export async function PUT(req) {
  await connectDB();
  const { id, title, content } = await req.json();
  if (!id) return Response.json({ success: false, message: "Missing ID" }, { status: 400 });

  const updated = await News.findByIdAndUpdate(id, { title, content }, { new: true });
  return Response.json({ success: true, news: updated });
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  if (!id) return Response.json({ success: false, message: "Missing ID" }, { status: 400 });

  await News.findByIdAndDelete(id);
  return Response.json({ success: true });
}