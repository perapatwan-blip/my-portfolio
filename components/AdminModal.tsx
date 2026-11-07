'use client'

import React, { useState } from 'react'
import { translations, Lang } from '@/lib/translations'
import { X, Shield, KeyRound, Check, AlertCircle } from 'lucide-react'

interface AdminModalProps {
  isOpen: boolean
  onClose: () => void
  lang: Lang
  onLogin: (pin: string) => Promise<boolean>
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  lang,
  onLogin,
}) => {
  const t = translations[lang]
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const ok = await onLogin(pin)
      if (ok) {
        setPin('')
        onClose()
      } else {
        setError(lang === 'TH' ? 'รหัส PIN ไม่ถูกต้อง (Default: spu2026)' : 'Invalid PIN (Default: spu2026)')
      }
    } catch (err) {
      setError(lang === 'TH' ? 'เกิดข้อผิดพลาดในการตรวจสอบ' : 'Verification error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bento-card rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-crimson-500/50">
        <div className="bento-card-content space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-crimson-600/20 text-crimson-400 flex items-center justify-center border border-crimson-500/40">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white font-display">
                {lang === 'TH' ? 'เข้าสู่ระบบผู้ดูแล (Admin Access)' : 'Admin Authentication'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-mono">
                {lang === 'TH' ? 'รหัสผ่าน PIN ผู้ดูแล (Security PIN)' : 'Security PIN'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="เช่น spu2026"
                  className="w-full px-4 py-2.5 pl-10 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white font-mono tracking-widest placeholder-zinc-500"
                  autoFocus
                />
                <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 font-mono">
                {lang === 'TH' ? '* ค่าเริ่มต้น: spu2026' : '* Default PIN: spu2026'}
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-crimson-950/80 border border-crimson-600/50 text-crimson-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-crimson-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-crimson-600 hover:bg-crimson-500 text-white shadow-md shadow-crimson-600/40 transition-all cursor-pointer border border-gold-metallic/30 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : (lang === 'TH' ? 'ยืนยันรหัส PIN' : 'Verify PIN')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
