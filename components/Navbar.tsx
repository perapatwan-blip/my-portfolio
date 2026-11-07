'use client'

import React, { useState } from 'react'
import { translations, Lang } from '@/lib/translations'
import { ShieldCheck, ShieldAlert, Globe, Menu, X, Terminal } from 'lucide-react'

interface NavbarProps {
  lang: Lang
  onToggleLang: () => void
  isAdmin: boolean
  onOpenAdminModal: () => void
  onLogoutAdmin: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  isAdmin,
  onOpenAdminModal,
  onLogoutAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = translations[lang]

  const navLinks = [
    { href: '#overview', label: t.navOverview },
    { href: '#education', label: t.navEdu },
    { href: '#experience', label: t.navExp },
    { href: '#projects', label: t.navProjects },
    { href: '#certifications', label: t.navCert },
  ]

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <div className="floating-nav max-w-6xl w-full px-4 sm:px-6 py-3 flex items-center justify-between border border-crimson-600/40 shadow-glow-red">
        {/* Brand Logo & Header Badge */}
        <a
          href="#overview"
          className="flex items-center gap-3 group z-10 select-none transition-transform hover:scale-[1.02]"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-crimson-700 via-crimson-500 to-gold-500 flex items-center justify-center text-white font-display font-extrabold shadow-lg shadow-crimson-600/40 group-hover:shadow-crimson-500/70 border border-gold-metallic/40">
            PW
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-sm tracking-wider text-white">
                PERAPAT.W
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-crimson-600 text-white flex items-center gap-1 shadow-md shadow-crimson-600/60 border border-gold-metallic/30">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
                {t.statusActive}
              </span>
            </div>
            <p className="text-[11px] text-zinc-300 font-mono tracking-tight">
              {t.subtitleHeader}
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-zinc-300 z-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-crimson-600/20 border border-transparent hover:border-crimson-600/40 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Top Control Bar: Admin Login & Language Switcher */}
        <div className="flex items-center gap-2.5 z-10">
          {/* Admin Toggle / Status */}
          {isAdmin ? (
            <div className="flex items-center gap-1">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gold-metallic/20 text-gold-amber border border-gold-metallic/50 shadow-sm shadow-gold-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-metallic" />
                {t.adminActive}
              </span>
              <button
                onClick={onLogoutAdmin}
                className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-crimson-900/60 hover:bg-crimson-800 text-zinc-200 border border-crimson-600/40 transition-all cursor-pointer"
                title={t.adminLogout}
              >
                {t.adminLogout}
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdminModal}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-crimson-950/80 hover:bg-crimson-900/90 text-zinc-200 border border-crimson-600/40 hover:border-crimson-500 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              title="แก้ไขล็อกอิน (Admin Mode)"
            >
              <Terminal className="w-3.5 h-3.5 text-crimson-400" />
              <span className="hidden sm:inline">{t.adminLogin}</span>
            </button>
          )}

          {/* TH / EN Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-gold-metallic/40 hover:border-gold-metallic transition-all cursor-pointer shadow-sm"
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-gold-metallic" />
            <span className={lang === 'TH' ? 'text-gold-amber font-extrabold' : 'text-zinc-400 font-normal'}>
              TH
            </span>
            <span className="text-zinc-500">/</span>
            <span className={lang === 'EN' ? 'text-gold-amber font-extrabold' : 'text-zinc-400 font-normal'}>
              EN
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-zinc-900 border border-crimson-600/40 text-zinc-200 hover:text-white cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-crimson-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 inset-x-4 max-w-6xl mx-auto floating-nav rounded-2xl p-5 space-y-2 text-sm font-medium shadow-2xl z-50 border border-crimson-600/50">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl hover:bg-crimson-600/20 text-zinc-200 hover:text-white transition-all"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                if (isAdmin) onLogoutAdmin()
                else onOpenAdminModal()
              }}
              className="text-crimson-400 font-semibold"
            >
              {isAdmin ? t.adminLogout : t.adminLogin}
            </button>
            <span className="font-mono text-zinc-400">PERAPAT.W 2026</span>
          </div>
        </div>
      )}
    </header>
  )
}
