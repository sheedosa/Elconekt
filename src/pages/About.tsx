import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { SmoothImage } from "../components/ui/SmoothImage";
import { MetadataLabel } from "../components/ui/MetadataLabel";

const AboutSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 md:py-40 px-6 md:px-10 border-b border-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <MetadataLabel text={t('about_page.tag')} />
          <h2 className="text-3xl font-bold mb-8 tracking-tighter">{t('about_page.title')}</h2>
          <p className="text-xl md:text-3xl font-light leading-relaxed text-white mb-8">{t('about_page.subtitle')}</p>
          <div className="text-white space-y-6 text-lg">
              <p>{t('about_page.p1')}</p>
              <p>{t('about_page.p2')}</p>
              <p>{t('about_page.p3')}</p>
              <p className="border-t border-gray-800 pt-6 mt-6 italic">{t('about_page.p4')}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] overflow-hidden"
        >
          <SmoothImage 
            src="/images/about-bg.jpg" 
            alt="Fennec Production Set" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  const { t } = useTranslation();
  const team = [
    { department: t('about_page.depts.leadership'), role: t('about_page.roles.founder') },
    { department: t('about_page.depts.creative'), role: t('about_page.roles.director') },
    { department: t('about_page.depts.camera'), role: t('about_page.roles.dop') },
    { department: t('about_page.depts.lighting'), role: t('about_page.roles.gaffer') },
    { department: t('about_page.depts.post'), role: t('about_page.roles.motion') },
    { department: t('about_page.depts.operations'), role: t('about_page.roles.admin') }
  ];

  return (
    <section className="py-24 md:py-32 border-y border-white/5 bg-black">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16 sm:mb-24">
          <MetadataLabel text={t('about_page.team_tag')} />
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tighter mb-6">{t('about_page.team_title')}</h2>
          <p className="text-white/60 mx-auto max-w-xl text-base font-light leading-relaxed">
            {t('about_page.team_desc')}
          </p>
        </div>

        <div className="flex flex-col space-y-12 sm:space-y-16">
          {team.map((member, i) => (
            <motion.div 
              key={`team-${i}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center sm:justify-between text-center sm:text-left group cursor-default"
            >
              {/* Image Frame */}
              <div className="mb-4 sm:mb-0 sm:mr-8 rtl:sm:ml-8 rtl:sm:mr-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/20 bg-gradient-to-tr from-white/5 to-white/10 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-white/50 group-hover:scale-105 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
                  <div className="text-[8px] sm:text-[10px] font-mono text-white/30 uppercase tracking-tighter">{t('about_page.frame')}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-baseline flex-grow justify-center sm:justify-start">
                <div className="sm:w-1/3 sm:text-right sm:pr-8 rtl:sm:text-left rtl:sm:pl-8 rtl:sm:pr-0 mb-1 sm:mb-0">
                  <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-white">
                    {member.department}
                  </span>
                </div>
                <div className="hidden sm:block w-px h-8 bg-white/20 group-hover:bg-white/50 transition-colors mx-4"></div>
                <div className="sm:w-2/3 sm:pl-8 rtl:sm:pr-8 rtl:sm:pl-0">
                  <span className="text-xl sm:text-3xl font-medium tracking-tight text-white group-hover:text-white transition-colors">
                    {member.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function About() {
  return (
    <div className="pt-20">
      <AboutSection />
      <TeamSection />
    </div>
  );
}
