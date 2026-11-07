export interface ProjectItem {
  id: string
  titleTh: string
  titleEn: string
  category: 'Full-Stack' | 'Frontend' | 'Backend' | string
  tags: string
  descriptionTh: string
  descriptionEn: string
  imageUrl?: string | null
  demoUrl?: string | null
  githubUrl?: string | null
  featured?: boolean
  createdAt?: string
}

export interface ExperienceItem {
  id: string
  roleTh: string
  roleEn: string
  companyTh: string
  companyEn: string
  tag: string
  duration: string
  bulletsTh: string
  bulletsEn: string
  skills: string
  createdAt?: string
}

export interface CertificationItem {
  id: string
  titleTh: string
  titleEn: string
  issuerTh: string
  issuerEn: string
  issueDate: string
  credentialId?: string | null
  pdfUrl?: string | null
  verifyUrl?: string | null
  createdAt?: string
}

export interface QuickNoteItem {
  id: string
  text: string
  priority?: string
  createdAt?: string
}

export interface SocialConfigItem {
  id: string
  logoLink: string
  igUrl: string
  igLabel: string
  fbUrl: string
  fbLabel: string
  lineUrl: string
  lineLabel: string
  githubUrl: string
  linkedinUrl: string
  phone: string
  email: string
}
