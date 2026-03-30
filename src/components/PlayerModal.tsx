import { X, Maximize2, Info } from "lucide-react";
import { useEffect } from "react";

interface PlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  channelName: string;
  embedUrl: string;
  matchName: string;
}

const PlayerModal = ({
  isOpen,
  onClose,
  channelName,
  embedUrl,
  matchName,
}: PlayerModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col p-4 md:p-8 animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex flex-col">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded-full" />
              {channelName}
            </h2>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm font-bold text-muted-foreground flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                {matchName}
              </span>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-live/10 text-live text-[10px] font-black uppercase tracking-widest animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-live" />
                Live Now
              </span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-secondary hover:bg-destructive/10 hover:text-destructive transition-all duration-300 group"
            title="Close Player"
          >
            <X className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Video Container */}
        <div className="relative flex-1 rounded-2xl overflow-hidden bg-black shadow-2xl shadow-primary/10 border border-border group">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allowFullScreen
            allow="autoplay; encrypted-media"
            referrerPolicy="no-referrer"
          />
          
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/40 rounded-br-2xl pointer-events-none" />
        </div>

        {/* Footer Info */}
        <div className="mt-4 flex items-center justify-between opacity-60">
          <p className="text-xs font-medium">
            Playing on <span className="text-primary">{channelName}</span> • High Definition Stream
          </p>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter">
            <Maximize2 className="w-3 h-3" />
            Cinema Mode Active
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;
