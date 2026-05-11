import { useEffect, useRef } from "react";

export const CinematicOverlay = () => {
  const timeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    let animationFrameId: number;
    
    const updateTime = () => {
      if (timeRef.current) {
        const now = new Date();
        const frames = Math.floor((now.getMilliseconds() / 1000) * 24).toString().padStart(2, '0');
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}:${frames}`;
        timeRef.current.textContent = `TC ${timeString}`;
      }
      animationFrameId = requestAnimationFrame(updateTime);
    };

    animationFrameId = requestAnimationFrame(updateTime);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[80] overflow-hidden">
      {/* Corner Brackets */}
      <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-8 h-8 md:w-12 md:h-12 border-t border-l border-white/20" />
      <div className="absolute top-4 right-4 sm:top-10 sm:right-10 w-8 h-8 md:w-12 md:h-12 border-t border-r border-white/20" />
      <div className="absolute bottom-4 left-4 sm:bottom-10 sm:left-10 w-8 h-8 md:w-12 md:h-12 border-b border-l border-white/20" />
      <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 w-8 h-8 md:w-12 md:h-12 border-b border-r border-white/20" />
      
      {/* Scrolling Top Ticker */}
      <div className="absolute top-0 left-0 w-full bg-white/5 border-b border-white/5 backdrop-blur-[1px] py-1 overflow-hidden">
        <div className="flex animate-scroll whitespace-nowrap items-center">
          {[...Array(6)].map((_, i) => (
            <span key={`top-ticker-${i}`} className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30 px-8">
              Fennec Productions • 4K RAW • 24 FPS • ISO 400 • Shutter 1/48 • FENNEC_LOG •
            </span>
          ))}
        </div>
      </div>

      {/* Center Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 opacity-20">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white" />
      </div>

      {/* Timecode */}
      <div className="absolute bottom-12 right-6 sm:bottom-16 sm:right-10 font-mono text-[9px] md:text-[10px] text-white/40 tracking-[0.2em] flex items-center gap-3">
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" /> REC</span>
        <span ref={timeRef}>TC 00:00:00:00</span>
      </div>
      
      {/* Battery/Status */}
      <div className="absolute top-12 right-6 sm:top-16 sm:right-10 font-mono text-[9px] md:text-[10px] text-white/40 tracking-widest flex items-center gap-4">
        <span className="hidden sm:inline">4K 24FPS</span>
        <div className="flex items-center gap-1">
          <div className="w-5 h-2.5 sm:w-6 sm:h-3 border border-white/30 p-[1px]">
            <div className="w-3/4 h-full bg-white/40" />
          </div>
          <span>87%</span>
        </div>
      </div>

      {/* Scrolling Bottom Ticker */}
      <div className="absolute bottom-0 left-0 w-full bg-white/5 border-t border-white/5 backdrop-blur-[1px] py-1 overflow-hidden">
        <div className="flex animate-scroll whitespace-nowrap items-center" style={{ animationDirection: 'reverse' }}>
          {[...Array(6)].map((_, i) => (
            <span key={`bottom-ticker-${i}`} className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30 px-8">
              A04_C012_SC04_TK12 • 5600K • ND 0.9 • 35MM T1.5 • FENNEC PRODUCTIONS • 2026_ARCHIVE •
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
