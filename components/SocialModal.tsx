'use client'

import React, { useState, useEffect } from 'react'
import { translations, Lang } from '@/lib/translations'
import { SocialConfigItem } from '@/lib/types'
import { X, Globe, Phone, Mail, Instagram, Facebook } from 'lucide-react'

interface SocialModalProps {
  isOpen: boolean
  onClose: () => void
  lang: Lang
  initialData: SocialConfigItem
  onSave: (data: SocialConfigItem) => Promise<void>
}

export const SocialModal: React.FC<SocialModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialData,
  onSave,
}) => {
  const t = translations[lang]
  const [formData, setFormData] = useState<SocialConfigItem>(initialData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setFormData(initialData)
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave(formData)
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
              {lang === 'TH' ? 'ตั้งค่าช่องทางติดต่อ & โซเชียล' : 'Configure Contact Channels'}
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
                🔗 {lang === 'TH' ? 'ลิงก์โลโก้ PW (Logo Link)' : 'Logo Brand Link'}
              </label>
              <input
                type="text"
                value={formData.logoLink}
                onChange={(e) => setFormData({ ...formData, logoLink: e.target.value })}
                placeholder="#overview หรือ https://..."
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                📸 Instagram URL & Username
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="url"
                  value={formData.igUrl}
                  onChange={(e) => setFormData({ ...formData, igUrl: e.target.value })}
                  placeholder="https://instagram.com/p.perapat_"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
                <input
                  type="text"
                  value={formData.igLabel}
                  onChange={(e) => setFormData({ ...formData, igLabel: e.target.value })}
                  placeholder="@p.perapat_"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                📘 Facebook URL & Name
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="url"
                  value={formData.fbUrl}
                  onChange={(e) => setFormData({ ...formData, fbUrl: e.target.value })}
                  placeholder="https://facebook.com/..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
                <input
                  type="text"
                  value={formData.fbLabel}
                  onChange={(e) => setFormData({ ...formData, fbLabel: e.target.value })}
                  placeholder="Facebook Name"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                💬 Line Contact Link & ID
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={formData.lineUrl}
                  onChange={(e) => setFormData({ ...formData, lineUrl: e.target.value })}
                  placeholder="https://line.me/ti/p/~0631568992"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
                <input
                  type="text"
                  value={formData.lineLabel}
                  onChange={(e) => setFormData({ ...formData, lineLabel: e.target.value })}
                  placeholder="0631568992"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  📞 {lang === 'TH' ? 'เบอร์โทรศัพท์' : 'Phone'}
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="063-156-8992"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  ✉️ {lang === 'TH' ? 'อีเมล' : 'Email'}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="perapat.wan@spu.ac.th"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white"
                />
              </div>
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
                {loading ? 'Saving...' : t.saveChanges}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
