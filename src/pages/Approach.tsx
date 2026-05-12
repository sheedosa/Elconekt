import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { MetadataLabel } from "../components/ui/MetadataLabel";
import { SmoothImage } from "../components/ui/SmoothImage";

const stepImages = [
  "/images/hero-bg.jpg",
  "/images/about-bg.jpg",
  "/images/field1.jpg",
  "/images/car2.jpg",
  "/images/still-01.jpg",
  "/images/still-02.jpg",
];

const ServicesSection = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    { num: t('approach.stages.s1'), title: t('approach.stages.s1_title'), desc: t('approach.stages.s1_desc') },
    { num: t('approach.stages.s2'), title: t('approach.stages.s2_title'), desc: t('approach.stages.s2_desc') },
    { num: t('approach.stages.s3'), title: t('approach.stages.s3_title'), desc: t('approach.stages.s3_desc') },
    { num: t('approach.stages.s4'), title: t('approach.stages.s4_title'), desc: t('approach.stages.s4_desc') },
    { num: t('approach.stages.s5'), title: t('approach.stages.s5_title'), desc: t('approach.stages.s5_desc') },
    { num: t('approach.stages.s6'), title: t('approach.stages.s6_title'), desc: t('approach.stages.s6_desc') },
  ];

  return (
    <section className="py-24 md:py-40 px-6 md:px-10 border-b border-gray-900 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 md:mb-28 max-w-2xl">
          <MetadataLabel text={t('approach.tag')} />
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-6">{t('approach.title')}</h2>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">
            {t('approach.desc')}
          </p>
        </div>

        {/* Two-column layout: steps + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Steps */}
          <div className="relative">
            <div className="absolute left-[3.25rem] top-0 bottom-0 hidden md:block">
              <div className="w-px h-full bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
            </div>

            <div className="flex flex-col">
              {steps.map((step, i) => (
                <div
                  key={`step-${i}`}
                  onClick={() => setActiveStep(i)}
                  className={`group relative flex items-start gap-0 md:gap-10 py-8 md:py-10 border-b border-white/5 last:border-0 cursor-pointer`}
                >
                  {/* Dot */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-3 w-24">
                    <div className={`hidden md:flex w-3 h-3 rounded-full border transition-all duration-300 mt-1 relative z-10 ${activeStep === i ? 'border-white bg-white' : 'border-white/30 bg-black group-hover:border-white group-hover:bg-white'}`} />
                    <span className={`font-mono text-[10px] transition-colors tracking-widest ${activeStep === i ? 'text-white/60' : 'text-white/20 group-hover:text-white/60'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pl-2">
                    <p className={`font-mono text-[9px] uppercase tracking-[0.2em] mb-1 transition-colors ${activeStep === i ? 'text-white/40' : 'text-white/20'}`}>{step.num}</p>
                    <h3 className={`text-xl sm:text-2xl font-bold tracking-tighter transition-colors duration-300 ${activeStep === i ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                      {step.title}
                    </h3>
                    <div className={`text-sm text-white/40 font-light leading-relaxed overflow-hidden transition-all duration-500 ease-in-out ${activeStep === i ? 'max-h-32 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      {step.desc}
                    </div>
                    {/* Mobile image — shows below desc on small screens */}
                    <div className={`lg:hidden overflow-hidden transition-all duration-500 ${activeStep === i ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                      <div className="aspect-video overflow-hidden">
                        <SmoothImage
                          src={stepImages[i]}
                          alt={step.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky image panel — desktop only */}
          <div className="hidden lg:block sticky top-32 self-start">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-900">
              {stepImages.map((src, i) => (
                <div
                  key={`img-${i}`}
                  className={`absolute inset-0 transition-opacity duration-700 ${activeStep === i ? 'opacity-100' : 'opacity-0'}`}
                >
                  <SmoothImage
                    src={src}
                    alt={steps[i].title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50 mb-1">{steps[i].num}</p>
                    <p className="text-white font-bold tracking-tighter text-lg">{steps[i].title}</p>
                  </div>
                </div>
              ))}
              {/* Step counter */}
              <div className="absolute top-4 right-4 font-mono text-[9px] text-white/40 tracking-widest">
                {String(activeStep + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-24 md:mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">Ready to start?</p>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-white">Let's make something together.</h3>
          </div>
          <Link
            to="/contact"
            className="group flex-shrink-0 inline-flex items-center gap-3 px-10 py-4 border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-xs font-bold uppercase tracking-[0.3em]"
          >
            Initiate a Project
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default function Approach() {
  return (
    <div className="pt-20">
      <ServicesSection />
    </div>
  );
}
