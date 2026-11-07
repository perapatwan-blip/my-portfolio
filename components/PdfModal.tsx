'use client'

import React from 'react'
import { translations, Lang } from '@/lib/translations'
import { CertificationItem } from '@/lib/types'
import { X, ExternalLink, ShieldCheck, Award } from 'lucide-react'

interface PdfModalProps {
  isOpen: boolean
  onClose: () => void
  lang: Lang
  cert: CertificationItem | null
}

export const PdfModal: React.FC<PdfModalProps> = ({
  isOpen,
  onClose,
  lang,
  cert,
}) => {
  const t = translations[lang]

  if (!isOpen || !cert) return null

  const title = lang === 'TH' ? cert.titleTh : cert.titleEn
  const issuer = lang === 'TH' ? cert.issuerTh : cert.issuerEn

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="bento-card rounded-3xl p-6 max-w-3xl w-full shadow-2xl relative border border-gold-metallic/60 max-h-[92vh] flex flex-col">
        <div className="bento-card-content flex flex-col h-full space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gold-metallic/20 text-gold-amber flex items-center justify-center border border-gold-metallic/50">
                <Award className="w-5 h-5 text-gold-metallic" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display line-clamp-1">
                  {title}
                </h3>
                <p className="text-xs text-crimson-400 font-mono">
                  {issuer} • {cert.issueDate}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Certificate Viewer Area */}
          <div className="flex-1 min-h-[380px] rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden flex flex-col items-center justify-center relative p-4">
            {cert.pdfUrl && cert.pdfUrl.startsWith('http') ? (
              <iframe
                src={cert.pdfUrl}
                title={title}
                className="w-full h-full min-h-[420px] rounded-xl border-0"
              />
            ) : cert.pdfUrl && cert.pdfUrl.startsWith('data:image') ? (
              <img
                src={cert.pdfUrl}
                alt={title}
                className="max-w-full max-h-[450px] object-contain rounded-xl shadow-lg"
              />
            ) : (
              <div className="text-center p-8 space-y-4 max-w-md">
                <div className="w-16 h-16 rounded-full bg-gold-metallic/15 text-gold-amber mx-auto flex items-center justify-center border border-gold-metallic/40 shadow-glow-gold">
                  <ShieldCheck className="w-8 h-8 text-gold-metallic" />
                </div>
                <h4 className="text-lg font-bold text-white font-display">
                  Official Verification Document
                </h4>
                <div className="space-y-1 text-xs text-zinc-300">
                  <p className="font-semibold text-gold-amber">{title}</p>
                  <p>{issuer} (Class of 2026)</p>
                  {cert.credentialId && (
                    <p className="font-mono text-zinc-400">Credential ID: {cert.credentialId}</p>
                  )}
                </div>
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400">
                  {lang === 'TH'
                    ? 'เอกสารวุฒิบัตรได้รับการบันทึกและตรวจสอบความถูกต้องสมบูรณ์ในระบบของคณะเทคโนโลยีสารสนเทศ SPU'
                    : 'Certificate recorded and verified within the School of Information Technology SPU registry system.'}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-xs">
            {cert.verifyUrl ? (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="text-gold-amber hover:text-gold-metallic flex items-center gap-1 font-semibold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t.verifyCert}</span>
              </a>
            ) : (
              <span className="text-zinc-500 font-mono text-[11px]">SPU ICT Verified</span>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
