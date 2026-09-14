import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Cloud,
  Code2,
  Database,
  FileText,
  Gauge,
  GitBranch,
  Layers3,
  LockKeyhole,
  Menu,
  Network,
  Play,
  Rocket,
  Scale,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
  X,
  Zap,
} from "lucide-react";

type Phase = {
  id: string;
  number: string;
  title: string;
  short: string;
  weeks: string;
  start: number;
  span: number;
  color: string;
  icon: typeof Rocket;
  outcome: string;
  goal: string;
  tasks: string[];
  deliverables: string[];
  done: string;
  team: string;
};

const phases: Phase[] = [
  {
    id: "foundation",
    number: "01",
    title: "Фундамент",
    short: "Инфраструктура и DevOps",
    weeks: "Недели 1–4",
    start: 1,
    span: 4,
    color: "#67e8f9",
    icon: ServerCog,
    outcome: "Проект запускается одинаково у всей команды, а staging уже доступен по HTTPS.",
    goal: "Собрать техническую основу, на которой модули можно разрабатывать параллельно без хаоса и ручных настроек.",
    tasks: [
      "Репозитории, правила ветвления и CI-проверки.",
      "Docker Compose для локальной разработки.",
      "Kubernetes, окружения, секреты, health checks и логирование.",
      "PostgreSQL, Redis, объектное хранилище, поиск и мониторинг.",
    ],
    deliverables: ["Рабочий staging", "CI/CD pipeline", "OpenAPI-каркас", "Базовые миграции"],
    done: "Новый разработчик поднимает проект по одной инструкции, а каждый pull request проходит автоматические проверки.",
    team: "Tech Lead · DevOps · Backend",
  },
  {
    id: "ux",
    number: "02",
    title: "Понятный интерфейс",
    short: "UX и дизайн-система",
    weeks: "Недели 2–5",
    start: 2,
    span: 4,
    color: "#a78bfa",
    icon: Layers3,
    outcome: "Пользователь понимает следующий шаг на каждом экране: от ввода кадастрового номера до документа.",
    goal: "Согласовать пользовательский путь до того, как frontend начнёт собирать десятки экранов.",
    tasks: [
      "Карта экранов и кликабельный прототип.",
      "Состояния загрузки, ошибки, пустые и частичные данные.",
      "UI-kit: формы, таблицы, источники, статусы и уведомления.",
      "Адаптация под desktop, ноутбук, планшет и мобильный экран.",
    ],
    deliverables: ["Кликабельный прототип", "UI-kit", "Токены дизайна", "Карта сценариев"],
    done: "У каждого ключевого сценария есть макет, состояние ошибки и понятная точка выхода.",
    team: "UI/UX · Product Owner · Frontend",
  },
  {
    id: "users",
    number: "03",
    title: "Пользователи",
    short: "Роли, профили и история",
    weeks: "Недели 3–7",
    start: 3,
    span: 5,
    color: "#fbbf24",
    icon: Users,
    outcome: "Пользователь может зарегистрироваться, войти, видеть свои операции, а администратор — управлять доступом.",
    goal: "Создать безопасный контур идентификации и общие сущности, на которые опираются все остальные модули.",
    tasks: [
      "Регистрация, вход и восстановление пароля.",
      "JWT access/refresh и bcrypt cost 12+.",
      "Роли administrator, user и viewer.",
      "Профиль, история анализов, чатов и документов.",
    ],
    deliverables: ["Auth API", "Роли и права", "Профиль", "Аудит действий"],
    done: "Негативные сценарии доступа покрыты тестами, а история пользователя доступна из личного кабинета.",
    team: "Backend · Frontend · QA",
  },
  {
    id: "land",
    number: "04",
    title: "Анализ участка",
    short: "Главное ценностное действие",
    weeks: "Недели 5–12",
    start: 5,
    span: 8,
    color: "#fb7185",
    icon: Search,
    outcome: "По кадастровому номеру система выдаёт структурированное заключение с ограничениями, рисками и источниками.",
    goal: "Собрать надёжный конвейер данных: от Росреестра и ПЗЗ до понятного правового результата.",
    tasks: [
      "Валидация кадастрового номера и адреса.",
      "Интеграция с Росреестром: retry, cache, понятные ошибки.",
      "ПЗЗ для 10 городов, зоны, ВРИ и параметры застройки.",
      "Ограничения, судебные аналоги, рекомендации и экспорт.",
    ],
    deliverables: ["Pipeline анализа", "Карточка участка", "Источники", "PDF-экспорт"],
    done: "Не менее 95% корректного извлечения на 50 тестовых участках, полный анализ — до 30 секунд.",
    team: "Backend · ML/AI · Frontend · Юрист",
  },
  {
    id: "knowledge",
    number: "05",
    title: "Правовая база",
    short: "Сбор, очистка и индексация",
    weeks: "Недели 5–16",
    start: 5,
    span: 12,
    color: "#34d399",
    icon: BookOpen,
    outcome: "Каждый фрагмент правовой базы имеет источник, регион, дату и версию — его можно найти и проверить.",
    goal: "Построить управляемый процесс ingestion, чтобы правовая база обновлялась без остановки продукта.",
    tasks: [
      "Реестр источников и юридические основания использования.",
      "Импорт PDF/DOCX, извлечение текста и таблиц.",
      "Разбиение на фрагменты, метаданные и версии.",
      "Полнотекстовый индекс, embeddings, дедупликация и обновления.",
    ],
    deliverables: ["Ingestion pipeline", "Индекс поиска", "Vector DB", "Версионирование"],
    done: "Администратор может добавить, обновить или деактивировать документ без ручного доступа к базе данных.",
    team: "ML/AI · Backend · Юрист · DevOps",
  },
  {
    id: "ai",
    number: "06",
    title: "AI-чат",
    short: "RAG и рекомендации",
    weeks: "Недели 11–17",
    start: 11,
    span: 7,
    color: "#f472b6",
    icon: Sparkles,
    outcome: "Чат отвечает только по подтверждённым источникам и показывает, откуда взялся каждый вывод.",
    goal: "Добавить интеллект поверх правовой базы: поиск, rerank, контекст, генерация и проверка ответа.",
    tasks: [
      "Классификация запроса и поиск 10 релевантных фрагментов.",
      "Rerank, контекст из 5 документов и промпты без домыслов.",
      "Проверка ссылок, защита от prompt injection и резервная модель.",
      "История чатов, оценка ответа и AI-рекомендации в анализе.",
    ],
    deliverables: ["RAG pipeline", "Чат", "Цитаты источников", "Контроль качества"],
    done: "Точность — не менее 94% на 200 вопросах, ответ — до 10 секунд, при отсутствии данных система отказывается от домыслов.",
    team: "ML/AI · Backend · Frontend · QA",
  },
  {
    id: "docs",
    number: "07",
    title: "Документы",
    short: "10 шаблонов и экспорт",
    weeks: "Недели 17–21",
    start: 17,
    span: 5,
    color: "#60a5fa",
    icon: FileText,
    outcome: "Результат анализа превращается в готовый DOCX или PDF, который можно отредактировать и сохранить.",
    goal: "Дать пользователю понятный путь от найденных данных до рабочего юридического документа.",
    tasks: [
      "Утвердить юридическое содержание 10 шаблонов.",
      "Переменные, обязательные поля и автозаполнение.",
      "Редактор, черновики, версии и история документов.",
      "Генерация DOCX/PDF и проверка кириллицы и реквизитов.",
    ],
    deliverables: ["Каталог шаблонов", "Редактор", "DOCX", "PDF"],
    done: "100% контрольных шаблонов генерируются корректно, без незаполненных обязательных переменных.",
    team: "Backend · Frontend · Юрист · QA",
  },
  {
    id: "admin",
    number: "08",
    title: "Админ-панель",
    short: "Управление продуктом",
    weeks: "Недели 18–24",
    start: 18,
    span: 7,
    color: "#fb923c",
    icon: Gauge,
    outcome: "Администратор управляет пользователями, правовой базой, шаблонами и видит состояние системы.",
    goal: "Сделать продукт управляемым без прямого доступа к базе данных и серверу.",
    tasks: [
      "Пользователи, блокировки, роли и подписки.",
      "Правовая база: добавление, версии и деактивация.",
      "Шаблоны документов и статусы фоновых задач.",
      "Логи, ошибки, доступность, время ответа и аудит.",
    ],
    deliverables: ["Admin UI", "Мониторинг", "Логи", "Аудит"],
    done: "Критичные операции защищены правами, логируются и доступны через понятный интерфейс.",
    team: "Frontend · Backend · DevOps · QA",
  },
  {
    id: "billing",
    number: "09",
    title: "Подписки",
    short: "Тарифы и ЮKassa",
    weeks: "Недели 20–24",
    start: 20,
    span: 5,
    color: "#c084fc",
    icon: WalletCards,
    outcome: "Клиент выбирает тариф, оплачивает подписку, получает лимиты, а система корректно принимает webhooks.",
    goal: "Включить коммерческий контур без хранения банковских карт внутри продукта.",
    tasks: [
      "Тарифы Старт, Профи, Бизнес и Enterprise.",
      "Checkout ЮKassa и оплата по счёту для юрлиц.",
      "Автопродление, webhooks и идемпотентность событий.",
      "Лимиты тарифов на уровне API, UI и фоновых задач.",
    ],
    deliverables: ["Тарифы", "Оплата", "Webhooks", "Лимиты"],
    done: "Не менее 98% успешных транзакций в тестовом контуре, статусы подписок и платежей отражаются в истории.",
    team: "Backend · Frontend · QA · Юрист",
  },
  {
    id: "launch",
    number: "10",
    title: "Тест и запуск",
    short: "Бета, приёмка, релиз",
    weeks: "Недели 22–28",
    start: 22,
    span: 7,
    color: "#facc15",
    icon: Rocket,
    outcome: "MVP проходит приёмку, 10 бета-тестеров проверяют сценарии, команда готова к публичному запуску.",
    goal: "Проверить не только функции, но и устойчивость, безопасность, скорость и способность откатиться.",
    tasks: [
      "End-to-end тест от регистрации до готового документа.",
      "Нагрузка на 100 одновременных пользователей.",
      "OWASP Top 10, backup/restore, rate limits и секреты.",
      "Бета на 10 пользователях, исправления, runbook и smoke test.",
    ],
    deliverables: ["Release candidate", "Отчёт приёмки", "Runbook", "MVP launch"],
    done: "Нет Critical/High-дефектов, критерии приёмки выполнены, есть мониторинг, резервная копия и план отката.",
    team: "QA · DevOps · Все роли · Заказчик",
  },
];

