'use client'

import React, { useState, useEffect } from 'react'
import { translations, Lang } from '@/lib/translations'
import { ExperienceItem } from '@/lib/types'
import { X } from 'lucide-react'

interface ExperienceModalProps {
  isOpen: boolean
  onClose: () => void
  lang: Lang
  initialData?: ExperienceItem | null
  onSave: (data: Partial<ExperienceItem>) => Promise<void>
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialData,
  onSave,
}) => {
  const t = translations[lang]
  const [roleTh, setRoleTh] = useState('')
  const [roleEn, setRoleEn] = useState('')
  const [companyTh, setCompanyTh] = useState('')
  const [companyEn, setCompanyEn] = useState('')
  const [tag, setTag] = useState('')
  const [duration, setDuration] = useState('')
  const [bulletsTh, setBulletsTh] = useState('')
  const [bulletsEn, setBulletsEn] = useState('')
  const [skills, setSkills] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialData) {
      setRoleTh(initialData.roleTh || '')
      setRoleEn(initialData.roleEn || '')
      setCompanyTh(initialData.companyTh || '')
      setCompanyEn(initialData.companyEn || '')
      setTag(initialData.tag || '')
      setDuration(initialData.duration || '')
      setBulletsTh(initialData.bulletsTh || '')
      setBulletsEn(initialData.bulletsEn || '')
      setSkills(initialData.skills || '')
    } else {
      setRoleTh('')
      setRoleEn('')
      setCompanyTh('')
      setCompanyEn('')
      setTag('Practical Experience')
      setDuration('2025 - 2026')
      setBulletsTh('')
      setBulletsEn('')
      setSkills('Next.js, TypeScript, Tailwind')
    }
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave({
        id: initialData?.id,
        roleTh,
        roleEn: roleEn || roleTh,
        companyTh,
        companyEn: companyEn || companyTh,
        tag,
        duration,
        bulletsTh,
        bulletsEn: bulletsEn || bulletsTh,
        skills,
      })
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bento-card rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border border-crimson-500/50 max-h-[90vh] overflow-y-auto">
        <div className="bento-card-content space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-base font-bold text-white font-display">
              {initialData ? (lang === 'TH' ? 'แก้ไขประสบการณ์' : 'Edit Experience') : t.btnAddExp}
            </h3>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {lang === 'TH' ? 'ตำแหน่ง (ภาษาไทย) *' : 'Role (Thai) *'}
                </label>
                <input
                  type="text"
                  required
                  value={roleTh}
                  onChange={(e) => setRoleTh(e.target.value)}
                  placeholder="เช่น Full-Stack Developer"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {lang === 'TH' ? 'ตำแหน่ง (English)' : 'Role (English)'}
                </label>
                <input
                  type="text"
                  value={roleEn}
                  onChange={(e) => setRoleEn(e.target.value)}
                  placeholder="e.g. Full-Stack Developer"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {lang === 'TH' ? 'องค์กร / บริษัท (ภาษาไทย) *' : 'Company (Thai) *'}
                </label>
                <input
                  type="text"
                  required
                  value={companyTh}
                  onChange={(e) => setCompanyTh(e.target.value)}
                  placeholder="เช่น ม.ศรีปทุม / Freelance"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {lang === 'TH' ? 'องค์กร / บริษัท (English)' : 'Company (English)'}
                </label>
                <input
                  type="text"
                  value={companyEn}
                  onChange={(e) => setCompanyEn(e.target.value)}
                  placeholder="e.g. SPU ICT Innovator"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {lang === 'TH' ? 'ป้ายกำกับ (Tag)' : 'Tag'}
                </label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="เช่น Academic Project"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {lang === 'TH' ? 'ระยะเวลา (Duration)' : 'Duration'}
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="เช่น 2025 - ปัจจุบัน"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {lang === 'TH' ? 'รายละเอียดงาน (บรรทัดละ 1 ข้อ - ไทย)' : 'Bullets (Thai - 1 per line)'}
              </label>
              <textarea
                rows={3}
                value={bulletsTh}
                onChange={(e) => setBulletsTh(e.target.value)}
                placeholder="ออกแบบระบบ Web Architecture&#10;พัฒนาระบบ Backend RESTful API"
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {lang === 'TH' ? 'รายละเอียดงาน (English - 1 per line)' : 'Bullets (English - 1 per line)'}
              </label>
              <textarea
                rows={3}
                value={bulletsEn}
                onChange={(e) => setBulletsEn(e.target.value)}
                placeholder="Engineered scalable full-stack web applications&#10;Integrated RESTful services"
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {lang === 'TH' ? 'เทคโนโลยีที่ใช้ (คั่นด้วยจุลภาค)' : 'Skills / Stack (comma-separated)'}
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Next.js, React, TypeScript, Docker"
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
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
                className="px-5 py-2 rounded-xl text-xs font-bold bg-crimson-600 hover:bg-crimson-500 text-white shadow-md shadow-crimson-600/30 transition-all cursor-pointer border border-gold-metallic/30 disabled:opacity-50"
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
