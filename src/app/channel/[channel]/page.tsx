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
                  <div className="flex flex-col gap-2">
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
                  </div>
                </CardContent>
              </Card>
            ) : (
              <SkeletonCard />
            )}
          </div>
        </div>
      ) : (
        <div>Nothing</div>
      )}
    </div>
  );
}
