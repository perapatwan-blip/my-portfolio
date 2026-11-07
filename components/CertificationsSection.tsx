'use client'

import React from 'react'
import { translations, Lang } from '@/lib/translations'
import { CertificationItem } from '@/lib/types'
import { Award, Plus, FileText, ExternalLink, Edit3, Trash2, ShieldCheck } from 'lucide-react'

interface CertificationsSectionProps {
  lang: Lang
  certifications: CertificationItem[]
  onOpenAddCert: () => void
  onEditCert: (item: CertificationItem) => void
  onDeleteCert: (id: string) => void
  onPreviewPdf: (item: CertificationItem) => void
  isAdmin: boolean
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  lang,
  certifications,
  onOpenAddCert,
  onEditCert,
  onDeleteCert,
  onPreviewPdf,
  isAdmin,
}) => {
  const t = translations[lang]

  return (
    <section id="certifications" className="scroll-mt-32 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gold-metallic/20 text-gold-amber flex items-center justify-center text-lg border border-gold-metallic/40 shadow-glow-gold">
            <Award className="w-5 h-5 text-gold-metallic" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              {t.certHeading}
            </h2>
            <p className="text-xs text-zinc-400 font-mono">{t.certSub}</p>
          </div>
        </div>

        {/* Admin "+ เพิ่มใบรับรองใหม่" Button */}
        <button
          onClick={onOpenAddCert}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-metallic via-gold-amber to-crimson-600 text-zinc-950 font-extrabold text-xs shadow-lg shadow-gold-500/30 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer border border-gold-amber"
        >
          <Plus className="w-4 h-4 text-zinc-950" />
          <span>{t.btnAddCert}</span>
        </button>
      </div>

      {/* Grid of Certifications */}
      {certifications.length === 0 ? (
        <div className="py-14 text-center bento-card p-6 border-zinc-800">
          <div className="bento-card-content space-y-2">
            <Award className="w-8 h-8 text-zinc-600 mx-auto" />
            <p className="text-sm font-semibold text-zinc-400">{t.emptyCerts}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((item) => {
            const title = lang === 'TH' ? item.titleTh : item.titleEn
            const issuer = lang === 'TH' ? item.issuerTh : item.issuerEn

            return (
              <div
                key={item.id}
                className="bento-card p-6 flex flex-col justify-between space-y-4 group hover:border-gold-metallic/60"
              >
                <div className="bento-card-content">
                  {/* Top Bar with Icon & Issue Date */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-gold-metallic/20 text-gold-amber flex items-center justify-center text-lg border border-gold-metallic/40 shadow-inner">
                      <ShieldCheck className="w-5 h-5 text-gold-metallic" />
                    </div>
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-700">
                      {item.issueDate}
                    </span>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="font-bold text-base text-white line-clamp-2 mb-1 font-display group-hover:text-gold-amber transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-crimson-400 font-medium mb-2">{issuer}</p>

                  {/* Credential ID */}
                  {item.credentialId && (
                    <p className="text-[11px] text-zinc-400 font-mono tracking-tight">
                      ID: {item.credentialId}
                    </p>
                  )}
                </div>

                {/* Bottom Bar: Preview & CRUD */}
                <div className="bento-card-content pt-3.5 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onPreviewPdf(item)}
                    className="py-1.5 px-3 rounded-xl bg-crimson-600/20 hover:bg-crimson-600/30 text-crimson-300 border border-crimson-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-crimson-400" />
                    <span>{t.previewPdf}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditCert(item)}
                      className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-gold-amber transition-colors cursor-pointer"
                      title={t.edit}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteCert(item.id)}
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
