import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ArrowRight, Activity, Database, Folder, Mail, Cpu, ChevronRight, History, ListChecks, Globe } from 'lucide-react';
import { content, Lang } from './translations';
import { GoogleGenAI } from '@google/genai';
import { auth } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';

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

const LearningPlan = ({ 
  lang, completed, toggleTask, planData, ratings, updateRating, notes, updateNote 
}: { 
  lang: Lang, 
  completed: Record<string, boolean>, 
  toggleTask: (id: string) => void, 
  planData: any[],
  ratings: Record<string, number>,
  updateRating: (id: string, rating: number) => void,
  notes: Record<string, string>,
  updateNote: (id: string, note: string) => void
}) => {
  const t = content[lang].plan;
  const [viewMode, setViewMode] = useState<'main' | 'bg'>('main');

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
                   className="p-4 flex flex-col gap-3 hover:bg-ink hover:text-paper transition-none group"
                 >
                   <div className="flex flex-col md:flex-row md:items-center gap-4 cursor-pointer" onClick={() => toggleTask(task.id)}>
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
                             onClick={(e) => { e.stopPropagation(); updateRating(task.id, num); }}
                             className={`w-5 h-5 flex items-center justify-center border ${ratings[task.id] === num ? 'border-accent text-accent' : 'border-current opacity-50 hover:opacity-100'}`}
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
                         onChange={(e) => updateNote(task.id, e.target.value)}
                         placeholder="..."
                         className="flex-1 bg-transparent border-b border-current opacity-50 focus:opacity-100 outline-none px-1 py-0.5 placeholder:text-current placeholder:opacity-30"
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
            <div className="flex items-start gap-4 cursor-pointer" onClick={() => toggleTask(task.id)}>
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
                      onClick={(e) => { e.stopPropagation(); updateRating(task.id, num); }}
                      className={`w-5 h-5 flex items-center justify-center border ${ratings[task.id] === num ? 'border-accent text-accent' : 'border-current hover:opacity-80'}`}
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
                  onChange={(e) => updateNote(task.id, e.target.value)}
                  placeholder="..."
                  className="flex-1 bg-transparent border-b border-current outline-none px-1 py-0.5 placeholder:text-current placeholder:opacity-30"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-0">
      <PageHeader title={t.title} metadata={t.meta} />
      
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

interface Message {
  role: 'user' | 'assistant';
  text: string;
  isAuthPrompt?: boolean;
}

const Console = ({ lang, user, isAdmin }: { lang: Lang, user: User | null, isAdmin: boolean }) => {
  const t = content[lang].console;
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: t.welcome }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

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

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'dummy') {
        throw new Error('API_KEY_MISSING');
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const contents = messages.slice(1).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: userMsg }] });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents as any,
        config: {
          systemInstruction: "You are an AI learning assistant for Akmal. Answer technically, brutally concisely, and in the language the user speaks.",
        }
      });

      setMessages(prev => [...prev, { role: 'assistant', text: response.text || '' }]);
    } catch (error: any) {
      console.error(error);
      if (error.message === 'API_KEY_MISSING' || error.message?.includes('400') || error.message?.includes('403')) {
        setMessages(prev => [...prev, { role: 'assistant', text: (t as any).missingKey || t.error }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: t.error }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      const result = await signInWithPopup(auth, provider);
      if (result.user.email === 'genialnee@gmail.com') {
        setMessages(prev => [...prev, { role: 'assistant', text: 'Access granted. Welcome, Akmal.' }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: 'Identity rejected. Public mode retained.' }]);
        await signOut(auth);
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
          <span className="uppercase tracking-widest">{t.title}</span>
          <div className="w-3 h-3 bg-accent"></div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2 custom-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className="flex flex-col items-start">
              <div className="text-accent whitespace-pre-wrap leading-relaxed">
                <span className="opacity-70 mr-2">{m.role === 'assistant' ? t.sysPrefix : t.userPrefix}</span>
                {m.text}
              </div>
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
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('en');
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [now, setNow] = useState(new Date());
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(currentUser?.email === 'genialnee@gmail.com');
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Обновляем время каждую минуту, чтобы аптайм не застывал, если вкладка открыта долго
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedPlan = localStorage.getItem('learningOS_plan');
    if (savedPlan) {
      try { setCompleted(JSON.parse(savedPlan)); } catch (e) {}
    }
    const savedRatings = localStorage.getItem('learningOS_ratings');
    if (savedRatings) {
      try { setRatings(JSON.parse(savedRatings)); } catch (e) {}
    }
    const savedNotes = localStorage.getItem('learningOS_notes');
    if (savedNotes) {
      try { setNotes(JSON.parse(savedNotes)); } catch (e) {}
    }
  }, []);

  const toggleTask = (id: string) => {
    const next = { ...completed, [id]: !completed[id] };
    setCompleted(next);
    localStorage.setItem('learningOS_plan', JSON.stringify(next));
  };

  const updateRating = (id: string, rating: number) => {
    const next = { ...ratings, [id]: rating };
    setRatings(next);
    localStorage.setItem('learningOS_ratings', JSON.stringify(next));
  };

  const updateNote = (id: string, note: string) => {
    const next = { ...notes, [id]: note };
    setNotes(next);
    localStorage.setItem('learningOS_notes', JSON.stringify(next));
  };

  const t = content[lang].nav;
  const planData = content[lang].plan.weeks;

  const startDate = new Date('2026-03-30T00:00:00');
  const diffTime = Math.abs(now.getTime() - startDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const navItems = [
    { id: 'home', label: t.home, icon: Activity },
    { id: 'plan', label: t.plan, icon: ListChecks },
    { id: 'skills', label: t.skills, icon: Database },
    { id: 'progress', label: t.progress, icon: Activity },
    { id: 'works', label: t.works, icon: Folder },
    { id: 'console', label: t.console, icon: Terminal },
    { id: 'history', label: t.history, icon: History },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home lang={lang} setCurrentPage={setCurrentPage} />;
      case 'plan': return <LearningPlan lang={lang} completed={completed} toggleTask={toggleTask} planData={planData} ratings={ratings} updateRating={updateRating} notes={notes} updateNote={updateNote} />;
      case 'skills': return <Skills lang={lang} />;
      case 'progress': return <Progress lang={lang} completed={completed} planData={planData} />;
      case 'works': return <Works lang={lang} />;
      case 'console': return <Console lang={lang} user={user} isAdmin={isAdmin} />;
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
        {renderPage()}
      </main>
      
    </div>
  );
}
