export const MetadataLabel = ({ text, rec }: { text: string; rec?: boolean }) => (
  <div className="font-mono rtl:font-sans text-[10px] sm:text-xs rtl:text-sm rtl:font-bold text-white/50 rtl:text-white/80 mb-4 flex items-center gap-2 uppercase tracking-widest rtl:tracking-normal">
    {rec && <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />}
    <span className="opacity-40">/</span> {text}
  </div>
);
