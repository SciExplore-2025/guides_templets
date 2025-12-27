
import React, { useState, useEffect } from 'react';

// --- Constants & Types ---
const PRIMARY_ORANGE = '#FCB42D';
const DARK_ORANGE = '#E17A41';
const NEUTRAL_GRAY = '#333333';
const LIGHT_GRAY = '#f3f4f6';

interface Section {
  id: string;
  title: string;
}

const SECTIONS: Section[] = [
  { id: 'intro', title: 'رشته علوم اجتماعی چیست؟' },
  { id: 'research-bg', title: 'پیشینه پژوهش علوم اجتماعی' },
  { id: 'abstract-db', title: 'پایگاه‌های چکیده‌نامه‌ای' },
  { id: 'fulltext-db', title: 'پایگاه‌های تخصصی تمام متن' },
  { id: 'publishers', title: 'ناشران معتبر بین‌المللی' },
  { id: 'comprehensive', title: 'پایگاه‌های جامع کاربردی' }
];

const SUBFIELDS = [
  { name: 'جامعه‌شناسی و مطالعات اجتماعی', icon: 'fa-users' },
  { name: 'علوم سیاسی و روابط بین‌الملل', icon: 'fa-landmark' },
  { name: 'اقتصاد، توسعه و سیاست‌گذاری عمومی', icon: 'fa-chart-line' },
  { name: 'مطالعات خانواده، جنسیت و جمعیت‌شناسی', icon: 'fa-house-user' },
  { name: 'انسان‌شناسی و مطالعات فرهنگی', icon: 'fa-globe-asia' },
  { name: 'ارتباطات، رسانه‌ها و افکار عمومی', icon: 'fa-bullhorn' },
  { name: 'حقوق، جرم‌شناسی و عدالت اجتماعی', icon: 'fa-balance-scale' },
  { name: 'مطالعات شهری، برنامه‌ریزی و رفاه اجتماعی', icon: 'fa-city' },
  { name: 'مطالعات اقلیت‌ها، نژاد و مهاجرت', icon: 'fa-people-arrows' },
  { name: 'مطالعات اعتیاد، سلامت اجتماعی و سیاست‌های اجتماعی', icon: 'fa-heartbeat' }
];

// --- Helper Components ---

const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = DARK_ORANGE }) => (
  <span 
    className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mr-2"
    style={{ backgroundColor: color }}
  >
    {children}
  </span>
);

const SectionTitle: React.FC<{ icon: string; title: string }> = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-6 border-b-2 pb-3" style={{ borderBottomColor: `${PRIMARY_ORANGE}33` }}>
    <i className={`fas ${icon} text-2xl`} style={{ color: PRIMARY_ORANGE }}></i>
    <h2 className="text-2xl font-extrabold" style={{ color: NEUTRAL_GRAY }}>{title}</h2>
  </div>
);

