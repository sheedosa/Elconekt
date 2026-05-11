export const MetadataLabel = ({ text, rec }: { text: string; rec?: boolean }) => (
  <div className="font-mono text-[10px] sm:text-xs text-white/50 mb-4 flex items-center gap-2 uppercase tracking-widest">
    {rec && <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />}
    <span className="opacity-40">/</span> {text}
  </div>
);
