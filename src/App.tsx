import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ArrowRight, Activity, Database, Folder, Mail, Cpu, ChevronRight, History, ListChecks, Globe } from 'lucide-react';
import { content, Lang } from './translations';

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

// --- PAGES ---

const Home = ({ lang, setCurrentPage }: { lang: Lang, setCurrentPage: (page: string) => void }) => {
  const t = content[lang].home;
  const [time, setTime] = useState(new Date().toISOString());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toISOString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-in fade-in duration-0">
      <PageHeader title={t.title} metadata={t.meta} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <p className="font-body text-xl md:text-2xl leading-relaxed">
            {t.p1}
          </p>
          <p className="font-body text-lg leading-relaxed text-ink/80">
            {t.p2}
          </p>
          <p className="font-body text-lg leading-relaxed text-ink/80">
            {t.p3}
          </p>
          
          <div className="pt-8">
            <button 
              onClick={() => setCurrentPage('plan')}
              className="group flex items-center gap-4 border-2 border-ink px-6 py-4 font-mono text-sm uppercase hover:bg-ink hover:text-paper transition-none"
            >
              <span>{t.btn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-75" />
            </button>
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
              <span className="text-accent">{time.split('T')[1].split('.')[0]}</span>
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
    </div>
  );
};

const Skills = ({ lang }: { lang: Lang }) => {
  const t = content[lang].skills;
  return (
    <div className="animate-in fade-in duration-0">
      <PageHeader title={t.title} metadata={t.meta} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-ink">
        {/* Col 1 */}
        <div className="border-r border-b border-ink p-6">
          <div className="font-mono text-xs uppercase mb-6 text-accent flex items-center gap-2">
            <span className="w-2 h-2 bg-accent inline-block"></span>
            {t.col1}
          </div>
          <div className="flex flex-wrap gap-2">
            {t.tags.col1.map((tag, i) => <Tag key={i} active>{tag}</Tag>)}
          </div>
        </div>

        {/* Col 2 */}
        <div className="border-r border-b border-ink p-6">
          <div className="font-mono text-xs uppercase mb-6 text-ink-muted flex items-center gap-2">
            <span className="w-2 h-2 border border-ink-muted inline-block"></span>
            {t.col2}
          </div>
          <div className="flex flex-wrap gap-2">
            {t.tags.col2.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
          </div>
        </div>

        {/* Col 3 */}
        <div className="border-r border-b border-ink p-6 bg-ink/5">
          <div className="font-mono text-xs uppercase mb-6 text-ink-muted flex items-center gap-2">
            <span className="w-2 h-2 bg-ink-muted inline-block"></span>
            {t.col3}
          </div>
          <div className="flex flex-wrap gap-2 opacity-60">
            {t.tags.col3.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
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

const Works = ({ lang }: { lang: Lang }) => {
  const t = content[lang].works;
  return (
    <div className="animate-in fade-in duration-0">
      <PageHeader title={t.title} metadata={t.meta} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {t.items.map((art) => (
          <div key={art.id} className="border-t-4 border-ink border-x border-b p-6 flex flex-col group cursor-pointer hover:bg-ink hover:text-paper transition-none">
            <div className="aspect-video bg-ink/10 mb-6 border border-ink group-hover:border-paper/30 flex items-center justify-center overflow-hidden relative">
               <div className="absolute inset-0 opacity-20 group-hover:opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-ink) 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
               <span className="font-mono text-4xl opacity-20 group-hover:opacity-100 group-hover:text-paper transition-none z-10">{art.id}</span>
            </div>
            <h3 className="font-display text-2xl uppercase tracking-tight mb-4">{art.title}</h3>
            <div className="mt-auto flex justify-between font-mono text-xs border-t border-ink/20 group-hover:border-paper/20 pt-4">
              <span className="uppercase text-ink-muted group-hover:text-paper/70">{t.typeLabel} {art.type}</span>
              <span className="text-ink-muted group-hover:text-paper/70">{art.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- LAYOUT ---

const LearningPlan = ({ lang, completed, toggleTask, planData }: { lang: Lang, completed: Record<string, boolean>, toggleTask: (id: string) => void, planData: any[] }) => {
  const t = content[lang].plan;

  const totalTasks = planData.reduce((acc, w) => acc + w.tasks.length, 0);
  const completedCount = Object.values(completed).filter(Boolean).length;
  const overallPercent = Math.round((completedCount / totalTasks) * 100) || 0;
  
  const getAsciiBar = (percent: number, length = 20) => {
    const filled = Math.round((percent / 100) * length);
    return `[${'█'.repeat(filled)}${'░'.repeat(length - filled)}]`;
  };

  return (
    <div className="animate-in fade-in duration-0">
      <PageHeader title={t.title} metadata={t.meta} />
      
      {/* Overall Progress */}
      <div className="border border-ink p-6 mb-12 bg-ink text-paper">
         <div className="font-mono text-xs uppercase mb-4 text-ink-muted">{t.overall}</div>
         <div className="font-mono text-accent text-xl md:text-3xl tracking-widest mb-2">
           {getAsciiBar(overallPercent, 20)} {overallPercent}%
         </div>
         <div className="font-mono text-xs text-ink-muted">
           {completedCount} / {totalTasks} {t.tasksCompleted}
         </div>
      </div>

      {/* Weeks */}
      <div className="space-y-12">
        {planData.map(week => {
           const weekTotal = week.tasks.length;
           const weekCompleted = week.tasks.filter((task: any) => completed[task.id]).length;
           const weekPercent = Math.round((weekCompleted / weekTotal) * 100) || 0;

           return (
             <div key={week.week} className="border border-ink">
               <div className="border-b border-ink p-4 bg-ink/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div>
                   <div className="font-mono text-xs text-ink-muted uppercase mb-1">{t.week} {week.week}</div>
                   <h3 className="font-display text-xl uppercase tracking-tight">{week.title}</h3>
                 </div>
                 <div className="font-mono text-sm text-accent text-left md:text-right">
                   <div className="hidden md:block">{getAsciiBar(weekPercent, 10)} {weekPercent}%</div>
                   <div className="md:hidden">{getAsciiBar(weekPercent, 15)} {weekPercent}%</div>
                 </div>
               </div>
               
               <div className="divide-y divide-ink">
                 {week.tasks.map((task: any) => (
                   <div 
                     key={task.id} 
                     onClick={() => toggleTask(task.id)}
                     className="p-4 flex flex-col md:flex-row md:items-center gap-4 hover:bg-ink hover:text-paper transition-none cursor-pointer group"
                   >
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
                     </div>
                     <a 
                       href="#" 
                       onClick={(e) => { e.stopPropagation(); e.preventDefault(); }} 
                       className="font-mono text-xs border border-ink px-2 py-1 text-ink-muted hover:bg-paper hover:text-ink group-hover:border-paper group-hover:text-paper ml-[4.5rem] md:ml-0 self-start md:self-auto shrink-0"
                     >
                       {t.ref}
                     </a>
                   </div>
                 ))}
               </div>
             </div>
           )
        })}
      </div>
    </div>
  );
};

const VersionHistory = ({ lang }: { lang: Lang }) => {
  const t = content[lang].history;
  return (
    <div className="animate-in fade-in duration-0">
      <PageHeader title={t.title} metadata={t.meta} />
      
      <div className="relative pl-8 md:pl-0">
        {/* Vertical Line */}
        <div className="absolute left-0 md:left-[120px] top-0 bottom-0 w-px bg-ink"></div>
        
        <div className="space-y-12">
          {t.items.map((ver, i) => (
            <div key={i} className="relative md:pl-[160px]">
              {/* Tick mark */}
              <div className="absolute left-0 md:left-[120px] top-6 w-4 h-px bg-ink -translate-x-full md:translate-x-0"></div>
              
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                <div className="font-mono text-sm w-24 shrink-0 pt-4 md:pt-0 md:absolute md:left-0 md:top-4 md:text-right">
                  <div className="font-bold text-accent">{ver.id}</div>
                  <div className="text-ink-muted text-xs">{ver.date}</div>
                </div>
                
                <div className="border border-ink p-6 w-full bg-paper hover:bg-ink hover:text-paper transition-none group">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2 md:gap-0">
                    <h3 className="font-display text-xl uppercase tracking-tight">{ver.title}</h3>
                    <span className={`font-mono text-xs px-2 py-1 border self-start ${ver.status === 'ACTIVE' || ver.status === 'АКТИВНО' ? 'border-accent text-accent group-hover:border-accent' : 'border-ink group-hover:border-paper'}`}>
                      {ver.status}
                    </span>
                  </div>
                  <p className="font-body text-lg text-ink/80 group-hover:text-paper/80">
                    {ver.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('en');
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('learningOS_plan');
    if (saved) {
      try {
        setCompleted(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse learning plan state');
      }
    }
  }, []);

  const toggleTask = (id: string) => {
    const next = { ...completed, [id]: !completed[id] };
    setCompleted(next);
    localStorage.setItem('learningOS_plan', JSON.stringify(next));
  };

  const t = content[lang].nav;
  const planData = content[lang].plan.weeks;

  const navItems = [
    { id: 'home', label: t.home, icon: Activity },
    { id: 'plan', label: t.plan, icon: ListChecks },
    { id: 'skills', label: t.skills, icon: Database },
    { id: 'progress', label: t.progress, icon: Activity },
    { id: 'works', label: t.works, icon: Folder },
    { id: 'history', label: t.history, icon: History },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home lang={lang} setCurrentPage={setCurrentPage} />;
      case 'plan': return <LearningPlan lang={lang} completed={completed} toggleTask={toggleTask} planData={planData} />;
      case 'skills': return <Skills lang={lang} />;
      case 'progress': return <Progress lang={lang} completed={completed} planData={planData} />;
      case 'works': return <Works lang={lang} />;
      case 'history': return <VersionHistory lang={lang} />;
      default: return <Home lang={lang} setCurrentPage={setCurrentPage} />;
    }
  };

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
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setCurrentPage(item.id);
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
          <div>{t.memOk}</div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-16 lg:p-24 max-w-6xl w-full mx-auto overflow-x-hidden">
        {renderPage()}
      </main>
      
    </div>
  );
}
