import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-12 px-6 md:px-10 border-t border-gray-900 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/40">
        <div className="flex items-center gap-4">
          <span>{t('footer.copy')}</span>
          <span className="hidden sm:inline opacity-20">|</span>
          <span>{t('footer.company')}</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-white/20">{t('footer.license')}</span>
          <span className="hidden sm:inline border-r border-white/10 h-4" />
          <span className="text-white/60">{t('footer.made')}</span>
        </div>
      </div>
    </footer>
  );
};
