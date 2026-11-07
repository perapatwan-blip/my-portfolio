const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding portfolio database...')

  // Clear existing data
  await prisma.project.deleteMany({})
  await prisma.experience.deleteMany({})
  await prisma.certification.deleteMany({})
  await prisma.quickNote.deleteMany({})
  await prisma.socialConfig.deleteMany({})

  // 1. Social Config
  await prisma.socialConfig.create({
    data: {
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
  })

  // 2. Quick Notes
  await prisma.quickNote.createMany({
    data: [
      { text: 'กำลังพัฒนา Cyberpunk Bento Architecture สำหรับ Portfolio 2026', priority: 'gold' },
      { text: 'ศึกษา Next.js 14 App Router, Server Actions & Edge Middleware', priority: 'high' },
      { text: 'เตรียมตัวเปิดรับโอกาสฝึกงาน Full-Stack Web Development 2026', priority: 'normal' },
    ]
  })

  // 3. Experiences
  await prisma.experience.createMany({
    data: [
      {
        roleTh: 'Full-Stack Web Developer (Academic & Freelance)',
        roleEn: 'Full-Stack Web Developer (Academic & Freelance)',
        companyTh: 'SPU ICT Innovator & Freelance Projects',
        companyEn: 'SPU ICT Innovator & Freelance Projects',
        tag: 'Academic & Freelance 2026',
        duration: '2024 - ปัจจุบัน (Present)',
        bulletsTh: 'ออกแบบและพัฒนาระบบ Web Application แบบ Responsive ด้วย Next.js และ Tailwind CSS\nเชื่อมต่อ RESTful API และจัดการฐานข้อมูลแบบ Relational และ Document-based\nดูแลประสิทธิภาพการโหลดหน้าเว็บ และการออกแบบ Cyberpunk Bento Grid Design System',
        bulletsEn: 'Designed and developed responsive web applications with Next.js and Tailwind CSS\nEngineered robust RESTful APIs and managed relational & document database schemas\nOptimized web performance and designed high-end Cyberpunk Bento Grid architecture',
        skills: 'Next.js, React, TypeScript, Prisma, PostgreSQL, Tailwind CSS, Docker'
      },
      {
        roleTh: 'ICT Systems & Cloud Architecture Trainee',
        roleEn: 'ICT Systems & Cloud Architecture Trainee',
        companyTh: 'คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม',
        companyEn: 'School of Information Technology, Sripatum University',
        tag: 'University Hands-On Labs',
        duration: '2025 - 2026',
        bulletsTh: 'ศึกษาการจัดการเครือข่ายสารสนเทศ การรักษาความปลอดภัย และระบบ Virtualization\nทดลอง Deploy ระบบซอฟต์แวร์บน Docker Container และ Cloud Platforms\nร่วมพัฒนาโครงงานพัฒนาระบบบริการนักศึกษาและการประมวลผลข้อมูล',
        bulletsEn: 'Studied IT networking, cybersecurity best practices, and virtualization\nDeployed containerized web services via Docker and cloud deployment platforms\nContributed to student system service projects and data pipeline architectures',
        skills: 'Docker, Linux, Cloudflare, Network Security, Python, Git'
      }
    ]
  })

  // 4. Projects
  await prisma.project.createMany({
    data: [
      {
        titleTh: 'Cyberpunk Bento Portfolio & CMS Engine',
        titleEn: 'Cyberpunk Bento Portfolio & CMS Engine',
        category: 'Full-Stack',
        tags: 'Next.js, Prisma, Tailwind CSS, SQLite, Framer Motion',
        descriptionTh: 'ระบบพอร์ตโฟลิโอสไตล์ Cyberpunk Bento-Grid ระดับพรีเมียม โทนสีแดง ขาว ทอง พร้อมระบบจัดการ Dynamic CRUD ครบวงจร ทั้งผลงาน ประสบการณ์ ใบรับรอง และสมุดบันทึก',
        descriptionEn: 'Premium luxury Cyberpunk Bento-Grid portfolio with dynamic CRUD engine for projects, practical experience, certifications, and target sticky notes.',
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
        demoUrl: '#overview',
        githubUrl: 'https://github.com/perapat-w/cyberpunk-portfolio',
        featured: true
      },
      {
        titleTh: 'SPU Smart Student Portal & Analytics Hub',
        titleEn: 'SPU Smart Student Portal & Analytics Hub',
        category: 'Full-Stack',
        tags: 'React, Node.js, Express, PostgreSQL, Chart.js',
        descriptionTh: 'แดชบอร์ดติดตามผลการเรียนและกิจกรรมนักศึกษา ICT พร้อมการแจ้งเตือนแบบเรียลไทม์ และระบบสถิติ GPAX วิเคราะห์แนวโน้มผลการศึกษา',
        descriptionEn: 'Academic dashboard and student portal tracking grades, activity credits, and predictive academic standing analytics.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        demoUrl: 'https://github.com/perapat-w',
        githubUrl: 'https://github.com/perapat-w',
        featured: true
      },
      {
        titleTh: 'Futuristic UI Component Library (Red & Gold Edition)',
        titleEn: 'Futuristic UI Component Library (Red & Gold Edition)',
        category: 'Frontend',
        tags: 'TypeScript, Tailwind CSS, Framer Motion, Radix UI',
        descriptionTh: 'ชุด UI คอมโพเนนต์ไซเบอร์พังค์หรูหรา รองรับเอฟเฟกต์ Laser Glowing Border, Hardware-Accelerated 60FPS และ Responsive Bento Layout',
        descriptionEn: 'High-performance luxury cyberpunk UI library featuring conic laser rotating borders, gold ambient reflections, and smooth 60fps animations.',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        demoUrl: 'https://github.com/perapat-w',
        githubUrl: 'https://github.com/perapat-w',
        featured: true
      },
      {
        titleTh: 'High-Throughput RESTful Microservice API',
        titleEn: 'High-Throughput RESTful Microservice API',
        category: 'Backend',
        tags: 'Node.js, Express, Docker, Redis, Prisma, JWT',
        descriptionTh: 'Backend API รองรับการยืนยันตัวตน JWT, Rate Limiting, ระบบแคช Redis และการเชื่อมต่อฐานข้อมูลความเร็วสูง',
        descriptionEn: 'Scalable backend API service with robust JWT authentication, rate limiting, Redis caching layers, and Prisma ORM integration.',
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        demoUrl: 'https://github.com/perapat-w',
        githubUrl: 'https://github.com/perapat-w',
        featured: true
      }
    ]
  })

  // 5. Certifications
  await prisma.certification.createMany({
    data: [
      {
        titleTh: 'Google Cloud Computing Foundations Certificate',
        titleEn: 'Google Cloud Computing Foundations Certificate',
        issuerTh: 'Google Cloud & Coursera',
        issuerEn: 'Google Cloud & Coursera',
        issueDate: '2025',
        credentialId: 'GCCF-982410-SPU',
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        verifyUrl: 'https://coursera.org/verify'
      },
      {
        titleTh: 'Full-Stack Modern Web Engineering Masterclass',
        titleEn: 'Full-Stack Modern Web Engineering Masterclass',
        issuerTh: 'Sripatum University ICT Excellence',
        issuerEn: 'Sripatum University ICT Excellence',
        issueDate: '2025',
        credentialId: 'SPU-ICT-FS2025',
        pdfUrl: '',
        verifyUrl: 'https://www.spu.ac.th'
      },
      {
        titleTh: 'Advanced Database Architecture & SQL Optimization',
        titleEn: 'Advanced Database Architecture & SQL Optimization',
        issuerTh: 'Information Technology Faculty SPU',
        issuerEn: 'Information Technology Faculty SPU',
        issueDate: '2026',
        credentialId: 'ICT-DBA-68026233',
        pdfUrl: '',
        verifyUrl: 'https://www.spu.ac.th'
      }
    ]
  })

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
