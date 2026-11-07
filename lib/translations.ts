export type Lang = 'TH' | 'EN'

export const translations = {
  TH: {
    // Header & Nav
    navOverview: 'ภาพรวม',
    navEdu: 'การศึกษา',
    navExp: 'ประสบการณ์',
    navProjects: 'ผลงานสร้างสรรค์',
    navCert: 'ใบรับรอง',
    adminLogin: 'แก้ไขล็อกอิน',
    adminActive: 'ผู้ดูแลระบบ',
    adminLogout: 'ออกจากระบบ',
    statusActive: 'ACTIVE',
    subtitleHeader: 'ICT Undergraduate @ SPU',

    // Hero Section
    heroBadge: 'Next-Gen Full-Stack & ICT Innovator',
    heroName: 'นาย พีรพัตน์ วันนา',
    heroEnName: 'Perapat Wanna',
    heroSubTitle: 'รหัสนักศึกษา 68026233 • สาขาสารสนเทศ ICT ชั้นปีที่ 2 (ปีการศึกษา 2026) • ม.ศรีปทุม (SPU)',
    heroBio: 'นักศึกษาสาขาสารสนเทศที่มีไฟแรงในการสร้างสรรค์ Modern Web Architecture ครอบคลุมทั้งฝั่ง Frontend ที่ลื่นไหลสวยงาม และ Backend ที่เสถียร รองรับระบบ Cloud Computing, RESTful API และการจัดการฐานข้อมูลอย่างมีประสิทธิภาพ พร้อมเปิดรับโอกาสในการฝึกงานเพื่อสร้างสรรค์คุณค่าแก่ทีม',
    gpaxBadge: 'GPAX 3.67',
    btnViewWork: 'ชมผลงานเด่น',
    btnContact: 'ติดต่อสอบถาม',
    changeAvatar: 'เปลี่ยนรูปถ่าย',

    // Stat Cards
    statIdLabel: 'รหัสนักศึกษา',
    statIdSub: 'ICT Student ID',
    statGpaxLabel: 'ผลการเรียนเฉลี่ย',
    statGpaxSub: 'เกียรตินิยม / High Academic Standing',
    statUniLabel: 'สถาบันการศึกษา',
    statUniVal: 'SPU ศรีปทุม',
    statUniSub: 'SPU Bangkok 2026',
    statStatusLabel: 'สถานะความพร้อม',
    statStatusVal: 'พร้อมรับงานทันที',
    statStatusSub: 'Available Status 2026',

    // Academic Profile
    eduHeading: 'ประวัติการศึกษา (Academic Profile)',
    eduSub: 'เส้นทางและหลักสูตรการศึกษาในปัจจุบัน',
    eduStatus: 'กำลังศึกษาชั้นปีที่ 2 • ปีการศึกษาปัจจุบัน 2026',
    eduMajor: 'สาขาสารสนเทศ (ICT - Information and Communication Technology)',
    eduInstitute: 'คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม (SPU กรุงเทพฯ)',
    eduGpaxLabel: 'เกรดเฉลี่ยสะสมปัจจุบัน (GPAX):',
    eduHonors: 'เกียรตินิยม / High Academic Standing',
    eduCurriculumDesc: 'มุ่งเน้นการพัฒนาระบบซอฟต์แวร์ประยุกต์สมัยใหม่, สถาปัตยกรรมเว็บแบบ Full-Stack, การบริหารจัดการฐานข้อมูลขั้นสูง, การประมวลผลบนคลาวด์ (Cloud Computing) และระบบความมั่นคงปลอดภัยสารสนเทศ',
    coreFocusTitle: 'ทักษะ & วิชาเอกที่โดดเด่น',

    // Contact & Notes
    contactHeading: 'ช่องทางการติดต่อ & สมุดบันทึก',
    contactSub: 'ข้อมูลการติดต่อส่วนตัว ลิงก์โซเชียลมีเดีย และสมุดบันทึกเป้าหมาย (CRUD)',
    contactBoxTitle: 'ติดต่อ perapat',
    editSocialBtn: 'แก้ไขลิงก์',
    notesHeading: 'สมุดบันทึกเป้าหมาย & ไฮไลต์ (Quick Notes CRUD)',
    notesPlaceholder: 'เพิ่มบันทึกเป้าหมายใหม่...',
    btnAddNote: 'บันทึก',
    emptyNotes: 'ยังไม่มีบันทึกเป้าหมาย สามารถเพิ่มใหม่ได้ที่ช่องด้านล่าง',

    // Experience
    expHeading: 'ประสบการณ์ทำงาน (Practical Experience)',
    expSub: 'จัดการและบันทึกประวัติประสบการณ์ทำงาน (Dynamic CRUD)',
    btnAddExp: '➕ เพิ่มประสบการณ์ใหม่',
    emptyExp: 'ยังไม่มีข้อมูลประสบการณ์ทำงาน สามารถกดปุ่มเพิ่มประสบการณ์ใหม่ด้านบนได้ครับ',

    // Projects
    projHeading: 'ผลงานสร้างสรรค์ (Featured Projects)',
    projSub: 'คัดกรองตามหมวดหมู่สายงาน พร้อมระบบจัดการข้อมูล Dynamic CRUD ครบวงจร',
    btnAddProject: '➕ เพิ่มผลงานใหม่',
    filterAll: 'ทั้งหมด',
    emptyProjects: 'ไม่มีผลงานในหมวดหมู่นี้ สามารถกดปุ่มเพิ่มผลงานใหม่ได้เลยครับ',
    viewDemo: 'Demo',
    viewCode: 'GitHub',

    // Certifications
    certHeading: 'การฝึกอบรม & วุฒิบัตร (Certifications)',
    certSub: 'ประกาศนียบัตรรับรองความสามารถ พร้อมระบบเปิดดูและแนบเอกสาร PDF',
    btnAddCert: '➕ เพิ่มใบรับรองใหม่',
    emptyCerts: 'ยังไม่มีข้อมูลใบรับรอง สามารถกดปุ่มเพิ่มใบรับรองใหม่ด้านบนได้ครับ',
    previewPdf: 'พรีวิวใบรับรอง',
    verifyCert: 'ตรวจสอบสถานะ',

    // Actions & Form Modals
    edit: 'แก้ไข',
    delete: 'ลบ',
    cancel: 'ยกเลิก',
    save: 'บันทึกข้อมูล',
    saveChanges: 'บันทึกการเปลี่ยนแปลง',
    uploadPhoto: 'เลือกรูป',
    attachPdf: 'แนบไฟล์ PDF',
    close: 'ปิด',

    // Toast Messages
    msgSaved: 'บันทึกข้อมูลเรียบร้อยแล้ว!',
    msgDeleted: 'ลบรายการเรียบร้อยแล้ว!',
    msgLoginSuccess: 'เข้าสู่ระบบผู้ดูแลเรียบร้อยแล้ว!',
    msgLogout: 'ออกจากระบบเรียบร้อยแล้ว',
    msgAvatarSuccess: 'อัปเดตรูปถ่ายโปรไฟล์เรียบร้อยแล้ว!',
  },
  EN: {
    // Header & Nav
    navOverview: 'Overview',
    navEdu: 'Education',
    navExp: 'Experience',
    navProjects: 'Projects',
    navCert: 'Certifications',
    adminLogin: 'Admin Login',
    adminActive: 'ADMIN MODE',
    adminLogout: 'Logout',
    statusActive: 'ACTIVE',
    subtitleHeader: 'ICT Undergraduate @ SPU',

    // Hero Section
    heroBadge: 'Next-Gen Full-Stack & ICT Innovator',
    heroName: 'Perapat Wanna',
    heroEnName: 'Mr. Perapat Wanna',
    heroSubTitle: 'Student ID: 68026233 • 2nd Year ICT (Academic Year 2026) • Sripatum University (SPU)',
    heroBio: 'Passionate and forward-thinking ICT sophomore dedicated to crafting modern web architectures. Proficient across sleek, responsive frontend engineering and high-stability backends, supporting Cloud Computing, RESTful APIs, and scalable database systems. Actively seeking internship opportunities to deliver exceptional value to development teams.',
    gpaxBadge: 'GPAX 3.67',
    btnViewWork: 'Explore Works',
    btnContact: 'Contact Info',
    changeAvatar: 'Change Photo',

    // Stat Cards
    statIdLabel: 'Student ID',
    statIdSub: 'ICT Student ID',
    statGpaxLabel: 'Cumulative GPAX',
    statGpaxSub: 'High Academic Standing',
    statUniLabel: 'Institution',
    statUniVal: 'SPU Sripatum',
    statUniSub: 'SPU Bangkok 2026',
    statStatusLabel: 'Availability',
    statStatusVal: 'Available Now',
    statStatusSub: 'Internship Season 2026',

    // Academic Profile
    eduHeading: 'Academic Profile',
    eduSub: 'Current degree curriculum, specialization, and academic standing',
    eduStatus: 'Currently in 2nd Year • Academic Year 2026',
    eduMajor: 'Information and Communication Technology (ICT)',
    eduInstitute: 'School of Information Technology, Sripatum University (SPU Bangkok)',
    eduGpaxLabel: 'Current Cumulative GPAX:',
    eduHonors: 'High Academic Standing (เกียรตินิยม)',
    eduCurriculumDesc: 'Specializing in next-gen software systems, full-stack web engineering, database architecture, cloud infrastructure, and cybersecurity operations.',
    coreFocusTitle: 'Key Focus Areas & Coursework',

    // Contact & Notes
    contactHeading: 'Direct Contact & Quick Notes',
    contactSub: 'Verified social channels, phone links, and goal sticky notes (CRUD)',
    contactBoxTitle: 'contact perapat',
    editSocialBtn: 'Edit Links',
    notesHeading: 'Target Notes & Highlights (Quick Notes CRUD)',
    notesPlaceholder: 'Add a new target note or highlight...',
    btnAddNote: 'Add Note',
    emptyNotes: 'No notes yet. Add your first note using the form below.',

    // Experience
    expHeading: 'Practical Experience',
    expSub: 'Dynamic recording and management of practical industry experience (CRUD)',
    btnAddExp: '➕ Add Experience',
    emptyExp: 'No experience entries recorded yet. Click the button above to add one.',

    // Projects
    projHeading: 'Featured Projects',
    projSub: 'Domain-filtered creative portfolio with live dynamic CRUD operations',
    btnAddProject: '➕ Add Project',
    filterAll: 'All',
    emptyProjects: 'No projects found in this category. Click the button above to create one.',
    viewDemo: 'Live Demo',
    viewCode: 'GitHub',

    // Certifications
    certHeading: 'Certifications & Honors',
    certSub: 'Verified professional certifications with document preview and PDF support',
    btnAddCert: '➕ Add Certificate',
    emptyCerts: 'No certifications registered yet. Click the button above to add one.',
    previewPdf: 'Preview Cert',
    verifyCert: 'Verify Link',

    // Actions & Form Modals
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    saveChanges: 'Save Changes',
    uploadPhoto: 'Upload Photo',
    attachPdf: 'Attach PDF',
    close: 'Close',

    // Toast Messages
    msgSaved: 'Saved successfully!',
    msgDeleted: 'Deleted successfully!',
    msgLoginSuccess: 'Admin authenticated successfully!',
    msgLogout: 'Logged out successfully',
    msgAvatarSuccess: 'Profile photo updated successfully!',
  }
}
