"use server";
import { youtube } from "@/lib/youtube";

export async function isChannel(username: string) {
  try {
    const params = {
      part: ["id"],
      forHandle: username,
    };

    const res = await youtube.channels.list(params);

    if (res.data.items && res.data.items[0].id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
