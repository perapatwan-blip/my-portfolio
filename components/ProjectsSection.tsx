'use client'

import React, { useState } from 'react'
import { translations, Lang } from '@/lib/translations'
import { ProjectItem } from '@/lib/types'
import {
  FolderGit2,
  Plus,
  ExternalLink,
  Github,
  Edit3,
  Trash2,
  Layers,
  Sparkles,
} from 'lucide-react'

interface ProjectsSectionProps {
  lang: Lang
  projects: ProjectItem[]
  onOpenAddProject: () => void
  onEditProject: (item: ProjectItem) => void
  onDeleteProject: (id: string) => void
  isAdmin: boolean
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  lang,
  projects,
  onOpenAddProject,
  onEditProject,
  onDeleteProject,
  isAdmin,
}) => {
  const t = translations[lang]
  const [activeFilter, setActiveFilter] = useState<'all' | 'Full-Stack' | 'Frontend' | 'Backend'>('all')

  const countAll = projects.length
  const countFullStack = projects.filter((p) => p.category === 'Full-Stack').length
  const countFrontend = projects.filter((p) => p.category === 'Frontend').length
  const countBackend = projects.filter((p) => p.category === 'Backend').length

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  const filterTabs = [
    { key: 'all', label: t.filterAll, count: countAll },
    { key: 'Full-Stack', label: 'Full-Stack', count: countFullStack },
    { key: 'Frontend', label: 'Frontend', count: countFrontend },
    { key: 'Backend', label: 'Backend', count: countBackend },
  ] as const

  return (
    <section id="projects" className="scroll-mt-32 space-y-6">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-crimson-600/20 text-crimson-400 flex items-center justify-center text-lg border border-crimson-500/40 shadow-glow-red">
            <FolderGit2 className="w-5 h-5 text-crimson-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              {t.projHeading}
            </h2>
            <p className="text-xs text-zinc-400 font-mono">{t.projSub}</p>
          </div>
        </div>

        {/* Admin "+ เพิ่มผลงานใหม่" */}
        <button
          onClick={onOpenAddProject}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-crimson-600 via-crimson-500 to-gold-amber text-white font-extrabold text-xs shadow-lg shadow-crimson-600/30 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer border border-gold-metallic/40"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>{t.btnAddProject}</span>
        </button>
      </div>

      {/* Filter Tabs with dynamic counts */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-crimson-600 text-white shadow-lg shadow-crimson-600/40 border border-gold-metallic/50'
                  : 'bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-md font-mono text-[10px] ${
                  isActive ? 'bg-black/40 text-gold-amber' : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-14 text-center bento-card p-6 border-zinc-800">
          <div className="bento-card-content space-y-2">
            <Layers className="w-8 h-8 text-zinc-600 mx-auto" />
            <p className="text-sm font-semibold text-zinc-400">{t.emptyProjects}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((item) => {
            const title = lang === 'TH' ? item.titleTh : item.titleEn
            const desc = lang === 'TH' ? item.descriptionTh : item.descriptionEn
            const tags = item.tags
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
            const img =
              item.imageUrl ||
              'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'

            return (
              <div
                key={item.id}
                className="bento-card rounded-3xl overflow-hidden flex flex-col group hover:border-crimson-500"
              >
                <div className="bento-card-content flex-1 flex flex-col justify-between p-5">
                  <div>
                    {/* Project Thumbnail Image with Category Tag */}
                    <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-zinc-950 mb-3.5 border border-zinc-800">
                      <img
                        src={img}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full text-[10px] font-bold font-mono bg-black/85 text-gold-amber border border-gold-metallic/40 backdrop-blur-md shadow-md">
                        {item.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-base text-white line-clamp-1 font-display group-hover:text-gold-amber transition-colors">
                      {title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-zinc-300 line-clamp-2 mt-1.5 leading-relaxed">
                      {desc}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3">
                      {tags.map((tg, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300"
                        >
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Demo, GitHub & CRUD Actions */}
                  <div className="pt-3.5 border-t border-zinc-800/80 mt-4 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      {item.demoUrl && (
                        <a
                          href={item.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-crimson-400 hover:text-crimson-300 flex items-center gap-1 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{t.viewDemo}</span>
                        </a>
                      )}
                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-zinc-300 hover:text-white flex items-center gap-1 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>{t.viewCode}</span>
                        </a>
                      )}
                    </div>

                    {/* Edit & Delete Buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEditProject(item)}
                        className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-gold-amber transition-colors cursor-pointer"
                        title={t.edit}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteProject(item.id)}
                        className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-crimson-400 transition-colors cursor-pointer"
                        title={t.delete}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
