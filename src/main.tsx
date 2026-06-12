import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, CheckCircle2, Cloud, Github, MapPin, Moon, SunMedium } from 'lucide-react';
import './styles.css';

const DepthScene = lazy(() => import('./scene/DepthScene'));

gsap.registerPlugin(ScrollTrigger);

type FlowStep = { label: string; note?: string };
type RoleCard = { label: string; value: string };

const engineeringRoadmap = ['EOX Vantage · 2021', 'Ericsson · 2021–2024', 'Cal-Comp Electronics · 2024–Present'];
const ericssonPipeline: FlowStep[] = [
  { label: 'Subscriber Transaction', note: 'Recharge · Top-up · Plans' },
  { label: 'Charging System', note: 'Subscriber events' },
  { label: 'Mediation System', note: 'Usage processing' },
  { label: 'Operational Database', note: 'Validated records' },
  { label: 'API Layer', note: 'Service contracts' },
  { label: 'Web Applications', note: 'Self Care · KIC · Reseller' },
  { label: 'Data Warehouse', note: 'History at scale' },
  { label: 'Reporting', note: 'Primary ownership' },
];
const stlc = ['Requirement Analysis', 'Test Planning', 'Test Design', 'Environment Setup', 'Test Execution', 'Defect Reporting', 'Re-testing', 'Regression Testing', 'Test Closure'];
const releaseFlow = ['Development Team', 'Software Package', 'Validation Environment', 'Smoke Testing', 'Integration Testing', 'Regression Testing', 'Issue Analysis', 'Fix Validation', 'Production Deployment', 'Production Monitoring'];
const defectLoop = ['Issue', 'Collect Logs', 'Root Cause Analysis', 'Development Team', 'New Build', 'Re-validation'];
const eoxFlow = ['Business Process', 'UiPath Bot', 'ERP / SCM', 'Validation', 'Automated Execution', 'Business Outcome'];
const testingTypes = ['Smoke', 'Sanity', 'SIT', 'System', 'Integration', 'Regression', 'Performance', 'Load', 'UAT'];
const platform = ['MapR', 'Greenplum', 'OCP', 'Kubernetes', 'CI/CD', 'Red Hat Linux'];
const aws = ['EC2', 'S3', 'IAM', 'CloudWatch'];
const projects = ['Falcon Dashboard', 'SFC Auto-Update', 'CIMation QC Tool', 'Production Analytics', 'Deployment Automation'];
const automation = ['Python', 'PowerShell', 'Bash', 'SQL'];

function useDarkMode() {
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  return { dark, setDark };
}

function useScrollSetup() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34, rotateX: 3 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 84%', once: true },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.parallax) || -8,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
        });
      });
    });
    return () => ctx.revert();
  }, []);
}

