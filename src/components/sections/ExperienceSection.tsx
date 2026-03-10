'use client'

import { useInView } from 'react-intersection-observer'

interface ExperienceItem {
  company: string
  role: string
  period: string
  location: string
  color: string
  tagline: string
  story: string
  highlights: string[]
  tech: string[]
}

const experiences: ExperienceItem[] = [
  {
    company: 'Htwins Technology Co.',
    role: 'Software Engineering Intern',
    period: 'Jun 2024 – Aug 2024',
    location: 'China',
    color: '#5bb8dc',
    tagline: 'Rebuilding the backbone of factory operations',
    story: `At Htwins, I inherited a system that was showing its age — an inventory backend struggling under the weight of 5,000+ SKUs across multiple manufacturing facilities. The codebase was functional, but fragile. The question wasn't just "can we make this faster?" It was: can we build something that lasts?

I rebuilt the backend architecture from the ground up using Spring Boot and MySQL, this time designing with scale in mind. The performance gains were immediate: by introducing Redis caching and composite indexing strategies, product lookup latency dropped by over 70%. Peak operations that once caused queues and timeouts now felt effortless.

Security was the harder problem. In a multi-tenant environment where factory A must never see factory B's data, there's no room for mistakes. I implemented role-based access control with Spring Security and JWT authentication — every request validated, every tenant boundary enforced. I also built JUnit test suites for core workflows, because in industrial systems, a bug doesn't just frustrate users; it stops production lines.

What I learned at Htwins: backend engineering is fundamentally about building trust. Every millisecond you shave and every data breach you prevent is a promise kept to the people relying on your system.`,
    highlights: [
      'Reduced product lookup latency by 70%+ via Redis caching + composite indexing',
      'Designed multi-tenant RBAC with Spring Security + JWT authentication',
      'Built JUnit test suites detecting critical logic inconsistencies early',
      'Contributed across full product lifecycle: design → deployment → monitoring',
    ],
    tech: ['Spring Boot', 'MySQL', 'Redis', 'JWT', 'Spring Security', 'JUnit'],
  },
  {
    company: 'SAP',
    role: 'Software Engineering Co-op',
    period: 'May 2023 – Jul 2023',
    location: 'United States',
    color: '#3b9fd4',
    tagline: 'Where data engineering meets applied AI',
    story: `SAP was my first real taste of enterprise-scale engineering. I joined a team working on internal tools, and on day one I was handed a data pipeline that processed 10,000+ enterprise customer records — and ran for 45 minutes every time it was triggered.

The inefficiency was painful. Team iterations were bottlenecked by a 45-minute wait every time someone wanted to test a feature. I dug into the code and found the culprit: row-by-row operations in a pipeline that could be vectorized. Refactoring with NumPy vectorization brought runtime from 45 minutes down to 8 — an 82% reduction. Suddenly, what took almost an hour became a coffee break.

The AI chatbot project came next. I built it with React, Node.js, and the OpenAI API, but the interesting engineering wasn't the UI — it was the reliability layer underneath: retry logic to handle API hiccups, rate limiting to prevent cost spikes, and response caching to avoid redundant API calls. During pilot testing with 50+ daily users, we stayed well within budget without a single outage.

I also independently designed an A/B testing framework with statistical significance testing — my first solo end-to-end system design — which measured a 13% lift in feature adoption. That experience taught me that good engineering isn't just about building things. It's about measuring whether they actually work.`,
    highlights: [
      'Reduced data pipeline runtime from 45 min → 8 min via NumPy vectorization',
      'Built AI chatbot (React + Node.js + OpenAI) supporting 50+ daily users',
      'Designed A/B testing framework measuring 13% lift in feature adoption',
      'Implemented retry logic, rate limiting & response caching for reliability',
    ],
    tech: ['React', 'Node.js', 'Python', 'NumPy', 'OpenAI API', 'A/B Testing'],
  },
  {
    company: 'Bank of China',
    role: 'Data Analyst Intern',
    period: 'Jun 2022 – Aug 2022',
    location: 'China',
    color: '#2a9d8f',
    tagline: 'Translating raw data into institutional insight',
    story: `My first professional internship was at one of China's most established financial institutions. The task seemed deceptively simple: analyze survey data to understand employee satisfaction. But beneath the surface, it was a serious data science problem.

I worked with 1,000+ survey responses spanning 80 variables — messy, inconsistent, real-world data that required careful cleaning before any analysis could begin. Using Python and Excel, I restructured the dataset, resolved inconsistencies, and built a clean analytical foundation.

From there, I applied ANOVA statistical testing in R to identify which factors actually drove satisfaction — cutting through the noise to find signal. I also ran sentiment analysis on open-ended qualitative responses, translating employee voices into quantifiable emotional patterns.

The final deliverable was a 52-page report presented directly to IT leadership. It wasn't just numbers — it was a story backed by evidence, with visualizations designed to communicate clearly to non-technical decision-makers.

This experience taught me the most underrated skill in data work: the ability to translate complexity into clarity for the people who need to act on it.`,
    highlights: [
      'Cleaned & structured 1,000+ responses across 80 variables',
      'Applied ANOVA in R to identify key satisfaction drivers',
      'Conducted Python sentiment analysis on qualitative responses',
      'Delivered 52-page analytical report to IT leadership',
    ],
    tech: ['Python', 'R', 'Excel', 'ANOVA', 'Sentiment Analysis', 'ggplot2'],
  },
  {
    company: 'China NGO Center for Disaster Risk Reduction',
    role: 'Information Integration Analysis Group Leader',
    period: 'During COVID-19 Pandemic',
    location: 'China',
    color: '#e76f51',
    tagline: 'Data with real societal stakes',
    story: `This was the role that first showed me what data work can mean when lives are on the line.

During the COVID-19 pandemic, I led a volunteer team responsible for tracking charitable donations across more than 200 foundations — over 210,000 individual donation records in total. In a moment of national crisis, transparency in how aid was being distributed wasn't just a bureaucratic concern. It was a matter of public trust.

We built a system to clean, index, and validate this massive dataset using Python and Excel, creating an auditable trail for every record. Through exploratory analysis and visualization in R with ggplot, we uncovered patterns in how funding was being allocated — some regions receiving disproportionate resources, others left underserved.

Our findings were published by Xinhua News and reached over 100,000 views.

Leading a team in that environment — under time pressure, with incomplete data, and with real accountability — taught me something that no classroom could: the weight of getting it right. When your analysis shapes public understanding of a crisis, accuracy isn't optional.`,
    highlights: [
      'Led team managing 210,000+ donation records from 200+ foundations',
      'Built data pipeline for cleaning, indexing & validating at scale',
      'Uncovered funding allocation patterns via R/ggplot visualization',
      'Findings published by Xinhua News, reaching 100,000+ viewers',
    ],
    tech: ['Python', 'Excel', 'R', 'ggplot2', 'Data Visualization'],
  },
]

