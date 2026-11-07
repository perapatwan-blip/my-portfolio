'use client'

import React, { useState } from 'react'
import { translations, Lang } from '@/lib/translations'
import { QuickNoteItem, SocialConfigItem } from '@/lib/types'
import {
  Share2,
  StickyNote,
  Phone,
  Mail,
  Send,
  Trash2,
  Plus,
  ExternalLink,
  Settings,
  Sparkles,
} from 'lucide-react'

interface ContactNotesSectionProps {
  lang: Lang
  social: SocialConfigItem
  notes: QuickNoteItem[]
  onOpenSocialModal: () => void
  onAddNote: (text: string) => Promise<void>
  onDeleteNote: (id: string) => Promise<void>
  isAdmin: boolean
}

export const ContactNotesSection: React.FC<ContactNotesSectionProps> = ({
  lang,
  social,
  notes,
  onOpenSocialModal,
  onAddNote,
  onDeleteNote,
  isAdmin,
}) => {
  const t = translations[lang]
  const [newNoteText, setNewNoteText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNoteText.trim() || submitting) return
    setSubmitting(true)
    try {
      await onAddNote(newNoteText.trim())
      setNewNoteText('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="space-y-6">
      {/* Section Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-crimson-600/20 text-crimson-400 flex items-center justify-center text-lg border border-crimson-500/40 shadow-glow-red">
          <Share2 className="w-5 h-5 text-crimson-400" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
            {t.contactHeading}
          </h2>
          <p className="text-xs text-zinc-400 font-mono">{t.contactSub}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Contact Info Card (col-span-6) */}
        <div className="lg:col-span-6 bento-card p-6 relative">
          <div className="bento-card-content flex flex-col justify-between h-full">
            <div>
              {/* Terminal-like Window Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-crimson-600 inline-block shadow-sm shadow-crimson-600" />
                  <span className="w-3 h-3 rounded-full bg-gold-amber inline-block shadow-sm shadow-gold-amber" />
                  <span className="w-3 h-3 rounded-full bg-zinc-500 inline-block" />
                  <span className="text-xs font-mono font-bold text-zinc-300 ml-2">
                    {t.contactBoxTitle}
                  </span>
                </div>
                <button
                  onClick={onOpenSocialModal}
                  className="text-[11px] font-mono px-3 py-1 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-gold-amber hover:text-gold-metallic transition-all cursor-pointer flex items-center gap-1.5 border border-gold-metallic/40"
                  title="แก้ไขช่องทางการติดต่อ"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{t.editSocialBtn}</span>
                </button>
              </div>

              {/* Social Channels 2-column Grid */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Instagram */}
                <a
                  href={social.igUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-crimson-500 flex items-center gap-3 group transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-crimson-600 to-gold-amber text-white flex items-center justify-center text-sm shadow-md group-hover:scale-110 transition-transform">
                    IG
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] text-zinc-400 font-mono">Instagram</div>
                    <div className="text-xs font-bold text-zinc-200 truncate group-hover:text-white">
                      {social.igLabel}
                    </div>
                  </div>
                </a>

                {/* Facebook */}
                <a
                  href={social.fbUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-crimson-500 flex items-center gap-3 group transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-crimson-600 text-white flex items-center justify-center text-sm shadow-md group-hover:scale-110 transition-transform">
                    FB
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] text-zinc-400 font-mono">Facebook</div>
                    <div className="text-xs font-bold text-zinc-200 truncate group-hover:text-white">
                      {social.fbLabel}
                    </div>
                  </div>
                </a>

                {/* Line ID */}
                <a
                  href={social.lineUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-gold-metallic flex items-center gap-3 group transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-gold-metallic text-zinc-950 flex items-center justify-center text-sm font-bold shadow-md group-hover:scale-110 transition-transform">
                    LINE
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] text-zinc-400 font-mono">Line ID</div>
                    <div className="text-xs font-bold text-zinc-200 truncate group-hover:text-white">
                      {social.lineLabel}
                    </div>
                  </div>
                </a>

                {/* Direct Call */}
                <a
                  href={`tel:${social.phone.replace(/-/g, '')}`}
                  className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-crimson-400 flex items-center gap-3 group transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-zinc-800 text-crimson-400 flex items-center justify-center text-sm shadow-md group-hover:scale-110 transition-transform border border-crimson-500/40">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] text-zinc-400 font-mono">Direct Call</div>
                    <div className="text-xs font-bold text-zinc-200 truncate group-hover:text-white">
                      {social.phone}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 mt-4 pt-2 border-t border-zinc-800/80 font-mono">
              * {lang === 'TH' ? 'คลิกที่ช่องทางด้านบนเพื่อติดต่อทันที หรือคลิก' : 'Click any link above to contact, or click'}{' '}
              <strong className="text-gold-amber">{t.editSocialBtn}</strong> {lang === 'TH' ? 'เพื่อปรับเปลี่ยนข้อมูล' : 'to customize channels'}
            </p>
          </div>
        </div>

        {/* Quick Notes CRUD (col-span-6) */}
        <div className="lg:col-span-6 bento-card p-6 relative">
          <div className="bento-card-content flex flex-col justify-between h-full">
            <div>
              {/* Header with live count */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <StickyNote className="w-4 h-4 text-gold-metallic" />
                  <h3 className="text-sm font-bold text-white font-display">
                    {t.notesHeading}
                  </h3>
                </div>
                <span className="text-xs font-mono text-gold-amber font-semibold px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800">
                  {notes.length} {lang === 'TH' ? 'รายการ' : 'notes'}
                </span>
              </div>

              {/* Notes List with Scroll */}
              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {notes.length === 0 ? (
                  <p className="text-xs text-zinc-400 text-center py-6 font-mono">
                    {t.emptyNotes}
                  </p>
                ) : (
                  notes.map((note) => (
                    <div
                      key={note.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 text-xs transition-colors group"
                    >
                      <div className="flex items-center gap-2 overflow-hidden pr-2">
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            note.priority === 'gold'
                              ? 'bg-gold-metallic shadow-sm shadow-gold-500'
                              : note.priority === 'high'
                              ? 'bg-crimson-500 shadow-sm shadow-crimson-500'
                              : 'bg-zinc-400'
                          }`}
                        />
                        <span className="text-zinc-200 truncate">{note.text}</span>
                      </div>
                      <button
                        onClick={() => onDeleteNote(note.id)}
                        className="text-zinc-500 hover:text-crimson-400 p-1 transition-colors cursor-pointer"
                        title={t.delete}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Add Note Input Form */}
            <form onSubmit={handleCreateNote} className="pt-3 flex gap-2 border-t border-zinc-800 mt-3">
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder={t.notesPlaceholder}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-crimson-500 text-white placeholder-zinc-500"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 rounded-xl text-xs font-extrabold bg-crimson-600 hover:bg-crimson-500 disabled:opacity-50 text-white cursor-pointer flex items-center gap-1.5 shadow-md shadow-crimson-600/30 transition-all border border-gold-metallic/30"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.btnAddNote}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