const ActionButton: React.FC<{ href: string; label: string; icon: string; primary?: boolean }> = ({ href, label, icon, primary }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 font-bold text-sm flex-1 min-w-[160px] ${
      primary ? 'text-white' : 'border'
    }`}
    style={{
      backgroundColor: primary ? DARK_ORANGE : 'transparent',
      borderColor: primary ? 'transparent' : '#ddd',
      color: primary ? 'white' : NEUTRAL_GRAY,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      if (primary) e.currentTarget.style.boxShadow = `0 10px 20px ${DARK_ORANGE}44`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <i className={`fas ${icon}`}></i>
    {label}
  </a>
);

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-right">
      
      {/* Header Section */}
      <header 
        className="relative overflow-hidden rounded-3xl p-8 md:p-12 mb-10 shadow-2xl text-white"
        style={{ background: `linear-gradient(135deg, ${NEUTRAL_GRAY}, #4a4a4a)` }}
      >
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-black mb-4 flex items-center gap-4">
            <i className="fas fa-microscope" style={{ color: PRIMARY_ORANGE }}></i>
            پایگاه‌ها و منابع اطلاعاتی علوم اجتماعی
          </h1>
          <p className="text-lg opacity-90 mb-8 max-w-3xl">
            مرجع جامع دسترسی به پایگاه‌های علمی، ناشران معتبر و منابع پژوهشی در حوزه علوم اجتماعی
          </p>
          
          <div className="flex flex-wrap gap-6 text-sm border-t border-white/20 pt-6">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <i className="fas fa-user-edit text-orange-400"></i>
              یابش ادمین
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <i className="fas fa-calendar-alt text-orange-400"></i>
              ۱۴۰۴-۱۰-۰۶
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full font-bold">
              <i className="fas fa-eye text-orange-400"></i>
              بازدید ۲۰
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0 0 L100 0 L100 100 Z" fill="white" />
          </svg>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="bg-white rounded-3xl p-8 mb-10 shadow-lg border-r-8" style={{ borderRightColor: PRIMARY_ORANGE }}>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <i className="fas fa-list-ul" style={{ color: PRIMARY_ORANGE }}></i>
          آنچه در این مقاله می‌خوانید:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`text-right p-4 rounded-2xl transition-all duration-300 border-r-4 flex items-center gap-3 ${
                activeSection === section.id 
                ? 'bg-orange-50 font-bold' 
                : 'bg-gray-50 hover:bg-gray-100'
              }`}
              style={{ borderRightColor: activeSection === section.id ? PRIMARY_ORANGE : 'transparent' }}
            >
              <span 
                className="w-8 h-8 flex items-center justify-center rounded-full text-white text-xs shrink-0"
                style={{ backgroundColor: activeSection === section.id ? DARK_ORANGE : '#ccc' }}
              >
                {idx + 1}
              </span>
              <span className="text-sm" style={{ color: activeSection === section.id ? NEUTRAL_GRAY : '#666' }}>
                {section.title}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Sections */}
      <div className="space-y-12">
        
        {/* Intro Section */}
        <section id="intro" className="custom-scroll-mt bg-white rounded-3xl p-8 shadow-md border-r-8" style={{ borderRightColor: PRIMARY_ORANGE }}>
          <SectionTitle icon="fa-graduation-cap" title="رشته علوم اجتماعی چیست؟" />
          <div className="prose prose-lg max-w-none text-gray-700 leading-loose space-y-4">
            <p>
              <strong className="px-2 py-1 rounded" style={{ backgroundColor: `${PRIMARY_ORANGE}22`, color: NEUTRAL_GRAY }}>علوم اجتماعی</strong> مجموعه‌ای از رشته‌های علمی است که به مطالعه نظام‌مند رفتار انسان، روابط اجتماعی، نهادها، ساختارها و فرایندهای اجتماعی در سطوح فردی، گروهی و کلان می‌پردازد. هدف اصلی این رشته، فهم، تبیین و تحلیل پدیده‌های اجتماعی مانند فرهنگ، قدرت، نابرابری، هویت، تغییرات اجتماعی و تعاملات انسانی است.
            </p>
            <p>
              علوم اجتماعی با بهره‌گیری از نظریه‌ها و روش‌های پژوهشی متنوع (کمی، کیفی و ترکیبی)، تلاش می‌کند الگوها و قوانین حاکم بر زندگی اجتماعی را شناسایی کرده و راهکارهایی برای حل مسائل و چالش‌های اجتماعی ارائه دهد. این رشته نقش مهمی در سیاست‌گذاری عمومی، برنامه‌ریزی اجتماعی و توسعه پایدار ایفا می‌کند.
            </p>
            
            <p className="mt-6 font-bold text-gray-800">زیرشاخه‌ها و گرایش‌های تخصصی:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {SUBFIELDS.map((field, i) => (
                <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border-r-4 border-transparent hover:border-orange-400 hover:bg-orange-50 transition-all duration-200">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl text-white shrink-0" style={{ background: `linear-gradient(135deg, ${PRIMARY_ORANGE}, ${DARK_ORANGE})` }}>
                    <i className={`fas ${field.icon}`}></i>
                  </div>
                  <span className="font-semibold text-sm" style={{ color: NEUTRAL_GRAY }}>{field.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Background Section */}
        <section id="research-bg" className="custom-scroll-mt bg-white rounded-3xl p-8 shadow-md border-r-8" style={{ borderRightColor: PRIMARY_ORANGE }}>
          <SectionTitle icon="fa-search-plus" title="برای پیشینه پژوهش حوزه علوم اجتماعی از چه پایگاه‌هایی استفاده کنم؟" />
          <p className="text-gray-700 leading-loose mb-6">
            در حوزه پژوهش و مطالعات رشته علوم اجتماعی، دسترسی به منابع اطلاعاتی معتبر و پایگاه‌های علمی نقش اساسی در ارتقای کیفیت تحقیقات و به‌ویژه پیشینه‌یابی پژوهش دارد. پایگاه‌های استنادی و اطلاعاتی به پژوهشگران کمک می‌کنند تا موارد زیر را شناسایی کنند:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { text: 'شناسایی پیشینه موضوع', icon: 'fa-history' },
              { text: 'کشف چارچوب‌های نظری', icon: 'fa-vector-square' },
              { text: 'تحلیل روندهای پژوهشی', icon: 'fa-chart-area' },
              { text: 'شناسایی خلأهای تحقیقاتی', icon: 'fa-puzzle-piece' }
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <i className={`fas ${item.icon}`} style={{ color: DARK_ORANGE }}></i>
                <span className="font-medium text-sm">{item.text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Abstract Databases */}
        <section id="abstract-db" className="custom-scroll-mt bg-white rounded-3xl p-8 shadow-md border-r-8" style={{ borderRightColor: PRIMARY_ORANGE }}>
          <SectionTitle icon="fa-database" title="پایگاه‌های چکیده‌نامه‌ای برای علوم اجتماعی" />
          <div className="space-y-6">
            <p className="text-gray-700 leading-loose">
              در سطح بین‌المللی، پایگاه‌های <span className="font-bold">Scopus</span> و <span className="font-bold">Web of Science</span> به‌عنوان معتبرترین چکیده‌نامه‌های استنادی جهان شناخته می‌شوند. این پایگاه‌ها علاوه بر نمایه‌سازی مجلات، ابزارهای تحلیلی مهمی برای ارزیابی تأثیر علمی آثار فراهم می‌کنند.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://yabesh.ir/3680/" target="_blank" className="bg-gray-100 px-4 py-2 rounded-lg text-sm hover:bg-orange-100 transition-colors">
                Scopus - اسکوپوس <Badge>رده اول</Badge>
              </a>
              <a href="https://yabesh.ir/3687" target="_blank" className="bg-gray-100 px-4 py-2 rounded-lg text-sm hover:bg-orange-100 transition-colors">
                Web of Science <Badge>رده دوم</Badge>
              </a>
              <a href="https://yabesh.ir/22998" target="_blank" className="bg-gray-100 px-4 py-2 rounded-lg text-sm hover:bg-orange-100 transition-colors">
                پایگاه‌های رایگان
              </a>
            </div>
            <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-xl border-right-4 border-gray-300">
              * پایگاه‌های چکیده‌نامه‌ای تخصصی هم از طریق شرکت‌های ابسکو و پروکوئست منتشر شده است.
            </p>
          </div>
        </section>

        {/* Full-text Databases */}
        <section id="fulltext-db" className="custom-scroll-mt bg-white rounded-3xl p-8 shadow-md border-r-8" style={{ borderRightColor: PRIMARY_ORANGE }}>
          <SectionTitle icon="fa-file-alt" title="پایگاه‌های تخصصی تمام متن برای علوم اجتماعی" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-700">
              <p>
                برای انجام پژوهش‌های تخصصی‌تر، استفاده از پلتفرم‌های موضوعی ضرورت دارد. پلتفرم‌های <span className="font-bold">EBSCO</span> و <span className="font-bold">ProQuest</span> از مهم‌ترین منابع تمام‌متن شامل مقالات، کتاب‌ها و پایان‌نامه‌ها هستند.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <i className="fas fa-bookmark text-orange-500"></i>
                  Social Science Database Full Text (ProQuest)
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-bookmark text-orange-500"></i>
                  Social Sciences Full Text (EBSCO)
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <ActionButton 
                href="https://yabesh.ir/product/proquest-central-account/" 
                label="اکانت پروکوئست سنترال" 
                icon="fa-id-card" 
                primary 
              />
              <ActionButton 
                href="https://yabesh.ir/request/" 
                label="درخواست اکانت ابسکو" 
                icon="fa-paper-plane" 
              />
            </div>
          </div>
        </section>

        {/* Publishers Section */}
        <section id="publishers" className="custom-scroll-mt bg-white rounded-3xl p-8 shadow-md border-r-8" style={{ borderRightColor: PRIMARY_ORANGE }}>
          <SectionTitle icon="fa-globe" title="ناشران معتبر بین‌المللی در حوزه علوم اجتماعی" />
          <p className="text-gray-700 leading-loose mb-8">
            ناشران معتبر بین‌المللی بستر اصلی گردش دانش آکادمیک را از طریق انتشار مجلات داوری‌شده و کتب مرجع فراهم می‌سازند.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Springer Nature', platform: 'SpringerLink', link: 'https://yabesh.ir/product/springerlink-direct-account/', logo: 'https://yabesh.ir/wp-content/uploads/2023/11/SpringerNature-1.jpg' },
              { name: 'Elsevier', platform: 'ScienceDirect', link: 'https://yabesh.ir/product/sciencedirect-direct-account/', logo: 'https://yabesh.ir/wp-content/uploads/2023/11/Elsevier.png' },
              { name: 'Taylor & Francis', platform: 'Online', link: 'https://yabesh.ir/product/taylor-francis-online/', icon: 'fa-university' },
              { name: 'Wiley', platform: 'Online Library', link: 'https://yabesh.ir/product/online-library-wiley/', icon: 'fa-book-reader' },
              { name: 'SAGE Publications', platform: 'SAGE Journals', link: 'https://yabesh.ir/product/sage-publications-account/', icon: 'fa-brain' },
              { name: 'Emerald Publishing', platform: 'Emerald Insight', link: 'https://yabesh.ir/product/emerald-insight-account/', icon: 'fa-chart-pie' },
              { name: 'Oxford University Press', platform: 'Oxford Academic', link: 'https://yabesh.ir/product/oxford-university-press-account/', icon: 'fa-school' },
              { name: 'Cambridge University Press', platform: 'Cambridge Core', link: 'https://yabesh.ir/request/', icon: 'fa-landmark' },
              { name: 'De Gruyter', platform: 'Humanities & Social Sciences', link: 'https://yabesh.ir/request/', icon: 'fa-book' },
              { name: 'IGI Global', platform: 'Infosci', link: 'https://yabesh.ir/product/igi-global/', icon: 'fa-laptop-code' }
            ].map((pub, i) => (
              <div key={i} className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                {pub.logo ? (
                  <div className="h-16 w-full flex items-center justify-center mb-4 bg-white rounded-xl p-2">
                    <img src={pub.logo} alt={pub.name} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                ) : (
                  <div className="h-16 w-16 flex items-center justify-center mb-4 bg-orange-100 rounded-full text-orange-600">
                    <i className={`fas ${pub.icon} text-2xl`}></i>
                  </div>
                )}
                <h4 className="font-bold text-gray-800 mb-1">{pub.name}</h4>
                <p className="text-xs text-gray-500 mb-4">{pub.platform}</p>
                <a 
                  href={pub.link} 
                  target="_blank" 
                  className="mt-auto text-xs font-bold py-2 px-4 rounded-full transition-all border border-orange-200 text-orange-600 hover:bg-orange-600 hover:text-white"
                >
                  دسترسی به محتوا
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Comprehensive Databases */}
        <section id="comprehensive" className="custom-scroll-mt bg-white rounded-3xl p-8 shadow-md border-r-8" style={{ borderRightColor: PRIMARY_ORANGE }}>
          <SectionTitle icon="fa-layer-group" title="پایگاه‌های جامع کاربردی برای علوم اجتماعی" />
          <div className="bg-gray-50 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-10 border border-gray-100">
            <div className="flex-1 space-y-4">
              <p className="text-gray-700 leading-loose">
                پایگاه <span className="font-bold text-orange-600">Academic Search Ultimate</span> از مجموعه ابسکو به‌عنوان یک مرجع جامع و میان‌رشته‌ای، منبعی مکمل برای دانشجویان و پژوهشگران است. تمرکز این پایگاه بر پوشش مجلات علمی داوری‌شده معتبر است.
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                <i className="fas fa-info-circle text-orange-500"></i>
                این پایگاه شامل هزاران عنوان مجله با متن کامل در تمام گرایش‌های علوم اجتماعی است.
              </div>
            </div>
            <div className="shrink-0">
              <ActionButton 
                href="https://yabesh.ir/product/academic-search-ultimate/" 
                label="اکانت آکادمیک سرچ آلتیمیت" 
                icon="fa-cloud-download-alt" 
                primary 
              />
            </div>
          </div>
        </section>

      </div>

      {/* Footer Note */}
      <footer className="mt-20 pt-10 border-t border-gray-200 text-center text-gray-500 space-y-4">
        <div className="flex justify-center gap-8 mb-4">
          <i className="fab fa-linkedin text-xl hover:text-orange-500 cursor-pointer"></i>
          <i className="fab fa-telegram text-xl hover:text-orange-500 cursor-pointer"></i>
          <i className="fab fa-instagram text-xl hover:text-orange-500 cursor-pointer"></i>
        </div>
        <p className="text-sm">
          <i className="fas fa-shield-alt mr-2 text-orange-400"></i>
          تمامی حقوق برای یابش محفوظ است. لینک‌ها به منابع معتبر آکادمیک منتهی می‌شوند.
        </p>
        <p className="text-xs opacity-70">
          طراحی مدرن با React و Tailwind - بهینه‌سازی شده برای پژوهشگران
        </p>
      </footer>
    </div>
  );
}