function SectionLabel() {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
      <span
        className="text-xs px-3 py-1 rounded-full"
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          border: '1px solid var(--border)',
          letterSpacing: '0.1em',
        }}
      >
        02 · BUILDING SYSTEMS
      </span>
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
    </div>
  )
}

function ExperienceCard({ exp, index }: { exp: ExperienceItem; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-5 gap-6 mb-20 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Left meta column */}
      <div className="md:col-span-2 flex flex-col gap-4">
        <div>
          <div
            className="text-xs mb-1"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em' }}
          >
            {exp.period}
          </div>
          <h3 className="text-xl font-display font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
            {exp.company}
          </h3>
          <div className="text-sm mb-1" style={{ color: exp.color }}>
            {exp.role}
          </div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{exp.location}</div>
        </div>

        {/* Tagline */}
        <p
          className="text-sm italic"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)', borderLeft: `2px solid ${exp.color}`, paddingLeft: '12px' }}
        >
          "{exp.tagline}"
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-md"
              style={{
                background: `${exp.color}15`,
                border: `1px solid ${exp.color}30`,
                color: exp.color,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Right story column */}
      <div className="md:col-span-3">
        <div
          className="glass-card p-6 mb-4"
          style={{ borderLeft: `3px solid ${exp.color}` }}
        >
          <p
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{ color: 'var(--text-secondary)', fontWeight: 300 }}
          >
            {exp.story}
          </p>
        </div>

        {/* Key highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {exp.highlights.map((h, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-xs p-2 rounded-lg"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
            >
              <span style={{ color: exp.color, marginTop: '2px' }}>▸</span>
              {h}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ExperienceSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section
      id="experience"
      className="relative py-24 px-6"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <SectionLabel />
          <h2
            className="text-4xl md:text-5xl font-display font-bold mt-4 mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Building Systems
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'var(--text-muted)', fontWeight: 300 }}>
            Every internship taught me something that couldn't be learned in a classroom. 
            Here are the stories behind the bullet points.
          </p>
        </div>

        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.company} exp={exp} index={i} />
        ))}
      </div>
    </section>
  )
}
