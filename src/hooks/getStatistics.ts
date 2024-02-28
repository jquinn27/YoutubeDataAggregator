"use server";
import { youtube } from "@/lib/youtube";

export async function getStatistics(username: string) {
  try {
    const params = {
      part: ["statistics"],
      forHandle: username,
    };
    const res = await youtube.channels.list(params);
    if (res.data.items) {
      console.log(res.data.items[0].statistics);
      return res.data.items[0].statistics;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
