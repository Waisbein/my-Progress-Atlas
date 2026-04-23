export type Lang = 'en' | 'ru';

export const content = {
  en: {
    nav: {
      index: 'Index',
      home: 'Home',
      plan: 'Learning Plan',
      skills: 'Skill Map',
      progress: 'Progress',
      works: 'Works',
      console: 'Console',
      history: 'Version History',
      systemReady: 'SYSTEM_READY',
      uptime: 'UPTIME: ',
      days: ' DAYS'
    },
    home: {
      title: 'SYSTEM INIT',
      meta: '[SEC-01] // ROOT',
      p1: 'I\'m Akmal from Tashkent. I\'m 38, and I\'ve spent my whole life building businesses in the physical world: retail, imports, tangible products. Half a year ago, I decided to pivot to AI.',
      p2: 'Now I build products using neural networks, but I refuse to be just a "prompt engineer". I study code to understand what\'s under the hood and stop depending on the whims of a chatbot. I have zero ego about starting from scratch at this age. On the contrary—it drives me.',
      p3: 'I don\'t plan on becoming the best coder in the world. My goal is to rapidly turn ideas into working tools, and do it beautifully. This site is the honest documentation of my journey. Step by step. Commit by commit.',
      btn: 'OPEN LEARNING PLAN',
      sysStatus: 'System Status',
      user: 'USER',
      location: 'LOCATION',
      localTime: 'LOCAL_TIME',
      osVersion: 'OS_VERSION',
      status: 'STATUS',
      online: 'ONLINE',
      locValue: 'TASHKENT, UZ',
      sysOp: 'SYS_OPERATOR // AKMAL',
      opStatus: '[STATUS: COMPILING_REACT_SKILLS]',
      linksLabel: 'ACTIVE_CONNECTIONS',
      links: {
        github: 'TCP_PORT_80: GITHUB',
        telegram: 'DIRECT_PING: TELEGRAM',
        instagram: 'SOCIAL_FEED: INSTAGRAM'
      }
    },
    plan: {
      title: 'LEARNING PLAN',
      meta: '[SEC-02] // ACTIVE CURRICULUM',
      intro: 'This plan tracks both study and implementation. Not every completed item must be built into the site immediately, but every completed item must be recorded here.',
      week: 'Week',
      day: 'Day',
      ref: 'REF',
      overall: 'OVERALL PROGRESS',
      tasksCompleted: 'TASKS COMPLETED',
      understanding: 'UNDERSTANDING',
      note: 'NOTE',
      threads: {
        main: 'MAIN THREAD: WEB DEV',
        bg: 'BACKGROUND PROCESS: FOUNDATIONS',
      },
      foundations: {
        title: 'COMPUTER FOUNDATIONS',
        tasks: [
          { id: 'cf1', ref: 'CF-01', text: '[STUDY] What is a computer: input, output, memory, CPU' },
          { id: 'cf2', ref: 'CF-02', text: '[STUDY] Data representation: bits, bytes, binary logic' },
          { id: 'cf3', ref: 'CF-03', text: '[STUDY] How CPU works: fetch -> decode -> execute' },
          { id: 'cf4', ref: 'CF-04', text: '[STUDY] Memory: cache, RAM, storage' },
          { id: 'cf5', ref: 'CF-05', text: '[STUDY] Program execution via OS and hardware' },
          { id: 'cf6', ref: 'CF-06', text: '[STUDY] Nand2Tetris: boolean logic / gates / computer from first principles' }
        ]
      },
      weeks: [
        {
          week: 1,
          title: "System Model + Client-Server Flow",
          tasks: [
            { id: 'd1', day: 1, text: "[STUDY] Audit Dogwalk and 21day by layer" },
            { id: 'd2', day: 2, text: "[STUDY] Draw system map and user flow", url: 'https://notebooklm.google.com/notebook/8b6d184a-63a5-4825-a55f-6b2a1a3ec26a?authuser=1' },
            { id: 'd3', day: 3, text: "[STUDY] Review HTTP, REST, status codes, and CORS", url: 'https://notebooklm.google.com/notebook/5daa2630-0874-46ab-9c30-5661de121290?authuser=1' },
            { id: 'd4', day: 4, text: "[STUDY] Learn client-server flow and request lifecycle", url: 'https://notebooklm.google.com/notebook/7f79d3ee-94e4-418a-929e-38fafeb20902?authuser=1' },
            { id: 'd5', day: 5, text: "[STUDY] Map UI -> request -> server -> DB -> response -> UI", url: 'https://notebooklm.google.com/notebook/5daa2630-0874-46ab-9c30-5661de121290?authuser=1' },
            { id: 'd6', day: 6, text: "[BUILD] Set up learning plan tracking structure" },
            { id: 'd7', day: 7, text: "[REVIEW] Write week-one architecture note", artifact: "Architecture is the art of structuring complexity.\n\nThis week I learned that client-server flow isn't just about API calls, it's about defining the source of truth and minimizing latency at the mental model level.\n\nKey takeaways:\n1. The UI is just a projection of state.\n2. The server is the authoritative state manager.\n3. The database is the persistent memory.\n\nWhen we build, we are just managing data through time and space." },
          ]
        },
        {
          week: 2,
          title: "Data Model + SQL + Storage",
          tasks: [
            { id: 'd8', day: 8, text: "[STUDY] Design entities and relationships", url: 'https://notebooklm.google.com/notebook/8b6d184a-63a5-4825-a55f-6b2a1a3ec26a' },
            { id: 'd9', day: 9, text: "[STUDY] Practice SQL basics by hand" },
            { id: 'd10', day: 10, text: "[STUDY] Learn source of truth and data ownership" },
            { id: 'd11', day: 11, text: "[STUDY] Learn DB vs storage vs local state" },
            { id: 'd12', day: 12, text: "[BUILD] Structure Learning Plan data model" },
            { id: 'd13', day: 13, text: "[BUILD] Add Notebook resource mapping" },
            { id: 'd14', day: 14, text: "[REVIEW] Write storage postmortem" },
          ]
        },
        {
          week: 3,
          title: "Auth + State + UI Behavior",
          tasks: [
            { id: 'd15', day: 15, text: "[STUDY] Learn auth model fundamentals" },
            { id: 'd16', day: 16, text: "[STUDY] Learn session, token, and access logic" },
            { id: 'd17', day: 17, text: "[STUDY] Study React state and lifecycle" },
            { id: 'd18', day: 18, text: "[STUDY] Learn loading, error, and empty states" },
            { id: 'd19', day: 19, text: "[STUDY] Study derived state and progress logic" },
            { id: 'd20', day: 20, text: "[BUILD] Improve interactive progress behavior" },
            { id: 'd21', day: 21, text: "[REVIEW] Run one bug-analysis session" },
          ]
        },
        {
          week: 4,
          title: "Backend + Deploy + Debugging",
          tasks: [
            { id: 'd22', day: 22, text: "[STUDY] Learn backend basics and API layer" },
            { id: 'd23', day: 23, text: "[STUDY] Learn env vars and dev/prod differences" },
            { id: 'd24', day: 24, text: "[STUDY] Study deployment flow for public apps" },
            { id: 'd25', day: 25, text: "[STUDY] Learn debugging by layers" },
            { id: 'd26', day: 26, text: "[STUDY] Practice diagnosis of UI, API, data, and deploy issues" },
            { id: 'd27', day: 27, text: "[BUILD] Prepare public deployment layer" },
            { id: 'd28', day: 28, text: "[REVIEW] Write monthly retro and next-step decision" },
          ]
        }
      ]
    },
    skills: {
      title: 'SKILL MAP',
      meta: '[SEC-03] // BUILDER PROFILE',
      col1: 'CORE: PRODUCT & MINDSET',
      col2: 'BUILDING: CS FOUNDATION',
      col3: 'APPLIED: TECH STACK',
      tags: {
        col1: ['Product Thinking', 'Proof-of-Work', 'Public Learning', 'Shipping Discipline', 'AI-Native Workflow'],
        col2: ['System Model', 'Client-Server Flow', 'HTTP / API', 'SQL / Data Modeling', 'Storage Strategy', 'Auth Model'],
        col3: ['React State', 'UI Behavior', 'Backend Basics', 'Deployment', 'Debugging', 'Local Persistence']
      }
    },
    progress: {
      title: 'PROGRESS',
      meta: '[SEC-04] // LIVE STATUS',
      intro: 'This section summarizes learning progress across the full curriculum.',
      overallProgress: 'OVERALL_PROGRESS',
      completedTasks: 'COMPLETED_TASKS',
      activeWeek: 'ACTIVE_WEEK',
      currentFocus: 'CURRENT_FOCUS',
      lastCompleted: 'LAST_COMPLETED',
      noneYet: 'NONE YET',
      weekCards: [
        { week: 'Week 1', desc: 'Foundations of application architecture and request flow' },
        { week: 'Week 2', desc: 'Data thinking, SQL, and storage decisions' },
        { week: 'Week 3', desc: 'Auth, state, and UI behavior' },
        { week: 'Week 4', desc: 'Backend, deployment, and debugging' }
      ]
    },
    works: {
      title: 'WORKS',
      meta: '[SEC-05] // PROOF OF WORK',
      typeLabel: 'TYPE:',
      items: [
        { 
          id: 'Project 1', 
          title: 'DOGWALK TASHKENT', 
          type: 'Telegram Mini App / Marketplace Prototype', 
          date: '2026', 
          desc: 'A marketplace concept for dog walkers and dog owners. This project taught me hard lessons about architecture, data flow, deployment, storage decisions, and the cost of building without enough systems understanding.',
          url: 'https://dogwalk-nu.vercel.app/',
          tgUrl: 'https://t.me/dogwalkuzbot',
          images: [
            'https://i.ibb.co/zhncbYr8/photo-2026-04-23-17-50-49.jpg',
            'https://i.ibb.co/k6gRkyCv/photo-2026-04-23-17-50-54.jpg',
            'https://i.ibb.co/ym0QmWTJ/photo-2026-04-23-17-50-52.jpg',
            'https://i.ibb.co/1fmsb0x4/photo-2026-04-23-17-50-50.jpg',
            'https://i.ibb.co/NdqJpDDC/photo-2026-04-23-17-50-47.jpg'
          ],
          techStack: ['React', 'Telegram Web App', 'Leaflet', 'Geolocation API', 'Tailwind CSS'],
          lessons: 'Platform complexity is 2x of a standard marketplace. Taught me architecture, data flow, deployment, and storage decisions.'
        },
        { 
          id: 'Project 2', 
          title: '21 DAY APP', 
          type: 'Habit Tracker / Community App', 
          date: '2026', 
          desc: 'A gamified habit-building platform designed for influencer challenges (e.g., "21 days without regrets"). Stalled primarily due to constraints within the Telegram Mini App environment and deep backend complexities (auth, database relations) that exceeded my stack knowledge at the time.',
          images: [
            'https://i.ibb.co/DHph1TYg/photo-2026-04-23-18-59-42.jpg',
            'https://i.ibb.co/PvYS1p7k/photo-2026-04-23-18-59-50.jpg',
            'https://i.ibb.co/gFZ4tXbK/photo-2026-04-23-18-59-47.jpg',
            'https://i.ibb.co/7N2Wtx1K/photo-2026-04-23-18-59-43.jpg',
            'https://i.ibb.co/S40zb94Y/photo-2026-04-23-18-59-46.jpg',
            'https://i.ibb.co/vvKRKfQY/photo-2026-04-23-18-59-51.jpg',
            'https://i.ibb.co/j9NBvDk8/photo-2026-04-23-18-59-45.jpg',
            'https://i.ibb.co/TBnbzY4Q/photo-2026-04-23-18-59-49.jpg',
            'https://i.ibb.co/ns8jmsV9/photo-2026-04-23-18-59-41.jpg',
            'https://i.ibb.co/YT37GWpf/photo-2026-04-23-18-59-40.jpg',
            'https://i.ibb.co/G3PmkZB1/photo-2026-04-23-18-59-38.jpg'
          ],
          techStack: ['React', 'Telegram Web App', 'AI Studio'],
          lessons: 'You cannot build a community app entirely prompted by AI if you don\'t understand Data Base architecture. Taught me the severe limitations of Telegram\'s WebView and the absolute necessity of mastering Auth and Backend State.' 
        },
        { id: 'Project 3', title: '21DAY', type: 'Habit Tracker / Social Product Prototype', date: '2026', desc: 'An early-stage habit tracker with a social direction. This project exposed gaps in auth, lifecycle understanding, initialization flow, and overall system control.' },
        { id: 'Project 4', title: 'PROGRESS ATLAS', type: 'Public Learning Dashboard', date: '2026', desc: 'This project itself. A public system that tracks my learning path, completed work, technical foundations, and the evolution of the site as a product.' },
      ]
    },
    history: {
      title: 'VERSION HISTORY',
      meta: '[SEC-06] // PRODUCT CHANGELOG',
      items: [
        { id: 'v1.2.0', date: '2026-04-18', title: 'Terminal Overhaul & Artifact Vault', desc: 'Introduced "Artifacts" — completed lessons can now project expanded technical and architectural insights to visitors. The Console was completely rebuilt: the AI bot was replaced by a deterministic command shell (AKMAL_OS) featuring interactive easter eggs (/manifesto, /lab) to expose the operator\'s engineering mindset.', status: 'RELEASED' },
        { id: 'v1.1.0', date: '2026-04-16', title: 'Firebase & RBAC Update', desc: 'Migrated progress data (tasks, ratings, notes) to Firestore. Implemented Google Auth and strict security rules. The app now fully supports a read-only public mode and an interactive admin mode.', status: 'ACTIVE' },
        { id: 'v0.10', date: '2026-04-15', title: 'Stealth Auth & RBAC Foundation', desc: 'Implemented a hidden authentication layer via the terminal ("godmode" command). The system now distinguishes between public visitors and the admin, laying the groundwork for cloud data migration.', status: 'RELEASED' },
        { id: 'v0.9', date: '2026-04-13', title: 'Skills Redesign & Honest Metrics', desc: 'Completely rethought the visual semantics of the skill map to reflect a T-shaped builder profile (Core, Building, Applied). Also, honestly marked "Shipping Discipline" as a failing metric. Building in public means admitting where the system breaks.', status: 'RELEASED' },
        { id: 'v0.8', date: '2026-04-13', title: 'Learning Plan upgraded: Assessment & References', desc: 'Introduced a local self-assessment system (5-point scale and notes) for each lesson. Linked specific tasks directly to the NotebookLM knowledge base.', status: 'RELEASED' },
        { id: 'v0.7', date: '2026-04-06', title: 'Parallel Track: Computer Foundations added', desc: 'Introduced a dual-thread learning model. The curriculum is split into a main applied layer (Web Dev) and a background process for studying Computer Science fundamentals.', status: 'RELEASED' },
        { id: 'v0.6', date: '2026-03-31', title: 'Russian localization added', desc: 'A Russian language version was introduced, along with a language toggle in the interface. The site can now switch between language modes and better reflect its intended audience.', status: 'RELEASED' },
        { id: 'v0.5', date: '2026-03-31', title: 'Information architecture cleaned up', desc: 'Redundant sections were removed, and the product structure became focused and intentional.', status: 'RELEASED' },
        { id: 'v0.4', date: '2026-03-31', title: 'Works grounded in real projects', desc: 'Placeholder artifacts were replaced by actual projects and proof-of-work.', status: 'RELEASED' },
        { id: 'v0.3', date: '2026-03-31', title: 'Progress model introduced', desc: 'Task completion, weekly tracking, and overall progress became first-class elements.', status: 'RELEASED' },
        { id: 'v0.2', date: '2026-03-31', title: 'Learning Plan introduced', desc: 'The site became a real learning tracker instead of a static concept.', status: 'RELEASED' },
        { id: 'v0.1', date: '2026-03-30', title: 'Structure established', desc: 'Base shell, navigation, and interface direction were defined.', status: 'FOUNDATION' },
      ]
    },
    console: {
      title: 'TERMINAL // ACTIVE',
      meta: '[SEC-07] // INTERACTIVE',
      sysPrefix: 'SYS >',
      userPrefix: 'USER >',
      inputPrefix: 'INPUT>',
      placeholder: 'Enter command (/help)...',
      send: 'EXECUTE',
      welcome: 'AKMAL_OS v1.0 // SYSTEM ACTIVE\n\nInteractive layer initialized.\nYou can just look around, or type /help to peek under the hood.',
      error: 'ERROR: COMMAND NOT RECOGNIZED.',
      missingKey: 'ERROR: API KEY MISSING.\nRunning outside AI Studio requires a valid GEMINI_API_KEY environment variable.',
      cmd_help: 'AVAILABLE COMMANDS:\n/now - Current operational status\n/manifesto - Core operating principles\n/lab - Project graveyard and experiments\n/background - Past physical products\n/stats - Unofficial diagnostic metrics\n/whoami - Operator profiler\n/godmode - System identification protocol',
      cmd_now: 'STATUS: ACTIVE_LEARNING\n\n[READING]: Firestore security rules documentation.\n[CODING]: Writing custom hooks for state management.\n[FOCUS]: Minimizing abstractions. The closer to pure JS/React, the better.',
      cmd_manifesto: 'SYSTEM PHILOSOPHY:\n\n1. Patience favors those who read documentation.\n2. The best code is no code at all.\n3. UI is merely a projection of state.\n4. Learn in public. Hiding failures delays optimization.',
      cmd_lab: 'PROJECT GRAVEYARD // OR FUTURE INVESTMENTS:\n\n[Dogwalk]: Dog walker platform. Lesson: Platform complexity is 2x of a marketplace.\n[21day]: Habit building service. Lesson: Retention beats acquisition.\n\nEvery failed project is a deposit into the technical knowledge base.',
      cmd_background: 'PAST EXPERIENCE // PHYSICAL PRODUCTS:',
      cmd_stats: 'DIAGNOSTIC METRICS:\n\nCups of coffee consumed: ~412\nDays studying React: 19\nBurnout encounters: 1 (Successfully resolved)\nFavorite error: Cannot read properties of undefined (reading \'map\')',
      cmd_whoami: 'OPERATOR PROFILER:\n\nCLASS: Fullstack Builder (In Progress)\nSTR (Frontend): 4/10\nINT (Backend): 2/10\nAGI (Soft Skills): 9/10\nRES (Persistence): 10/10\n\nCURRENT OBJECTIVE: Convert persistence into technical competence.',
      cmd_not_found: 'ERROR: COMMAND NOT FOUND. Type /help'
    }
  },
  ru: {
    nav: {
      index: 'Индекс',
      home: 'Главная',
      plan: 'План обучения',
      skills: 'Карта навыков',
      progress: 'Прогресс',
      works: 'Работы',
      console: 'Консоль',
      history: 'История версий',
      systemReady: 'СИСТЕМА_ГОТОВА',
      uptime: 'АПТАЙМ: ',
      days: ' ДНЕЙ'
    },
    home: {
      title: 'СИСТЕМНЫЙ СТАРТ',
      meta: '[SEC-01] // ROOT',
      p1: 'Я Акмаль из Ташкента. Мне 38, и всю жизнь я делал бизнес «в реале»: товарка, импорт, физические продукты. Полгода назад решил, что пора двигаться в ИИ.',
      p2: 'Сейчас собираю продукты с помощью нейронок, но не хочу быть просто «промпт-инженером». Изучаю код, чтобы понимать, как всё устроено под капотом, и не зависеть от капризов чат-бота. Мне не стрёмно начинать с нуля в этом возрасте. Наоборот — драйвит.',
      p3: 'Я не собираюсь становиться лучшим кодером в мире. Моя цель — быстро превращать идеи в рабочие инструменты и делать это красиво. А этот сайт — честная документация моего пути. Шаг за шагом. Коммит за коммитом.',
      btn: 'ОТКРЫТЬ ПЛАН ОБУЧЕНИЯ',
      sysStatus: 'Статус Системы',
      user: 'USER',
      location: 'LOCATION',
      localTime: 'LOCAL_TIME',
      osVersion: 'OS_VERSION',
      status: 'STATUS',
      online: 'ONLINE',
      locValue: 'TASHKENT, UZ',
      sysOp: 'SYS_OPERATOR // AKMAL',
      opStatus: '[STATUS: COMPILING_REACT_SKILLS]',
      linksLabel: 'ACTIVE_CONNECTIONS',
      links: {
        github: 'TCP_PORT_80: GITHUB',
        telegram: 'DIRECT_PING: TELEGRAM',
        instagram: 'SOCIAL_FEED: INSTAGRAM'
      }
    },
    plan: {
      title: 'ПЛАН ОБУЧЕНИЯ',
      meta: '[SEC-02] // ACTIVE CURRICULUM',
      intro: 'Этот раздел отслеживает и обучение, и внедрение. Не каждый изученный пункт обязан сразу появиться в самом сайте, но каждый завершённый пункт должен быть отмечен здесь.',
      week: 'Неделя',
      day: 'День',
      ref: 'REF',
      overall: 'ОБЩИЙ ПРОГРЕСС',
      tasksCompleted: 'ВЫПОЛНЕННЫХ ЗАДАЧ',
      understanding: 'ПОНИМАНИЕ',
      note: 'ЗАМЕТКА',
      threads: {
        main: 'MAIN THREAD: WEB DEV',
        bg: 'BACKGROUND PROCESS: FOUNDATIONS',
      },
      foundations: {
        title: 'COMPUTER FOUNDATIONS',
        tasks: [
          { id: 'cf1', ref: 'CF-01', text: '[STUDY] Что такое компьютер: ввод, вывод, память, процессор' },
          { id: 'cf2', ref: 'CF-02', text: '[STUDY] Как данные представлены в компьютере: биты, байты, бинарная логика' },
          { id: 'cf3', ref: 'CF-03', text: '[STUDY] Как работает CPU: fetch -> decode -> execute' },
          { id: 'cf4', ref: 'CF-04', text: '[STUDY] Память: cache, RAM, storage' },
          { id: 'cf5', ref: 'CF-05', text: '[STUDY] Как программа исполняется через ОС и железо' },
          { id: 'cf6', ref: 'CF-06', text: '[STUDY] Nand2Tetris: boolean logic / gates / computer from first principles' }
        ]
      },
      weeks: [
        {
          week: 1,
          title: "Системная модель + Client-Server Flow",
          tasks: [
            { id: 'd1', day: 1, text: "[STUDY] Разобрать Dogwalk и 21day по слоям" },
            { id: 'd2', day: 2, text: "[STUDY] Нарисовать карту системы и user flow", url: 'https://notebooklm.google.com/notebook/8b6d184a-63a5-4825-a55f-6b2a1a3ec26a?authuser=1' },
            { id: 'd3', day: 3, text: "[STUDY] Повторить HTTP, REST, status codes и CORS", url: 'https://notebooklm.google.com/notebook/5daa2630-0874-46ab-9c30-5661de121290?authuser=1' },
            { id: 'd4', day: 4, text: "[STUDY] Изучить client-server flow и lifecycle запроса", url: 'https://notebooklm.google.com/notebook/7f79d3ee-94e4-418a-929e-38fafeb20902?authuser=1' },
            { id: 'd5', day: 5, text: "[STUDY] Разобрать цепочку UI -> request -> server -> DB -> response -> UI", url: 'https://notebooklm.google.com/notebook/5daa2630-0874-46ab-9c30-5661de121290?authuser=1' },
            { id: 'd6', day: 6, text: "[BUILD] Настроить структуру трекинга учебного плана" },
            { id: 'd7', day: 7, text: "[REVIEW] Написать архитектурную заметку по первой неделе", artifact: "Архитектура — это искусство структурирования сложности.\n\nНа этой неделе я понял, что client-server flow (клиент-серверное взаимодействие) — это не просто вызовы API, это определение источника истины и минимизация задержки на ментальном уровне.\n\nКлючевые выводы:\n1. UI — это просто проекция состояния (state).\n2. Сервер — это авторитетный менеджер состояния.\n3. База данных — это постоянная память.\n\nКогда мы пишем код, мы просто управляем данными в пространстве и времени." },
          ]
        },
        {
          week: 2,
          title: "Data Model + SQL + Storage",
          tasks: [
            { id: 'd8', day: 8, text: "[STUDY] Спроектировать сущности и связи" },
            { id: 'd9', day: 9, text: "[STUDY] Практиковать SQL руками" },
            { id: 'd10', day: 10, text: "[STUDY] Изучить source of truth и владение данными" },
            { id: 'd11', day: 11, text: "[STUDY] Разобраться, что хранить в БД, storage и local state" },
            { id: 'd12', day: 12, text: "[BUILD] Собрать data model для Learning Plan" },
            { id: 'd13', day: 13, text: "[BUILD] Добавить привязку учебных ресурсов / Notebook links" },
            { id: 'd14', day: 14, text: "[REVIEW] Написать storage postmortem" },
          ]
        },
        {
          week: 3,
          title: "Auth + State + UI Behavior",
          tasks: [
            { id: 'd15', day: 15, text: "[STUDY] Изучить основы auth model" },
            { id: 'd16', day: 16, text: "[STUDY] Разобраться в session, token и access logic" },
            { id: 'd17', day: 17, text: "[STUDY] Изучить React state и lifecycle" },
            { id: 'd18', day: 18, text: "[STUDY] Разобрать loading, error и empty states" },
            { id: 'd19', day: 19, text: "[STUDY] Изучить derived state и логику прогресса" },
            { id: 'd20', day: 20, text: "[BUILD] Улучшить интерактивное поведение прогресса" },
            { id: 'd21', day: 21, text: "[REVIEW] Провести одну bug-analysis сессию" },
          ]
        },
        {
          week: 4,
          title: "Backend + Deploy + Debugging",
          tasks: [
            { id: 'd22', day: 22, text: "[STUDY] Изучить backend basics и API layer" },
            { id: 'd23', day: 23, text: "[STUDY] Разобраться с env vars и разницей dev/prod" },
            { id: 'd24', day: 24, text: "[STUDY] Изучить deployment flow для публичных приложений" },
            { id: 'd25', day: 25, text: "[STUDY] Изучить debugging по слоям" },
            { id: 'd26', day: 26, text: "[STUDY] Практиковать диагностику проблем UI, API, data и deploy" },
            { id: 'd27', day: 27, text: "[BUILD] Подготовить слой публичного деплоя" },
            { id: 'd28', day: 28, text: "[REVIEW] Написать месячное ретро и решение о следующем этапе" },
          ]
        }
      ]
    },
    skills: {
      title: 'КАРТА НАВЫКОВ',
      meta: '[SEC-03] // ПРОФИЛЬ БИЛДЕРА',
      col1: 'ЯДРО: ПРОДУКТ И МЫШЛЕНИЕ',
      col2: 'СТРОИТСЯ: ФУНДАМЕНТ CS',
      col3: 'ПРИКЛАДНОЕ: ТЕХНОЛОГИИ',
      tags: {
        col1: ['Product Thinking', 'Proof-of-Work', 'Public Learning', 'Shipping Discipline', 'AI-Native Workflow'],
        col2: ['Системная модель', 'Client-Server Flow', 'HTTP / API', 'SQL / Моделирование данных', 'Storage Strategy', 'Auth Model'],
        col3: ['React State', 'Поведение интерфейса', 'Backend Basics', 'Deployment', 'Debugging', 'Local Persistence']
      }
    },
    progress: {
      title: 'ПРОГРЕСС',
      meta: '[SEC-04] // LIVE STATUS',
      intro: 'Этот раздел показывает сводный прогресс по всему учебному плану.',
      overallProgress: 'ОБЩИЙ ПРОГРЕСС',
      completedTasks: 'ВЫПОЛНЕННЫЕ ЗАДАЧИ',
      activeWeek: 'АКТИВНАЯ НЕДЕЛЯ',
      currentFocus: 'ТЕКУЩИЙ ФОКУС',
      lastCompleted: 'ПОСЛЕДНЕЕ ВЫПОЛНЕННОЕ',
      noneYet: 'ПОКА НЕТ',
      weekCards: [
        { week: 'Неделя 1', desc: 'Фундамент архитектуры приложения и request flow' },
        { week: 'Неделя 2', desc: 'Данные, SQL и storage decisions' },
        { week: 'Неделя 3', desc: 'Auth, state и UI behavior' },
        { week: 'Неделя 4', desc: 'Backend, deployment и debugging' }
      ]
    },
    works: {
      title: 'РАБОТЫ',
      meta: '[SEC-05] // PROOF OF WORK',
      typeLabel: 'ТИП:',
      items: [
        { 
          id: 'Project 1', 
          title: 'DOGWALK TASHKENT', 
          type: 'Telegram Mini App / Marketplace Prototype', 
          date: '2026', 
          desc: 'Концепт маркетплейса для выгульщиков собак и владельцев. Этот проект научил меня жёстким вещам про архитектуру, data flow, deployment, storage decisions и цену разработки без достаточного системного понимания.',
          url: 'https://dogwalk-nu.vercel.app/',
          tgUrl: 'https://t.me/dogwalkuzbot',
          images: [
            'https://i.ibb.co/zhncbYr8/photo-2026-04-23-17-50-49.jpg',
            'https://i.ibb.co/k6gRkyCv/photo-2026-04-23-17-50-54.jpg',
            'https://i.ibb.co/ym0QmWTJ/photo-2026-04-23-17-50-52.jpg',
            'https://i.ibb.co/1fmsb0x4/photo-2026-04-23-17-50-50.jpg',
            'https://i.ibb.co/NdqJpDDC/photo-2026-04-23-17-50-47.jpg'
          ],
          techStack: ['React', 'Telegram Web App', 'Leaflet', 'Geolocation API', 'Tailwind CSS'],
          lessons: 'Сложность платформы х2 от обычного маркетплейса. Научился строить архитектуру, флоу данных, деплой и принимать решения по хранению стейта.'
        },
        { 
          id: 'Project 2', 
          title: '21 DAY APP', 
          type: 'Habit Tracker / Community App', 
          date: '2026', 
          desc: 'Геймифицированная платформа для привычек, придуманная под челлендж блогера ("21 день без сожалений"). Проект упёрся в жесткие ограничения среды Telegram, а также в сложную серверную логику (аутентификация, базы данных), которую на тот момент я не мог вытянуть только за счет ИИ-ассистентов.',
          images: [
            'https://i.ibb.co/DHph1TYg/photo-2026-04-23-18-59-42.jpg',
            'https://i.ibb.co/PvYS1p7k/photo-2026-04-23-18-59-50.jpg',
            'https://i.ibb.co/gFZ4tXbK/photo-2026-04-23-18-59-47.jpg',
            'https://i.ibb.co/7N2Wtx1K/photo-2026-04-23-18-59-43.jpg',
            'https://i.ibb.co/S40zb94Y/photo-2026-04-23-18-59-46.jpg',
            'https://i.ibb.co/vvKRKfQY/photo-2026-04-23-18-59-51.jpg',
            'https://i.ibb.co/j9NBvDk8/photo-2026-04-23-18-59-45.jpg',
            'https://i.ibb.co/TBnbzY4Q/photo-2026-04-23-18-59-49.jpg',
            'https://i.ibb.co/ns8jmsV9/photo-2026-04-23-18-59-41.jpg',
            'https://i.ibb.co/YT37GWpf/photo-2026-04-23-18-59-40.jpg',
            'https://i.ibb.co/G3PmkZB1/photo-2026-04-23-18-59-38.jpg'
          ],
          techStack: ['React', 'Telegram Web App', 'AI Studio'],
          lessons: 'Невозможно построить социальное приложение чисто на промптах, если не понимаешь архитектуру БД. Проект показал мне суровые границы WebView внутри Телеграма и доказал, что жизненно необходимо изучать Auth и Backend самостоятельно.' 
        },
        { id: 'Project 4', title: 'PROGRESS ATLAS', type: 'Public Learning Dashboard', date: '2026', desc: 'Сам этот проект. Публичная система, которая отслеживает мой учебный путь, реальные работы, фундаментальные технические темы и развитие самого сайта как продукта.' },
      ]
    },
    history: {
      title: 'ИСТОРИЯ ВЕРСИЙ',
      meta: '[SEC-06] // PRODUCT CHANGELOG',
      items: [
        { id: 'v1.2.0', date: '2026-04-18', title: 'Переработка Терминала и Артефакты знаний', desc: 'Внедрены «Артефакты» — теперь пункты учебного плана могут содержать развернутые технические выводы, доступные посетителям. Консоль полностью переписана: ИИ-бот заменен на олдскульную командную оболочку (AKMAL_OS) с пасхалками (/manifesto, /lab), призванными раскрыть инженерный майндсет.', status: 'ВЫПУЩЕНО' },
        { id: 'v1.1.0', date: '2026-04-16', title: 'Интеграция Firebase и RBAC', desc: 'Прогресс (задачи, оценки, заметки) мигрирован в облачную базу Firestore. Внедрена авторизация через Google и строгие правила безопасности. Приложение теперь полноценно поддерживает публичный режим чтения и интерактивный режим администратора.', status: 'АКТИВНО' },
        { id: 'v0.10', date: '2026-04-15', title: 'Скрытая авторизация и фундамент RBAC', desc: 'Внедрен скрытый слой авторизации через терминал (команда "godmode"). Система теперь различает публичных посетителей и администратора, подготавливая почву для миграции данных в облако.', status: 'ВЫПУЩЕНО' },
        { id: 'v0.9', date: '2026-04-13', title: 'Редизайн Skills и честные метрики', desc: 'Полностью переосмыслена визуальная семантика карты навыков (Ядро, Фундамент, Инструменты). Также навык "Shipping Discipline" честно отмечен как проседающий. Строить публично — значит признавать, где система дает сбой.', status: 'ВЫПУЩЕНО' },
        { id: 'v0.8', date: '2026-04-13', title: 'Обновление Learning Plan: Самооценка и References', desc: 'Внедрена локальная система самооценки (5-балльная шкала и заметки) для каждого урока. Добавлены прямые ссылки (REF) на базу знаний в NotebookLM.', status: 'ВЫПУЩЕНО' },
        { id: 'v0.7', date: '2026-04-06', title: 'Добавлен параллельный трек: Computer Foundations', desc: 'Внедрена двухпоточная модель обучения. План разделен на основной прикладной уровень (Web Dev) и фоновый процесс для изучения основ Computer Science.', status: 'ВЫПУЩЕНО' },
        { id: 'v0.6', date: '2026-03-31', title: 'Добавлена русская локализация', desc: 'На сайте появилась русская версия и переключатель языков. Интерфейс теперь поддерживает переключение между языками и лучше соответствует своей реальной аудитории.', status: 'ВЫПУЩЕНО' },
        { id: 'v0.5', date: '2026-03-31', title: 'Упрощена архитектура разделов', desc: 'Лишние разделы были убраны, а структура продукта стала чище и понятнее.', status: 'ВЫПУЩЕНО' },
        { id: 'v0.4', date: '2026-03-31', title: 'Раздел Works привязан к реальным проектам', desc: 'Плейсхолдерные артефакты были заменены на настоящие проекты и proof-of-work.', status: 'ВЫПУЩЕНО' },
        { id: 'v0.3', date: '2026-03-31', title: 'Появилась модель прогресса', desc: 'Отметка выполнения задач, недельный трекинг и общий прогресс стали базовыми элементами системы.', status: 'ВЫПУЩЕНО' },
        { id: 'v0.2', date: '2026-03-31', title: 'Добавлен Learning Plan', desc: 'Сайт перестал быть статичной концепцией и стал реальным трекером обучения.', status: 'ВЫПУЩЕНО' },
        { id: 'v0.1', date: '2026-03-30', title: 'Задана базовая структура', desc: 'Были определены основной каркас, навигация и визуальное направление интерфейса.', status: 'ОСНОВА' },
      ]
    },
    console: {
      title: 'ТЕРМИНАЛ // АКТИВЕН',
      meta: '[SEC-07] // ИНТЕРАКТИВ',
      sysPrefix: 'SYS >',
      userPrefix: 'USER >',
      inputPrefix: 'INPUT>',
      placeholder: 'Введите команду (/help)...',
      send: 'ВЫПОЛНИТЬ',
      welcome: 'AKMAL_OS v1.0 // СИСТЕМА АКТИВНА\n\nИнтерактивный слой инициализирован.\nВы можете просто осмотреться, или ввести /help, чтобы заглянуть под капот.',
      error: 'ОШИБКА: КОМАНДА НЕ РАСПОЗНАНА.',
      missingKey: 'ОШИБКА: ОТСУТСТВУЕТ API КЛЮЧ.\nДля работы вне AI Studio необходимо добавить GEMINI_API_KEY в переменные окружения.',
      cmd_help: 'ДОСТУПНЫЕ КОМАНДЫ:\n/now - Что происходит прямо сейчас\n/manifesto - Мои принципы работы\n/lab - Кладбище проектов / Эксперименты\n/background - Прошлые физические продукты\n/stats - Неформальные метрики\n/whoami - Profiler оператора\n/godmode - Идентификация системы',
      cmd_now: 'STATUS: ACTIVE_LEARNING\n\n[ЧИТАЮ]: Документация Firestore security rules.\n[КОДЮ]: Пишу кастомные хуки для стейт-менеджмента.\n[ФОКУС]: Минимизирую абстракции. Чем ближе к чистому JS/React, тем лучше.',
      cmd_manifesto: 'SYSTEM PHILOSOPHY:\n\n1. Выжидает тот, кто читает документацию.\n2. Лучший код — ненаписанный код.\n3. UI — это всего лишь проекция состояния.\n4. Учись публично. Скрывать ошибки = замедлять обучение.',
      cmd_lab: 'PROJECT GRAVEYARD // ИЛИ ЗАЛОГ БУДУЩЕГО:\n\n[Dogwalk]: Платформа для выгула собак. Урок: сложность платформы х2 от маркетплейса.\n[21day]: Сервис формирования привычек. Урок: удержание важнее привлечения.\n\nКаждый неудачный проект — это депозит в базу технических знаний.',
      cmd_background: 'ПРОШЛЫЙ ОПЫТ // ФИЗИЧЕСКИЕ ПРОДУКТЫ:',
      cmd_stats: 'DIAGNOSTIC METRICS:\n\nЧашек кофе выпито: ~412\nДней изучения React: 19\nКоличество выгораний: 1 (Успешное)\nЛюбимая ошибка: Cannot read properties of undefined (reading \'map\')',
      cmd_whoami: 'OPERATOR PROFILER:\n\nCLASS: Fullstack Builder (In Progress)\nSTR (Frontend): 4/10\nINT (Backend): 2/10\nAGI (Soft Skills): 9/10\nRES (Persistence): 10/10\n\nCURRENT OBJECTIVE: Convert persistence into technical competence.',
      cmd_not_found: 'ОШИБКА: КОМАНДА НЕ НАЙДЕНА. Введите /help'
    }
  }
};
