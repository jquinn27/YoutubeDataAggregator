"use server";
import { youtube } from "@/lib/youtube";

export async function getInfo(username: string) {
  try {
    const params = {
      part: ["snippet"],
      forHandle: username,
    };
    const res = await youtube.channels.list(params);
    if (res.data.items) {
      console.log(res.data.items[0].snippet);
      return res.data.items[0].snippet;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