function App() {
  const { dark, setDark } = useDarkMode();
  useScrollSetup();

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink antialiased transition-colors duration-700 dark:bg-[#121820] dark:text-[#eef4ed]">
      <AmbientLayers />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/75 backdrop-blur-xl dark:border-white/10 dark:bg-[#121820]/72">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8" aria-label="Primary navigation">
          <a href="#home" className="font-display text-xl font-semibold tracking-[0.18em] text-pine dark:text-mist">RD</a>
          <div className="hidden gap-6 text-xs font-semibold uppercase tracking-[0.22em] text-ink/65 dark:text-white/65 md:flex">
            {['Experience', 'Architecture', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-clay dark:hover:text-[#ffcf9a]">{item}</a>
            ))}
          </div>
          <button onClick={() => setDark(!dark)} className="journal-button px-3 py-2" aria-label="Toggle light and dark mode">
            {dark ? <SunMedium size={17} /> : <Moon size={17} />}
          </button>
        </nav>
      </header>

      <main id="home" className="relative z-10">
        <Hero />
        <Roadmap />
        <About />
        <Ericsson />
        <CalComp />
        <Eox />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

function AmbientLayers() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="paper-grain" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(184,111,82,.18),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(99,151,143,.19),transparent_34%),linear-gradient(180deg,transparent,rgba(255,255,255,.25))] dark:bg-[radial-gradient(circle_at_18%_8%,rgba(184,111,82,.17),transparent_28%),radial-gradient(circle_at_80%_4%,rgba(99,151,143,.18),transparent_34%),linear-gradient(180deg,rgba(18,24,32,.3),rgba(18,24,32,.9))]" />
      <div className="cloud cloud-a" />
      <div className="cloud cloud-b" />
      <div className="cloud cloud-c" />
      <div className="topo-lines" />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen px-5 pb-20 pt-28 lg:px-8 lg:pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.03fr_.97fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pine/20 bg-white/45 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-pine shadow-sm dark:border-white/10 dark:bg-white/8 dark:text-mist">
            <MapPin size={15} /> Bangkok, Thailand
          </div>
          <h1 className="font-display text-6xl font-semibold leading-[0.92] tracking-tight text-[#18231f] dark:text-white sm:text-7xl lg:text-8xl">REEVAN<br />D&apos;SOUZA</h1>
          <p className="mt-5 text-xl font-semibold text-clay dark:text-[#ffcf9a]">Software QA &amp; Test Engineer</p>
          <p className="mt-4 max-w-2xl text-3xl font-light leading-tight text-ink/80 dark:text-white/80">“Building quality into every release.”</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {['Work Permit Holder', 'Open to Relocation', 'Available in 1 Month'].map((badge) => <Badge key={badge}>{badge}</Badge>)}
          </div>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#experience" className="journal-button bg-pine px-6 py-3 text-white shadow-ink dark:bg-mist dark:text-[#10211f]">View Experience <ArrowDown size={17} /></a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="journal-button px-6 py-3"><Github size={18} /> GitHub</a>
          </div>
        </motion.div>
        <div className="relative min-h-[420px] rounded-[2.2rem] border border-ink/10 bg-white/25 p-3 shadow-journal backdrop-blur-md dark:border-white/10 dark:bg-white/5" data-parallax="-4">
          <Suspense fallback={<div className="grid h-[420px] place-items-center text-sm text-ink/50 dark:text-white/50">Painting landscape…</div>}>
            <DepthScene />
          </Suspense>
          <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/45 bg-paper/78 p-5 shadow-journal backdrop-blur-xl dark:border-white/10 dark:bg-[#121820]/78">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-pine dark:text-mist">Quality thesis</p>
            <p className="mt-2 text-sm leading-6 text-ink/72 dark:text-white/72">Engineer releases as observable systems: validate data paths, stress environments, trace defects, and protect users before production.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-pine/20 bg-white/55 px-4 py-2 text-sm font-semibold text-pine shadow-sm dark:border-white/10 dark:bg-white/8 dark:text-mist">{children}</span>;
}

function Roadmap() {
  return (
    <section className="relative px-5 py-16 lg:px-8" data-reveal>
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-ink/10 bg-white/38 p-6 shadow-journal backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <SectionKicker>Illustrated engineering roadmap</SectionKicker>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {engineeringRoadmap.map((item, index) => (
            <div key={item} className="relative rounded-3xl border border-pine/15 bg-paper/70 p-6 dark:border-white/10 dark:bg-white/5">
              <span className="absolute -top-3 left-6 rounded-full bg-clay px-3 py-1 text-xs font-bold text-white">0{index + 1}</span>
              <p className="font-display text-2xl font-semibold">{item}</p>
              {index < engineeringRoadmap.length - 1 && <div className="road-arrow hidden md:block">↓</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="relative px-5 py-16 lg:px-8" data-reveal>
      <div className="mx-auto max-w-5xl text-center">
        <SectionKicker>About</SectionKicker>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">Systems-minded QA for releases that cannot surprise production.</h2>
        <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-ink/72 dark:text-white/72">Software QA &amp; Test Engineer with 5+ years of experience across telecom and manufacturing environments specializing in software validation, system integration, cloud migration, automation, and quality engineering for large-scale systems.</p>
      </div>
    </section>
  );
}

function Ericsson() {
  return (
    <section id="experience" className="relative px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ExperienceHeader company="Ericsson" eyebrow="Largest case study · Telecom quality engineering" role="Solution Integrator & Associate Solution Integrator" meta="Bangalore, India · 2021–2024" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <JournalCard>
            <p className="text-lg leading-8 text-ink/76 dark:text-white/76">Ericsson is a global telecommunications company powering 5G, OSS/BSS, cloud and network software used worldwide. Reevan worked in Agile Systems and Verification teams supporting AT&amp;T prepaid platforms serving millions of subscribers.</p>
            <PillGrid items={['System Integration', 'Reporting Validation', 'Cloud Migration', 'Platform Reliability', 'End-to-End Testing']} />
          </JournalCard>
          <MetricGrid cards={[{ label: 'Daily regression', value: '600 scenarios · 6 AM & 6 PM' }, { label: 'Scale tested', value: '10M+ subscriber records' }, { label: 'Reliability target', value: '99%+ uptime' }, { label: 'Ownership', value: 'Reporting & Usage History' }]} />
        </div>
        <Subsection title="BSS integration pipeline" note="Animated data packets show how subscriber actions become validated reporting insight.">
          <FlowDiagram steps={ericssonPipeline} variant="pipeline" />
        </Subsection>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <JournalCard>
            <h3 className="card-title">Responsibilities</h3>
            <PillGrid items={['Red Hat Linux operations', 'Integration testing', 'Data validation', 'Troubleshooting', 'Production support', 'Root Cause Analysis', 'Defect Investigation', 'Fix Validation']} />
          </JournalCard>
          <JournalCard>
            <h3 className="card-title">AT&amp;T applications validated</h3>
            <PillGrid items={['Self Care', 'KIC Care', 'Reseller Care', 'Recharge', 'Top-up', 'Plan changes', 'Usage history', 'Account history']} />
          </JournalCard>
        </div>
        <Subsection title="Software Testing Life Cycle" note="Structured QA from requirement analysis through closure, with evidence captured across each checkpoint.">
          <FlowDiagram steps={stlc.map((label) => ({ label }))} variant="stlc" />
          <PillGrid items={testingTypes} />
        </Subsection>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <JournalCard className="bg-pine/95 text-white dark:bg-[#18322f]">
            <h3 className="font-display text-4xl font-semibold">AWS migration · 1.5 years</h3>
            <p className="mt-4 text-lg leading-8 text-white/78">Migrated Charging, Mediation, APIs, Databases, Reporting, and Customer portals from Plano, Texas on-premises infrastructure to AWS.</p>
            <blockquote className="mt-6 rounded-3xl border border-white/20 bg-white/10 p-5 font-display text-3xl">“Validated migration with zero functional impact.”</blockquote>
            <PillGrid items={['Functional Testing', 'System Testing', 'Integration Testing', 'Regression Testing', 'Performance Testing', 'Load Testing', 'API Validation', 'Data Integrity Validation', 'Cross-environment Verification', 'Post-migration Testing']} inverted />
          </JournalCard>
          <JournalCard>
            <h3 className="card-title">Cloud and platform reliability</h3>
            <PillGrid items={aws} />
            <div className="mt-6 h-px bg-ink/10 dark:bg-white/10" />
            <PillGrid items={platform} />
          </JournalCard>
        </div>
      </div>
    </section>
  );
}

function CalComp() {
  return (
    <section id="architecture" className="relative px-5 py-20 lg:px-8" data-reveal>
      <div className="mx-auto max-w-7xl">
        <ExperienceHeader company="Cal-Comp Electronics" eyebrow="Manufacturing release validation" role="Software Validation Engineer" meta="Bangkok, Thailand · 2024–Present" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_.8fr]">
          <JournalCard>
            <p className="text-lg leading-8 text-ink/76 dark:text-white/76">Validates software and firmware releases in production environments while collaborating with customer development teams, quality teams, IT teams, and production teams.</p>
            <Subsection title="Release flow" compact><FlowDiagram steps={releaseFlow.map((label) => ({ label }))} variant="release" /></Subsection>
          </JournalCard>
          <JournalCard>
            <h3 className="card-title">Defect loop and automation</h3>
            <LoopDiagram items={defectLoop} />
            <PillGrid items={automation} />
            <p className="mt-6 rounded-3xl bg-clay/12 p-5 text-lg font-semibold text-clay dark:bg-[#ffcf9a]/10 dark:text-[#ffcf9a]">Reduced manual effort by approximately 40%.</p>
          </JournalCard>
        </div>
      </div>
    </section>
  );
}

function Eox() {
  return (
    <section className="relative px-5 py-20 lg:px-8" data-reveal>
      <div className="mx-auto max-w-7xl">
        <ExperienceHeader company="EOX Vantage" eyebrow="Automation foundation" role="Automation Engineer" meta="TWFG projects · 2021" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <JournalCard>
            <h3 className="card-title">RPA toolkit</h3>
            <PillGrid items={['UiPath', 'Selenium', 'Python', 'ERP integration', 'SCM integration']} />
            <MetricGrid cards={[{ label: 'Bots built', value: '5+' }, { label: 'Manual effort reduction', value: '75%' }]} />
          </JournalCard>
          <JournalCard>
            <FlowDiagram steps={eoxFlow.map((label) => ({ label }))} variant="release" />
          </JournalCard>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative px-5 py-20 lg:px-8" data-reveal>
      <div className="mx-auto max-w-7xl">
        <SectionKicker>Dedicated projects</SectionKicker>
        <h2 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-tight">Tools that turn validation work into repeatable engineering systems.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {projects.map((project, index) => (
            <motion.article whileHover={{ y: -8, rotate: index % 2 ? 1 : -1 }} key={project} className="rounded-[1.7rem] border border-ink/10 bg-white/45 p-5 shadow-journal backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <Cloud className="text-clay" />
              <h3 className="mt-5 font-display text-3xl font-semibold">{project}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/65 dark:text-white/65">Notebook-to-production craft: observable workflows, clean handoffs, and fewer manual release risks.</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="relative px-5 py-24 lg:px-8" data-reveal>
      <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-ink/10 bg-pine p-8 text-center text-white shadow-ink dark:border-white/10 dark:bg-[#18322f] md:p-14">
        <SectionKicker light>Final-round interview ready</SectionKicker>
        <h2 className="mt-4 font-display text-5xl font-semibold">A QA engineer who can reason across systems, data, cloud, and production.</h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/76">Designed for engineering managers evaluating software quality, systems thinking, automation depth, cloud migration experience, and release craftsmanship.</p>
        <a href="#home" className="journal-button mt-8 inline-flex bg-white px-6 py-3 text-pine">Back to top</a>
      </div>
    </footer>
  );
}

function ExperienceHeader({ company, eyebrow, role, meta }: { company: string; eyebrow: string; role: string; meta: string }) {
  return (
    <div data-reveal className="rounded-[2.2rem] border border-ink/10 bg-white/40 p-6 shadow-journal backdrop-blur-xl dark:border-white/10 dark:bg-white/5 md:p-8">
      <SectionKicker>{eyebrow}</SectionKicker>
      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div><h2 className="font-display text-5xl font-semibold md:text-7xl">{company}</h2><p className="mt-3 text-xl font-semibold text-clay dark:text-[#ffcf9a]">{role}</p></div>
        <p className="rounded-2xl border border-pine/15 bg-paper/65 px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-pine dark:border-white/10 dark:bg-white/5 dark:text-mist">{meta}</p>
      </div>
    </div>
  );
}

function SectionKicker({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`text-xs font-black uppercase tracking-[0.28em] ${light ? 'text-white/70' : 'text-pine dark:text-mist'}`}>{children}</p>;
}

function JournalCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div data-reveal className={`rounded-[2rem] border border-ink/10 bg-white/42 p-6 shadow-journal backdrop-blur-xl dark:border-white/10 dark:bg-white/5 md:p-8 ${className}`}>{children}</div>;
}

function PillGrid({ items, inverted = false }: { items: string[]; inverted?: boolean }) {
  return <div className="mt-6 flex flex-wrap gap-2">{items.map((item) => <span key={item} className={`rounded-full border px-3 py-2 text-sm font-semibold ${inverted ? 'border-white/20 bg-white/10 text-white/86' : 'border-pine/15 bg-paper/70 text-ink/75 dark:border-white/10 dark:bg-white/5 dark:text-white/75'}`}>{item}</span>)}</div>;
}

function MetricGrid({ cards }: { cards: RoleCard[] }) {
  return <div className="mt-0 grid gap-4 sm:grid-cols-2">{cards.map((card) => <div key={card.label} className="rounded-3xl border border-pine/15 bg-paper/70 p-5 dark:border-white/10 dark:bg-white/5"><p className="text-xs font-bold uppercase tracking-[0.22em] text-pine dark:text-mist">{card.label}</p><p className="mt-2 font-display text-3xl font-semibold">{card.value}</p></div>)}</div>;
}

function Subsection({ title, note, children, compact = false }: { title: string; note?: string; children: React.ReactNode; compact?: boolean }) {
  return <div className={compact ? 'mt-6' : 'mt-8'} data-reveal><div className="mb-5 flex flex-col justify-between gap-2 md:flex-row md:items-end"><h3 className="font-display text-4xl font-semibold">{title}</h3>{note && <p className="max-w-2xl text-sm leading-6 text-ink/60 dark:text-white/60">{note}</p>}</div>{children}</div>;
}

function FlowDiagram({ steps, variant }: { steps: FlowStep[]; variant: 'pipeline' | 'stlc' | 'release' }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className={`flow flow-${variant}`}>
      <svg className="flow-lines" viewBox="0 0 1200 180" preserveAspectRatio="none" aria-hidden="true">
        <path d="M40 90 C220 20 330 160 500 90 S820 20 1160 90" />
        {!reduceMotion && <circle r="7" className="packet"><animateMotion dur={variant === 'pipeline' ? '4.8s' : '6.4s'} repeatCount="indefinite" path="M40 90 C220 20 330 160 500 90 S820 20 1160 90" /></circle>}
      </svg>
      <div className="flow-grid" style={{ ['--cols' as string]: Math.min(steps.length, 5) }}>
        {steps.map((step, index) => <div className="flow-node" key={`${step.label}-${index}`}><CheckCircle2 size={18} /><strong>{step.label}</strong>{step.note && <small>{step.note}</small>}</div>)}
      </div>
    </div>
  );
}

function LoopDiagram({ items }: { items: string[] }) {
  return <div className="loop-diagram">{items.map((item, index) => <div key={item} className="loop-node" style={{ transform: `rotate(${index * (360 / items.length)}deg) translate(8.2rem) rotate(-${index * (360 / items.length)}deg)` }}>{item}</div>)}<div className="loop-core">Defect evidence loop</div></div>;
}

createRoot(document.getElementById('root')!).render(<App />);
