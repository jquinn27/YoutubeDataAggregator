import { SkeletonCard } from "@/components/SkeleteonCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getInfo } from "@/hooks/getInfo";
import { getStatistics } from "@/hooks/getStatistics";
import { getTop5Videos } from "@/hooks/getTop5Videos";
import { Divide } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

export default async function ChannelPage({
  params,
}: {
  params: { channel: string };
}) {
  const info = await getInfo(params.channel);
  const statistics = await getStatistics(params.channel);
  const top5Videos = await getTop5Videos(params.channel);
  return (
    <div className="text-black">
      {info ? (
        <div className="flex min-h-screen min-w-full flex-col">
          {/**HEADER START */}
          <div className="flex flex-col items-center py-4 justify-center w-full px-4 border-b-2 border-black shadow-sm">
            <div className="flex flex-row gap-4 items-center">
              <h1 className="text-3xl font-bold">{info.title}</h1>
              <img
                src={info.thumbnails!.default!.url!}
                alt="Channel Thumbnail"
                className="max-h-32 max-w-32"
              />
            </div>
            <div className="text-center py-2">{info.description}</div>
          </div>
          {/**HEADER END */}

          {/**GRID START */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {statistics ? (
              <Card>
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                  <CardDescription>
                    Statistics about the channel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 pt-6">
                    <div className="flex flex-row gap-6">
                      <h2 className="font-bold">Channel Name:</h2>
                      <h2>{statistics.title}</h2>
                    </div>
                    <div className="flex flex-row gap-6">
                      <h2 className="font-bold">Total View Count:</h2>
                      <h2>{Number(statistics.viewCount).toLocaleString()}</h2>
                    </div>
                    <div className="flex flex-row gap-6">
                      <h2 className="font-bold">Subscribers:</h2>
                      <h2>
                        {Number(statistics.subscriberCount).toLocaleString()}
                      </h2>
                    </div>
                    <div className="flex flex-row gap-6">
                      <h2 className="font-bold">Total Video Count:</h2>
                      <h2>{Number(statistics.videoCount).toLocaleString()}</h2>
                    </div>
                    <div className="flex flex-row gap-6">
                      <h2 className="font-bold">Channel Creation Date:</h2>
                      <h2>
                        {new Date(
                          statistics.channelCreationDate!
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h2>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <SkeletonCard />
            )}
            {top5Videos ? (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Most Popular Videos</CardTitle>
                  <CardDescription>
                    Top 5 Most Popular videos for this channel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row justify-center items-stretch md:items-center py-4 px-4 gap-4 md:gap-2">
                    {top5Videos.map((video, idx) => (
                      <div
                        className="flex flex-col items-center md:items-start "
                        key={idx}
                      >
                        <h2 className="font-semibold text-center md:text-left">
                          {video.title}
                        </h2>
                        <a
                          href={video.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            alt={video.title!}
                            src={video.thumbnail!}
                            className="w-48 md:max-w-xs object-cover"
                          />
                        </a>
                        <h2>
                          Views: {Number(video.viewCount).toLocaleString()}
                        </h2>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className=" md:col-span-2">
                <SkeletonCard />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>Nothing</div>
      )}
    </div>
  );
}
