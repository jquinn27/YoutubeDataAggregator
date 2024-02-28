import { youtube } from "@/lib/youtube";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { channelUsername } = body;
    const params = {
      part: ["statistics", "contentDetails"],
      forHandle: channelUsername,
    };
    const res = await youtube.channels.list(params);
    if (res.data.items) console.log(res.data.items);
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return new NextResponse("Error", { status: 500 });
  }
}
