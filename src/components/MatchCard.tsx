import { useState } from "react";
import type { Match } from "@/hooks/useLiveEvents";
import PlayerModal from "./PlayerModal";
import { PlayCircle, Calendar, ExternalLink } from "lucide-react";

const formatMatchDate = (dateStr: string) => {
  try {
    // Clean data from "March 26, 2026, at 1:30 PM UTC" to something parsable
    const cleaned = dateStr.replace(/, at /i, " ");
    const date = new Date(cleaned);
    if (isNaN(date.getTime())) return dateStr;
    
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch (e) {
    return dateStr;
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  const isLive = status.toUpperCase() === "LIVE";
  return (
    <div
      className={`relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm transition-all duration-300 ${
        isLive
          ? "bg-live/10 text-live border border-live/20 animate-pulse-subtle"
          : "bg-secondary text-muted-foreground border border-border"
      }`}
    >
      {isLive && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-live"></span>
        </span>
      )}
      {status}
    </div>
  );
};

const MatchCard = ({ match }: { match: Match }) => {
  const [selectedChannel, setSelectedChannel] = useState<{
    name: string;
    url: string;
  } | null>(null);

  return (
    <>
      <div className="group relative rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
        {/* Card Header */}
        <div className="p-6 flex items-start justify-between relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded w-fit">
              {match.Category} • {match["Tour/Group name"]}
            </div>
            <h3 className="text-xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">
              {match["match name"]}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground/80 font-medium pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 opacity-50" />
                {formatMatchDate(match["Start time"])}
              </span>
            </div>
          </div>
          <StatusBadge status={match.Status} />
        </div>

        {/* Content Area */}
        <div className="px-6 pb-6 pt-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px bg-gradient-to-r from-border/50 to-transparent flex-1" />
            <span className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-widest whitespace-nowrap">
              Select Stream Channel
            </span>
            <div className="h-px bg-gradient-to-l from-border/50 to-transparent flex-1" />
          </div>

          <div className="flex flex-wrap gap-2.5">
            {match.Channels.map((ch) => (
              <button
                key={ch["Channel name"]}
                onClick={() =>
                  setSelectedChannel({
                    name: ch["Channel name"],
                    url: ch["Embed link"],
                  })
                }
                className="group/btn relative flex items-center gap-3 px-5 py-3 rounded-xl bg-secondary/50 text-sm font-bold border border-border/50 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/20 active:scale-95"
              >
                <PlayCircle className="w-4 h-4 group-hover/btn:fill-white/20 transition-all" />
                <span>{ch["Channel name"]}</span>
                <span className="text-[10px] opacity-40 uppercase font-black tracking-tighter group-hover/btn:opacity-60">
                  {ch.Language}
                </span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Decorative background accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-primary/10 transition-colors" />
      </div>

      <PlayerModal
        isOpen={!!selectedChannel}
        onClose={() => setSelectedChannel(null)}
        channelName={selectedChannel?.name || ""}
        embedUrl={selectedChannel?.url || ""}
        matchName={match["match name"]}
      />
    </>
  );
};

export default MatchCard;
