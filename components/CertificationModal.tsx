'use client'

import React, { useState, useEffect, useRef } from 'react'
import { translations, Lang } from '@/lib/translations'
import { CertificationItem } from '@/lib/types'
import { X, FileText, Upload } from 'lucide-react'

interface CertificationModalProps {
  isOpen: boolean
  onClose: () => void
  lang: Lang
  initialData?: CertificationItem | null
  onSave: (data: Partial<CertificationItem>) => Promise<void>
}

export const CertificationModal: React.FC<CertificationModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialData,
  onSave,
}) => {
  const t = translations[lang]
  const [titleTh, setTitleTh] = useState('')
  const [titleEn, setTitleEn] = useState('')
  const [issuerTh, setIssuerTh] = useState('')
  const [issuerEn, setIssuerEn] = useState('')
  const [issueDate, setIssueDate] = useState('')
  const [credentialId, setCredentialId] = useState('')
  const [pdfUrl, setPdfUrl] = useState('')
  const [verifyUrl, setVerifyUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (initialData) {
      setTitleTh(initialData.titleTh || '')
      setTitleEn(initialData.titleEn || '')
      setIssuerTh(initialData.issuerTh || '')
      setIssuerEn(initialData.issuerEn || '')
      setIssueDate(initialData.issueDate || '')
      setCredentialId(initialData.credentialId || '')
      setPdfUrl(initialData.pdfUrl || '')
      setVerifyUrl(initialData.verifyUrl || '')
    } else {
      setTitleTh('')
      setTitleEn('')
      setIssuerTh('')
      setIssuerEn('')
      setIssueDate('2026')
      setCredentialId('')
      setPdfUrl('')
      setVerifyUrl('')
    }
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      if (evt.target?.result) {
        setPdfUrl(evt.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave({
        id: initialData?.id,
        titleTh,
        titleEn: titleEn || titleTh,
        issuerTh,
        issuerEn: issuerEn || issuerTh,
        issueDate,
        credentialId,
        pdfUrl,
        verifyUrl,
      })
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bento-card rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border border-gold-metallic/50 max-h-[90vh] overflow-y-auto">
        <div className="bento-card-content space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-base font-bold text-white font-display">
              {initialData ? (lang === 'TH' ? 'แก้ไขใบรับรอง' : 'Edit Certificate') : t.btnAddCert}
            </h3>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {lang === 'TH' ? 'ชื่อหลักสูตร / ใบรับรอง (ภาษาไทย) *' : 'Certificate Title (Thai) *'}
              </label>
              <input
                type="text"
                required
                value={titleTh}
                onChange={(e) => setTitleTh(e.target.value)}
                placeholder="เช่น Cloud Computing Foundations"
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-gold-metallic text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {lang === 'TH' ? 'ชื่อหลักสูตร / ใบรับรอง (English)' : 'Certificate Title (English)'}
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="e.g. Cloud Computing Foundations"
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-gold-metallic text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {lang === 'TH' ? 'สถาบันที่ออกให้ (ภาษาไทย) *' : 'Issuer (Thai) *'}
                </label>
                <input
                  type="text"
                  required
                  value={issuerTh}
                  onChange={(e) => setIssuerTh(e.target.value)}
                  placeholder="เช่น มหาวิทยาลัยศรีปทุม, Google"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-gold-metallic text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {lang === 'TH' ? 'สถาบันที่ออกให้ (English)' : 'Issuer (English)'}
                </label>
                <input
                  type="text"
                  value={issuerEn}
                  onChange={(e) => setIssuerEn(e.target.value)}
                  placeholder="e.g. Sripatum University, Google"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-gold-metallic text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {lang === 'TH' ? 'วันที่ได้รับ (Issue Date)' : 'Issue Date'}
                </label>
                <input
                  type="text"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  placeholder="เช่น 2026"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-gold-metallic text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {lang === 'TH' ? 'รหัสใบรับรอง (Credential ID)' : 'Credential ID'}
                </label>
                <input
                  type="text"
                  value={credentialId}
                  onChange={(e) => setCredentialId(e.target.value)}
                  placeholder="เช่น SPU-ICT-2026-01"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-gold-metallic text-white"
                />
              </div>
            </div>

            {/* PDF attachment */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {lang === 'TH' ? 'ไฟล์เอกสารใบรับรอง (PDF หรือ URL)' : 'Certificate Document (PDF or URL)'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                  placeholder="https://.../certificate.pdf"
                  className="flex-1 px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-gold-metallic text-white"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 bg-zinc-900 text-zinc-300 rounded-xl text-xs font-semibold border border-zinc-700 hover:border-gold-metallic cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Upload className="w-3.5 h-3.5 text-crimson-400" />
                  <span>{t.attachPdf}</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={handlePdfUpload}
                  className="hidden"
                />
              </div>
              {pdfUrl && (
                <p className="text-[11px] text-gold-amber mt-1 flex items-center gap-1 font-mono">
                  <FileText className="w-3 h-3" />
                  <span>{lang === 'TH' ? 'มีเอกสารใบรับรองพร้อมพรีวิว' : 'Certificate attached'}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {lang === 'TH' ? 'ลิงก์ตรวจสอบ (Verify URL)' : 'Verify URL'}
              </label>
              <input
                type="url"
                value={verifyUrl}
                onChange={(e) => setVerifyUrl(e.target.value)}
                placeholder="https://coursera.org/verify/..."
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-gold-metallic text-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:bg-zinc-800 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gold-metallic hover:bg-gold-amber text-zinc-950 shadow-md shadow-gold-500/30 transition-all cursor-pointer border border-gold-amber disabled:opacity-50"
              >
                {loading ? 'Saving...' : t.save}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
