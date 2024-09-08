import { connectionStr } from "@/lib/db";
import { Post } from "@/lib/model/post";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

type DataResponse = { posts?: any[]; success: boolean };

export async function GET() {
  let data: DataResponse;
  try {
    await mongoose.connect(connectionStr);
    const posts = await Post.find();
    data = { posts, success: true }; // If the request is successful, return posts and success = true
  } catch (error) {
    data = { success: false }; // On error, return success = false
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const payload = await req.json();

  await mongoose.connect(connectionStr);

  // Pass the payload directly to the Post constructor
  let post = new Post(payload);

  const result = await post.save();
  return NextResponse.json({ result, success: true });
}