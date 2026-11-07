'use client'

import React, { useState, useEffect, useRef } from 'react'
import { translations, Lang } from '@/lib/translations'
import { ProjectItem } from '@/lib/types'
import { X, Image as ImageIcon, Upload } from 'lucide-react'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  lang: Lang
  initialData?: ProjectItem | null
  onSave: (data: Partial<ProjectItem>) => Promise<void>
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialData,
  onSave,
}) => {
  const t = translations[lang]
  const [titleTh, setTitleTh] = useState('')
  const [titleEn, setTitleEn] = useState('')
  const [category, setCategory] = useState<'Full-Stack' | 'Frontend' | 'Backend'>('Full-Stack')
  const [tags, setTags] = useState('')
  const [descriptionTh, setDescriptionTh] = useState('')
  const [descriptionEn, setDescriptionEn] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [demoUrl, setDemoUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (initialData) {
      setTitleTh(initialData.titleTh || '')
      setTitleEn(initialData.titleEn || '')
      setCategory((initialData.category as any) || 'Full-Stack')
      setTags(initialData.tags || '')
      setDescriptionTh(initialData.descriptionTh || '')
      setDescriptionEn(initialData.descriptionEn || '')
      setImageUrl(initialData.imageUrl || '')
      setDemoUrl(initialData.demoUrl || '')
      setGithubUrl(initialData.githubUrl || '')
    } else {
      setTitleTh('')
      setTitleEn('')
      setCategory('Full-Stack')
      setTags('Next.js, Tailwind CSS, TypeScript')
      setDescriptionTh('')
      setDescriptionEn('')
      setImageUrl('')
      setDemoUrl('')
      setGithubUrl('')
    }
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      if (evt.target?.result) {
        setImageUrl(evt.target.result as string)
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
        titleEn,
        category,
        tags,
        descriptionTh,
        descriptionEn,
        imageUrl,
        demoUrl,
        githubUrl,
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
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-base font-bold text-white font-display">
              {initialData ? (lang === 'TH' ? 'แก้ไขผลงาน' : 'Edit Project') : t.btnAddProject}
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
                {lang === 'TH' ? 'ชื่อผลงาน (ภาษาไทย) *' : 'Project Title (Thai) *'}
              </label>
              <input
                type="text"
                required
                value={titleTh}
                onChange={(e) => setTitleTh(e.target.value)}
                placeholder="เช่น ระบบ Smart SPU Portal"
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {lang === 'TH' ? 'ชื่อผลงาน (English) *' : 'Project Title (English) *'}
              </label>
              <input
                type="text"
                required
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="e.g. SPU Smart Portal & Analytics"
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {lang === 'TH' ? 'หมวดหมู่สายงาน *' : 'Category *'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                >
                  <option value="Full-Stack">Full-Stack</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {lang === 'TH' ? 'แท็กเทคโนโลยี (คั่นด้วยจุลภาค)' : 'Tags (comma-separated)'}
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="React, Next.js, Prisma"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {lang === 'TH' ? 'คำอธิบาย (ภาษาไทย)' : 'Description (Thai)'}
              </label>
              <textarea
                rows={2}
                value={descriptionTh}
                onChange={(e) => setDescriptionTh(e.target.value)}
                placeholder="รายละเอียดผลงานและสถาปัตยกรรมที่ใช้..."
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {lang === 'TH' ? 'คำอธิบาย (English)' : 'Description (English)'}
              </label>
              <textarea
                rows={2}
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
                placeholder="Project overview, architecture, and technical achievements..."
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
              />
            </div>

            {/* Image URL & Upload */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {lang === 'TH' ? 'รูปภาพผลงาน (URL หรือเลือกไฟล์)' : 'Project Image'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 bg-zinc-900 text-zinc-300 rounded-xl text-xs font-semibold border border-zinc-700 hover:border-gold-metallic cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{t.uploadPhoto}</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className="hidden"
                />
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Demo URL</label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
              </div>
            </div>

            {/* Actions */}
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
