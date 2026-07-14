import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Activity, ArrowRight, ArrowUpRight, Award, BarChart3, Bot, Brain, Briefcase,
  Check, ChevronDown, Command, Cpu, Download, Gauge, Github, Globe2, Layers,
  Linkedin, Mail, MapPin, Megaphone, MessageSquare, Mouse, Palette, Phone,
  Rocket, Search, Send, Sparkles, Target, TrendingUp, Users, Wand2, X, Zap,
  Star, Play, Filter, Eye, ExternalLink, Terminal, Trophy, Radar, LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const HERO_STATS = [
  { label: "Years Experience", value: 4, suffix: "+" },
  { label: "Marketing Channels", value: 12, suffix: "" },
  { label: "Campaigns Executed", value: 180, suffix: "+" },
  { label: "Industries", value: 9, suffix: "" },
  { label: "AI Tools Mastered", value: 20, suffix: "+" },
  { label: "Marketing Tools", value: 25, suffix: "+" },
  { label: "Team Members Led", value: 6, suffix: "" },
];

const NAV = [
  { id: "command", label: "Command" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "tools", label: "Tools" },
  { id: "projects", label: "Projects" },
  { id: "campaigns", label: "Campaigns" },
  { id: "ai", label: "AI Lab" },
  { id: "analytics", label: "Analytics" },
  { id: "certs", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

const EXPERIENCE = [
  {
    company: "KnovaOne",
    role: "Senior Digital Marketing Specialist",
    duration: "Jun 2025 — Mar 2026",
    location: "Pune, India",
    color: "royal-purple",
    summary:
      "Leading integrated marketing strategy — brand positioning, rebranding, GTM, SEO, and AI-powered growth systems for a cybersecurity ecosystem.",
    responsibilities: [
      "Own end-to-end marketing strategy and execution",
      "Lead brand refresh across sub-brands",
      "Mentor and manage a cross-functional team",
      "Drive stakeholder alignment on GTM messaging",
    ],
    achievements: [
      "Rebranded parent + subsidiary identity system",
      "Rebuilt marketing website architecture",
      "Deployed AI-assisted content operations",
    ],
    tools: ["HubSpot", "Semrush", "Webflow", "Figma", "ChatGPT", "GA4"],
    channels: ["SEO", "LinkedIn", "Email", "Website", "Content"],
    impact: "Repositioned brand and unified voice across 3 entities",
    kpis: [
      { k: "Brand mentions", v: "+140%" },
      { k: "Organic sessions", v: "+68%" },
      { k: "Qualified leads", v: "+2.4x" },
    ],
    gallery: 6,
  },
  {
    company: "Securityium",
    role: "Digital Marketing Specialist",
    duration: "Jun 2024 — Apr 2025",
    location: "London, UK · Remote",
    color: "deep-blue",
    summary:
      "Full-stack marketing for a global pentesting firm — SEO, paid, product marketing, GTM, email, RevOps and creative production.",
    responsibilities: [
      "Own SEO, paid, and social growth loops",
      "Ship product marketing narratives & GTM",
      "Design flyers, brochures, presentations",
      "Automate lifecycle email programs",
    ],
    achievements: [
      "SEO score 32 → 100 on Lighthouse",
      "Email open rate 21% → 35% (USA)",
      "Delivered 27 top-performing social posts",
      "Built lead-gen engine across 5 industries",
    ],
    tools: ["Semrush", "Screaming Frog", "HubSpot", "Instantly", "Apollo", "LinkedIn Ads", "Google Ads", "Figma"],
    channels: ["SEO", "Google Ads", "LinkedIn Ads", "Email", "Content", "Social"],
    impact: "Transformed marketing engine — measurable growth across every channel",
    kpis: [
      { k: "Lighthouse SEO", v: "32 → 100" },
      { k: "Email open rate", v: "21% → 35%" },
      { k: "Delivery rate", v: "87% → 99%" },
      { k: "Unsubscribes", v: "6% → 2%" },
    ],
    gallery: 9,
  },
  {
    company: "Upperthrust Technologies",
    role: "Digital Marketing Specialist",
    duration: "Jan 2024 — May 2024",
    location: "Pune, India",
    color: "cyan-accent",
    summary:
      "Led marketing strategy and creative for a services firm — SEO, campaigns, website, content and events.",
    responsibilities: [
      "Craft and execute marketing strategy",
      "Lead SEO and campaign performance",
      "Optimize website UX and conversion",
      "Own content, video and events",
    ],
    achievements: [
      "Redesigned marketing funnel",
      "Launched video series and event coverage",
    ],
    tools: ["WordPress", "Semrush", "Canva", "Adobe", "Google Ads"],
    channels: ["SEO", "Website", "Content", "Events", "Email"],
    impact: "Elevated brand & funnel maturity in a 5-month sprint",
    kpis: [
      { k: "Site engagement", v: "+55%" },
      { k: "Content velocity", v: "3x" },
    ],
    gallery: 5,
  },
  {
    company: "Machintel Systems",
    role: "Digital Marketing Executive",
    duration: "Nov 2022 — Dec 2023",
    location: "Pune, India",
    color: "emerald-signal",
    summary:
      "First chapter — social media, SEO, content and email across the org and multiple clients.",
    responsibilities: [
      "Manage social platforms across accounts",
      "Content creation for social + web",
      "Support SEO strategy and implementation",
      "Analytics & reporting",
    ],
    achievements: [
      "Scaled social output across multiple brands",
      "Built early SEO reporting rhythms",
    ],
    tools: ["WordPress", "Canva", "Meta Business Suite", "Mailchimp"],
    channels: ["Social", "SEO", "Email", "Content"],
    impact: "Foundation years — shipped the reps that shaped the craft",
    kpis: [
      { k: "Weekly posts", v: "20+" },
      { k: "Accounts managed", v: "6" },
    ],
    gallery: 4,
  },
];

const SKILL_UNIVERSE = [
  { name: "SEO", level: 95, projects: 40, tools: "Semrush · Screaming Frog · Ahrefs", cert: "Semrush Academy", desc: "Technical + on-page + off-page. Lighthouse SEO 32→100 at Securityium." },
  { name: "SEM", level: 88, projects: 22, tools: "Google Ads · LinkedIn Ads", cert: "Google Ads", desc: "Search, display, app and video campaigns with tight ROAS discipline." },
  { name: "Paid Media", level: 90, projects: 30, tools: "Google · LinkedIn · Meta", cert: "Meta Blueprint", desc: "Full-funnel paid strategy across search and social." },
  { name: "Email Marketing", level: 92, projects: 25, tools: "HubSpot · Instantly · Mailchimp", cert: "HubSpot Email", desc: "Lifecycle + outbound. Pushed open rate 21%→35%." },
  { name: "Social Media", level: 90, projects: 60, tools: "LinkedIn · Meta · X", cert: "LinkedIn Marketing", desc: "Editorial systems, community, and paid social." },
  { name: "Analytics", level: 88, projects: 45, tools: "GA4 · Looker · HubSpot", cert: "Google Analytics", desc: "Instrumentation, dashboards, and insight → action loops." },
  { name: "AI Marketing", level: 94, projects: 20, tools: "ChatGPT · Claude · Perplexity", cert: "AI in Digital Marketing", desc: "Prompt systems, agents, and automated content ops." },
  { name: "Product Marketing", level: 88, projects: 12, tools: "Figma · Notion", cert: "PMM Fundamentals", desc: "Positioning, messaging, launches and enablement." },
  { name: "Brand Marketing", level: 86, projects: 10, tools: "Figma · Adobe", cert: "Brand Strategy", desc: "Identity systems, voice, and rebrands across sub-brands." },
  { name: "RevOps", level: 82, projects: 8, tools: "HubSpot · Apollo · Zoho", cert: "RevOps Playbook", desc: "Sales + marketing alignment and pipeline hygiene." },
  { name: "Website Optimization", level: 90, projects: 15, tools: "Webflow · WordPress", cert: "PageSpeed Insights", desc: "Perf, accessibility, and CRO. Accessibility 75%→100%." },
  { name: "Leadership", level: 90, projects: 4, tools: "Notion · Loom · Slack", cert: "Leadership", desc: "Hiring, coaching, and building high-agency marketing teams." },
];

const TOOLS = [
  { name: "HubSpot", cat: "CRM", years: 3, projects: 30, use: "Lifecycle marketing + CRM" },
  { name: "Semrush", cat: "SEO", years: 4, projects: 40, use: "SEO audits + keyword strategy" },
  { name: "Screaming Frog", cat: "SEO", years: 3, projects: 25, use: "Technical crawls" },
  { name: "Google Ads", cat: "Advertising", years: 4, projects: 22, use: "Search + performance max" },
  { name: "LinkedIn Ads", cat: "Advertising", years: 3, projects: 18, use: "B2B ABM campaigns" },
  { name: "Apollo", cat: "CRM", years: 2, projects: 12, use: "Outbound + enrichment" },
  { name: "Instantly", cat: "Email", years: 2, projects: 10, use: "Cold email at scale" },
  { name: "Zoho", cat: "CRM", years: 2, projects: 8, use: "Sales pipeline" },
  { name: "Webflow", cat: "CMS", years: 2, projects: 6, use: "Marketing sites" },
  { name: "WordPress", cat: "CMS", years: 4, projects: 30, use: "Content + SEO" },
  { name: "Figma", cat: "Design", years: 4, projects: 60, use: "Marketing creative + systems" },
  { name: "Adobe Suite", cat: "Design", years: 5, projects: 80, use: "Photoshop + Illustrator" },
  { name: "ChatGPT", cat: "AI", years: 3, projects: 100, use: "Content, research, agents" },
  { name: "Claude", cat: "AI", years: 2, projects: 40, use: "Long-form + strategy" },
  { name: "Perplexity", cat: "Research", years: 2, projects: 30, use: "Live research" },
  { name: "Google Analytics", cat: "Analytics", years: 4, projects: 45, use: "GA4 dashboards" },
  { name: "Looker Studio", cat: "Analytics", years: 3, projects: 20, use: "Reporting" },
  { name: "Sales Navigator", cat: "CRM", years: 3, projects: 15, use: "B2B prospecting" },
  { name: "Canva", cat: "Design", years: 4, projects: 100, use: "Rapid creative" },
  { name: "n8n", cat: "Automation", years: 1, projects: 8, use: "Marketing workflows" },
];

const TOOL_CATS = ["All", "SEO", "Analytics", "CRM", "Automation", "AI", "Design", "Advertising", "CMS", "Email", "Research"];

const PROJECTS = [
  {
    title: "Cybersecurity Content Engine",
    org: "Securityium",
    tag: "SEO · Content · AI",
    color: "royal-purple",
    overview: "Built a content operation shipping 33+ assets/month across blogs, newsletters, infographics, social and polls.",
    problem: "Low organic visibility and inconsistent brand voice in a crowded cybersecurity market.",
    research: "Analyzed SERP intent across cloud, appsec and OWASP topics. Mapped competitor gaps and searcher journeys.",
    strategy: "Cluster-based SEO with pillar pages, weekly cadence, and AI-assisted drafting workflow.",
    execution: "27 posts shipped in the first quarter, aligned across LinkedIn, X, Medium and site.",
    tools: ["Semrush", "ChatGPT", "WordPress", "Canva", "HubSpot"],
    results: ["+140% brand mentions", "Lighthouse SEO 32→100", "27 posts in Q1"],
    learning: "AI accelerates ops but editorial taste is the moat.",
    kpis: [
      { k: "Assets/mo", v: "33" },
      { k: "SEO", v: "100" },
      { k: "Post reach", v: "+3.2x" },
    ],
  },
  {
    title: "Email Program Turnaround (USA)",
    org: "Securityium",
    tag: "Email · Lifecycle · RevOps",
    color: "emerald-signal",
    overview: "Rebuilt cold + lifecycle email from scratch — deliverability, segmentation and copy.",
    problem: "Sub-par open rates, low deliverability, high unsubscribes in the US market.",
    research: "Inbox placement audit, list health, and message-market fit analysis.",
    strategy: "Segmented sequences, warmed domains, sharp subject lines, tight CTAs.",
    execution: "Instantly + HubSpot workflows with A/B testing and daily monitoring.",
    tools: ["Instantly", "HubSpot", "Apollo"],
    results: ["Delivery 87% → 99%", "Open rate 21% → 35%", "Unsub 6% → 2%"],
    learning: "Deliverability is a product problem, not a copy problem.",
    kpis: [
      { k: "Open", v: "35%" },
      { k: "Delivery", v: "99%" },
      { k: "Unsub", v: "2%" },
    ],
  },
  {
    title: "Rebranding & Identity System",
    org: "KnovaOne",
    tag: "Brand · GTM · Design",
    color: "cyan-accent",
    overview: "Led the rebrand of parent + subsidiary identities — logo, palette, voice, and web system.",
    problem: "Disconnected sub-brands with no coherent visual or verbal identity.",
    research: "Stakeholder interviews, competitor audit, and market positioning workshops.",
    strategy: "Anchor brand mark (Q) with modular sub-brand system + tone-of-voice guide.",
    execution: "Shipped identity kit, templates, and site refresh across 3 entities.",
    tools: ["Figma", "Adobe Illustrator", "Webflow"],
    results: ["Unified 3 brand entities", "Rolled out full identity kit", "New site architecture"],
    learning: "A rebrand is 30% design, 70% alignment.",
    kpis: [
      { k: "Entities", v: "3" },
      { k: "Templates", v: "40+" },
      { k: "Alignment", v: "100%" },
    ],
  },
  {
    title: "Website Optimization Sprint",
    org: "Securityium",
    tag: "Web · Performance · CRO",
    color: "orange-signal",
    overview: "Comprehensive PageSpeed and accessibility overhaul — from failing to perfect scores.",
    problem: "Poor Lighthouse scores were bleeding organic and conversion.",
    research: "Full audit, Core Web Vitals mapping, and heuristic UX review.",
    strategy: "Prioritize CLS + LCP wins, accessible components, semantic HTML.",
    execution: "Shipped in 3 sprints with weekly PageSpeed reviews.",
    tools: ["Screaming Frog", "Lighthouse", "GA4"],
    results: ["Accessibility 75% → 100%", "SEO 32% → 100%", "Best Practices 63% → 89%"],
    learning: "Performance is a compounding brand asset.",
    kpis: [
      { k: "A11y", v: "100" },
      { k: "SEO", v: "100" },
      { k: "BP", v: "89" },
    ],
  },
  {
    title: "AI-Powered Marketing Workflows",
    org: "KnovaOne · Securityium",
    tag: "AI · Automation · Ops",
    color: "deep-blue",
    overview: "Built prompt systems and AI workflows for content, research, and campaign ideation.",
    problem: "Small team, large surface area — needed leverage without losing quality.",
    research: "Mapped the marketing workflow into repeatable prompt tasks.",
    strategy: "Library of prompts + agents for research, drafting, QA and repurposing.",
    execution: "Rolled out across content, SEO briefs, ads, and social.",
    tools: ["ChatGPT", "Claude", "Perplexity", "n8n"],
    results: ["3x content velocity", "40% research time saved", "Reusable prompt library"],
    learning: "The best AI workflows are boring, repeatable, and evaluated.",
    kpis: [
      { k: "Velocity", v: "3x" },
      { k: "Time saved", v: "40%" },
      { k: "Agents", v: "6" },
    ],
  },
  {
    title: "Lead Generation Engine",
    org: "Securityium",
    tag: "Growth · Paid · RevOps",
    color: "royal-purple",
    overview: "Multi-source pipeline blending website, LinkedIn, email, and outbound.",
    problem: "Pipeline gaps and single-channel dependency.",
    research: "Attribution audit + ICP re-scoping across 5 industries.",
    strategy: "Diversify sources: 4.1% website · outbound · LinkedIn · partnerships.",
    execution: "Aligned sales + marketing SLAs, weekly funnel reviews.",
    tools: ["HubSpot", "Apollo", "LinkedIn", "Instantly"],
    results: ["+2.4x qualified leads", "5-industry ICP", "Weekly funnel rhythm"],
    learning: "Compounding pipeline > one hero channel.",
    kpis: [
      { k: "MQL", v: "+2.4x" },
      { k: "ICPs", v: "5" },
      { k: "Sources", v: "4" },
    ],
  },
];

const CAMPAIGN_CATS = [
  "All", "SEO", "Google Ads", "LinkedIn Ads", "Email", "Branding",
  "Social Media", "Website", "Presentations", "Strategy", "Infographics", "Flyers",
];
const CAMPAIGNS = [
  { title: "OWASP 2025 GenAI Risks", cat: "SEO", org: "Securityium" },
  { title: "Cloud Migration Series", cat: "SEO", org: "KnovaOne" },
  { title: "Vulnerability Assessment 101", cat: "SEO", org: "Securityium" },
  { title: "US ABM · Q3 Push", cat: "LinkedIn Ads", org: "Securityium" },
  { title: "Cybersec Demo Book", cat: "Google Ads", org: "Securityium" },
  { title: "US Lifecycle Rebuild", cat: "Email", org: "Securityium" },
  { title: "KnovaOne Rebrand", cat: "Branding", org: "KnovaOne" },
  { title: "Sub-brand Identity Kit", cat: "Branding", org: "KnovaOne" },
  { title: "Weekly LinkedIn Editorial", cat: "Social Media", org: "Securityium" },
  { title: "Website Refresh v2", cat: "Website", org: "KnovaOne" },
  { title: "Board Deck · Q1", cat: "Presentations", org: "Securityium" },
  { title: "GTM Strategy · Cloud", cat: "Strategy", org: "KnovaOne" },
  { title: "Cyber Threat Infographic", cat: "Infographics", org: "Securityium" },
  { title: "Service Flyer Suite", cat: "Flyers", org: "Securityium" },
  { title: "National Tech Day Post", cat: "Social Media", org: "Machintel" },
  { title: "Video Series Launch", cat: "Website", org: "Upperthrust" },
];

const AI_STACK = [
  { name: "Prompt Systems", icon: Terminal, desc: "Reusable prompt libraries for content, research and QA." },
  { name: "Marketing Agents", icon: Bot, desc: "Chained agents for briefs, drafts, and repurposing." },
  { name: "Content Automation", icon: Wand2, desc: "Blog → social → newsletter pipelines at scale." },
  { name: "Research Copilot", icon: Search, desc: "Perplexity + Claude flows for market and competitor intel." },
  { name: "Analytics Assistant", icon: BarChart3, desc: "GA4 + Looker Q&A over marketing data." },
  { name: "Creative AI", icon: Palette, desc: "Image, layout, and iteration for campaigns." },
];

const CERTIFICATES = [
  { name: "Semrush SEO Toolkit", by: "Semrush Academy", date: "2024" },
  { name: "Google Ads · App Campaigns", by: "Google", date: "Dec 2023" },
  { name: "LinkedIn Content & Creative", by: "LinkedIn", date: "Dec 2024" },
  { name: "AI in Digital Marketing", by: "Semrush", date: "2024" },
  { name: "Social Media Marketing", by: "Semrush", date: "2024" },
  { name: "Email Marketing", by: "HubSpot", date: "2024" },
  { name: "Search Engine Marketing", by: "Semrush", date: "2024" },
  { name: "Leadership Essentials", by: "LinkedIn Learning", date: "2024" },
  { name: "Market Research", by: "Semrush", date: "2023" },
];

/* -------------------------------------------------------------------------- */
/* Primitives                                                                 */
/* -------------------------------------------------------------------------- */

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      {children}
    </section>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14 md:mb-20 max-w-3xl"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs font-mono tracking-widest uppercase text-muted-foreground backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-signal animate-pulse" />
        {eyebrow}
      </div>
      <h2 className="mt-5 text-4xl md:text-6xl font-semibold leading-[1.05]">{title}</h2>
      {sub && <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl">{sub}</p>}
    </motion.div>
  );
}

function GlassCard({ children, className = "", tilt = false }: { children: React.ReactNode; className?: string; tilt?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (!tilt || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setT({ x: ((e.clientX - r.left) / r.width - 0.5) * 10, y: ((e.clientY - r.top) / r.height - 0.5) * -10 });
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={tilt ? { transform: `perspective(900px) rotateY(${t.x}deg) rotateX(${t.y}deg)` } : undefined}
      className={`glass-card rounded-2xl transition-transform duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* -------------------------------------------------------------------------- */
/* Sections                                                                   */
/* -------------------------------------------------------------------------- */

function TopNav({ onCmd }: { onCmd: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all ${scrolled ? "glass-card" : ""}`}>
          <a href="#command" className="flex items-center gap-2 font-display font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg gradient-bg text-primary-foreground shadow-md">KA</span>
            <span className="hidden sm:inline">Kumar Aayush</span>
          </a>
          <nav className="hidden xl:flex items-center gap-0.5 whitespace-nowrap">
            {NAV.slice(1).map((n) => (
              className="rounded-full px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap"
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact">
              <Button className="gradient-bg text-primary-foreground shadow-md">Let's Talk <ArrowRight className="ml-1 h-4 w-4" /></Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const on = (e: MouseEvent) => setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 30, y: (e.clientY / window.innerHeight - 0.5) * 30 });
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, []);
  return (
    <Section id="command" className="pt-40 md:pt-48 pb-20 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 hero-bg" />
      <div className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      {/* orbits */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70">
        <div className="relative h-[720px] w-[720px] md:h-[900px] md:w-[900px]">
          <div className="absolute inset-0 rounded-full border border-royal-purple/20 animate-spin-slow" />
          <div className="absolute inset-10 rounded-full border border-cyan-accent/20 animate-spin-reverse" />
          <div className="absolute inset-24 rounded-full border border-deep-blue/15 animate-spin-slow" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full glass-card px-3 py-1.5 text-xs font-mono uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-signal opacity-70 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-signal" />
              </span>
              Marketing Intelligence Center · Live
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 text-5xl md:text-7xl xl:text-8xl font-semibold leading-[0.95]">
              I build{" "}
              <span className="gradient-text">growth engines</span>{" "}
              that compound.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
              Hi, I'm <span className="text-foreground font-medium">Kumar Aayush</span> — a Senior Digital Marketing
              Specialist blending brand, growth, SEO, paid, analytics, RevOps and AI into
              systems that ship measurable outcomes.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3">
              <a href="#projects"><Button size="lg" className="gradient-bg text-primary-foreground shadow-lg hover:shadow-[var(--shadow-glow)] transition-shadow">
                Explore My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Button></a>
          <a
  href="/resume.pdf"
  download="Kumar Aayush Resume.pdf"
>
  <Button
    size="lg"
    variant="outline"
    className="border-border/80 backdrop-blur"
  >
    <Download className="mr-2 h-4 w-4" />
    Download Resume
  </Button>
</a>

<a
  href="/portfolio.pdf"
  download="Kumar Aayush Portfolio.pdf"
>
  <Button
    size="lg"
    variant="outline"
    className="border-border/80 backdrop-blur"
  >
    <Download className="mr-2 h-4 w-4" />
    Download Portfolio
  </Button>
</a>
            </motion.div>

            {/* stats */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.55 }}
              className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
              {HERO_STATS.slice(0, 4).map((s) => (
                <GlassCard key={s.label} className="p-4">
                  <div className="text-3xl md:text-4xl font-semibold gradient-text">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs font-mono uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </GlassCard>
              ))}
            </motion.div>
          </div>

          {/* Right — floating dashboard widget cluster */}
          <div className="relative h-[520px] hidden lg:block">
            <FloatingWidgets mouse={mouse} />
          </div>
        </div>

        {/* extra stats row */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
          {HERO_STATS.slice(4).map((s) => (
            <GlassCard key={s.label} className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl gradient-bg grid place-items-center text-primary-foreground shadow">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-semibold"><Counter to={s.value} suffix={s.suffix} /></div>
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            </GlassCard>
          ))}
        </motion.div>

        <div className="mt-16 flex justify-center">
          <a href="#about" className="flex flex-col items-center gap-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <Mouse className="h-4 w-4" />
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </div>
    </Section>
  );
}

function FloatingWidgets({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <div className="relative h-full w-full">
      {/* Traffic widget */}
      <motion.div
        style={{ x: mouse.x * 0.4, y: mouse.y * 0.4 }}
        className="absolute top-0 right-0 w-64 animate-float"
      >
        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Organic Sessions</div>
              <div className="mt-1 text-3xl font-semibold">128.4K</div>
            </div>
            <Badge className="bg-emerald-signal/20 text-emerald-signal border-emerald-signal/30">+68%</Badge>
          </div>
          <Sparkline color="var(--emerald-signal)" seed={7} />
        </GlassCard>
      </motion.div>

      {/* KPI ring */}
      <motion.div
        style={{ x: mouse.x * -0.3, y: mouse.y * -0.3 }}
        className="absolute top-40 left-0 w-56 animate-float"
        transition={{ delay: 0.5 }}
      >
        <GlassCard className="p-5">
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Lighthouse SEO</div>
          <div className="mt-3 flex items-center gap-4">
            <RingChart value={100} />
            <div>
              <div className="text-2xl font-semibold gradient-text">100</div>
              <div className="text-[11px] text-muted-foreground">from 32</div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Email widget */}
      <motion.div
        style={{ x: mouse.x * 0.6, y: mouse.y * 0.6 }}
        className="absolute bottom-16 right-6 w-72 animate-float"
      >
        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Email Open Rate · US</div>
            <Badge className="bg-cyan-accent/20 text-deep-blue border-cyan-accent/30">A/B</Badge>
          </div>
          <div className="mt-3 text-3xl font-semibold">35%</div>
          <div className="mt-1 text-xs text-muted-foreground">Beat 21% market avg</div>
          <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
            <motion.div initial={{ width: 0 }} whileInView={{ width: "78%" }} viewport={{ once: true }} transition={{ duration: 1.2 }}
              className="h-full gradient-bg" />
          </div>
        </GlassCard>
      </motion.div>

      {/* Small badge */}
      <motion.div
        style={{ x: mouse.x * -0.5, y: mouse.y * -0.5 }}
        className="absolute bottom-6 left-10 animate-float"
      >
        <GlassCard className="px-4 py-3 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg gradient-bg grid place-items-center">
            <Trophy className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <div className="text-sm font-medium">LinkedIn Top Voice</div>
            <div className="text-[11px] text-muted-foreground">Digital Practices</div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Globe */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="relative h-56 w-56 rounded-full border border-border/40 bg-gradient-to-br from-cyan-accent/5 to-royal-purple/5 backdrop-blur opacity-60">
          <div className="absolute inset-0 rounded-full border-t border-border/60 rotate-45" />
          <div className="absolute inset-0 rounded-full border-t border-border/60 rotate-90" />
          <div className="absolute inset-0 rounded-full border-t border-border/60 -rotate-45" />
          <div className="absolute inset-0 grid place-items-center">
            <Globe2 className="h-12 w-12 text-royal-purple/60" />
          </div>
          <div className="absolute h-2 w-2 rounded-full bg-emerald-signal animate-pulse-ring" style={{ top: "30%", left: "20%" }} />
          <div className="absolute h-2 w-2 rounded-full bg-cyan-accent animate-pulse-ring" style={{ top: "60%", right: "18%" }} />
          <div className="absolute h-2 w-2 rounded-full bg-orange-signal animate-pulse-ring" style={{ bottom: "25%", left: "40%" }} />
        </div>
      </div>
    </div>
  );
}

function Sparkline({ color, seed = 3 }: { color: string; seed?: number }) {
  const pts = useMemo(() => {
    const n = 24;
    const arr = Array.from({ length: n }, (_, i) => {
      const v = 30 + Math.sin(i / 1.7 + seed) * 12 + (i / n) * 18 + (i % 3) * 2;
      return `${(i / (n - 1)) * 100},${60 - v}`;
    });
    return arr.join(" ");
  }, [seed]);
  return (
    <svg viewBox="0 0 100 60" className="mt-3 h-14 w-full">
      <defs>
        <linearGradient id={`sg-${seed}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
      <polygon points={`0,60 ${pts} 100,60`} fill={`url(#sg-${seed})`} />
    </svg>
  );
}

function RingChart({ value }: { value: number }) {
  const r = 24;
  const c = 2 * Math.PI * r;
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" className="-rotate-90">
      <circle cx="30" cy="30" r={r} stroke="var(--muted)" strokeWidth="6" fill="none" />
      <motion.circle
        cx="30" cy="30" r={r} strokeWidth="6" fill="none" strokeLinecap="round"
        stroke="url(#ring-grad)"
        initial={{ strokeDasharray: `0 ${c}` }}
        whileInView={{ strokeDasharray: `${(value / 100) * c} ${c}` }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      <defs>
        <linearGradient id="ring-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--deep-blue)" />
          <stop offset="100%" stopColor="var(--cyan-accent)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* -------------- About -------------- */
function About() {
  const values = [
    { icon: Target, title: "Mission", desc: "Turn marketing into a compounding growth engine — measurable, repeatable, humane." },
    { icon: Radar, title: "Vision", desc: "Marketing systems where brand, product and revenue speak with one voice." },
    { icon: Brain, title: "Philosophy", desc: "Strategy first, taste always, systems forever. AI as leverage, not a replacement for judgement." },
    { icon: Users, title: "Leadership", desc: "High-agency teams — clarity of outcome, autonomy of path, weekly rhythm." },
  ];
  return (
    <Section id="about" className="bg-gradient-to-b from-transparent via-secondary/40 to-transparent">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Executive Profile"
          title={<>Marketing that earns <span className="gradient-text">trust and results.</span></>}
          sub="A senior digital marketing leader with a bias for systems, storytelling, and measurable outcomes across brand, growth, product and AI."
        />
        <div className="mx-auto max-w-5xl">
          {/* Portrait placeholder */}
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a dedicated, results-driven marketing leader who treats every brand as a
              product. Across four companies — from cybersecurity to services — I've built
              modern marketing engines that pair narrative craft with rigorous analytics,
              AI-powered ops and disciplined RevOps.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              My work spans strategy and execution — GTM, SEO, paid, email, brand, website,
              analytics and team development. I'm happiest turning ambiguity into a plan and
              a plan into a system that ships every week.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {values.map((v) => (
                <motion.div key={v.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="glass-card rounded-2xl p-5 hover:-translate-y-1 transition-transform">
                  <div className="grid h-10 w-10 place-items-center rounded-xl gradient-bg text-primary-foreground shadow">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-3 font-semibold">{v.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{v.desc}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Strategic Thinker", "Team Builder", "Data-Driven", "AI-Native", "Full-Funnel", "Brand Craft"].map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full">{t}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* -------------- Experience -------------- */
function Experience() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="experience">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Career Timeline"
          title={<>Four companies. <span className="gradient-text">One growth playbook.</span></>}
          sub="Every stop reshaped the playbook — from social-first foundations to full-stack, AI-powered marketing leadership."
        />
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:-translate-x-px" />
          <div className="space-y-8">
            {EXPERIENCE.map((e, i) => {
              const opened = open === i;
              const side = i % 2 === 0;
              return (
                <div key={e.company} className="relative md:grid md:grid-cols-2 md:gap-10 items-start">
                  <div className={`hidden md:block ${side ? "" : "md:col-start-2"}`} />
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className={`relative pl-12 md:pl-0 ${side ? "md:col-start-1" : "md:col-start-2"}`}
                  >
                    <div className="absolute left-2 md:left-auto md:right-full md:top-6 md:mr-[-9px] top-6">
                      <div className={`h-4 w-4 rounded-full gradient-bg ring-4 ring-background shadow-lg`} />
                    </div>
                    <GlassCard tilt className="p-6 md:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{e.duration} · {e.location}</div>
                          <h3 className="mt-1 text-2xl font-semibold">{e.company}</h3>
                          <div className="mt-1 text-sm text-royal-purple font-medium">{e.role}</div>
                        </div>
                        <button
                          onClick={() => setOpen(opened ? null : i)}
                          className="grid h-9 w-9 place-items-center rounded-full gradient-bg text-primary-foreground shadow hover:scale-110 transition-transform"
                          aria-label="Expand"
                        >
                          <motion.span animate={{ rotate: opened ? 45 : 0 }}>+</motion.span>
                        </button>
                      </div>
                      <p className="mt-3 text-muted-foreground">{e.summary}</p>
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {e.kpis.slice(0, 3).map((k) => (
                          <div key={k.k} className="rounded-xl bg-background/60 border border-border/60 p-3">
                            <div className="text-lg font-semibold gradient-text">{k.v}</div>
                            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{k.k}</div>
                          </div>
                        ))}
                      </div>

                      <AnimatePresence initial={false}>
                        {opened && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 grid gap-5">
                              <Detail title="Responsibilities" items={e.responsibilities} />
                              <Detail title="Achievements" items={e.achievements} accent />
                              <div>
                                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Channels</div>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {e.channels.map((c) => <Badge key={c} variant="outline" className="rounded-full">{c}</Badge>)}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Tools</div>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {e.tools.map((c) => <Badge key={c} className="rounded-full bg-secondary text-secondary-foreground">{c}</Badge>)}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Gallery</div>
                                <div className="mt-2 grid grid-cols-3 gap-2">
                                  {Array.from({ length: e.gallery }).map((_, gi) => (
                                    <PlaceholderTile key={gi} label={`Asset ${gi + 1}`} />
                                  ))}
                                </div>
                              </div>
                              <div className="rounded-xl bg-gradient-to-r from-royal-purple/10 to-cyan-accent/10 border border-border/60 p-4 text-sm">
                                <span className="font-medium">Impact — </span><span className="text-muted-foreground">{e.impact}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </GlassCard>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Detail({ title, items, accent }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <div>
      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{title}</div>
      <ul className="mt-2 space-y-1.5">
        {items.map((it) => (
          <li key={it} className="flex gap-2 text-sm">
            <Check className={`h-4 w-4 mt-0.5 shrink-0 ${accent ? "text-emerald-signal" : "text-royal-purple"}`} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlaceholderTile({ label }: { label: string }) {
  return (
    <div className="group relative aspect-video rounded-lg border border-dashed border-border overflow-hidden bg-secondary/50">
      <div className="absolute inset-0 grid-lines opacity-40" />
      <div className="absolute inset-0 grid place-items-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="absolute inset-0 animate-shimmer opacity-30" />
    </div>
  );
}

/* -------------- Skills orbit -------------- */
function Skills() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <Section id="skills" className="bg-gradient-to-b from-transparent via-secondary/40 to-transparent">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Skill Universe"
          title={<>A full-spectrum <span className="gradient-text">marketing operator.</span></>}
          sub="Hover a satellite to explore experience level, projects, tools and certifications."
        />
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="relative mx-auto h-[560px] w-full max-w-[560px]">
            {/* orbit rings */}
            <div className="absolute inset-0 rounded-full border border-border/70 animate-spin-slow" />
            <div className="absolute inset-14 rounded-full border border-border/70 animate-spin-reverse" />
            <div className="absolute inset-28 rounded-full border border-border/70 animate-spin-slow" />
            {/* center */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative">
                <div className="h-28 w-28 rounded-full gradient-bg grid place-items-center text-primary-foreground shadow-2xl">
                  <div className="text-center">
                    <Sparkles className="h-6 w-6 mx-auto" />
                    <div className="text-xs font-mono uppercase tracking-widest mt-1">Core</div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full animate-pulse-ring" />
              </div>
            </div>
            {/* satellites */}
            {SKILL_UNIVERSE.map((s, i) => {
              const total = SKILL_UNIVERSE.length;
              const ring = i % 3;
              const radius = 130 + ring * 70;
              const angle = (i / total) * Math.PI * 2;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <motion.button
                  key={s.name}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="absolute left-1/2 top-1/2"
                  style={{ x, y, translateX: "-50%", translateY: "-50%" }}
                  animate={{ y: [y, y - 6, y] }}
                  transition={{ duration: 4 + (i % 5), repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className={`glass-card rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap ${active === i ? "ring-2 ring-cyan-accent" : ""}`}>
                    {s.name}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active ?? "none"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-7">
                  {active === null ? (
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Hover any skill</div>
                      <div className="mt-2 text-2xl font-semibold">Explore the skill universe</div>
                      <p className="mt-3 text-muted-foreground">
                        12 disciplines orbiting one operator. Each brings craft, taste,
                        and a track record of measurable outcomes.
                      </p>
                      <div className="mt-6 grid grid-cols-3 gap-2">
                        {SKILL_UNIVERSE.slice(0, 6).map((s, i) => (
                          <button key={s.name} onClick={() => setActive(i)} className="rounded-xl border border-border/70 bg-background/60 px-2 py-2 text-xs hover:bg-secondary">
                            {s.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    (() => {
                      const s = SKILL_UNIVERSE[active];
                      return (
                        <div>
                          <div className="flex items-center gap-3">
                            <div className="h-11 w-11 rounded-xl gradient-bg grid place-items-center text-primary-foreground shadow">
                              <Zap className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{s.cert}</div>
                              <div className="text-2xl font-semibold">{s.name}</div>
                            </div>
                          </div>
                          <p className="mt-4 text-muted-foreground">{s.desc}</p>
                          <div className="mt-5">
                            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-muted-foreground">
                              <span>Experience</span><span>{s.level}%</span>
                            </div>
                            <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
                              <motion.div key={s.name} initial={{ width: 0 }} animate={{ width: `${s.level}%` }} transition={{ duration: 0.9 }} className="h-full gradient-bg" />
                            </div>
                          </div>
                          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                            <div className="rounded-xl bg-background/60 border border-border/60 p-3">
                              <div className="text-2xl font-semibold gradient-text">{s.projects}+</div>
                              <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Projects</div>
                            </div>
                            <div className="rounded-xl bg-background/60 border border-border/60 p-3">
                              <div className="text-sm">{s.tools}</div>
                              <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mt-1">Tools</div>
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  )}
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* -------------- Tools -------------- */
function Tools() {
  const [cat, setCat] = useState("All");
  const filtered = TOOLS.filter((t) => cat === "All" || t.cat === cat);
  return (
    <Section id="tools">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Software Ecosystem"
          title={<>The stack behind <span className="gradient-text">the results.</span></>}
          sub="Hands-on with 20+ marketing platforms across SEO, analytics, CRM, AI, design, ads and automation."
        />
        <div className="flex flex-wrap gap-2 mb-8">
          {TOOL_CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-all ${cat === c ? "gradient-bg text-primary-foreground border-transparent shadow" : "border-border/70 bg-background/60 text-muted-foreground hover:text-foreground"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((t, i) => (
            <motion.div
              key={t.name}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.03 }}
            >
              <GlassCard tilt className="p-5 h-full hover:-translate-y-1 transition-transform">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl gradient-bg grid place-items-center text-primary-foreground shadow">
                    <span className="text-sm font-semibold">{t.name.slice(0, 2)}</span>
                  </div>
                  <Badge variant="outline" className="rounded-full text-[10px]">{t.cat}</Badge>
                </div>
                <div className="mt-4 font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.use}</div>
                <div className="mt-4 flex justify-between text-xs">
                  <div>
                    <div className="text-muted-foreground">Years</div>
                    <div className="font-semibold">{t.years}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-muted-foreground">Projects</div>
                    <div className="font-semibold">{t.projects}+</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------- Projects -------------- */
function Projects() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <Section id="projects" className="bg-gradient-to-b from-transparent via-secondary/40 to-transparent">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Case Studies"
          title={<>Selected work, <span className="gradient-text">unpacked.</span></>}
          sub="Every card opens into a case study — problem, strategy, execution, tools, and measurable results."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <motion.button
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              onClick={() => setOpenIdx(i)}
              className="text-left"
            >
              <GlassCard tilt className="p-6 h-full group hover:-translate-y-1 transition-transform">
                <div className="aspect-[16/10] rounded-xl gradient-bg relative overflow-hidden mb-5">
                  <div className="absolute inset-0 grid-lines opacity-30" />
                  <div className="absolute inset-0 grid place-items-center text-primary-foreground/90">
                    <Layers className="h-10 w-10" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/20 backdrop-blur text-white border-white/30">{p.tag}</Badge>
                  </div>
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{p.org}</div>
                <div className="mt-1 text-lg font-semibold group-hover:gradient-text transition-colors">{p.title}</div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.overview}</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {p.kpis.map((k) => (
                    <div key={k.k} className="rounded-lg bg-background/70 border border-border/60 p-2 text-center">
                      <div className="text-sm font-semibold gradient-text">{k.v}</div>
                      <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">{k.k}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Read case study</span>
                  <ArrowUpRight className="h-4 w-4 text-royal-purple group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </GlassCard>
            </motion.button>
          ))}
        </div>
      </div>

      <ProjectModal
        project={openIdx !== null ? PROJECTS[openIdx] : null}
        onClose={() => setOpenIdx(null)}
      />
    </Section>
  );
}

function ProjectModal({ project, onClose }: { project: (typeof PROJECTS)[number] | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const on = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", on);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", on); document.body.style.overflow = ""; };
  }, [project, onClose]);
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-end md:place-items-center p-0 md:p-8 bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full md:max-w-4xl max-h-[92vh] overflow-auto rounded-t-3xl md:rounded-3xl bg-background border border-border shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-background/90 backdrop-blur">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{project.org} · {project.tag}</div>
                <div className="mt-0.5 text-lg md:text-xl font-semibold">{project.title}</div>
              </div>
              <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-muted"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-6 md:p-8 grid gap-6">
              <div className="aspect-[16/8] rounded-2xl gradient-bg relative overflow-hidden">
                <div className="absolute inset-0 grid-lines opacity-30" />
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                  {project.kpis.map((k) => (
                    <div key={k.k} className="glass-card rounded-lg p-3 text-center">
                      <div className="text-lg font-semibold gradient-text">{k.v}</div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{k.k}</div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed">{project.overview}</p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  ["Problem", project.problem],
                  ["Research", project.research],
                  ["Strategy", project.strategy],
                  ["Execution", project.execution],
                  ["Learning", project.learning],
                ].map(([t, v]) => (
                  <div key={t as string} className="rounded-2xl border border-border p-5 bg-background/60">
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{t}</div>
                    <div className="mt-1 text-sm">{v}</div>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Tools</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((t) => <Badge key={t} className="rounded-full bg-secondary text-secondary-foreground">{t}</Badge>)}
                </div>
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Results</div>
                <ul className="grid md:grid-cols-3 gap-2">
                  {project.results.map((r) => (
                    <li key={r} className="rounded-xl bg-emerald-signal/10 border border-emerald-signal/30 p-3 text-sm">
                      <div className="flex items-start gap-2"><TrendingUp className="h-4 w-4 text-emerald-signal mt-0.5" /><span>{r}</span></div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Media placeholders</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <PlaceholderTile key={i} label={["Website", "Dashboard", "Ad", "Email", "Deck", "Doc", "Social", "Video"][i]} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------- Campaigns -------------- */
function Campaigns() {
  const [f, setF] = useState("All");
  const list = CAMPAIGNS.filter((c) => f === "All" || c.cat === f);
  return (
    <Section id="campaigns">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Campaign Studio"
          title={<>The <span className="gradient-text">work wall.</span></>}
          sub="A living gallery of campaigns, creatives, decks and one-pagers — filter by discipline."
        />
        <div className="flex flex-wrap gap-2 mb-8">
          {CAMPAIGN_CATS.map((c) => (
            <button key={c} onClick={() => setF(c)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-all ${f === c ? "gradient-bg text-primary-foreground border-transparent shadow" : "border-border/70 bg-background/60 text-muted-foreground hover:text-foreground"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {list.map((c, i) => (
            <motion.div key={c.title + i} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: (i % 8) * 0.03 }}>
              <GlassCard tilt className="overflow-hidden group cursor-pointer">
                <div className="relative aspect-[4/3] gradient-bg">
                  <div className="absolute inset-0 grid-lines opacity-30" />
                  <div className="absolute inset-0 grid place-items-center text-primary-foreground/80">
                    <Eye className="h-8 w-8" />
                  </div>
                  <div className="absolute top-3 left-3"><Badge className="bg-white/20 backdrop-blur text-white border-white/30 text-[10px]">{c.cat}</Badge></div>
                </div>
                <div className="p-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{c.org}</div>
                  <div className="mt-1 font-medium group-hover:gradient-text transition-colors">{c.title}</div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------- AI Center -------------- */
function AICenter() {
  return (
    <Section id="ai" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-lines opacity-30" />
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="AI Automation Center"
          title={<>Marketing at the speed of <span className="gradient-text">thought.</span></>}
          sub="Prompt systems, agents, and workflows that turn a small team into a compounding operation."
        />
        <AILiveDemo />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AI_STACK.map((a, i) => (
            <motion.div key={a.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}>
              <GlassCard tilt className="p-5 group relative overflow-hidden">
                <div className="absolute -inset-x-8 -top-8 h-16 opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer" />
                <div className="h-10 w-10 rounded-xl gradient-bg grid place-items-center text-primary-foreground shadow relative">
                  <a.icon className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-signal animate-ping" />
                </div>
                <div className="mt-3 font-semibold">{a.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">{a.desc}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------- AI Live Demo -------------- */
const AI_STEPS = [
  { key: "research", label: "Research", tool: "Perplexity + Semrush", icon: Search,
    logs: [
      "› pulling SERP for 'zero-trust for SMB'",
      "✓ 42 sources · 3 competitor gaps",
      "✓ intent map · pain-points extracted",
    ] },
  { key: "brief", label: "Brief", tool: "Claude 3.5 Sonnet", icon: Brain,
    logs: [
      "› generating outline · 7 H2s",
      "✓ ICP: CISO / IT-Head · 250-2000 emp",
      "✓ brief approved · tone: expert-warm",
    ] },
  { key: "draft", label: "Draft", tool: "GPT-4o + brand voice", icon: Wand2,
    logs: [
      "› streaming draft · 1,842 tokens",
      "✓ 1,420 words · reading grade 9.4",
      "✓ 3 CTAs · 4 internal links inserted",
    ] },
  { key: "qa", label: "QA", tool: "Originality + Grammarly + human", icon: Check,
    logs: [
      "› fact-check · 12 claims verified",
      "✓ plagiarism 0.4% · AI-detect 6%",
      "✓ SEO score 96 · schema attached",
    ] },
  { key: "publish", label: "Publish", tool: "n8n → WP + LinkedIn + HubSpot", icon: Rocket,
    logs: [
      "› pushing to WordPress",
      "✓ blog live · sitemap pinged",
      "✓ 4 social variants scheduled",
    ] },
];

function AILiveDemo() {
  const [active, setActive] = useState(0);
  const [logLine, setLogLine] = useState(0);
  const [tick, setTick] = useState(0);

  // Step advancer
  useEffect(() => {
    const t = setInterval(() => {
      setLogLine((l) => {
        if (l + 1 >= AI_STEPS[active].logs.length) {
          setTimeout(() => {
            setActive((a) => (a + 1) % AI_STEPS.length);
            setLogLine(0);
          }, 700);
          return l;
        }
        return l + 1;
      });
    }, 1100);
    return () => clearInterval(t);
  }, [active]);

  // Live counters
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 1600);
    return () => clearInterval(t);
  }, []);

  const stats = useMemo(() => ({
    tasks: 1284 + tick * 3,
    hours: 412 + Math.floor(tick * 0.4),
    tokens: (18.6 + tick * 0.02).toFixed(1),
    assets: 962 + tick,
  }), [tick]);

  return (
    <div className="glass-card rounded-3xl p-5 md:p-7 relative overflow-hidden">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-destructive/70" />
            <span className="h-3 w-3 rounded-full bg-orange-signal/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-signal/70" />
          </div>
          <div className="font-mono text-xs text-muted-foreground">agent.marketing / content-pipeline.yaml</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-signal opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-signal" />
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-signal">Live · running</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.15fr_1fr] gap-6">
        {/* Workflow graph */}
        <div className="relative rounded-2xl border border-border/70 bg-background/60 p-5 overflow-hidden">
          <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
          <div className="relative flex flex-col gap-3">
            {AI_STEPS.map((s, i) => {
              const state = i < active ? "done" : i === active ? "running" : "idle";
              return (
                <div key={s.key} className="relative">
                  {i < AI_STEPS.length - 1 && (
                    <div className="absolute left-[27px] top-14 h-6 w-0.5 bg-border overflow-hidden">
                      <motion.div
                        className="h-full w-full gradient-bg origin-top"
                        animate={{ scaleY: state === "done" ? 1 : state === "running" ? [0, 1] : 0 }}
                        transition={{ duration: 1.2, repeat: state === "running" ? Infinity : 0 }}
                      />
                    </div>
                  )}
                  <div className={`flex items-center gap-4 rounded-xl border p-3 transition-all ${
                    state === "running" ? "border-cyan-accent/60 bg-cyan-accent/5 shadow-[0_0_0_1px_var(--cyan-accent)]" :
                    state === "done" ? "border-emerald-signal/40 bg-emerald-signal/5" :
                    "border-border/60"
                  }`}>
                    <div className={`relative h-14 w-14 rounded-xl grid place-items-center shrink-0 ${
                      state === "idle" ? "bg-muted text-muted-foreground" : "gradient-bg text-primary-foreground"
                    }`}>
                      <s.icon className="h-6 w-6" />
                      {state === "running" && (
                        <>
                          <span className="absolute inset-0 rounded-xl border-2 border-cyan-accent animate-pulse-ring" />
                          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-cyan-accent animate-ping" />
                        </>
                      )}
                      {state === "done" && (
                        <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-emerald-signal grid place-items-center">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold">{s.label}</div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">step 0{i+1}</div>
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{s.tool}</div>
                      <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full gradient-bg"
                          animate={{ width: state === "done" ? "100%" : state === "running" ? ["0%", "100%"] : "0%" }}
                          transition={{ duration: 3.3, repeat: state === "running" ? Infinity : 0, ease: "linear" }}
                        />
                      </div>
                    </div>
                    <div className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full ${
                      state === "running" ? "bg-cyan-accent/20 text-cyan-accent" :
                      state === "done" ? "bg-emerald-signal/20 text-emerald-signal" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {state}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Terminal + prompt */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border/70 bg-[oklch(0.16_0.04_265)] text-[oklch(0.95_0.02_180)] p-4 font-mono text-xs h-[280px] overflow-hidden relative">
            <div className="flex items-center justify-between mb-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5" />
                <span>agent.log</span>
              </div>
              <span className="text-emerald-signal">● connected</span>
            </div>
            <div className="space-y-1.5">
              <AnimatePresence mode="popLayout">
                {AI_STEPS[active].logs.slice(0, logLine + 1).map((line, i) => (
                  <motion.div
                    key={`${active}-${i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={line.startsWith("✓") ? "text-emerald-signal" : "text-cyan-accent/90"}
                  >
                    <span className="text-muted-foreground/60 mr-2">
                      [{String(active + 1).padStart(2, "0")}:{String(i + 1).padStart(2, "0")}]
                    </span>
                    {line}
                    {i === logLine && <span className="ml-1 inline-block w-1.5 h-3 bg-cyan-accent animate-pulse align-middle" />}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Live stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { l: "Tasks automated", v: stats.tasks.toLocaleString(), s: "this quarter", icon: Zap },
              { l: "Hours saved", v: `${stats.hours}h`, s: "compounding", icon: Gauge },
              { l: "Tokens processed", v: `${stats.tokens}M`, s: "GPT + Claude", icon: Cpu },
              { l: "Assets shipped", v: stats.assets.toLocaleString(), s: "blog · social · email", icon: Sparkles },
            ].map((k) => (
              <div key={k.l} className="rounded-2xl border border-border/70 bg-background/60 p-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="h-7 w-7 rounded-lg gradient-bg grid place-items-center text-primary-foreground">
                    <k.icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-signal animate-pulse" />
                </div>
                <motion.div
                  key={k.v}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xl font-semibold gradient-text"
                >{k.v}</motion.div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{k.l}</div>
                <div className="text-[10px] text-muted-foreground/70">{k.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------- Analytics dashboard -------------- */
function AnalyticsDashboard() {
  const kpis = [
    { k: "Website Traffic", v: "128.4K", d: "+68%", color: "cyan-accent", icon: TrendingUp },
    { k: "Organic Growth", v: "+140%", d: "YoY", color: "emerald-signal", icon: Search },
    { k: "CTR", v: "6.8%", d: "+2.1pt", color: "royal-purple", icon: Target },
    { k: "ROAS", v: "4.2x", d: "+0.7x", color: "orange-signal", icon: Rocket },
    { k: "Conversion", v: "3.9%", d: "+1.2pt", color: "cyan-accent", icon: Activity },
    { k: "Leads / mo", v: "612", d: "+2.4x", color: "emerald-signal", icon: Users },
    { k: "Email Open", v: "35%", d: "vs 21%", color: "royal-purple", icon: Mail },
    { k: "SEO Score", v: "100", d: "from 32", color: "orange-signal", icon: Gauge },
  ];
  return (
    <Section id="analytics" className="bg-gradient-to-b from-transparent via-secondary/40 to-transparent">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Performance Dashboard"
          title={<>The <span className="gradient-text">numbers speak.</span></>}
          sub="A live-style dashboard summarizing what shipped, what moved, and what compounded."
        />
        <div className="glass-card rounded-3xl p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {kpis.map((k, i) => (
              <motion.div key={k.k} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl bg-background/70 border border-border p-4 hover:-translate-y-0.5 transition-transform">
                <div className="flex items-center justify-between">
                  <div className={`h-8 w-8 rounded-lg grid place-items-center text-primary-foreground`} style={{ background: `var(--${k.color})` }}>
                    <k.icon className="h-4 w-4" />
                  </div>
                  <Badge variant="outline" className="rounded-full text-[10px]">{k.d}</Badge>
                </div>
                <div className="mt-3 text-2xl font-semibold">{k.v}</div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{k.k}</div>
                <Sparkline color={`var(--${k.color})`} seed={i + 1} />
              </motion.div>
            ))}
          </div>

          <div className="mt-6 grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 rounded-2xl bg-background/70 border border-border p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Channel Mix · Last 12 months</div>
                  <div className="text-lg font-semibold">Growth blend</div>
                </div>
                <Badge className="rounded-full gradient-bg text-primary-foreground">Compounding</Badge>
              </div>
              <div className="mt-6 grid grid-cols-6 gap-3 items-end h-40">
                {[45, 62, 55, 78, 66, 90].map((v, i) => (
                  <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${v}%` }} viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.08 }}
                    className="rounded-t-lg gradient-bg" />
                ))}
              </div>
              <div className="mt-2 grid grid-cols-6 text-[10px] font-mono uppercase tracking-wider text-muted-foreground text-center">
                {["SEO","Paid","Email","Social","Content","AI"].map((l) => <div key={l}>{l}</div>)}
              </div>
            </div>
            <div className="rounded-2xl bg-background/70 border border-border p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Program Health</div>
              <div className="mt-4 flex items-center gap-6">
                <RingChart value={92} />
                <div>
                  <div className="text-3xl font-semibold gradient-text">92</div>
                  <div className="text-xs text-muted-foreground">Operational score</div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  ["Content pipeline", 88],
                  ["Pipeline hygiene", 84],
                  ["Attribution", 78],
                  ["Experiment velocity", 91],
                ].map(([l, v]) => (
                  <div key={l as string}>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{l}</span><span>{v}%</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-full gradient-bg" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* -------------- Certificates -------------- */
function Certificates() {
  return (
    <Section id="certs">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Upskilling · Certificates"
          title={<>Learning is <span className="gradient-text">the strategy.</span></>}
          sub="A rolling library of certifications across SEO, ads, email, AI and leadership."
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {CERTIFICATES.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}>
              <div className="group [perspective:1000px]">
                <div className="relative h-56 [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 glass-card rounded-2xl p-5 [backface-visibility:hidden] flex flex-col justify-between">
                    <div>
                      <div className="h-10 w-10 rounded-xl gradient-bg grid place-items-center text-primary-foreground shadow">
                        <Award className="h-5 w-5" />
                      </div>
                      <div className="mt-4 font-semibold">{c.name}</div>
                      <div className="text-sm text-muted-foreground">{c.by}</div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono uppercase tracking-wider text-muted-foreground">{c.date}</span>
                      <Sparkles className="h-4 w-4 text-royal-purple" />
                    </div>
                  </div>
                  <div className="absolute inset-0 gradient-bg rounded-2xl p-5 text-primary-foreground [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest opacity-80">Verified</div>
                      <div className="mt-2 text-lg font-semibold">{c.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="secondary"><Eye className="h-3.5 w-3.5 mr-1" /> View</Button>
                      <Button size="sm" variant="secondary"><Download className="h-3.5 w-3.5 mr-1" /> Download</Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------- Contact -------------- */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Fill all fields to send"); return;
    }
    triggerConfetti();
    toast.success("Message queued", { description: "I'll reply within 24 hours." });
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <Section id="contact" className="bg-gradient-to-b from-transparent via-secondary/40 to-transparent">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Let's build together"
          title={<>Have a brand to <span className="gradient-text">grow?</span></>}
          sub="Marketing consultation, fractional leadership, or full-stack execution — let's talk."
        />
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8">
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "k-aayush@outlook.com", href: "mailto:k-aayush@outlook.com" },
              { icon: Phone, label: "Phone", value: "+91 90978 90380", href: "tel:+919097890380" },
              { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/k-aayush", href: "https://www.linkedin.com/in/k-aayush/" },
              { icon: MapPin, label: "Location", value: "Pune, India · Remote-first", href: "#" },
            ].map((c) => (
              <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                <GlassCard className="p-5 flex items-center gap-4 hover:-translate-y-0.5 transition-transform">
                  <div className="h-11 w-11 rounded-xl gradient-bg grid place-items-center text-primary-foreground shadow">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{c.label}</div>
                    <div className="truncate font-medium">{c.value}</div>
                  </div>
                  <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                </GlassCard>
              </a>
            ))}
          </div>

          <GlassCard className="p-6 md:p-8">
            <form onSubmit={submit} className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Your name">
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ada Lovelace" />
                </Field>
                <Field label="Email">
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@brand.com" />
                </Field>
              </div>
              <Field label="What are we building?">
                <Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="A short brief — company, goals, timeline…" />
              </Field>
              <Button type="submit" className="gradient-bg text-primary-foreground shadow-lg hover:shadow-[var(--shadow-glow)] transition-shadow">
                Send message <Send className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-xs text-muted-foreground">Or email <a className="underline" href="mailto:k-aayush@outlook.com">k-aayush@outlook.com</a> directly.</p>
            </form>
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

/* -------------- Command palette (Cmd-K) -------------- */
function CmdPalette({ open, setOpen }: { open: boolean; setOpen: (b: boolean) => void }) {
  const [q, setQ] = useState("");
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(!open); }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", on);
    return () => document.removeEventListener("keydown", on);
  }, [open, setOpen]);
  const items = useMemo(() => NAV.map((n) => ({ ...n, kind: "section" as const })), []);
  const list = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-foreground/40 backdrop-blur-sm grid place-items-start p-6 pt-24"
          onClick={() => setOpen(false)}>
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl border border-border bg-background shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Jump to section, or ask something…" className="w-full bg-transparent outline-none text-sm" />
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-auto p-2">
              {list.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">Nothing matches. Try "projects" or "email".</div>}
              {list.map((i) => (
                <a key={i.id} href={`#${i.id}`} onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted transition-colors">
                  <ChevronDown className="h-4 w-4 -rotate-90 text-muted-foreground" />
                  <span className="text-sm">{i.label}</span>
                  <Badge variant="outline" className="ml-auto text-[10px] rounded-full">Section</Badge>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------- Cursor + Confetti + Marketing tips -------------- */
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const on = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a,button,[role='button']"));
    };
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, []);
  return (
    <>
      <div className="pointer-events-none fixed z-[200] hidden md:block" style={{ transform: `translate(${pos.x - 8}px, ${pos.y - 8}px)` }}>
        <div className={`h-4 w-4 rounded-full gradient-bg transition-transform duration-150 ${hover ? "scale-[2.2]" : "scale-100"}`} />
      </div>
      <div className="pointer-events-none fixed z-[199] hidden md:block transition-all duration-500 ease-out" style={{ transform: `translate(${pos.x - 20}px, ${pos.y - 20}px)` }}>
        <div className={`h-10 w-10 rounded-full border transition-opacity ${hover ? "opacity-100 border-royal-purple" : "opacity-40 border-border"}`} />
      </div>
    </>
  );
}

function triggerConfetti() {
  const root = document.createElement("div");
  root.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:250;overflow:hidden";
  document.body.appendChild(root);
  const colors = ["#7c3aed", "#22d3ee", "#10b981", "#f97316", "#3b82f6"];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    const size = 6 + Math.random() * 8;
    el.style.cssText = `position:absolute;top:-20px;left:${Math.random() * 100}%;width:${size}px;height:${size * 0.4}px;background:${colors[i % colors.length]};transform:rotate(${Math.random() * 360}deg);border-radius:2px;opacity:0.9;`;
    root.appendChild(el);
    const dur = 1400 + Math.random() * 1400;
    const x = (Math.random() - 0.5) * 300;
    el.animate(
      [{ transform: `translate(0,0) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${x}px, ${window.innerHeight + 40}px) rotate(${720 * Math.random()}deg)`, opacity: 0 }],
      { duration: dur, easing: "cubic-bezier(0.2,0.6,0.2,1)", fill: "forwards" }
    );
  }
  setTimeout(() => root.remove(), 3200);
}

const TIPS = [
  "Positioning is 90% of the launch.",
  "One channel deeply > five channels shallowly.",
  "Deliverability is a product problem.",
  "Write for the SERP, not the essay.",
  "The best AI workflows are boring and repeatable.",
  "Measure the outcome, not the activity.",
];
function MarketingTip() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 8000);
    const rot = setInterval(() => setI((n) => (n + 1) % TIPS.length), 6000);
    return () => { clearTimeout(t); clearInterval(rot); };
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 40, opacity: 0 }}
          className="fixed bottom-6 right-6 z-40 max-w-xs hidden md:block">
          <GlassCard className="p-4 flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg gradient-bg grid place-items-center text-primary-foreground shrink-0">
              <Megaphone className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Marketing tip</div>
              <div className="text-sm mt-0.5">{TIPS[i]}</div>
            </div>
            <button onClick={() => setShow(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const w = useTransform(x, [0, 1], ["0%", "100%"]);
  return <motion.div style={{ width: w }} className="fixed left-0 top-0 z-[120] h-0.5 gradient-bg" />;
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="h-6 w-6 rounded-md gradient-bg grid place-items-center text-primary-foreground font-semibold text-[10px]">KA</span>
          <span className="text-muted-foreground">© {new Date().getFullYear()} Kumar Aayush · Digital Marketing Intelligence</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <a href="mailto:k-aayush@outlook.com" className="hover:text-foreground"><Mail className="h-4 w-4" /></a>
          <a href="https://www.linkedin.com/in/k-aayush/" target="_blank" rel="noreferrer" className="hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
          <a href="#command" className="hover:text-foreground"><ArrowUpRight className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* Root                                                                       */
/* -------------------------------------------------------------------------- */

export default function Portfolio() {
  const [cmd, setCmd] = useState(false);
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <CustomCursor />
      <Toaster position="top-center" richColors />
      <TopNav onCmd={() => setCmd(true)} />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Tools />
      <Projects />
      <Campaigns />
      <AICenter />
      <AnalyticsDashboard />
      <Certificates />
      <Contact />
      <Footer />
      <CmdPalette open={cmd} setOpen={setCmd} />
      <MarketingTip />
    </div>
  );
}
