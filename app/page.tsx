'use client'

import React, { useState, useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { AcademicSection } from '@/components/AcademicSection'
import { ContactNotesSection } from '@/components/ContactNotesSection'
import { ExperienceSection } from '@/components/ExperienceSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { CertificationsSection } from '@/components/CertificationsSection'
import { AdminModal } from '@/components/AdminModal'
import { ProjectModal } from '@/components/ProjectModal'
import { ExperienceModal } from '@/components/ExperienceModal'
import { CertificationModal } from '@/components/CertificationModal'
import { SocialModal } from '@/components/SocialModal'
import { PdfModal } from '@/components/PdfModal'
import { ToastContainer, ToastMessage } from '@/components/Toast'
import {
  ProjectItem,
  ExperienceItem,
  CertificationItem,
  QuickNoteItem,
  SocialConfigItem,
} from '@/lib/types'
import { translations, Lang } from '@/lib/translations'

const defaultSocial: SocialConfigItem = {
  id: 'default',
  logoLink: '#overview',
  igUrl: 'https://instagram.com/p.perapat_',
  igLabel: '@p.perapat_',
  fbUrl: 'https://www.facebook.com/anuwat.rungsin',
  fbLabel: 'Perapat Wanna',
  lineUrl: 'https://line.me/ti/p/~0631568992',
  lineLabel: '0631568992',
  githubUrl: 'https://github.com/perapat-w',
  linkedinUrl: 'https://linkedin.com/in/perapat-wanna',
  phone: '063-156-8992',
  email: 'perapat.wan@spu.ac.th',
}

export default function HomePage() {
  const [lang, setLang] = useState<Lang>('TH')
  const [isAdmin, setIsAdmin] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [social, setSocial] = useState<SocialConfigItem>(defaultSocial)
  const [notes, setNotes] = useState<QuickNoteItem[]>([])
  const [experiences, setExperiences] = useState<ExperienceItem[]>([])
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [certifications, setCertifications] = useState<CertificationItem[]>([])

  // Modal States
  const [adminModalOpen, setAdminModalOpen] = useState(false)
  const [socialModalOpen, setSocialModalOpen] = useState(false)
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [expModalOpen, setExpModalOpen] = useState(false)
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null)
  const [certModalOpen, setCertModalOpen] = useState(false)
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null)
  const [pdfModalOpen, setPdfModalOpen] = useState(false)
  const [pdfCert, setPdfCert] = useState<CertificationItem | null>(null)

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 5)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3800)
  }

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  // Initial Load
  useEffect(() => {
    // 1. Load language preference
    const savedLang = localStorage.getItem('perapat_lang') as Lang
    if (savedLang === 'TH' || savedLang === 'EN') {
      setLang(savedLang)
    }

    // 2. Load avatar
    const savedAvatar = localStorage.getItem('perapat_avatar')
    if (savedAvatar) {
      setAvatarUrl(savedAvatar)
    }

    // 3. Load admin session
    const adminActive = sessionStorage.getItem('perapat_admin')
    if (adminActive === 'true') {
      setIsAdmin(true)
    }

    // 4. Fetch data from API
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    try {
      const [projRes, expRes, certRes, noteRes, socRes] = await Promise.all([
        fetch('/api/projects').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/experiences').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/certifications').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/notes').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/socials').then((r) => r.json()).catch(() => ({ success: false })),
      ])

      if (projRes.success) setProjects(projRes.data)
      if (expRes.success) setExperiences(expRes.data)
      if (certRes.success) setCertifications(certRes.data)
      if (noteRes.success) setNotes(noteRes.data)
      if (socRes.success) setSocial(socRes.data)
    } catch (err) {
      console.error('Error fetching data:', err)
    }
  }

  // Language Toggle
  const toggleLanguage = () => {
    const nextLang: Lang = lang === 'TH' ? 'EN' : 'TH'
    setLang(nextLang)
    localStorage.setItem('perapat_lang', nextLang)
  }

  // Avatar Update
  const updateAvatar = (newUrl: string) => {
    setAvatarUrl(newUrl)
    try {
      localStorage.setItem('perapat_avatar', newUrl)
    } catch (e) {}
    addToast(translations[lang].msgAvatarSuccess, 'success')
  }

  // Admin Auth Handlers
  const handleAdminLogin = async (pin: string) => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      })
      const data = await res.json()
      if (data.success && data.authenticated) {
        setIsAdmin(true)
        sessionStorage.setItem('perapat_admin', 'true')
        addToast(translations[lang].msgLoginSuccess, 'success')
        return true
      }
      return false
    } catch (err) {
      return false
    }
  }

  const handleAdminLogout = () => {
    setIsAdmin(false)
    sessionStorage.removeItem('perapat_admin')
    addToast(translations[lang].msgLogout, 'info')
  }

  // --- CRUD: Quick Notes ---
  const handleAddNote = async (text: string) => {
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, priority: 'gold' }),
      })
      const data = await res.json()
      if (data.success) {
        setNotes((prev) => [data.data, ...prev])
        addToast(translations[lang].msgSaved, 'success')
      }
    } catch (err) {
      addToast('Failed to add note', 'error')
    }
  }

  const handleDeleteNote = async (id: string) => {
    try {
      const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setNotes((prev) => prev.filter((n) => n.id !== id))
        addToast(translations[lang].msgDeleted, 'info')
      }
    } catch (err) {
      addToast('Failed to delete note', 'error')
    }
  }

  // --- CRUD: Social Config ---
  const handleSaveSocial = async (updated: SocialConfigItem) => {
    try {
      const res = await fetch('/api/socials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      const data = await res.json()
      if (data.success) {
        setSocial(data.data)
        addToast(translations[lang].msgSaved, 'success')
      }
    } catch (err) {
      addToast('Failed to save social links', 'error')
    }
  }

  // --- CRUD: Projects ---
  const handleSaveProject = async (data: Partial<ProjectItem>) => {
    try {
      if (data.id) {
        // Update
        const res = await fetch(`/api/projects/${data.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        const resData = await res.json()
        if (resData.success) {
          setProjects((prev) => prev.map((p) => (p.id === data.id ? resData.data : p)))
          addToast(translations[lang].msgSaved, 'success')
        }
      } else {
        // Create
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        const resData = await res.json()
        if (resData.success) {
          setProjects((prev) => [resData.data, ...prev])
          addToast(translations[lang].msgSaved, 'success')
        }
      }
    } catch (err) {
      addToast('Failed to save project', 'error')
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm(lang === 'TH' ? 'คุณต้องการลบผลงานนี้ใช่หรือไม่?' : 'Delete this project?')) return
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id))
        addToast(translations[lang].msgDeleted, 'info')
      }
    } catch (err) {
      addToast('Failed to delete project', 'error')
    }
  }

  // --- CRUD: Experiences ---
  const handleSaveExperience = async (data: Partial<ExperienceItem>) => {
    try {
      if (data.id) {
        const res = await fetch(`/api/experiences/${data.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        const resData = await res.json()
        if (resData.success) {
          setExperiences((prev) => prev.map((e) => (e.id === data.id ? resData.data : e)))
          addToast(translations[lang].msgSaved, 'success')
        }
      } else {
        const res = await fetch('/api/experiences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        const resData = await res.json()
        if (resData.success) {
          setExperiences((prev) => [resData.data, ...prev])
          addToast(translations[lang].msgSaved, 'success')
        }
      }
    } catch (err) {
      addToast('Failed to save experience', 'error')
    }
  }

  const handleDeleteExperience = async (id: string) => {
    if (!confirm(lang === 'TH' ? 'คุณต้องการลบประสบการณ์นี้ใช่หรือไม่?' : 'Delete this experience?')) return
    try {
      const res = await fetch(`/api/experiences/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setExperiences((prev) => prev.filter((e) => e.id !== id))
        addToast(translations[lang].msgDeleted, 'info')
      }
    } catch (err) {
      addToast('Failed to delete experience', 'error')
    }
  }

  // --- CRUD: Certifications ---
  const handleSaveCertification = async (data: Partial<CertificationItem>) => {
    try {
      if (data.id) {
        const res = await fetch(`/api/certifications/${data.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        const resData = await res.json()
        if (resData.success) {
          setCertifications((prev) => prev.map((c) => (c.id === data.id ? resData.data : c)))
          addToast(translations[lang].msgSaved, 'success')
        }
      } else {
        const res = await fetch('/api/certifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        const resData = await res.json()
        if (resData.success) {
          setCertifications((prev) => [resData.data, ...prev])
          addToast(translations[lang].msgSaved, 'success')
        }
      }
    } catch (err) {
      addToast('Failed to save certification', 'error')
    }
  }

  const handleDeleteCertification = async (id: string) => {
    if (!confirm(lang === 'TH' ? 'คุณต้องการลบใบรับรองนี้ใช่หรือไม่?' : 'Delete this certificate?')) return
    try {
      const res = await fetch(`/api/certifications/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setCertifications((prev) => prev.filter((c) => c.id !== id))
        addToast(translations[lang].msgDeleted, 'info')
      }
    } catch (err) {
      addToast('Failed to delete certification', 'error')
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Floating Laser Neon Navigation */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        isAdmin={isAdmin}
        onOpenAdminModal={() => setAdminModalOpen(true)}
        onLogoutAdmin={handleAdminLogout}
      />

      {/* Main Bento Layout Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-20 relative z-10">
        {/* Section 1: Hero Overview */}
        <HeroSection
          lang={lang}
          social={social}
          avatarUrl={avatarUrl}
          onUpdateAvatar={updateAvatar}
        />

        {/* Section 2: Academic Profile */}
        <AcademicSection lang={lang} />

        {/* Section 3: Social Contacts & Quick Notes CRUD */}
        <ContactNotesSection
          lang={lang}
          social={social}
          notes={notes}
          onOpenSocialModal={() => setSocialModalOpen(true)}
          onAddNote={handleAddNote}
          onDeleteNote={handleDeleteNote}
          isAdmin={isAdmin}
        />

        {/* Section 4: Practical Experience CRUD */}
        <ExperienceSection
          lang={lang}
          experiences={experiences}
          onOpenAddExp={() => {
            setSelectedExp(null)
            setExpModalOpen(true)
          }}
          onEditExp={(item) => {
            setSelectedExp(item)
            setExpModalOpen(true)
          }}
          onDeleteExp={handleDeleteExperience}
          isAdmin={isAdmin}
        />

        {/* Section 5: Featured Projects CRUD */}
        <ProjectsSection
          lang={lang}
          projects={projects}
          onOpenAddProject={() => {
            setSelectedProject(null)
            setProjectModalOpen(true)
          }}
          onEditProject={(item) => {
            setSelectedProject(item)
            setProjectModalOpen(true)
          }}
          onDeleteProject={handleDeleteProject}
          isAdmin={isAdmin}
        />

        {/* Section 6: Certifications CRUD */}
        <CertificationsSection
          lang={lang}
          certifications={certifications}
          onOpenAddCert={() => {
            setSelectedCert(null)
            setCertModalOpen(true)
          }}
          onEditCert={(item) => {
            setSelectedCert(item)
            setCertModalOpen(true)
          }}
          onDeleteCert={handleDeleteCertification}
          onPreviewPdf={(item) => {
            setPdfCert(item)
            setPdfModalOpen(true)
          }}
          isAdmin={isAdmin}
        />

        {/* Futuristic Cyberpunk Footer */}
        <footer className="pt-12 border-t border-zinc-800 text-center text-xs text-zinc-400 space-y-2 font-mono">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="font-display font-bold text-white tracking-wide">
              PERAPAT WANNA (นาย พีรพัตน์ วันนา)
            </span>
            <span>•</span>
            <span className="text-crimson-400 font-semibold">ID: 68026233</span>
            <span>•</span>
            <span className="text-gold-amber font-semibold">GPAX: 3.67</span>
            <span>•</span>
            <span className="text-zinc-300">ICT Sripatum University (SPU 2026)</span>
          </div>
          <p className="text-[11px] text-zinc-500 pt-1">
            Engineered with Next.js 14 App Router, Prisma ORM, Tailwind CSS, Red/White/Gold Luxury Cyberpunk Architecture & 60FPS Conic Laser Engine
          </p>
        </footer>
      </main>

      {/* Modals */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        lang={lang}
        onLogin={handleAdminLogin}
      />

      <SocialModal
        isOpen={socialModalOpen}
        onClose={() => setSocialModalOpen(false)}
        lang={lang}
        initialData={social}
        onSave={handleSaveSocial}
      />

      <ProjectModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        lang={lang}
        initialData={selectedProject}
        onSave={handleSaveProject}
      />

      <ExperienceModal
        isOpen={expModalOpen}
        onClose={() => setExpModalOpen(false)}
        lang={lang}
        initialData={selectedExp}
        onSave={handleSaveExperience}
      />

      <CertificationModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        lang={lang}
        initialData={selectedCert}
        onSave={handleSaveCertification}
      />

      <PdfModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        lang={lang}
        cert={pdfCert}
      />

      {/* Floating Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
