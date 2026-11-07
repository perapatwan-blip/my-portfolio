'use client'

import React from 'react'
import { translations, Lang } from '@/lib/translations'
import { ExperienceItem } from '@/lib/types'
import { Briefcase, Plus, Calendar, Edit3, Trash2, CheckCircle2 } from 'lucide-react'

interface ExperienceSectionProps {
  lang: Lang
  experiences: ExperienceItem[]
  onOpenAddExp: () => void
  onEditExp: (item: ExperienceItem) => void
  onDeleteExp: (id: string) => void
  isAdmin: boolean
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  lang,
  experiences,
  onOpenAddExp,
  onEditExp,
  onDeleteExp,
  isAdmin,
}) => {
  const t = translations[lang]

  return (
    <section id="experience" className="scroll-mt-32 space-y-6">
      {/* Section Header with Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-crimson-600/20 text-crimson-400 flex items-center justify-center text-lg border border-crimson-500/40 shadow-glow-red">
            <Briefcase className="w-5 h-5 text-crimson-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              {t.expHeading}
            </h2>
            <p className="text-xs text-zinc-400 font-mono">{t.expSub}</p>
          </div>
        </div>

        {/* Admin "+ เพิ่มประสบการณ์ใหม่" Button */}
        <button
          onClick={onOpenAddExp}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-crimson-600 via-crimson-500 to-gold-amber text-white font-extrabold text-xs shadow-lg shadow-crimson-600/30 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer border border-gold-metallic/40"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>{t.btnAddExp}</span>
        </button>
      </div>

      {/* Experience Grid */}
      {experiences.length === 0 ? (
        <div className="py-14 text-center bento-card p-6 border-zinc-800">
          <div className="bento-card-content space-y-2">
            <Briefcase className="w-8 h-8 text-zinc-600 mx-auto" />
            <p className="text-sm font-semibold text-zinc-400">{t.emptyExp}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((item) => {
            const role = lang === 'TH' ? item.roleTh : item.roleEn
            const company = lang === 'TH' ? item.companyTh : item.companyEn
            const bullets = (lang === 'TH' ? item.bulletsTh : item.bulletsEn)
              .split('\n')
              .map((b) => b.trim())
              .filter(Boolean)
            const skills = item.skills
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)

            return (
              <div
                key={item.id}
                className="bento-card p-6 flex flex-col justify-between group hover:border-crimson-500"
              >
                <div className="bento-card-content space-y-3.5">
                  {/* Top Bar: Tag & Duration */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-crimson-600/20 text-crimson-300 border border-crimson-500/40">
                      {item.tag || 'Experience'}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold-metallic" />
                      {item.duration}
                    </span>
                  </div>

                  {/* Role & Company */}
                  <div>
                    <h3 className="text-lg font-bold text-white font-display group-hover:text-gold-amber transition-colors">
                      {role}
                    </h3>
                    <p className="text-xs font-semibold text-crimson-400 mt-0.5">{company}</p>
                  </div>

                  {/* Bullet points */}
                  {bullets.length > 0 && (
                    <ul className="text-xs text-zinc-300 space-y-2 pt-1">
                      {bullets.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-metallic flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Bottom Card Footer: Skills & Actions */}
                <div className="bento-card-content pt-4 border-t border-zinc-800/80 mt-4 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg text-[10px] bg-zinc-900 border border-zinc-800 font-mono text-zinc-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Edit / Delete Buttons */}
                  <div className="flex items-center gap-1.5 text-xs flex-shrink-0">
                    <button
                      onClick={() => onEditExp(item)}
                      className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-gold-amber transition-colors cursor-pointer"
                      title={t.edit}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteExp(item.id)}
                      className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-crimson-400 transition-colors cursor-pointer"
                      title={t.delete}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
