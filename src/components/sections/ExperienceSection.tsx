'use client'

import { useInView } from 'react-intersection-observer'

interface ExperienceItem {
  company: string
  role: string
  period: string
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
    color: '#5bb8dc',
    tagline: 'Rebuilding the backbone of factory operations',
    story: `I inherited an inventory backend managing 5,000+ SKUs across multiple manufacturing facilities. The system worked, technically, but it was fragile in ways that mattered. Query times were slow enough to cause real operational friction, and the codebase had accumulated enough shortcuts that adding anything new felt risky.

I rebuilt the backend using Spring Boot and MySQL, this time with scale as the starting constraint rather than an afterthought. Redis caching and composite indexing brought product lookup latency down by over 70%. Operations that used to generate queues and timeouts became routine.

The harder problem was access control. In a multi-tenant environment, factory A's data cannot be visible to factory B under any circumstance. I implemented role-based access control through Spring Security with JWT authentication, enforcing tenant boundaries at every request. I also wrote JUnit test suites covering core inventory workflows. In industrial systems, a bug does not just frustrate a user; it can stop a production line.

The work at Htwins clarified something for me: backend engineering is about trust. Every millisecond you cut and every boundary you hold is a commitment to the people depending on your system.`,
    highlights: [
      'Reduced product lookup latency 70%+ via Redis caching and composite indexing',
      'Designed multi-tenant RBAC with Spring Security and JWT authentication',
      'Built JUnit test suites catching critical logic inconsistencies early',
      'Contributed across full product lifecycle: design to deployment to monitoring',
    ],
    tech: ['Spring Boot', 'MySQL', 'Redis', 'JWT', 'Spring Security', 'JUnit'],
  },
  {
    company: 'SAP',
    role: 'Software Engineering Co-op',
    period: 'May 2023 – Jul 2023',
    color: '#3b9fd4',
    tagline: 'Building for users, then learning from them',
    story: `SAP was my first real taste of enterprise-scale engineering. On day one I was handed a data pipeline that processed 10,000+ enterprise customer records and ran for 45 minutes every time it was triggered. Team iterations were bottlenecked by that wait. I dug into the code and found the culprit: row-by-row operations in a pipeline that could be vectorized. Refactoring with NumPy brought runtime from 45 minutes down to 8, an 82% reduction.

The AI chatbot project came next. Our team wanted to increase engagement on learning.sap.com, SAP's platform for product tutorials and courses. After a few brainstorming sessions we decided to build a chatbot to help users mid-course, and I was the one who pushed for this idea. I built it with a React frontend, Node.js backend, and the OpenAI API. Since we were calling a paid API at scale, I also added retry logic, rate limiting, and response caching to keep the system stable and cost-controlled. During the pilot with 50+ daily users, we stayed within budget without a single outage.

I also independently designed an A/B testing framework with statistical significance testing, my first solo end-to-end system design, which measured a 13% lift in feature adoption. That experience taught me that good engineering is not just building things. It is measuring whether they actually work.`,
    highlights: [
      'Reduced data pipeline runtime from 45 min to 8 min via NumPy vectorization',
      'Built AI chatbot (React, Node.js, OpenAI) supporting 50+ daily users',
      'Identified UX friction as root cause of low engagement through data analysis',
      'Redesigned chatbot with contextual FAQ clicks, reducing drop-off and token cost',
    ],
    tech: ['React', 'Node.js', 'Python', 'NumPy', 'OpenAI API', 'A/B Testing'],
  },
  {
    company: 'Bank of China',
    role: 'Data Analyst Intern',
    period: 'Jun 2022 – Aug 2022',
    color: '#2a9d8f',
    tagline: 'Turning employee feedback into system insights',
    story: `The task was to survey Bank of China employees on their experience with a newly deployed internal system: whether it met their needs, where they ran into friction, and what improvements they wanted to see. Over 1,000 responses came in across more than 80 variables. Most arrived messy. Before any analysis could happen, I restructured the dataset in Python and Excel, resolved inconsistencies, and made sure the foundation was clean. That groundwork was less visible than the analysis, but it was what made the rest reliable.

Once the data was ready, I applied ANOVA testing in R to identify which factors had statistically meaningful effects on usability ratings versus which ones only appeared correlated on the surface. I also ran sentiment analysis on the open-ended responses, where employees described specific pain points and suggestions in their own words. That layer added nuance the rating scales could not capture.

The final report ran 52 pages and was presented to IT leadership. Writing for that audience meant making the methodology clear without making it the focus. The goal was to help people act on the findings.`,
    highlights: [
      'Cleaned and structured 1,000+ responses across 80 variables',
      'Applied ANOVA in R to identify key satisfaction drivers',
      'Ran Python sentiment analysis on qualitative open-ended responses',
      'Delivered 52-page report presented to IT leadership',
    ],
    tech: ['Python', 'R', 'Excel', 'ANOVA', 'Sentiment Analysis', 'ggplot2'],
  },
  {
    company: 'China NGO Center for Disaster Risk Reduction',
    role: 'Information Integration Analysis Group Leader',
    period: 'During COVID-19 Pandemic',
    color: '#e76f51',
    tagline: 'Data work with real accountability',
    story: `During the COVID-19 pandemic, I led a volunteer team tracking charitable donations across more than 200 foundations. The dataset had over 210,000 individual records. In a moment of national crisis, transparency in how aid was distributed was not a bureaucratic concern; it was a question of public trust.

We built a pipeline to clean, index, and validate the data using Python and Excel, creating an auditable trail for every record. Through exploratory analysis and visualization in R, we identified patterns in how funding was being allocated across regions.

Our findings were published by Xinhua News and reached over 100,000 readers.

Leading a team under that kind of time pressure, with incomplete data and real consequences, was different from anything I had done in a classroom. You make decisions before you are certain, and you build processes that hold even when the inputs are not clean.`,
    highlights: [
      'Led team managing 210,000+ donation records from 200+ foundations',
      'Built data validation and cleaning workflow in Python and Excel',
      'Uncovered funding allocation patterns via R and ggplot visualization',
      'Research published by Xinhua News, reaching 100,000+ readers',
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
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', border: '1px solid var(--border)', letterSpacing: '0.1em' }}
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
      className={`grid md:grid-cols-5 gap-6 mb-20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Left meta column */}
      <div className="md:col-span-2 flex flex-col gap-4">
        <div>
          <div className="text-xs mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
            {exp.period}
          </div>
          <h3 className="text-xl font-display font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
            {exp.company}
          </h3>
          <div className="text-sm mb-1" style={{ color: exp.color }}>
            {exp.role}
          </div>
        </div>

        <p className="text-sm italic" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)', borderLeft: `2px solid ${exp.color}`, paddingLeft: '12px' }}>
          "{exp.tagline}"
        </p>

        <div className="flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-md"
              style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30`, color: exp.color, fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Right story column */}
      <div className="md:col-span-3">
        <div className="glass-card p-6 mb-4" style={{ borderLeft: `3px solid ${exp.color}` }}>
          <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
            {exp.story}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {exp.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2 text-xs p-2 rounded-lg"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
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
    <section id="experience" className="relative py-24 px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <SectionLabel />
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-4" style={{ color: 'var(--text-primary)' }}>
            Building Systems
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'var(--text-muted)', fontWeight: 300 }}>
            Every internship taught something a classroom could not. Here are the stories behind the bullet points.
          </p>
        </div>

        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.company} exp={exp} index={i} />
        ))}
      </div>
    </section>
  )
}