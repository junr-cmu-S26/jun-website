'use client'

import { useInView } from 'react-intersection-observer'
import { Users, FileText, Star } from 'lucide-react'

const stats = [
  { value: '1,500+', label: 'Community Members',      color: '#1e88e5' },
  { value: '3',      label: 'Teams Led',               color: '#e76f51' },
  { value: '30+',    label: 'Events Organized',        color: '#2a9d8f' },
  { value: '1,200+', label: 'Avg Readers per Article', color: '#f4a261' },
]

const leaderships = [
  {
    org: 'Girls Who Impact',
    role: 'Member of Event Team',
    period: 'Mar 2024 – Jan 2025',
    icon: Star,
    color: '#1e88e5',
    story: `Girls Who Impact is a community built around supporting each other through real career challenges, and being on the Event Team meant helping make that concrete.

I helped manage a community of over 1,500 female members, sharing internship opportunities from partner companies and answering job-related questions in group chats. The conversations were practical: people working through offers, negotiating salaries, deciding between paths. Being a useful resource in those moments felt worthwhile.

On the event side, I helped organize the organization's annual summit and several in-person meetups in Boston, covering topics like networking, mental health, and women entrepreneurship. The topics came from what members actually wanted to talk about.`,
    highlights: [
      'Managed community of 1,500+ female members',
      'Shared internship opportunities from partner companies',
      'Organized annual summit and multiple in-person meetups',
      'Topics: networking, mental health, entrepreneurship',
    ],
  },
  {
    org: 'Chinese Students and Scholar Association',
    role: 'Career Development Department — Vice President',
    period: 'Sep 2021 – May 2023',
    icon: Users,
    color: '#e76f51',
    story: `As VP of Career Development at CSSA, I focused on closing the gap between what international students knew about the US job market and what they needed to navigate it.

I organized over eight events covering recruiting timelines, resume reviews, interview preparation, and industry panels. After each event I collected feedback and used it to shape the next one. Students told us what was missing; we responded.

The writing was a parallel track. I wrote ten career development articles per year, each averaging 1,000+ readers, posted on the official website. The goal was to build a resource that outlasted any single event — covering topics like OPT timelines, offer negotiation, and what to expect in behavioral rounds at US companies.`,
    highlights: [
      'Organized 8+ career events covering recruiting, resumes, and interviews',
      'Wrote 10 articles per year averaging 1,000+ readers each',
      'Built ongoing resource library on official website',
      'Collected and acted on student feedback to improve programming',
    ],
  },
  {
    org: 'BU After School Association',
    role: 'Copywriting Department — President',
    period: 'Sep 2021 – Aug 2023',
    icon: FileText,
    color: '#2a9d8f',
    story: `Running the Copywriting Department meant producing content on a consistent schedule, on topics that mattered to international students at BU.

I gathered perspectives from students, identified what they were thinking about, and turned that into articles published on the official account. Over two years, I published eight long-form pieces averaging 1,200+ readers each. These were not neutral recaps. They were first-person pieces on culture shock, academic pressure, and navigating life far from home.

I also wrote weekly current affairs roundups, covering international news and campus events in a format students could read quickly. More than 15 editions went out, each averaging 1,000+ readers. Keeping that cadence across a full academic year, while managing coursework, is something I am proud of.`,
    highlights: [
      '8 long-form articles averaging 1,200+ readers each',
      '15+ weekly editions, 1,000+ readers per issue',
      'Led department content strategy across two academic years',
      'Topics drawn from real international student experiences',
    ],
  },
]

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  return (
    <div
      ref={ref}
      className={`glass-card p-5 text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="text-2xl font-display font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
    </div>
  )
}

function LeadershipCard({ item, index }: { item: typeof leaderships[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const Icon = item.icon
  return (
    <div
      ref={ref}
      className={`glass-card p-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ borderLeft: `3px solid ${item.color}`, transitionDelay: `${index * 130}ms` }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: `${item.color}18`, border: `1px solid ${item.color}35` }}>
          <Icon size={17} style={{ color: item.color }} />
        </div>
        <div>
          <div className="text-xs mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            {item.period}
          </div>
          <h3 className="text-lg font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
            {item.org}
          </h3>
          <div className="text-sm" style={{ color: item.color }}>{item.role}</div>
        </div>
      </div>

      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)', fontWeight: 300, whiteSpace: 'pre-line' }}>
        {item.story}
      </p>

      <div className="flex flex-wrap gap-2">
        {item.highlights.map((h, i) => (
          <span key={i} className="text-xs px-2.5 py-1 rounded-full"
            style={{ background: `${item.color}10`, border: `1px solid ${item.color}28`, color: item.color }}>
            {h}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function LeadershipSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="leadership" className="relative py-24 px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
            <span className="text-xs px-3 py-1 rounded-full"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', border: '1px solid var(--border)', letterSpacing: '0.1em' }}>
              04 · LEADERSHIP & IMPACT
            </span>
            <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-4" style={{ color: 'var(--text-primary)' }}>
            Leadership & Impact
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'var(--text-muted)', fontWeight: 300 }}>
            Community, content, and the work of showing up consistently.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
        </div>

        <div className="flex flex-col gap-6">
          {leaderships.map((item, i) => (
            <LeadershipCard key={item.org} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}