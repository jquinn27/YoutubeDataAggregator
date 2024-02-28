"use server";
import { youtube } from "@/lib/youtube";

export async function getTop5Videos(username: string) {
  try {
    // Step 1: Get the channel's ID
    const channelRes = await youtube.channels.list({
      part: ["id"],
      forHandle: username,
    });

    if (!channelRes.data.items || channelRes.data.items.length === 0) {
      console.log("No channel found for the given username.");
      return false;
    }

    const channelId = channelRes.data.items[0].id;

    // Step 2: Search for the top 5 videos by viewCount
    const searchParams = {
      part: ["snippet"],
      channelId: channelId!,
      maxResults: 5,
      order: "viewCount",
      type: ["video"],
    };

    const videosRes = await youtube.search.list(searchParams);

    if (!videosRes || videosRes!.data!.items!.length === 0) {
      return false;
    }

    const videoIds = videosRes!.data!.items!.map((item) => item!.id!.videoId!);
    const videosDetailParams = {
      part: ["snippet", "statistics"],
      id: videoIds!,
    };

    const videosDetailRes = await youtube.videos.list(videosDetailParams);

    // Step 4: Extract and return the necessary video information
    const topVideos = videosDetailRes!.data!.items!.map((video) => ({
      title: video!.snippet!.title,
      thumbnail: video!.snippet!.thumbnails!.high!.url, // Assuming you want the high quality thumbnail
      viewCount: video.statistics!.viewCount,
      videoId: video.id,
      videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
    }));

    console.log(topVideos);
    return topVideos;
  } catch (error) {
    console.error("Failed to get top 5 videos:", error);
    return false;
  }
}
