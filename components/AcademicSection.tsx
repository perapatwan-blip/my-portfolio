'use client'

import React from 'react'
import { translations, Lang } from '@/lib/translations'
import { GraduationCap, BookOpen, Star, Building2, Code2, Database, Cloud, Shield } from 'lucide-react'

interface AcademicSectionProps {
  lang: Lang
}

export const AcademicSection: React.FC<AcademicSectionProps> = ({ lang }) => {
  const t = translations[lang]

  const coreFocusTags = [
    { label: 'Full-Stack Web Architecture', icon: Code2 },
    { label: 'Cloud Computing & DevOps', icon: Cloud },
    { label: 'Database Systems & SQL Optimization', icon: Database },
    { label: 'Information & Cyber Security', icon: Shield },
    { label: 'RESTful API & Microservices', icon: BookOpen },
  ]

  return (
    <section id="education" className="scroll-mt-32 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-crimson-600/20 text-crimson-400 flex items-center justify-center text-lg border border-crimson-500/40 shadow-glow-red">
          <GraduationCap className="w-5 h-5 text-crimson-400" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
            {t.eduHeading}
          </h2>
          <p className="text-xs text-zinc-400 font-mono">{t.eduSub}</p>
        </div>
      </div>

      {/* Main Academic Card */}
      <div className="bento-card p-6 sm:p-9 relative overflow-hidden group">
        <div className="bento-card-content space-y-6">
          {/* Top Status & Institute Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-crimson-600/20 text-crimson-300 border border-crimson-500/50 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-crimson-500 animate-ping" />
              <span>{t.eduStatus}</span>
            </span>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-700">
              Sripatum University (SPU)
            </span>
          </div>

          {/* Grid Layout: Left Details, Right GPA Highlight */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Major & Institute Info */}
            <div className="lg:col-span-8 space-y-3.5">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display flex items-center gap-2">
                <span className="text-crimson-400">ICT</span>
                <span>{t.eduMajor}</span>
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gold-metallic flex-shrink-0" />
                <span>{t.eduInstitute}</span>
              </p>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-1">
                {t.eduCurriculumDesc}
              </p>

              {/* Core Focus Tags */}
              <div className="pt-2">
                <div className="text-[11px] font-semibold text-zinc-400 mb-2 uppercase tracking-wider font-mono">
                  {t.coreFocusTitle}
                </div>
                <div className="flex flex-wrap gap-2">
                  {coreFocusTags.map((tag, idx) => {
                    const Icon = tag.icon
                    return (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-zinc-900/90 text-zinc-300 border border-zinc-700 hover:border-gold-metallic/50 transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5 text-gold-metallic" />
                        <span>{tag.label}</span>
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* GPA Highlight Card (Right Side) */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="p-6 rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950/90 to-black border border-gold-metallic/50 text-center shadow-xl shadow-gold-500/10 group-hover:border-gold-metallic transition-all duration-300">
                <div className="text-xs text-zinc-400 font-semibold mb-1 font-mono uppercase tracking-wider">
                  {t.eduGpaxLabel}
                </div>
                {/* Gold Highlighted GPA Accent */}
                <div className="text-5xl font-mono font-black text-gold-amber tracking-tight my-2 text-glow-gold">
                  3.67
                </div>
                <div className="text-xs font-bold text-gold-metallic mt-2 flex items-center justify-center gap-1.5 bg-gold-metallic/15 py-1.5 px-3 rounded-full border border-gold-metallic/40">
                  <Star className="w-3.5 h-3.5 text-gold-amber fill-gold-amber" />
                  <span>{t.eduHonors}</span>
                </div>
                <p className="text-[10px] text-zinc-400 mt-3 font-mono">
                  ICT Academic Excellence @ SPU 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
