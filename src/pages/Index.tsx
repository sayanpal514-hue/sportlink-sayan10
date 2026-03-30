import { useState } from "react";
import { useLiveEvents } from "@/hooks/useLiveEvents";
import MatchCard from "@/components/MatchCard";
import { Loader2, Radio, MessageCircle } from "lucide-react";

type Tab = "IPL" | "PSL";

const Index = () => {
  const { data, isLoading, error } = useLiveEvents();
  const [activeTab, setActiveTab] = useState<Tab>("IPL");

  const iplMatches = data?.matches.filter((m) => m["Tour/Group name"].includes("IPL")) ?? [];
  const pslMatches = data?.matches.filter((m) => m["Tour/Group name"].includes("PSL")) ?? [];
  const matches = activeTab === "IPL" ? iplMatches : pslMatches;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Radio className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-black tracking-tight text-foreground">
              Sport<span className="text-primary">Link</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://whatsapp.com/channel/0029VbC2oQsC6ZvmwpR3v73v"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-bold text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-lg hover:shadow-green-500/20 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              {(["IPL", "PSL"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-md text-sm font-bold transition-all ${
                    activeTab === tab
                      ? tab === "IPL"
                        ? "bg-ipl text-foreground shadow-lg"
                        : "bg-psl text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-destructive">
            Failed to load events. Please try again.
          </div>
        )}

        {!isLoading && !error && matches.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No {activeTab} matches scheduled right now.
          </div>
        )}

        <div className="grid gap-6 max-w-4xl mx-auto">
          {matches.map((match) => (
            <MatchCard key={match["match name"]} match={match} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
