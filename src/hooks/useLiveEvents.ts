import { useQuery } from "@tanstack/react-query";

const JSON_URL =
  "https://raw.githubusercontent.com/srhady/crichd-speical-live-event/refs/heads/main/Live_Events.json";

export type Channel = {
  "Channel name": string;
  Language: string;
  "Embed link": string;
  "Stream link": string;
};

export type Match = {
  Category: string;
  "Tour/Group name": string;
  "match name": string;
  "Start time": string;
  "End time": string;
  Status: string;
  referer: string;
  "User agent": string;
  Channels: Channel[];
};

type LiveEventsResponse = {
  matches: Match[];
};

export const useLiveEvents = () => {
  return useQuery<LiveEventsResponse>({
    queryKey: ["live-events"],
    queryFn: async () => {
      const res = await fetch(JSON_URL);
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json();
    },
    refetchInterval: 60000,
  });
};
