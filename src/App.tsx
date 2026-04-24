import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ArrowRight, Activity, Database, Folder, Mail, Cpu, ChevronRight, History, ListChecks, Globe, Edit2, Plus, X, Save, Trash2 } from 'lucide-react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { content, Lang } from './translations';
import { GoogleGenAI } from '@google/genai';
import { auth } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

// --- COMPONENTS ---

const PageHeader = ({ title, metadata }: { title: string; metadata?: string }) => (
  <div className="border-b-2 border-ink pb-6 mb-12">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tight leading-none">
        {title}
      </h1>
      {metadata && (
        <div className="font-mono text-xs text-ink-muted uppercase tracking-widest">
          {metadata}
        </div>
      )}
    </div>
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-2xl uppercase tracking-tight border-b border-ink pb-2 mb-6">
    {children}
  </h2>
);

const Tag = ({ children, active }: { children: React.ReactNode; active?: boolean; key?: React.Key }) => (
  <span className={`font-mono text-xs uppercase px-2 py-1 border border-ink ${active ? 'bg-ink text-paper' : 'bg-transparent text-ink'}`}>
    {children}
  </span>
);

const Typewriter = ({ text, speed = 10 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <>{displayedText}</>;
};

// --- PAGES ---

const Home = ({ lang, setCurrentPage, isAdmin }: { lang: Lang, setCurrentPage: (page: string) => void, isAdmin: boolean }) => {
  const t = content[lang].home;
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Tashkent' }));
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [customIntro, setCustomIntro] = useState<{en: string, ru: string} | null>(null);
  const [showIntroEditor, setShowIntroEditor] = useState(false);
  const [introForm, setIntroForm] = useState({ en: '', ru: '' });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Tashkent' })), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Sync temporary avatar and home intro info
    const unsub = onSnapshot(doc(db, 'content', 'terminal'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Avatar check
        const now = Date.now();
        if (data.tempAvatarUrl && data.tempAvatarExpiresAt && now < data.tempAvatarExpiresAt) {
          setAvatarUrl(data.tempAvatarUrl);
        } else {
          setAvatarUrl(null);
        }

        // Custom Intro check
        if (data.intro_en && data.intro_ru) {
          setCustomIntro({ en: data.intro_en, ru: data.intro_ru });
        } else {
          setCustomIntro(null);
        }
      }
    });
    return () => unsub();
  }, []);

  const openIntroEditor = () => {
    setIntroForm({
      en: customIntro?.en || `${content.en.home.p1}\n\n${content.en.home.p2}\n\n${content.en.home.p3}`,
      ru: customIntro?.ru || `${content.ru.home.p1}\n\n${content.ru.home.p2}\n\n${content.ru.home.p3}`
    });
    setShowIntroEditor(true);
  };

  const saveIntro = async () => {
    try {
      await setDoc(doc(db, 'content', 'terminal'), {
        intro_en: introForm.en,
        intro_ru: introForm.ru
      }, { merge: true });
      setShowIntroEditor(false);
    } catch (e) {
      console.error('Failed to save intro', e);
    }
  };

  const loadedAvatar = avatarUrl || "https://i.ibb.co/0jyFNp6w/my-photo.jpg";
  const defaultIntro = [t.p1, t.p2, t.p3];
  const displayIntro = customIntro ? customIntro[lang].split('\n').filter(p => p.trim() !== '') : defaultIntro;

  return (
    <div className="animate-in fade-in duration-0">
      <PageHeader title={t.title} metadata={t.meta} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Operator ID Card */}
          <div className="border border-ink p-6 mb-8 bg-paper">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative group cursor-crosshair">
                {/* Photo placeholder with ASCII easter egg on hover */}
                <div className="w-32 h-32 border-2 border-ink overflow-hidden grayscale bg-ink flex items-center justify-center relative">
                  <img 
                    src={loadedAvatar} 
                    alt="Operator Avatar" 
                    className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80 group-hover:opacity-0 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 hidden group-hover:flex items-center justify-center font-mono text-[6px] leading-[4px] text-accent p-1 opacity-80 overflow-hidden text-center scale-150">
                    {'01010010101001\n01100110101010\n1010AKMAL10101\n0101ACT1001101\n11111100001010\n10100101001010'}
                  </div>
                  {/* Scanlines */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiAvPgo8L3N2Zz4=')] opacity-50 pointer-events-none"></div>
                </div>
              </div>

              <div className="flex-1 w-full relative">
                <h2 className="font-display text-2xl md:text-4xl uppercase tracking-tight mb-2">
                  {t.sysOp}
                </h2>
                
                {/* Interactive secret log trigger */}
                <div 
                   className="font-mono text-sm text-accent bg-ink px-3 py-1 inline-block mb-4 cursor-pointer hover:bg-accent hover:text-ink transition-colors"
                   onClick={() => window.alert('>> SECRET LOG 001: HR_ACCESS_GRANTED. System operational.')}
                >
                  {t.opStatus} <span className="animate-pulse">_</span>
                </div>
                
                <div className="border-t border-ink/20 pt-4 mt-2">
                  <div className="font-mono text-xs text-ink-muted uppercase mb-3 px-1">{t.linksLabel}</div>
                  <div className="flex flex-col gap-2 font-mono text-sm w-full md:w-auto md:inline-flex">
                    <a href="https://github.com/Waisbein" target="_blank" rel="noopener noreferrer" className="border border-ink px-3 py-2 hover:bg-accent hover:border-accent hover:text-paper transition-colors group flex justify-between gap-4">
                      <span>{t.links.github}</span>
                      <span className="opacity-30 group-hover:opacity-100">{'->'}</span>
                    </a>
                    <a href="https://t.me/waisbein" target="_blank" rel="noopener noreferrer" className="border border-ink px-3 py-2 hover:bg-accent hover:border-accent hover:text-paper transition-colors group flex justify-between gap-4">
                      <span>{t.links.telegram}</span>
                      <span className="opacity-30 group-hover:opacity-100">{'->'}</span>
                    </a>
                    <a href="https://www.instagram.com/kml_kh16" target="_blank" rel="noopener noreferrer" className="border border-ink px-3 py-2 hover:bg-accent hover:border-accent hover:text-paper transition-colors group flex justify-between gap-4">
                      <span>{t.links.instagram}</span>
                      <span className="opacity-30 group-hover:opacity-100">{'->'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            {isAdmin && (
              <button 
                onClick={openIntroEditor} 
                className="absolute -top-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-accent text-ink px-2 py-1 text-xs font-mono flex items-center gap-1 z-10"
              >
                <Edit2 size={12} /> EDIT_TEXT
              </button>
            )}
            <div className="space-y-4">
              {displayIntro.map((p, idx) => (
                <p key={idx} className={idx === 0 ? "font-body text-xl md:text-2xl leading-relaxed" : "font-body text-lg leading-relaxed text-ink/80"}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-ink p-6 self-start">
          <div className="font-mono text-xs uppercase border-b border-ink pb-2 mb-4 text-ink-muted">
            {t.sysStatus}
          </div>
          <ul className="font-mono text-sm space-y-4">
            <li className="flex justify-between border-b border-ink/20 pb-2">
              <span>{t.user}</span>
              <span>{lang === 'en' ? 'AKMAL' : 'АКМАЛЬ'}</span>
            </li>
            <li className="flex justify-between border-b border-ink/20 pb-2">
              <span>{t.location}</span>
              <span>{t.locValue}</span>
            </li>
            <li className="flex justify-between border-b border-ink/20 pb-2">
              <span>{t.localTime}</span>
              <span className="text-accent">{time}</span>
            </li>
            <li className="flex justify-between border-b border-ink/20 pb-2">
              <span>{t.osVersion}</span>
              <span>v1.0</span>
            </li>
            <li className="flex justify-between pt-2">
              <span>{t.status}</span>
              <span className="bg-accent text-paper px-2 border border-paper">{t.online}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Intro Editor Modal */}
      {showIntroEditor && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/90 backdrop-blur-sm animate-in fade-in">
          <div className="bg-ink border border-accent w-full max-w-3xl max-h-[90vh] flex flex-col font-mono shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-accent/30">
              <h3 className="text-accent uppercase tracking-widest flex items-center gap-2">
                <Database size={16} /> INTRO_CONFIG
              </h3>
              <button onClick={() => setShowIntroEditor(false)} className="text-accent hover:opacity-70">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto space-y-6 text-sm flex-1">
              <div>
                <label className="block text-accent opacity-70 mb-2 uppercase">ENGLISH CONTENT (Use blank lines for paragraphs)</label>
                <textarea
                  value={introForm.en}
                  onChange={(e) => setIntroForm({ ...introForm, en: e.target.value })}
                  className="w-full bg-black/30 border border-accent/30 text-accent p-3 focus:outline-none focus:border-accent h-48 resize-y custom-scrollbar font-body"
                />
              </div>
              <div>
                <label className="block text-accent opacity-70 mb-2 uppercase">RUSSIAN CONTENT</label>
                <textarea
                  value={introForm.ru}
                  onChange={(e) => setIntroForm({ ...introForm, ru: e.target.value })}
                  className="w-full bg-black/30 border border-accent/30 text-accent p-3 focus:outline-none focus:border-accent h-48 resize-y custom-scrollbar font-body"
                />
              </div>
            </div>

            <div className="p-4 border-t border-accent/30 flex justify-end gap-3 bg-black/20">
              <button 
                onClick={() => setShowIntroEditor(false)}
                className="px-4 py-2 border border-accent/30 text-accent hover:bg-accent/10 transition-colors"
              >
                CANCEL
              </button>
              <button 
                onClick={saveIntro}
                className="px-4 py-2 bg-accent text-ink hover:opacity-90 font-bold transition-opacity flex items-center gap-2"
              >
                <Save size={16} /> SAVE_CHANGES
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Skills = ({ lang }: { lang: Lang }) => {
  const t = content[lang].skills;
  return (
    <div className="animate-in fade-in duration-0">
      <PageHeader title={t.title} metadata={t.meta} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-ink">
        {/* Col 1: CORE (Heavy, solid) */}
        <div className="border-r border-b border-ink p-6 bg-ink text-paper">
          <div className="font-mono text-xs uppercase mb-6 text-paper/70 flex items-center gap-2">
            <span className="w-2 h-2 bg-accent inline-block"></span>
            {t.col1}
          </div>
          <div className="flex flex-wrap gap-2">
            {t.tags.col1.map((tag, i) => {
              const isStruggling = tag === 'Shipping Discipline';
              return (
                <span 
                  key={i} 
                  className={`font-mono text-xs uppercase px-3 py-1.5 border ${
                    isStruggling 
                      ? 'border-amber-500/50 bg-amber-500/10 text-amber-300/90 border-dashed cursor-help' 
                      : 'border-paper/20 bg-paper/10 text-paper'
                  }`}
                  title={isStruggling ? (lang === 'ru' ? 'Зона роста: пока не хватает регулярности' : 'Needs attention: working on consistency') : undefined}
                >
                  {isStruggling ? `[!] ${tag}` : tag}
                </span>
              );
            })}
          </div>
        </div>

        {/* Col 2: BUILDING (Outline, active) */}
        <div className="border-r border-b border-ink p-6">
          <div className="font-mono text-xs uppercase mb-6 text-ink flex items-center gap-2">
            <span className="w-2 h-2 border border-ink inline-block"></span>
            {t.col2}
          </div>
          <div className="flex flex-wrap gap-2">
            {t.tags.col2.map((tag, i) => (
              <span key={i} className="font-mono text-xs uppercase px-3 py-1.5 border border-ink text-ink">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Col 3: APPLIED (Light, dashed) */}
        <div className="border-r border-b border-ink p-6 bg-ink/5">
          <div className="font-mono text-xs uppercase mb-6 text-ink-muted flex items-center gap-2">
            <span className="w-2 h-2 bg-ink-muted inline-block"></span>
            {t.col3}
          </div>
          <div className="flex flex-wrap gap-2">
            {t.tags.col3.map((tag, i) => (
              <span key={i} className="font-mono text-xs uppercase px-3 py-1.5 border border-dashed border-ink/30 text-ink/70 bg-paper/50">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Progress = ({ lang, completed, planData }: { lang: Lang, completed: Record<string, boolean>, planData: any[] }) => {
  const t = content[lang].progress;

  const totalTasks = planData.reduce((acc, w) => acc + w.tasks.length, 0);
  const completedCount = Object.values(completed).filter(Boolean).length;
  const overallPercent = Math.round((completedCount / totalTasks) * 100) || 0;

  let activeWeek = 1;
  let currentFocus = planData[0].title;
  for (let i = 0; i < planData.length; i++) {
    const week = planData[i];
    const weekTotal = week.tasks.length;
    const weekCompleted = week.tasks.filter((task: any) => completed[task.id]).length;
    if (weekCompleted < weekTotal) {
      activeWeek = week.week;
      currentFocus = week.title;
      break;
    }
  }

  return (
    <div className="animate-in fade-in duration-0">
      <PageHeader title={t.title} metadata={t.meta} />
      
      <p className="font-body text-lg leading-relaxed text-ink/80 mb-12">
        {t.intro}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="border border-ink p-6 flex flex-col justify-between">
          <div className="font-mono text-xs uppercase text-ink-muted mb-2">{t.overallProgress}</div>
          <div className="font-display text-3xl">{overallPercent}%</div>
        </div>
        <div className="border border-ink p-6 flex flex-col justify-between">
          <div className="font-mono text-xs uppercase text-ink-muted mb-2">{t.completedTasks}</div>
          <div className="font-display text-3xl">{completedCount} / {totalTasks}</div>
        </div>
        <div className="border border-ink p-6 flex flex-col justify-between">
          <div className="font-mono text-xs uppercase text-ink-muted mb-2">{t.activeWeek}</div>
          <div className="font-display text-3xl">{activeWeek}</div>
        </div>
        <div className="border border-ink p-6 flex flex-col justify-between">
          <div className="font-mono text-xs uppercase text-ink-muted mb-2">{t.currentFocus}</div>
          <div className="font-display text-xl uppercase tracking-tight leading-tight">{currentFocus}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {t.weekCards.map((card, i) => (
          <div key={i} className="border border-ink p-6 hover:bg-ink hover:text-paper transition-none group">
            <div className="font-mono text-accent mb-4 tracking-widest group-hover:text-accent">
              {card.week}
            </div>
            <p className="font-body text-lg">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Works = ({ 
  lang, 
  worksData, 
  isAdmin, 
  rawWorksData, 
  saveWorksToFirestore 
}: { 
  lang: Lang, 
  worksData?: any, 
  isAdmin?: boolean, 
  rawWorksData?: any[] | null, 
  saveWorksToFirestore?: (d: any[]) => void 
}) => {
  const t = worksData || content[lang].works;
  const [expandedWork, setExpandedWork] = useState<string | null>(null);
  
  const [isEditingJson, setIsEditingJson] = useState(false);
  const [jsonStr, setJsonStr] = useState('');

  const handeSaveJson = () => {
    if (!isAdmin || !saveWorksToFirestore) return;
    try {
      const parsed = JSON.parse(jsonStr);
      saveWorksToFirestore(parsed);
      setIsEditingJson(false);
    } catch (e) {
      alert("Invalid JSON data");
    }
  }
  
  // Default structure for saving to DB
  const handleMoveImage = (workId: string, imageIndex: number, direction: 'up' | 'down') => {
    if (!isAdmin || !saveWorksToFirestore || !rawWorksData) return;
    
    // Find the work item index
    const workIndex = rawWorksData.findIndex(w => w.id === workId);
    if (workIndex === -1) return;
    
    const newData = [...rawWorksData];
    const work = { ...newData[workIndex] };
    const images = [...(work.images || [])];
    
    if (direction === 'up' && imageIndex > 0) {
      const temp = images[imageIndex - 1];
      images[imageIndex - 1] = images[imageIndex];
      images[imageIndex] = temp;
    } else if (direction === 'down' && imageIndex < images.length - 1) {
      const temp = images[imageIndex + 1];
      images[imageIndex + 1] = images[imageIndex];
      images[imageIndex] = temp;
    }
    
    work.images = images;
    newData[workIndex] = work;
    saveWorksToFirestore(newData);
  };

  return (
    <div className="animate-in fade-in duration-0">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-end mb-6">
        <PageHeader title={t.title} metadata={t.meta} />
        {isAdmin && (
          <div className="mb-12 md:mb-0 flex flex-wrap gap-4 p-4 border border-accent bg-accent/10">
            {!rawWorksData || rawWorksData.length === 0 ? (
              <button 
                onClick={() => {
                  if (saveWorksToFirestore) {
                    const initData = content.en.works.items.map((enItem, idx) => {
                      const ruItem = content.ru.works.items[idx];
                      return {
                        id: enItem.id,
                        date: enItem.date,
                        url: enItem.url || '',
                        tgUrl: enItem.tgUrl || '',
                        techStack: enItem.techStack || [],
                        images: enItem.images || [],
                        en: {
                          title: enItem.title,
                          type: enItem.type,
                          desc: enItem.desc,
                          lessons: enItem.lessons || ''
                        },
                        ru: {
                          title: ruItem.title,
                          type: ruItem.type,
                          desc: ruItem.desc,
                          lessons: ruItem.lessons || ''
                        }
                      };
                    });
                    saveWorksToFirestore(initData);
                  }
                }}
                className="font-mono text-xs border border-ink bg-paper px-4 py-2 hover:bg-ink hover:text-paper uppercase flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> [INIT_DB_FROM_STATIC]
              </button>
            ) : (
               <div className="flex flex-wrap gap-4 items-center">
                 <div className="font-mono text-sm text-accent font-bold uppercase">[DB_SYNCED]</div>
                 <button 
                   onClick={() => {
                     if (window.confirm('This will overwrite the database with static data from translations.ts. Are you sure?')) {
                       const initData = content.en.works.items.map((enItem, i) => {
                         const ruItem = content.ru.works.items[i];
                         return {
                           id: enItem.id,
                           date: enItem.date,
                           url: (enItem as any).url || '',
                           tgUrl: (enItem as any).tgUrl || '',
                           images: (enItem as any).images || [],
                           techStack: enItem.techStack,
                           en: {
                             title: enItem.title,
                             type: enItem.type,
                             desc: enItem.desc,
                             lessons: enItem.lessons || ''
                           },
                           ru: {
                             title: ruItem?.title || '',
                             type: ruItem?.type || '',
                             desc: ruItem?.desc || '',
                             lessons: ruItem?.lessons || ''
                           }
                         };
                       });
                       saveWorksToFirestore(initData);
                     }
                   }}
                   className="font-mono text-xs border border-ink bg-paper px-4 py-2 hover:bg-ink hover:text-paper uppercase flex items-center gap-2"
                 >
                   <Save className="w-4 h-4" /> [RE-SYNC_FROM_STATIC]
                 </button>
                 <button 
                   onClick={() => {
                     setJsonStr(JSON.stringify(rawWorksData, null, 2));
                     setIsEditingJson(true);
                   }}
                   className="font-mono text-xs border border-ink bg-paper px-4 py-2 hover:bg-ink hover:text-paper uppercase flex items-center gap-2"
                 >
                   <Edit2 className="w-4 h-4" /> [EDIT_DATA_JSON]
                 </button>
               </div>
            )}
          </div>
        )}
      </div>

      {isEditingJson && isAdmin && (
        <div className="mb-8 border border-ink p-4 bg-ink/5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
           <div className="font-mono text-xs uppercase text-ink-muted">JSON WORK_DATA_EDITOR //</div>
           <textarea 
             value={jsonStr}
             onChange={e => setJsonStr(e.target.value)}
             className="w-full h-96 bg-transparent border border-ink/30 p-4 font-mono text-xs focus:outline-none focus:border-ink resize-y"
             spellCheck={false}
           />
           <div className="flex gap-4">
             <button onClick={handeSaveJson} className="font-mono text-xs bg-ink text-paper px-4 py-2 hover:bg-ink/80 flex items-center gap-2">
               <Save className="w-3 h-3"/> [SAVE_TO_DB]
             </button>
             <button onClick={() => setIsEditingJson(false)} className="font-mono text-xs border border-ink px-4 py-2 hover:bg-ink/10 flex items-center gap-2">
               <X className="w-3 h-3"/> [CANCEL]
             </button>
           </div>
        </div>
      )}
      
      <div className="flex flex-col gap-8">
        {t.items.map((art) => {
          const isExpanded = expandedWork === art.id;
          
          return (
            <div 
              key={art.id} 
              className={`border-t-4 border-ink border-x border-b p-6 flex flex-col transition-colors duration-300 ${isExpanded ? 'bg-ink/5' : 'hover:bg-ink hover:text-paper group cursor-pointer'}`}
              onClick={() => !isExpanded && setExpandedWork(art.id)}
            >
              <div className="flex justify-between items-start mb-6 pointer-events-none">
                <div className={`font-mono text-xs opacity-50 ${!isExpanded && 'group-hover:opacity-80'}`}>{art.id}</div>
                <div className="font-mono text-xs opacity-50">{art.date}</div>
              </div>
              <h3 className="font-display text-2xl uppercase tracking-tight mb-2 pointer-events-none">{art.title}</h3>
              <div className={`font-mono text-xs opacity-70 mb-4 uppercase pointer-events-none ${!isExpanded && 'group-hover:text-paper/70'}`}>
                {t.typeLabel} {art.type}
              </div>
              <p className={`font-body text-base leading-relaxed mb-6 pointer-events-none ${isExpanded ? 'opacity-80' : ''}`}>
                {art.desc}
              </p>
              
              {!isExpanded && (
                <div className="mt-auto self-start border border-ink/30 px-4 py-2 text-xs font-mono group-hover:border-paper group-hover:text-paper uppercase tracking-widest">
                  [INSPECT_PROJECT]
                </div>
              )}

              {isExpanded && (
                <div className="mt-4 pt-6 border-t border-ink/20 animate-in slide-in-from-top-4 fade-in duration-300 flex flex-col gap-8 cursor-default" onClick={e => e.stopPropagation()}>
                  
                  {/* Links */}
                  {(art.url || art.tgUrl) && (
                    <div className="flex flex-wrap gap-4">
                      {art.url && (
                        <a href={art.url} target="_blank" rel="noopener noreferrer" className="border border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] px-4 py-2 text-xs font-mono hover:bg-accent hover:text-ink hover:border-accent hover:shadow-[2px_2px_0px_0px_var(--color-accent)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                          [LIVE_DEPLOYMENT]
                        </a>
                      )}
                      {art.tgUrl && (
                        <a href={art.tgUrl} target="_blank" rel="noopener noreferrer" className="border border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] px-4 py-2 text-xs font-mono hover:bg-accent hover:text-ink hover:border-accent hover:shadow-[2px_2px_0px_0px_var(--color-accent)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                          [OPEN_IN_TELEGRAM]
                        </a>
                      )}
                    </div>
                  )}

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {art.techStack && (
                        <div>
                          <div className="font-mono text-xs text-ink-muted mb-3 uppercase tracking-widest">TECH_STACK //</div>
                          <div className="flex flex-wrap gap-2">
                            {art.techStack.map((tech: string, i: number) => (
                              <span key={i} className="text-xs font-mono border border-ink/20 bg-ink/5 px-2 py-1">{tech}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {art.lessons && (
                        <div>
                          <div className="font-mono text-xs text-ink-muted mb-3 uppercase tracking-widest">POSTMORTEM //</div>
                          <p className="font-body text-sm text-ink leading-relaxed border-l-2 border-accent pl-4 py-1 italic tracking-tight">{art.lessons}</p>
                        </div>
                      )}
                  </div>

                  {/* Visuals Gallery */}
                  {art.images && art.images.length > 0 && (
                    <div>
                      <div className="font-mono text-xs text-ink-muted mb-4 uppercase tracking-widest">VISUAL_ASSETS //</div>
                      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x relative">
                        {art.images.map((img: string, i: number) => (
                          <div key={i} className="group/img h-96 w-auto aspect-[9/19] shrink-0 snap-center border border-ink/20 p-1 bg-ink/5 relative">
                            {isAdmin && (
                               <div className="absolute inset-0 bg-ink/80 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10 pointer-events-none group-hover/img:pointer-events-auto">
                                  <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleMoveImage(art.id, i, 'up'); }} className="text-paper border border-paper p-2 hover:bg-paper hover:text-ink pointer-events-auto">
                                    <ChevronRight className="w-6 h-6 rotate-180" />
                                  </button>
                                  <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleMoveImage(art.id, i, 'down'); }} className="text-paper border border-paper p-2 hover:bg-paper hover:text-ink pointer-events-auto">
                                    <ChevronRight className="w-6 h-6" />
                                  </button>
                               </div>
                            )}
                            <img src={img} alt={`${art.title} screen ${i+1}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button 
                    className="self-end mt-4 text-xs font-mono text-ink-muted hover:text-accent hover:underline uppercase tracking-widest"
                    onClick={() => setExpandedWork(null)}
                  >
                     [CLOSE_INSPECTOR]
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- LAYOUT ---

const LearningPlan = ({ 
  lang, completed, toggleTask, planData, ratings, updateRating, notes, updateNote, isAdmin, rawPlanData, savePlanToFirestore 
}: { 
  lang: Lang, 
  completed: Record<string, boolean>, 
  toggleTask: (id: string) => void, 
  planData: any[],
  ratings: Record<string, number>,
  updateRating: (id: string, rating: number) => void,
  notes: Record<string, string>,
  updateNote: (id: string, note: string) => void,
  isAdmin: boolean,
  rawPlanData?: any[] | null,
  savePlanToFirestore?: (d: any[]) => void
}) => {
  const t = content[lang].plan;
  const [viewMode, setViewMode] = useState<'main' | 'bg'>('main');

  // Edit State
  const [editingWeek, setEditingWeek] = useState<number | null>(null); // index of week to edit
  const [editingTask, setEditingTask] = useState<{wIndex: number, tIndex: number} | null>(null);
  
  // Data State for Editors
  const [wForm, setWForm] = useState({ enTitle: '', ruTitle: '', enObj: '', ruObj: '' });
  const [tForm, setTForm] = useState({ id: '', day: '', url: '', enText: '', ruText: '', enArtifact: '', ruArtifact: '' });
  const [activeArtifact, setActiveArtifact] = useState<{title: string, content: string} | null>(null);

  // Main Thread progress
  const mainTotalTasks = planData.reduce((acc, w) => acc + w.tasks.length, 0);
  const mainCompletedCount = planData.reduce((acc, w) => acc + w.tasks.filter((task: any) => completed[task.id]).length, 0);
  const mainPercent = Math.round((mainCompletedCount / mainTotalTasks) * 100) || 0;

  // Background Process progress
  const bgTotalTasks = t.foundations.tasks.length;
  const bgCompletedCount = t.foundations.tasks.filter((task: any) => completed[task.id]).length;
  const bgPercent = Math.round((bgCompletedCount / bgTotalTasks) * 100) || 0;
  
  const getAsciiBar = (percent: number, length = 20) => {
    const filled = Math.round((percent / 100) * length);
    return `[${'█'.repeat(filled)}${'░'.repeat(length - filled)}]`;
  };

  const openEditWeek = (wIndex: number) => {
    if (!rawPlanData) return;
    const w = rawPlanData[wIndex];
    setWForm({
      enTitle: w.en?.title || '', ruTitle: w.ru?.title || '',
      enObj: w.en?.objective || '', ruObj: w.ru?.objective || ''
    });
    setEditingWeek(wIndex);
  };
  
  const saveWeek = () => {
    if (!rawPlanData || editingWeek === null || !savePlanToFirestore) return;
    const newData = [...rawPlanData];
    newData[editingWeek] = {
      ...newData[editingWeek],
      en: { ...newData[editingWeek].en, title: wForm.enTitle, objective: wForm.enObj },
      ru: { ...newData[editingWeek].ru, title: wForm.ruTitle, objective: wForm.ruObj }
    };
    savePlanToFirestore(newData);
    setEditingWeek(null);
  }

  const openEditTask = (wIndex: number, tIndex: number) => {
    if (!rawPlanData) return;
    const t = rawPlanData[wIndex].tasks[tIndex];
    setTForm({
      id: t.id || '', day: t.day || '', url: t.url || '',
      enText: t.en?.text || '', ruText: t.ru?.text || '',
      enArtifact: t.en?.artifact || '', ruArtifact: t.ru?.artifact || ''
    });
    setEditingTask({ wIndex, tIndex });
  };
  
  const saveTask = () => {
    if (!rawPlanData || editingTask === null || !savePlanToFirestore) return;
    const { wIndex, tIndex } = editingTask;
    const newData = [...rawPlanData];
    
    const newTasks = [...newData[wIndex].tasks];
    newTasks[tIndex] = {
      ...newTasks[tIndex],
      id: tForm.id, day: tForm.day, url: tForm.url,
      en: { text: tForm.enText, artifact: tForm.enArtifact },
      ru: { text: tForm.ruText, artifact: tForm.ruArtifact }
    };
    
    newData[wIndex] = { ...newData[wIndex], tasks: newTasks };
    savePlanToFirestore(newData);
    setEditingTask(null);
  }

  const renderMainThread = () => (
    <div className="space-y-12">
      {/* Overall Progress */}
      <div className="border border-ink p-6 bg-ink text-paper">
         <div className="font-mono text-xs uppercase mb-4 text-ink-muted">{t.overall}</div>
         <div className="font-mono text-accent text-xl md:text-3xl tracking-widest mb-2">
           {getAsciiBar(mainPercent, 20)} {mainPercent}%
         </div>
         <div className="font-mono text-xs text-ink-muted">
           {mainCompletedCount} / {mainTotalTasks} {t.tasksCompleted}
         </div>
      </div>

      {planData.map((week, wIndex) => {
         const weekTotal = week.tasks.length;
         const weekCompleted = week.tasks.filter((task: any) => completed[task.id]).length;
         const weekPercent = Math.round((weekCompleted / weekTotal) * 100) || 0;

         return (
           <div key={week.week} className="border border-ink relative group/week">
             <div className="border-b border-ink p-4 bg-ink/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div>
                 <div className="font-mono text-xs text-ink-muted uppercase mb-1 flex items-center gap-2">
                   {t.week} {week.week}
                   {isAdmin && (
                     <button onClick={() => openEditWeek(wIndex)} className="text-accent underline hover:opacity-75">
                       [EDIT WEEK]
                     </button>
                   )}
                 </div>
                 <h3 className="font-display text-xl uppercase tracking-tight">{week.title}</h3>
                 {week.objective && <p className="font-body text-sm mt-1 text-ink-muted">{week.objective}</p>}
               </div>
               <div className="font-mono text-sm text-accent text-left md:text-right">
                 <div className="hidden md:block">{getAsciiBar(weekPercent, 10)} {weekPercent}%</div>
                 <div className="md:hidden">{getAsciiBar(weekPercent, 15)} {weekPercent}%</div>
               </div>
             </div>
             
             <div className="divide-y divide-ink">
               {week.tasks.map((task: any, tIndex: number) => (
                 <div 
                   key={task.id} 
                   className="p-4 flex flex-col gap-3 hover:bg-ink hover:text-paper transition-none group relative"
                 >
                   <div className={`flex flex-col md:flex-row md:items-center gap-4 ${isAdmin ? 'cursor-pointer' : 'cursor-default'}`} onClick={() => isAdmin && toggleTask(task.id)}>
                     <div className="flex items-center gap-4 flex-1">
                       <button className={`font-mono text-lg ${completed[task.id] ? 'text-accent' : 'text-ink group-hover:text-paper'}`}>
                         {completed[task.id] ? '[■]' : '[ ]'}
                       </button>
                       <div className="font-mono text-xs text-ink-muted group-hover:text-paper/50 w-12 shrink-0">
                         {t.day} {task.day}
                       </div>
                       <div className={`font-body text-base ${completed[task.id] ? 'line-through opacity-50' : ''}`}>
                         {task.text}
                       </div>
                       {isAdmin && (
                           <button 
                             onClick={(e) => { e.stopPropagation(); openEditTask(wIndex, tIndex); }} 
                             className="opacity-0 group-hover:opacity-100 uppercase text-[10px] bg-paper text-ink px-2 py-1 border border-ink hover:bg-accent hover:border-accent hover:text-paper"
                           >
                             [EDIT TASK]
                           </button>
                       )}
                     </div>
                     {task.url ? (
                       <a 
                         href={task.url} 
                         target="_blank"
                         rel="noopener noreferrer"
                         onClick={(e) => { e.stopPropagation(); }} 
                         className="font-mono text-xs border border-ink px-2 py-1 text-ink-muted hover:bg-paper hover:text-ink group-hover:border-paper group-hover:text-paper ml-[4.5rem] md:ml-0 self-start md:self-auto shrink-0"
                       >
                         {t.ref}
                       </a>
                     ) : (
                       <span 
                         className="font-mono text-xs border border-ink/30 px-2 py-1 text-ink-muted/30 ml-[4.5rem] md:ml-0 self-start md:self-auto shrink-0 cursor-not-allowed"
                         title="No reference available"
                       >
                         {t.ref}
                       </span>
                     )}
                   </div>
                   
                   {/* Assessment & Note */}
                   <div className="ml-[4.5rem] flex flex-col lg:flex-row gap-4 lg:items-center font-mono text-xs text-ink-muted group-hover:text-paper/70">
                     <div className="flex items-center gap-2">
                       <span>{t.understanding}:</span>
                       <div className="flex gap-1">
                         {[1, 2, 3, 4, 5].map(num => (
                           <button
                             key={num}
                             onClick={(e) => { e.stopPropagation(); isAdmin && updateRating(task.id, num); }}
                             disabled={!isAdmin}
                             className={`w-5 h-5 flex items-center justify-center border ${ratings[task.id] === num ? 'border-accent text-accent' : 'border-current opacity-50 hover:opacity-100'} ${!isAdmin ? 'cursor-default' : ''}`}
                           >
                             {num}
                           </button>
                         ))}
                       </div>
                     </div>
                     <div className="flex items-center gap-2 flex-1">
                       <span>{t.note}:</span>
                       <input
                         type="text"
                         value={notes[task.id] || ''}
                         onChange={(e) => isAdmin && updateNote(task.id, e.target.value)}
                         disabled={!isAdmin}
                         placeholder={isAdmin ? "..." : ""}
                         className="flex-1 bg-transparent border-b border-current opacity-50 focus:opacity-100 outline-none px-1 py-0.5 placeholder:text-current placeholder:opacity-30 disabled:cursor-default"
                       />
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         )
      })}
    </div>
  );

  const renderBackgroundProcess = () => (
    <div className="space-y-8 font-mono bg-ink text-accent p-6 md:p-8 shadow-xl min-h-full">
      <div className="border border-accent p-4 mb-8">
         <div className="text-xs uppercase mb-4 opacity-70">SYSTEM.KERNEL.FOUNDATIONS</div>
         <div className="text-xl md:text-2xl tracking-widest mb-2">
           {getAsciiBar(bgPercent, 15)} {bgPercent}%
         </div>
         <div className="text-xs opacity-70">
           {bgCompletedCount} / {bgTotalTasks} {t.tasksCompleted}
         </div>
      </div>

      <div className="space-y-4">
        <div className="text-sm opacity-70 mb-4 border-b border-accent/30 pb-2">
          {t.foundations.title}
        </div>
        {t.foundations.tasks.map((task: any) => (
          <div 
            key={task.id} 
            className="flex flex-col gap-2 group"
          >
            <div className={`flex items-start gap-4 ${isAdmin ? 'cursor-pointer' : 'cursor-default'}`} onClick={() => isAdmin && toggleTask(task.id)}>
              <div className="mt-1 text-accent">
                {completed[task.id] ? '[x]' : '[ ]'}
              </div>
              <div className="flex-1">
                <div className="text-xs opacity-50 mb-1">{task.ref}</div>
                <div className={`text-sm md:text-base ${completed[task.id] ? 'opacity-50 line-through' : 'group-hover:opacity-80'}`}>
                  {task.text}
                </div>
              </div>
            </div>
            
            <div className="ml-8 flex flex-col lg:flex-row gap-4 lg:items-center font-mono text-xs opacity-50 focus-within:opacity-100 transition-opacity">
              <div className="flex items-center gap-2">
                <span>{t.understanding}:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      onClick={(e) => { e.stopPropagation(); isAdmin && updateRating(task.id, num); }}
                      disabled={!isAdmin}
                      className={`w-5 h-5 flex items-center justify-center border ${ratings[task.id] === num ? 'border-accent text-accent' : 'border-current hover:opacity-80'} ${!isAdmin && 'cursor-default'}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-2 flex-1">
                  <span>{t.note}:</span>
                  <input
                    type="text"
                    value={notes[task.id] || ''}
                    onChange={(e) => isAdmin && updateNote(task.id, e.target.value)}
                    disabled={!isAdmin}
                    placeholder={isAdmin ? "..." : ""}
                    className="flex-1 bg-transparent border-b border-current outline-none px-1 py-0.5 placeholder:text-current placeholder:opacity-30 disabled:cursor-default"
                  />
                </div>
                {(task as any).note && (
                  <button className="text-accent underline hover:opacity-80">OPEN_ARTIFACT</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-0 relative">
      <PageHeader title={t.title} metadata={t.meta} />
      
      {/* Modals overlay */}
      {isAdmin && editingWeek !== null && (
        <div className="fixed inset-0 bg-ink/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-paper text-ink p-6 border-2 border-accent max-w-2xl w-full">
            <h3 className="font-display text-xl uppercase mb-4 text-accent">Edit Week</h3>
            <div className="space-y-4 font-mono text-sm">
              <div><label className="block mb-1 opacity-50">Title (EN)</label><input className="w-full bg-ink/5 border border-ink p-2 outline-none" value={wForm.enTitle} onChange={e => setWForm({...wForm, enTitle: e.target.value})} /></div>
              <div><label className="block mb-1 opacity-50">Title (RU)</label><input className="w-full bg-ink/5 border border-ink p-2 outline-none" value={wForm.ruTitle} onChange={e => setWForm({...wForm, ruTitle: e.target.value})} /></div>
              <div><label className="block mb-1 opacity-50">Objective (EN)</label><textarea className="w-full bg-ink/5 border border-ink p-2 outline-none" value={wForm.enObj} onChange={e => setWForm({...wForm, enObj: e.target.value})} /></div>
              <div><label className="block mb-1 opacity-50">Objective (RU)</label><textarea className="w-full bg-ink/5 border border-ink p-2 outline-none" value={wForm.ruObj} onChange={e => setWForm({...wForm, ruObj: e.target.value})} /></div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button onClick={() => setEditingWeek(null)} className="px-4 py-2 border border-ink hover:bg-ink hover:text-paper uppercase text-sm">Cancel</button>
              <button onClick={saveWeek} className="px-4 py-2 border border-accent bg-accent text-paper hover:bg-transparent hover:text-accent uppercase text-sm">Save</button>
            </div>
          </div>
        </div>
      )}

      {isAdmin && editingTask !== null && (
        <div className="fixed inset-0 bg-ink/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-paper text-ink p-6 border-2 border-accent max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="font-display text-xl uppercase mb-4 text-accent">Edit Task</h3>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex gap-4">
                <div className="flex-1"><label className="block mb-1 opacity-50">ID</label><input className="w-full bg-ink/5 border border-ink p-2 outline-none" value={tForm.id} onChange={e => setTForm({...tForm, id: e.target.value})} /></div>
                <div className="flex-1"><label className="block mb-1 opacity-50">Day</label><input className="w-full bg-ink/5 border border-ink p-2 outline-none" value={tForm.day} onChange={e => setTForm({...tForm, day: e.target.value})} /></div>
              </div>
              <div><label className="block mb-1 opacity-50">Ref URL (optional)</label><input className="w-full bg-ink/5 border border-ink p-2 outline-none" value={tForm.url} onChange={e => setTForm({...tForm, url: e.target.value})} /></div>
              <div><label className="block mb-1 opacity-50">Text (EN)</label><textarea className="w-full bg-ink/5 border border-ink p-2 outline-none" value={tForm.enText} onChange={e => setTForm({...tForm, enText: e.target.value})} /></div>
              <div><label className="block mb-1 opacity-50">Text (RU)</label><textarea className="w-full bg-ink/5 border border-ink p-2 outline-none" value={tForm.ruText} onChange={e => setTForm({...tForm, ruText: e.target.value})} /></div>
              <div><label className="block mb-1 text-accent opacity-80">Artifact (EN) (Optional markdown/text)</label><textarea className="w-full bg-ink/5 border border-ink p-2 outline-none min-h-[100px]" value={tForm.enArtifact} onChange={e => setTForm({...tForm, enArtifact: e.target.value})} /></div>
              <div><label className="block mb-1 text-accent opacity-80">Artifact (RU) (Optional markdown/text)</label><textarea className="w-full bg-ink/5 border border-ink p-2 outline-none min-h-[100px]" value={tForm.ruArtifact} onChange={e => setTForm({...tForm, ruArtifact: e.target.value})} /></div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button onClick={() => setEditingTask(null)} className="px-4 py-2 border border-ink hover:bg-ink hover:text-paper uppercase text-sm">Cancel</button>
              <button onClick={saveTask} className="px-4 py-2 border border-accent bg-accent text-paper hover:bg-transparent hover:text-accent uppercase text-sm">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Artifact Overlay */}
      {activeArtifact && (
        <div className="fixed inset-0 z-[120] bg-ink/90 backdrop-blur-sm p-4 md:p-12 flex flex-col items-center justify-center animate-in fade-in">
          <div className="w-full max-w-4xl max-h-full border border-accent bg-paper flex flex-col shadow-[0_0_40px_rgba(var(--accent-color),0.2)] relative">
            <div className="border-b border-accent bg-accent text-paper px-4 py-2 flex justify-between items-center font-mono text-xs uppercase">
              <span>TERMINAL // ARTIFACT VIEWER</span>
              <button onClick={() => setActiveArtifact(null)} className="hover:text-ink transition-colors px-2"> [CLOSE] </button>
            </div>
            <div className="p-6 md:p-10 overflow-y-auto font-mono text-sm leading-relaxed whitespace-pre-wrap text-ink bg-paper bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIyIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDIpIiAvPgo8L3N2Zz4=')]">
              <div className="text-accent mb-8 border-b border-ink/10 pb-4 flex flex-col gap-2">
                <span className="opacity-50 text-xs">FILE MATCH:</span>
                <span className="text-lg md:text-xl">{activeArtifact.title}</span>
              </div>
              <div className="prose prose-invert max-w-none text-ink">
                {activeArtifact.content}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thread Switcher */}
      <div className="flex flex-col md:flex-row gap-2 mb-8 font-mono text-xs md:text-sm">
        <button 
          onClick={() => setViewMode('main')}
          className={`px-4 py-2 border ${viewMode === 'main' ? 'bg-ink text-paper border-ink' : 'border-ink text-ink hover:bg-ink/5'}`}
        >
          {t.threads.main}
        </button>
        <button 
          onClick={() => setViewMode('bg')}
          className={`px-4 py-2 border ${viewMode === 'bg' ? 'bg-ink text-accent border-ink' : 'border-ink text-ink hover:bg-ink/5'}`}
        >
          {t.threads.bg}
        </button>
      </div>

      {viewMode === 'main' && renderMainThread()}
      {viewMode === 'bg' && renderBackgroundProcess()}
    </div>
  );
};

const VersionHistory = ({ 
  lang, historyData, isAdmin, rawHistoryData, saveHistoryToFirestore 
}: { 
  lang: Lang, 
  historyData: any, 
  isAdmin: boolean,
  rawHistoryData?: any[] | null,
  saveHistoryToFirestore?: (d: any[]) => void 
}) => {
  const t = historyData;

  const [editingVersion, setEditingVersion] = useState<number | 'new' | null>(null);
  const [vForm, setVForm] = useState({ id: '', date: '', status: '', enTitle: '', ruTitle: '', enDesc: '', ruDesc: '' });

  const openNewVersion = () => {
    setVForm({ id: '', date: new Date().toISOString().split('T')[0], status: 'ACTIVE', enTitle: '', ruTitle: '', enDesc: '', ruDesc: '' });
    setEditingVersion('new');
  };

  const openEditVersion = (index: number) => {
    if (!rawHistoryData) return;
    const v = rawHistoryData[index];
    setVForm({
      id: v.id || '', date: v.date || '', status: v.status || '',
      enTitle: v.en?.title || '', ruTitle: v.ru?.title || '',
      enDesc: v.en?.desc || '', ruDesc: v.ru?.desc || ''
    });
    setEditingVersion(index);
  };

  const saveVersion = () => {
    if (!saveHistoryToFirestore) return;
    const newData = rawHistoryData ? [...rawHistoryData] : [];
    
    const versionObj = {
      id: vForm.id, date: vForm.date, status: vForm.status,
      en: { title: vForm.enTitle, desc: vForm.enDesc },
      ru: { title: vForm.ruTitle, desc: vForm.ruDesc }
    };

    if (editingVersion === 'new') {
      newData.unshift(versionObj); // Add to the top
    } else if (typeof editingVersion === 'number') {
      newData[editingVersion] = versionObj;
    }
    
    saveHistoryToFirestore(newData);
    setEditingVersion(null);
  };

  const deleteVersion = (index: number) => {
    if (!saveHistoryToFirestore || !rawHistoryData) return;
    if (confirm("Are you sure you want to delete this version?")) {
      const newData = [...rawHistoryData];
      newData.splice(index, 1);
      saveHistoryToFirestore(newData);
    }
  };

  return (
    <div className="animate-in fade-in duration-0 relative">
      <PageHeader title={t.title} metadata={t.meta} />
      
      {/* Modals overlay */}
      {isAdmin && editingVersion !== null && (
        <div className="fixed inset-0 bg-ink/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-paper text-ink p-6 border-2 border-accent max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="font-display text-xl uppercase mb-4 text-accent">
              {editingVersion === 'new' ? 'Add New Version' : 'Edit Version'}
            </h3>
            <div className="space-y-4 font-mono text-sm flex flex-col">
              <div className="flex gap-4">
                <div className="flex-1"><label className="block mb-1 opacity-50">Version ID</label><input className="w-full bg-ink/5 border border-ink p-2 outline-none" value={vForm.id} onChange={e => setVForm({...vForm, id: e.target.value})} placeholder="e.g. v1.1.0" /></div>
                <div className="flex-1"><label className="block mb-1 opacity-50">Date</label><input className="w-full bg-ink/5 border border-ink p-2 outline-none" type="date" value={vForm.date} onChange={e => setVForm({...vForm, date: e.target.value})} /></div>
              </div>
              <div><label className="block mb-1 opacity-50">Status</label><input className="w-full bg-ink/5 border border-ink p-2 outline-none" value={vForm.status} onChange={e => setVForm({...vForm, status: e.target.value})} placeholder="ACTIVE, RELEASED, etc." /></div>
              
              <div className="mt-4"><label className="block mb-1 opacity-50">Title (EN)</label><input className="w-full bg-ink/5 border border-ink p-2 outline-none" value={vForm.enTitle} onChange={e => setVForm({...vForm, enTitle: e.target.value})} /></div>
              <div><label className="block mb-1 opacity-50">Title (RU)</label><input className="w-full bg-ink/5 border border-ink p-2 outline-none" value={vForm.ruTitle} onChange={e => setVForm({...vForm, ruTitle: e.target.value})} /></div>
              
              <div className="mt-4"><label className="block mb-1 opacity-50">Description (EN)</label><textarea className="w-full bg-ink/5 border border-ink p-2 outline-none h-24" value={vForm.enDesc} onChange={e => setVForm({...vForm, enDesc: e.target.value})} /></div>
              <div><label className="block mb-1 opacity-50">Description (RU)</label><textarea className="w-full bg-ink/5 border border-ink p-2 outline-none h-24" value={vForm.ruDesc} onChange={e => setVForm({...vForm, ruDesc: e.target.value})} /></div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button onClick={() => setEditingVersion(null)} className="px-4 py-2 border border-ink hover:bg-ink hover:text-paper uppercase text-sm">Cancel</button>
              <button onClick={saveVersion} className="px-4 py-2 border border-accent bg-accent text-paper hover:bg-transparent hover:text-accent uppercase text-sm">Save</button>
            </div>
          </div>
        </div>
      )}

      {isAdmin && (
        <div className="mb-8">
           <button onClick={openNewVersion} className="border border-accent text-accent px-4 py-2 uppercase font-mono text-xs hover:bg-accent hover:text-paper">
             + Add New Version
           </button>
        </div>
      )}

      <div className="relative pl-8 md:pl-0">
        {/* Vertical Line */}
        <div className="absolute left-0 md:left-[120px] top-0 bottom-0 w-px bg-ink"></div>
        
        <div className="space-y-12">
          {t.items.map((ver: any, i: number) => (
            <div key={i} className="relative md:pl-[160px] group/ver">
              {/* Tick mark */}
              <div className="absolute left-0 md:left-[120px] top-6 w-4 h-px bg-ink -translate-x-full md:translate-x-0"></div>
              
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                <div className="font-mono text-sm w-24 shrink-0 pt-4 md:pt-0 md:absolute md:left-0 md:top-4 md:text-right">
                  <div className="font-bold text-accent">{ver.id}</div>
                  <div className="text-ink-muted text-xs">{ver.date}</div>
                </div>
                
                <div className="border border-ink p-6 w-full bg-paper hover:bg-ink hover:text-paper transition-none group relative">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2 md:gap-0">
                    <h3 className="font-display text-xl uppercase tracking-tight">{ver.title}</h3>
                    <span className={`font-mono text-xs px-2 py-1 border self-start ${ver.status === 'ACTIVE' || ver.status === 'АКТИВНО' ? 'border-accent text-accent group-hover:border-accent' : 'border-ink group-hover:border-paper'}`}>
                      {ver.status}
                    </span>
                  </div>
                  <p className="font-body text-lg text-ink/80 group-hover:text-paper/80">
                    {ver.desc}
                  </p>
                  
                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex gap-2">
                       <button onClick={() => openEditVersion(i)} className="bg-paper text-ink px-2 py-1 uppercase font-mono text-[10px] border border-ink hover:bg-accent hover:border-accent hover:text-paper shadow-sm">
                         [EDIT]
                       </button>
                       <button onClick={() => deleteVersion(i)} className="bg-paper text-ink px-2 py-1 uppercase font-mono text-[10px] border border-ink hover:bg-red-500 hover:border-red-500 hover:text-paper shadow-sm">
                         [DEL]
                       </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface Message {
  role: 'user' | 'assistant';
  text: string;
  isAuthPrompt?: boolean;
}

const Console = ({ lang, user, isAdmin }: { lang: Lang, user: User | null, isAdmin: boolean }) => {
  const t = content[lang].console;
  
  // Script purely for database migration
  const runMigration = async () => {
    try {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Initializing cloud migration...' }]);
      
      const historyData = content.en.history.items.map((item, i) => {
        const ruItem = content.ru.history.items[i];
        return {
          id: item.id,
          date: item.date,
          status: item.status,
          en: { title: item.title, desc: item.desc },
          ru: { title: ruItem.title, desc: ruItem.desc }
        };
      });

      const planData = content.en.plan.weeks.map((week, i) => {
        const ruWeek = content.ru.plan.weeks[i];
        return {
          id: `week_${i}`,
          en: { title: week.title, objective: (week as any).objective || '' },
          ru: { title: ruWeek.title, objective: (ruWeek as any).objective || '' },
          tasks: week.tasks.map((task, j) => {
            const ruTask = ruWeek.tasks[j];
            return {
              id: task.id,
              day: task.day,
              ref: (task as any).ref || null,
              en: { text: task.text },
              ru: { text: ruTask.text }
            };
          })
        };
      });

      await setDoc(doc(db, 'content', 'history'), { versions: historyData });
      await setDoc(doc(db, 'content', 'learning_plan'), { weeks: planData });

      setMessages(prev => [...prev, { role: 'assistant', text: 'MIGRATION COMPLETE. Data synced to Firestore /content collection.' }]);
    } catch (e: any) {
      setMessages(prev => [...prev, { role: 'assistant', text: `MIGRATION FAILED: ${e.message}` }]);
    }
  };
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: t.welcome }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [commandsData, setCommandsData] = useState<any>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [traffic, setTraffic] = useState(0);
  const [editForm, setEditForm] = useState({
    now: '',
    manifesto: '',
    lab: '',
    background: '',
    stats: '',
    whoami: '',
    tempAvatarUrl: '',
    tempAvatarExpiresAt: 0,
    tempAvatarHours: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTraffic(Math.floor(Math.random() * 900) + 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Subscribe to content/terminal from Firestore
    const unsub = onSnapshot(doc(db, 'content', 'terminal'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCommandsData(data);
        setEditForm({
          now: data.now || '',
          manifesto: data.manifesto || '',
          lab: data.lab || '',
          background: data.background || '',
          stats: data.stats || '',
          whoami: data.whoami || '',
          tempAvatarUrl: data.tempAvatarUrl || '',
          tempAvatarExpiresAt: data.tempAvatarExpiresAt || 0,
          tempAvatarHours: 0
        });
      }
    });
    return () => unsub();
  }, []);

  const saveCommands = async () => {
    const dataToSave = { ...editForm };
    if (dataToSave.tempAvatarHours && dataToSave.tempAvatarHours > 0) {
      dataToSave.tempAvatarExpiresAt = Date.now() + (Number(dataToSave.tempAvatarHours) * 3600 * 1000);
      delete (dataToSave as any).tempAvatarHours;
    }
    try {
      await setDoc(doc(db, 'content', 'terminal'), dataToSave, { merge: true });
      setShowEditor(false);
    } catch (e) {
      console.error('Failed to save commands', e);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Intercept system commands
    if (userMsg.toLowerCase() === 'godmode') {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: 'Initiating secure connection... Click [AUTHENTICATE] to proceed.',
        isAuthPrompt: true 
      }]);
      setIsLoading(false);
      return;
    }

    if (userMsg.toLowerCase() === 'exit' && user) {
      await signOut(auth);
      setMessages(prev => [...prev, { role: 'assistant', text: 'Session terminated. Returned to public mode.' }]);
      setIsLoading(false);
      return;
    }

    if (userMsg.toLowerCase() === 'migrate') {
      if (isAdmin) {
        runMigration();
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: 'ACCESS DENIED. Admin privilege required.' }]);
      }
      setIsLoading(false);
      return;
    }

    // Hardcoded Terminal Commands
    const triggerMsg = userMsg.toLowerCase();
    
    // Slight artificial delay for that old-school parsing feel
    setTimeout(() => {
      let responseText = '';
      
      switch (triggerMsg) {
        case '/help':
          responseText = (t as any).cmd_help;
          break;
        case '/now':
          responseText = commandsData?.now || (t as any).cmd_now;
          break;
        case '/manifesto':
          responseText = commandsData?.manifesto || (t as any).cmd_manifesto;
          break;
        case '/lab':
          responseText = commandsData?.lab || (t as any).cmd_lab;
          break;
        case '/background':
          responseText = commandsData?.background || (t as any).cmd_background;
          break;
        case '/stats':
          responseText = commandsData?.stats || (t as any).cmd_stats;
          break;
        case '/whoami':
          responseText = commandsData?.whoami || (t as any).cmd_whoami;
          break;
        default:
          responseText = (t as any).cmd_not_found;
          break;
      }
      
      setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
      setIsLoading(false);
    }, 500);

  };

  const handleManualAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      await signInWithPopup(auth, provider);
      
      try {
        // PING FIRESTORE: Проверяем права после успешного логина
        const configDoc = await getDoc(doc(db, 'system', 'config'));
        setMessages(prev => [...prev, { role: 'assistant', text: `Access granted. Hello Akmal. System control unlocked.` }]);
        // Здесь не нужно вызывать setIsAdmin(true), так как onAuthStateChanged сделает это реактивно
      } catch {
        // Зашел не админ
        setMessages(prev => [...prev, { role: 'assistant', text: 'Identity rejected. Public mode retained.' }]);
        await signOut(auth); // Сразу выкидываем
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: `Authorization aborted. [ERROR: ${error.message}]` }]);
    }
  };

  return (
    <div className="animate-in fade-in duration-0 h-full flex flex-col">
      <div className="flex-1 bg-ink text-accent p-6 md:p-8 flex flex-col min-h-[500px] max-h-[700px] overflow-hidden font-mono shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-accent/30 mb-6">
          <div className="flex items-center gap-4">
            <span className="uppercase tracking-widest">{t.title}</span>
            <span className="font-mono text-xs opacity-50 hidden md:inline">RX: {traffic}kb/s</span>
          </div>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <button 
                onClick={() => setShowEditor(true)}
                className="text-xs border border-accent px-2 py-0.5 hover:bg-accent hover:text-ink transition-colors flex items-center gap-1"
                title="Edit Terminal Commands"
              >
                <Edit2 size={12} /> EDIT_COMMANDS
              </button>
            )}
            {user && (
              <button 
                onClick={async () => {
                  await signOut(auth);
                  setMessages(prev => [...prev, { role: 'assistant', text: 'Session terminated manually. Returned to public mode.' }]);
                }}
                className="text-xs border border-accent px-2 py-0.5 hover:bg-accent hover:text-ink transition-colors"
                title="Disconnect / Logout"
              >
                LOGOUT
              </button>
            )}
            <div className="w-3 h-3 bg-accent"></div>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2 custom-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className="flex flex-col items-start">
              <div className="text-accent whitespace-pre-wrap leading-relaxed">
                <span className="opacity-70 mr-2">{m.role === 'assistant' ? t.sysPrefix : t.userPrefix}</span>
                {m.role === 'assistant' ? <Typewriter text={m.text} speed={40} /> : m.text}
              </div>
              {(m.text.includes('PAST EXPERIENCE') || m.text.includes('ПРОШЛЫЙ ОПЫТ')) && (
                <div className="flex flex-wrap gap-2 mt-3">
                  <a href="https://www.instagram.com/12_inch_store/" target="_blank" rel="noopener noreferrer" className="px-4 py-1 border border-accent hover:bg-accent hover:text-ink transition-none uppercase tracking-widest text-sm">Handmade Vinyl Clocks</a>
                  <a href="https://www.instagram.com/welight.uz/" target="_blank" rel="noopener noreferrer" className="px-4 py-1 border border-accent hover:bg-accent hover:text-ink transition-none uppercase tracking-widest text-sm">Custom Design Lamps</a>
                  <a href="https://www.instagram.com/carta.coffee/" target="_blank" rel="noopener noreferrer" className="px-4 py-1 border border-accent hover:bg-accent hover:text-ink transition-none uppercase tracking-widest text-sm">Drip Coffee</a>
                </div>
               )}
              {m.isAuthPrompt && !user && (
                <button 
                  onClick={handleManualAuth}
                  className="mt-3 px-4 py-1 border border-accent hover:bg-accent hover:text-ink transition-none uppercase tracking-widest text-sm"
                >
                  [AUTHENTICATE]
                </button>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="text-accent animate-pulse">
              <span className="opacity-70 mr-2">{t.sysPrefix}</span>
              _
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        
        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-3 border-t border-accent/30 pt-6 items-center">
          <span className="opacity-70">{t.inputPrefix}</span>
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.placeholder}
            className="flex-1 bg-transparent border-none outline-none text-accent placeholder:text-accent/30"
            autoFocus
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="hidden md:block px-4 py-1 border border-accent/30 hover:bg-accent hover:text-ink disabled:opacity-50 disabled:cursor-not-allowed transition-none"
          >
            {t.send}
          </button>
        </form>
      </div>

      {/* Editor Modal for Admin */}
      {showEditor && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/90 backdrop-blur-sm animate-in fade-in">
          <div className="bg-ink border border-accent w-full max-w-2xl max-h-[90vh] flex flex-col font-mono shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-accent/30">
              <h3 className="text-accent uppercase tracking-widest flex items-center gap-2">
                <Database size={16} /> TERMINAL_CONFIG
              </h3>
              <button onClick={() => setShowEditor(false)} className="text-accent hover:opacity-70">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto space-y-6 text-sm">
              {Object.keys(editForm).filter(k => k !== 'tempAvatarUrl' && k !== 'tempAvatarExpiresAt').map((key) => (
                <div key={key}>
                  <label className="block text-accent opacity-70 mb-2 uppercase">/{key}</label>
                  <textarea
                    value={(editForm as any)[key]}
                    onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                    className="w-full bg-black/30 border border-accent/30 text-accent p-3 focus:outline-none focus:border-accent min-h-[100px] resize-y custom-scrollbar"
                    placeholder={`Enter response for /${key} command...`}
                  />
                </div>
              ))}
              <div className="border-t border-accent/30 pt-6 mt-6">
                <label className="block text-accent opacity-70 mb-2 uppercase">Temporary Avatar URL</label>
                <input
                  type="text"
                  className="w-full bg-black/30 border border-accent/30 text-accent p-3 focus:outline-none focus:border-accent mb-2"
                  placeholder="https://i.ibb.co/..."
                  value={(editForm as any).tempAvatarUrl}
                  onChange={(e) => setEditForm({ ...editForm, tempAvatarUrl: e.target.value })}
                />
                <label className="block text-accent opacity-70 mb-2 uppercase">Duration (Hours)</label>
                <input
                  type="number"
                  className="w-full bg-black/30 border border-accent/30 text-accent p-3 focus:outline-none focus:border-accent"
                  placeholder="24"
                  value={(editForm as any).tempAvatarHours}
                  onChange={(e) => setEditForm({ ...editForm, tempAvatarHours: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="p-4 border-t border-accent/30 flex justify-end gap-3 bg-black/20">
              <button 
                onClick={() => setShowEditor(false)}
                className="px-4 py-2 border border-accent/30 text-accent hover:bg-accent/10 transition-colors"
              >
                CANCEL
              </button>
              <button 
                onClick={saveCommands}
                className="px-4 py-2 bg-accent text-ink hover:opacity-90 font-bold transition-opacity flex items-center gap-2"
              >
                <Save size={16} /> SAVE_CHANGES
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Persist language to localStorage
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('akmal_os_lang');
    if (saved === 'en' || saved === 'ru') return saved;
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('akmal_os_lang', lang);
  }, [lang]);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [now, setNow] = useState(new Date());
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rawPlanData, setRawPlanData] = useState<any[] | null>(null);
  const [rawHistoryData, setRawHistoryData] = useState<any[] | null>(null);
  const [rawWorksData, setRawWorksData] = useState<any[] | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          // PING FIRTESTORE: Пытаемся прочитать секретный документ
          // Если мы не админ (на уровне серверов Google), будет выбита ошибка
          await getDoc(doc(db, 'system', 'config'));
          setIsAdmin(true); // Успех! Ошибки нет, мы админ
        } catch {
          setIsAdmin(false); // Зашел кто-то чужой, доступ только к публичной части
        }
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Обновляем время каждую минуту, чтобы аптайм не застывал, если вкладка открыта долго
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Firestore Data Sync
  useEffect(() => {
    // Sync Content (Learning Plan) for everyone (real-time is better)
    const planRef = doc(db, 'content', 'learning_plan');
    const unsubPlan = onSnapshot(planRef, (docSnap) => {
      if (docSnap.exists()) {
        setRawPlanData(docSnap.data().weeks || null);
      }
    });

    const historyRef = doc(db, 'content', 'history');
    const unsubHistory = onSnapshot(historyRef, (docSnap) => {
      if (docSnap.exists()) {
        setRawHistoryData(docSnap.data().versions || null);
      }
    });

    const worksRef = doc(db, 'content', 'works');
    const unsubWorks = onSnapshot(worksRef, (docSnap) => {
      if (docSnap.exists()) {
        setRawWorksData(docSnap.data().items || null);
      }
    });

    const docRef = doc(db, 'progress', 'akmal');
    let unsubProgress: any = null;

    if (isAdmin) {
      // Admin: Real-time sync for progress
      unsubProgress = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCompleted(data.completed || {});
          setRatings(data.ratings || {});
          setNotes(data.notes || {});
        }
      }, (error) => {
        console.error("Firestore sync error:", error);
      });
    } else {
      // Public: One-time fetch for progress
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCompleted(data.completed || {});
          setRatings(data.ratings || {});
          setNotes(data.notes || {});
        }
      }).catch(error => {
        console.error("Firestore fetch error:", error);
      });
    }

    return () => {
      unsubPlan();
      unsubHistory();
      unsubWorks();
      if (unsubProgress) unsubProgress();
    };
  }, [isAdmin]);

  const saveToFirestore = async (newCompleted: Record<string, boolean>, newRatings: Record<string, number>, newNotes: Record<string, string>) => {
    if (!isAdmin) return;
    try {
      await setDoc(doc(db, 'progress', 'akmal'), {
        completed: newCompleted,
        ratings: newRatings,
        notes: newNotes,
        lastUpdated: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      console.error("Error saving to Firestore:", error);
    }
  };

  const toggleTask = (id: string) => {
    if (!isAdmin) return; // Only admin can edit
    const next = { ...completed, [id]: !completed[id] };
    setCompleted(next);
    saveToFirestore(next, ratings, notes);
  };

  const updateRating = (id: string, rating: number) => {
    if (!isAdmin) return; // Only admin can edit
    const next = { ...ratings, [id]: rating };
    setRatings(next);
    saveToFirestore(completed, next, notes);
  };

  const updateNote = (id: string, note: string) => {
    if (!isAdmin) return; // Only admin can edit
    const next = { ...notes, [id]: note };
    setNotes(next);
    saveToFirestore(completed, ratings, next);
  };

  const t = content[lang].nav;
  
  // Transform rawPlanData to localized format if available, else fallback to hardcoded
  const planData = rawPlanData ? rawPlanData.map(w => ({
    week: w.id.replace('week_', ''),
    title: w[lang]?.title || '',
    objective: w[lang]?.objective || '',
    tasks: w.tasks.map((t: any) => ({
      id: t.id,
      day: t.day,
      ref: t.ref,
      url: t.url,
      text: t[lang]?.text || ''
    }))
  })) : content[lang].plan.weeks;

  // Add functionality to save edited plan back to Firestore
  const savePlanToFirestore = async (updatedRawPlan: any[]) => {
    if (!isAdmin) return;
    try {
      await setDoc(doc(db, 'content', 'learning_plan'), { weeks: updatedRawPlan }, { merge: true });
    } catch (error) {
      console.error("Error saving plan:", error);
    }
  };

  const saveHistoryToFirestore = async (updatedRawHistory: any[]) => {
    if (!isAdmin) return;
    try {
      await setDoc(doc(db, 'content', 'history'), { versions: updatedRawHistory }, { merge: true });
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };

  const saveWorksToFirestore = async (updatedRawWorks: any[]) => {
    if (!isAdmin) return;
    try {
      await setDoc(doc(db, 'content', 'works'), { items: updatedRawWorks }, { merge: true });
    } catch (error) {
      console.error("Error saving works:", error);
    }
  };

  const worksData = rawWorksData ? {
    title: content[lang].works.title,
    meta: content[lang].works.meta,
    typeLabel: content[lang].works.typeLabel,
    items: rawWorksData.map(w => ({
      id: w.id,
      date: w.date,
      url: w.url,
      tgUrl: w.tgUrl,
      images: w.images || [],
      techStack: w.techStack || [],
      title: w[lang]?.title || '',
      type: w[lang]?.type || '',
      desc: w[lang]?.desc || '',
      lessons: w[lang]?.lessons || ''
    }))
  } : content[lang].works;
  const historyData = rawHistoryData ? {
    title: content[lang].history.title,
    meta: content[lang].history.meta,
    items: rawHistoryData.map(v => ({
      id: v.id,
      date: v.date,
      status: v.status,
      title: v[lang]?.title || '',
      desc: v[lang]?.desc || ''
    }))
  } : content[lang].history;

  const startDate = new Date('2026-03-30T00:00:00');
  const diffTime = Math.abs(now.getTime() - startDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const navItems = [
    { id: '/', label: t.home, icon: Activity },
    { id: '/plan', label: t.plan, icon: ListChecks },
    { id: '/skills', label: t.skills, icon: Database },
    { id: '/progress', label: t.progress, icon: Activity },
    { id: '/works', label: t.works, icon: Folder },
    { id: '/console', label: t.console, icon: Terminal },
    { id: '/history', label: t.history, icon: History },
  ];

  // No longer using switch statement, Routes handle it in the render

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ru' : 'en');
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-paper text-ink selection:bg-accent selection:text-paper">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-ink bg-paper sticky top-0 z-50">
        <div className="font-display text-xl uppercase tracking-tight leading-none">
          AKMAL'S PROGRESS<br/>ATLAS v1.0
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleLang}
            className="border border-ink px-2 py-1 font-mono text-xs hover:bg-ink hover:text-paper uppercase"
          >
            {lang}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="border border-ink p-2 hover:bg-ink hover:text-paper"
          >
            <Terminal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className={`
        ${mobileMenuOpen ? 'block' : 'hidden'} 
        md:block w-full md:w-72 border-b md:border-b-0 md:border-r border-ink p-6 
        flex flex-col sticky top-[73px] md:top-0 bg-paper z-40 h-[calc(100vh-73px)] md:h-screen overflow-y-auto
      `}>
        <div className="hidden md:flex justify-between items-start mb-12 border-b-4 border-ink pb-6">
          <div className="font-display text-3xl uppercase tracking-tight">
            AKMAL'S PROGRESS<br/>ATLAS v1.0
          </div>
          <button 
            onClick={toggleLang}
            className="border border-ink px-2 py-1 font-mono text-xs hover:bg-ink hover:text-paper uppercase flex items-center gap-1"
            title="Switch Language"
          >
            <Globe className="w-3 h-3" />
            {lang}
          </button>
        </div>
        
        <div className="font-mono text-xs uppercase text-ink-muted mb-4 tracking-widest">
          {t.index}
        </div>
        
        <ul className="flex flex-col gap-1 font-mono text-sm">
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.id || (item.id !== '/' && location.pathname.startsWith(item.id));
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    navigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 text-left uppercase px-3 py-3 border border-transparent hover:border-ink hover:bg-ink hover:text-paper transition-none ${isActive ? 'bg-ink text-paper border-ink' : ''}`}
                >
                  <span className="opacity-50 text-xs">0{i + 1}</span>
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </button>
              </li>
            );
          })}
        </ul>
        
        <div className="mt-auto pt-8 border-t border-ink font-mono text-xs text-ink-muted flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>{t.systemReady}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>{t.uptime}{diffDays}{t.days}</span>
            <span className={isAdmin ? 'text-accent' : 'opacity-50'}>
              {isAdmin ? '[ADMIN MODE]' : '[PUBLIC MODE]'}
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-16 lg:p-24 max-w-6xl w-full mx-auto overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home lang={lang} setCurrentPage={(p) => navigate(`/${p !== 'home' ? p : ''}`)} isAdmin={isAdmin} />} />
          <Route path="/plan" element={<LearningPlan lang={lang} completed={completed} toggleTask={toggleTask} planData={planData} ratings={ratings} updateRating={updateRating} notes={notes} updateNote={updateNote} isAdmin={isAdmin} rawPlanData={rawPlanData} savePlanToFirestore={savePlanToFirestore} />} />
          <Route path="/skills" element={<Skills lang={lang} />} />
          <Route path="/progress" element={<Progress lang={lang} completed={completed} planData={planData} />} />
          <Route path="/works" element={<Works lang={lang} worksData={worksData} isAdmin={isAdmin} rawWorksData={rawWorksData} saveWorksToFirestore={saveWorksToFirestore} />} />
          <Route path="/console" element={<Console lang={lang} user={user} isAdmin={isAdmin} />} />
          <Route path="/history" element={<VersionHistory lang={lang} historyData={historyData} isAdmin={isAdmin} rawHistoryData={rawHistoryData} saveHistoryToFirestore={saveHistoryToFirestore} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
    </div>
  );
}
