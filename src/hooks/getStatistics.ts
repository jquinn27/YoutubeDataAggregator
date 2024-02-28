"use server";
import { youtube } from "@/lib/youtube";

export async function getStatistics(username: string) {
  try {
    const params = {
      part: ["snippet", "statistics"],
      forHandle: username,
    };
    const res = await youtube.channels.list(params);
    if (res.data.items && res.data.items.length > 0) {
      const channelInfo = res.data.items[0];
      const statistics = channelInfo.statistics;
      const snippet = channelInfo.snippet;

      // Extracting the relevant statistics and snippet information
      const detailedStatistics = {
        viewCount: statistics!.viewCount,
        subscriberCount: statistics!.subscriberCount,
        videoCount: statistics!.videoCount,
        channelCreationDate: snippet!.publishedAt, // Channel's creation date
        title: snippet!.title, // Channel's title
        description: snippet!.description, // Channel's description
      };

      console.log(detailedStatistics);
      return detailedStatistics;
    } else {
      console.log("No channel found for the given username.");
      return false;
    }
  } catch (error) {
    console.error("Failed to get channel statistics:", error);
    return false;
  }
}