const weeks = Array.from({ length: 28 }, (_, index) => index + 1);

const icons = [
  { icon: Search, label: "Анализ участка" },
  { icon: Sparkles, label: "AI-чат" },
  { icon: FileText, label: "Документы" },
  { icon: WalletCards, label: "Подписки" },
  { icon: Gauge, label: "Админ-панель" },
];

function PhaseCard({ phase, active, onClick }: { phase: Phase; active: boolean; onClick: () => void }) {
  const Icon = phase.icon;
  return (
    <button className={`phase-card ${active ? "is-active" : ""}`} onClick={onClick} style={{ "--phase-color": phase.color } as React.CSSProperties}>
      <span className="phase-card-top">
        <span className="phase-number">{phase.number}</span>
        <span className="phase-arrow"><ArrowUpRight size={15} /></span>
      </span>
      <span className="phase-icon"><Icon size={19} /></span>
      <span className="phase-card-title">{phase.title}</span>
      <span className="phase-card-subtitle">{phase.short}</span>
      <span className="phase-card-meta"><CalendarDays size={13} /> {phase.weeks}</span>
    </button>
  );
}

export default function Home() {
  const [activeId, setActiveId] = useState("land");
  const [mobileNav, setMobileNav] = useState(false);
  const active = useMemo(() => phases.find((phase) => phase.id === activeId) ?? phases[0], [activeId]);
  const ActiveIcon = active.icon;

  const selectPhase = (id: string) => {
    setActiveId(id);
    window.setTimeout(() => document.getElementById("phase-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  return (
    <div className="site-shell">
      <div className="grain" />
      <header className="topbar">
        <a href="#top" className="brand" aria-label="Град.AI — начало">
          <span className="brand-mark"><Scale size={18} /></span>
          <span>Град<span className="brand-dot">.</span>AI</span>
          <span className="brand-badge">ROADMAP</span>
        </a>
        <nav className={`topnav ${mobileNav ? "open" : ""}`}>
          <a href="#roadmap" onClick={() => setMobileNav(false)}>Диаграмма</a>
          <a href="#modules" onClick={() => setMobileNav(false)}>Модули</a>
          <a href="#release" onClick={() => setMobileNav(false)}>Релиз</a>
        </nav>
        <a className="top-cta" href="#roadmap">Смотреть план <ArrowDown size={15} /></a>
        <button className="menu-button" onClick={() => setMobileNav(!mobileNav)} aria-label="Открыть меню">
          {mobileNav ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-pulse" /> Проектный штаб · версия 1.0</div>
            <h1>От идеи<br /><em>до запуска.</em></h1>
            <p className="hero-lead">Понятная карта создания «Град.AI»: что делаем, в какой последовательности и какой результат должен появиться на каждом шаге.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#roadmap">Открыть план <ChevronRight size={17} /></a>
              <a className="button button-quiet" href="#modules"><Play size={14} fill="currentColor" /> Как это устроено</a>
            </div>
            <div className="hero-trust"><span><BadgeCheck size={16} /> 28 недель</span><span><BadgeCheck size={16} /> 10 этапов</span><span><BadgeCheck size={16} /> MVP 13 млн ₽</span></div>
          </div>
          <div className="hero-visual" aria-label="Схематичное изображение потока проекта">
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="hero-grid" />
            <div className="hero-diagram-card">
              <div className="mini-header"><span className="mini-eyebrow">Путь продукта</span><span className="mini-live"><span /> LIVE PLAN</span></div>
              <div className="mini-flow">
                <div className="flow-node flow-main"><span className="flow-node-icon"><Scale size={16} /></span><span><strong>Град.AI</strong><small>Правовой интеллект</small></span></div>
                <div className="flow-line" />
                <div className="flow-branch"><div className="flow-node"><span className="flow-node-icon cyan"><Database size={15} /></span><span><strong>Данные</strong><small>ЕГРН · ПЗЗ</small></span></div><div className="flow-node"><span className="flow-node-icon pink"><Sparkles size={15} /></span><span><strong>AI</strong><small>RAG · LLM</small></span></div></div>
                <div className="flow-line short" />
                <div className="flow-node flow-result"><span className="flow-node-icon yellow"><Rocket size={15} /></span><span><strong>Запуск MVP</strong><small>Неделя 28</small></span><span className="flow-check"><Check size={13} /></span></div>
              </div>
              <div className="mini-footer"><span><span className="mini-dot green" /> в работе</span><span>10 модулей</span></div>
            </div>
            <div className="float-chip chip-top"><Zap size={14} /> последовательность</div>
            <div className="float-chip chip-bottom"><Check size={14} /> результат каждого этапа</div>
          </div>
        </section>

        <section className="stats-strip section-pad">
          <div className="stat-item"><span className="stat-value">28</span><span className="stat-label">недель<br />до MVP</span></div>
          <div className="stat-item"><span className="stat-value">10</span><span className="stat-label">ключевых<br />этапов</span></div>
          <div className="stat-item"><span className="stat-value">5</span><span className="stat-label">продуктовых<br />модулей</span></div>
          <div className="stat-item"><span className="stat-value">95<span className="stat-suffix">%</span></span><span className="stat-label">точность<br />анализа</span></div>
          <div className="stat-note"><span className="note-icon"><CircleHelp size={16} /></span><span>Нажмите на этап,<br />чтобы увидеть детали</span></div>
        </section>

        <section id="roadmap" className="roadmap-section section-pad">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="eyebrow-pulse blue" /> Диаграмма проекта</div><h2>Большая картина —<br /><span>по неделям.</span></h2></div>
            <p>Сначала фундамент, затем данные и интеллект. Параллельные работы идут одновременно, но контрольные точки остаются общими для всей команды.</p>
          </div>
          <div className="legend"><span><i className="legend-dot cyan" /> инфраструктура</span><span><i className="legend-dot violet" /> продукт</span><span><i className="legend-dot green" /> данные</span><span><i className="legend-dot yellow" /> запуск</span></div>

          <div className="roadmap-board">
            <div className="board-topline"><span className="board-label">ЭТАПЫ РАЗРАБОТКИ</span><span className="board-hint"><span className="hint-line" /> кликните по карточке</span></div>
            <div className="board-signal"><span className="signal-title"><span className="signal-live" /> рабочий план</span><span className="signal-copy">от фундамента до публичного запуска</span><span className="signal-total">28 недель <span className="signal-total-bar"><i /></span></span></div>
            <div className="month-head"><span className="week-title">ПЕРИОД</span><span>МЕСЯЦ 01 · ФУНДАМЕНТ</span><span>МЕСЯЦ 02 · ДАННЫЕ</span><span>МЕСЯЦ 03 · AI</span><span>МЕСЯЦ 04 · ПРОДУКТ</span><span>МЕСЯЦ 05 · BETA</span><span>МЕСЯЦ 06–07 · РЕЛИЗ</span></div>
            <div className="week-head"><span className="week-title">НЕДЕЛИ</span>{weeks.map((week) => <span key={week} className={`week-cell ${week % 4 === 0 ? "major" : ""}`}>{week}</span>)}</div>
            <div className="board-rows">
              {phases.map((phase) => {
                const Icon = phase.icon;
                return <div className={`timeline-row ${activeId === phase.id ? "row-active" : ""}`} key={phase.id}>
                  <button className="timeline-label" onClick={() => selectPhase(phase.id)}><span className="timeline-icon" style={{ color: phase.color }}><Icon size={15} /></span><span><strong>{phase.title}</strong><small>{phase.short}</small></span></button>
                  <div className="timeline-grid">{weeks.map((week) => <span key={week} className="grid-cell" />)}<span className="today-line" title="Контрольная точка" /><button className="timeline-bar" onClick={() => selectPhase(phase.id)} style={{ left: `calc(${(phase.start - 1) / 28 * 100}% + 4px)`, width: `calc(${phase.span / 28 * 100}% - 8px)`, background: `linear-gradient(90deg, ${phase.color}, color-mix(in srgb, ${phase.color} 45%, #172033))`, "--phase-color": phase.color } as React.CSSProperties}><span>{phase.number} <b>·</b> {phase.weeks}</span><i /></button></div>
                </div>;
              })}
            </div>
            <div className="board-bottom"><span><span className="milestone-dot" /> MVP готов</span><span className="milestone-line" /><span className="milestone-label">28 недель</span><span className="milestone-pill"><Rocket size={12} /> launch point</span></div>
          </div>

          <div className="phase-cards-grid" id="modules">
            {phases.map((phase) => <PhaseCard key={phase.id} phase={phase} active={phase.id === activeId} onClick={() => selectPhase(phase.id)} />)}
          </div>
        </section>

        <section id="phase-detail" className="detail-section section-pad" style={{ "--phase-color": active.color } as React.CSSProperties}>
          <div className="detail-accent" />
          <div className="detail-kicker"><span style={{ color: active.color }}>{active.number}</span> / подробности этапа</div>
          <div className="detail-grid">
            <div className="detail-intro">
              <div className="detail-icon" style={{ color: active.color, borderColor: `${active.color}44`, background: `${active.color}12` }}><ActiveIcon size={27} /></div>
              <h2>{active.title}</h2>
              <p className="detail-short">{active.short}</p>
              <div className="detail-week"><CalendarDays size={16} /> {active.weeks}</div>
              <p className="detail-goal">{active.goal}</p>
              <div className="detail-team"><Users size={15} /> {active.team}</div>
            </div>
            <div className="detail-content">
              <div className="outcome-card"><span className="outcome-label"><Sparkles size={14} /> Что должно появиться</span><strong>{active.outcome}</strong></div>
              <div className="detail-columns">
                <div><h3>Что делаем</h3><ul>{active.tasks.map((task) => <li key={task}><span style={{ background: active.color }}><Check size={12} /></span>{task}</li>)}</ul></div>
                <div><h3>На выходе</h3><div className="deliverables">{active.deliverables.map((item) => <span key={item}><BadgeCheck size={14} /> {item}</span>)}</div><div className="done-box"><span className="done-label">Критерий готовности</span><p>{active.done}</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="modules-section section-pad">
          <div className="section-heading compact"><div><div className="eyebrow"><span className="eyebrow-pulse pink" /> Что создаём внутри</div><h2>Пять модулей.<br /><span>Один продукт.</span></h2></div><p>Этапы — это порядок работ. Модули — то, чем в итоге пользуется клиент.</p></div>
          <div className="module-grid">
            {icons.map(({ icon: Icon, label }, index) => <div className="module-card" key={label}><span className="module-index">0{index + 1}</span><span className="module-icon"><Icon size={21} /></span><strong>{label}</strong><span className="module-arrow"><ArrowUpRight size={15} /></span></div>)}
          </div>
        </section>

        <section id="release" className="release-section section-pad">
          <div className="release-card">
            <div className="release-glow" />
            <div className="release-copy"><div className="eyebrow"><span className="eyebrow-pulse yellow" /> Финишная прямая</div><h2>Неделя 28.<br /><em>Можно запускать.</em></h2><p>К этому моменту у команды есть рабочий MVP, измеренные показатели, понятная документация и план следующего этапа.</p><a className="button button-light" href="#roadmap">Вернуться к диаграмме <ArrowUpRight size={16} /></a></div>
            <div className="release-checklist"><div className="checklist-head"><span>RELEASE CHECKLIST</span><span className="checklist-status"><span /> READY</span></div>{["Критерии приёмки выполнены", "Нет Critical / High-дефектов", "Backup и план отката проверены", "10 бета-тестеров прошли сценарии"].map((item) => <div className="check-row" key={item}><span><Check size={13} /></span>{item}</div>)}<div className="release-week"><Rocket size={15} /> MVP launch · 28 / 28</div></div>
          </div>
        </section>
      </main>

      <footer className="footer section-pad"><div className="brand footer-brand"><span className="brand-mark"><Scale size={18} /></span><span>Град<span className="brand-dot">.</span>AI</span></div><span>План создания проекта · 2026</span><span>Бюджет MVP · 13 000 000 ₽</span></footer>
    </div>
  );
}
