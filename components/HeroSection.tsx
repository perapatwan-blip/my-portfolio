'use client'

import React, { useRef } from 'react'
import { translations, Lang } from '@/lib/translations'
import { SocialConfigItem } from '@/lib/types'
import {
  IdCard,
  Award,
  GraduationCap,
  Sparkles,
  ArrowDown,
  Phone,
  Mail,
  Camera,
  Crown,
  CheckCircle2,
} from 'lucide-react'

interface HeroSectionProps {
  lang: Lang
  social: SocialConfigItem
  avatarUrl: string
  onUpdateAvatar: (newUrl: string) => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  social,
  avatarUrl,
  onUpdateAvatar,
}) => {
  const t = translations[lang]
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      if (evt.target?.result) {
        onUpdateAvatar(evt.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <section id="overview" className="scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Hero Bento Card (col-span-8) */}
        <div className="lg:col-span-8 bento-card p-6 sm:p-10 flex flex-col justify-between group">
          <div className="bento-card-content flex flex-col sm:flex-row items-center sm:items-start gap-8 w-full">
            {/* Avatar with Rotating Laser Glow Frame */}
            <div className="relative flex-shrink-0 z-10">
              <div className="avatar-glow-frame w-40 h-40 sm:w-48 sm:h-48 shadow-glow-red">
                <img
                  src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                  alt={lang === 'TH' ? t.heroName : t.heroEnName}
                  className="relative z-10 w-full h-full object-cover rounded-[calc(2rem-3.5px)] bg-zinc-900 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Upload Overlay */}
              <label
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/75 rounded-[2rem] flex flex-col items-center justify-center gap-1.5 text-white opacity-0 group-hover:opacity-100 hover:opacity-100 transition-all cursor-pointer backdrop-blur-sm z-20 border border-crimson-500/50"
                title={t.changeAvatar}
              >
                <Camera className="w-6 h-6 text-gold-metallic animate-bounce" />
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-crimson-600 rounded-md shadow">
                  {t.changeAvatar}
                </span>
                <span className="text-[10px] text-zinc-300">(คลิกเลือกรูป)</span>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />

              {/* Golden GPAX Badge floating */}
              <div className="absolute -bottom-3 -right-2 bg-zinc-950 text-gold-amber px-3.5 py-1.5 rounded-full text-xs font-bold border border-gold-metallic/70 flex items-center gap-1.5 shadow-xl backdrop-blur-md z-20 shadow-gold-500/20">
                <Crown className="w-3.5 h-3.5 text-gold-metallic fill-gold-metallic" />
                <span className="tracking-wide">{t.gpaxBadge}</span>
              </div>
            </div>

            {/* Bio & Details */}
            <div className="flex-1 text-center sm:text-left space-y-3.5">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-crimson-600/20 text-crimson-300 border border-crimson-500/40 shadow-sm shadow-crimson-500/20">
                <Sparkles className="w-3.5 h-3.5 text-gold-metallic" />
                <span>{t.heroBadge}</span>
              </div>

              {/* Title & Name */}
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
                <span>{lang === 'TH' ? t.heroName : t.heroEnName}</span>
                {lang === 'TH' && (
                  <span className="block text-lg font-mono text-zinc-400 font-normal mt-0.5">
                    (Perapat Wanna)
                  </span>
                )}
              </h1>

              {/* Subtitle Details */}
              <p className="text-xs sm:text-sm font-semibold text-crimson-400 font-mono tracking-tight">
                {t.heroSubTitle}
              </p>

              {/* Bio description */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal pt-1">
                {t.heroBio}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-3">
                <a
                  href="#projects"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-500 hover:from-crimson-500 hover:to-crimson-400 text-white font-extrabold text-xs shadow-lg shadow-crimson-600/40 hover:shadow-crimson-500/60 transition-all flex items-center gap-2 cursor-pointer border border-gold-metallic/30"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>{t.btnViewWork}</span>
                </a>

                <a
                  href={`tel:${social.phone.replace(/-/g, '')}`}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-crimson-600/40 text-zinc-200 font-semibold text-xs hover:border-gold-metallic transition-all flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-metallic" />
                  <span>{social.phone}</span>
                </a>

                <a
                  href={`mailto:${social.email}`}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 hover:border-crimson-500 text-zinc-300 font-semibold text-xs transition-all flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-crimson-400" />
                  <span>{lang === 'TH' ? 'อีเมล' : 'Email'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Bento Stat Cards (col-span-4) */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-4">
          {/* Card 1: Student ID */}
          <div className="bento-card p-5 group/stat">
            <div className="bento-card-content flex flex-col justify-between h-full">
              <div className="w-10 h-10 rounded-2xl bg-crimson-600/20 text-crimson-400 flex items-center justify-center text-lg border border-crimson-500/40 mb-3 shadow-inner group-hover/stat:border-crimson-400 transition-colors">
                <IdCard className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-zinc-400">{t.statIdLabel}</div>
                <div className="text-xl font-mono font-extrabold text-white tracking-wider my-0.5">
                  68026233
                </div>
                <span className="text-[10px] text-crimson-400 font-mono">{t.statIdSub}</span>
              </div>
            </div>
          </div>

          {/* Card 2: GPAX */}
          <div className="bento-card p-5 group/stat border-gold-metallic/30">
            <div className="bento-card-content flex flex-col justify-between h-full">
              <div className="w-10 h-10 rounded-2xl bg-gold-metallic/20 text-gold-amber flex items-center justify-center text-lg border border-gold-metallic/50 mb-3 shadow-inner group-hover/stat:border-gold-metallic transition-colors">
                <Award className="w-5 h-5 text-gold-metallic" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-zinc-400">{t.statGpaxLabel}</div>
                <div className="text-2xl font-mono font-black text-gold-amber tracking-tight my-0.5 text-glow-gold">
                  3.67
                </div>
                <span className="text-[10px] text-gold-metallic font-medium block truncate">
                  {t.statGpaxSub}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: University */}
          <div className="bento-card p-5 group/stat">
            <div className="bento-card-content flex flex-col justify-between h-full">
              <div className="w-10 h-10 rounded-2xl bg-zinc-800 text-zinc-200 flex items-center justify-center text-lg border border-zinc-700 mb-3 shadow-inner group-hover/stat:border-crimson-500 transition-colors">
                <GraduationCap className="w-5 h-5 text-crimson-400" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-zinc-400">{t.statUniLabel}</div>
                <div className="text-base font-bold text-white tracking-tight my-0.5">
                  {t.statUniVal}
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">{t.statUniSub}</span>
              </div>
            </div>
          </div>

          {/* Card 4: Availability Status */}
          <div className="bento-card p-5 group/stat border-crimson-600/40">
            <div className="bento-card-content flex flex-col justify-between h-full">
              <div className="w-10 h-10 rounded-2xl bg-crimson-600/20 text-crimson-400 flex items-center justify-center text-lg border border-crimson-500/50 mb-3 shadow-inner group-hover/stat:border-crimson-400 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-crimson-400" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-zinc-400">{t.statStatusLabel}</div>
                <div className="text-sm font-bold text-crimson-400 tracking-tight my-0.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
                  {t.statStatusVal}
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">{t.statStatusSub}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
