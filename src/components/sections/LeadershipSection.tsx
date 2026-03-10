'use client'

import { useInView } from 'react-intersection-observer'
import { Users, FileText, Mic, Star } from 'lucide-react'

const stats = [
  { value: '1,500+', label: 'Community Members Managed', color: '#1e88e5' },
  { value: '30+',    label: 'Events Organized',           color: '#e76f51' },
  { value: '1,200+', label: 'Avg Readers per Article',    color: '#2a9d8f' },
  { value: '210K+',  label: 'Donation Records Tracked',   color: '#e63946' },
]

const leaderships = [
  {
    org: 'Girls Who Impact',
    role: 'Member of Event Team',
    period: 'Mar 2024 – Present',
    icon: Star,
    color: '#1e88e5',
    story: `Girls Who Impact is a community built around lifting each other up — and being on the Event Team means I help make that real.

I help manage a community of over 1,500 female members, sharing internship opportunities provided by partner companies and answering job-related questions in group chats. The conversations are genuine: people asking about offers, negotiating salaries, figuring out which path to take. Being a resource in those moments matters.

On the event side, I help organize the organization's major annual summit and multiple in-person member meetups across Boston. The topics — networking, mental health, women entrepreneurship — reflect what the community actually needs to talk about. Being in the room for those conversations, and helping create the space for them, has shaped how I think about leadership and community.`,
    highlights: [
      'Managing community of 1,500+ female members',
      'Sharing internship opportunities from partner companies',
      'Organizing major annual summit + in-person meetups',
      'Topics: networking, mental health, women entrepreneurship',
    ],
  },
  {
    org: 'Chinese Students and Scholar Association',
    role: 'Career Development Department — Vice President',
    period: 'Jun 2023 – Sep 2023',
    icon: Users,
    color: '#e76f51',
    story: `As VP of Career Development at CSSA, my job was to close the gap between what students knew about navigating careers in the US and what they needed to know.

I organized over eight events focused on career development — recruiting timelines, resume workshops, interview prep, and industry panels — and provided practical career resources and advice to current Boston students. The feedback loop was real: I collected suggestions from students on what topics to cover next, and iterated the programming accordingly.

The writing side was equally important. I wrote ten career development information articles per year, each reaching an average of 1,000+ readers, and continuously posted on the official public website to build a durable resource library for students navigating their first steps into the US job market.`,
    highlights: [
      'Organized 8+ career development events for BU students',
      'Wrote 10 articles/year averaging 1,000+ readers each',
      'Provided career advice and collected student feedback',
      'Built ongoing resource library on official website',
    ],
  },
  {
    org: 'BU After School Association',
    role: 'Copywriting Department — President',
    period: 'Sep 2021 – Aug 2023',
    icon: FileText,
    color: '#2a9d8f',
    story: `Running the Copywriting Department at BU After School Association was my first real experience in content leadership — and it taught me how to write for an audience you actually care about.

I collected popular topics and issues of concern to international students, gathered their perspectives and ideas, then wrote and published articles on the official account. In total, I published eight subjective content articles with an average of 1,200+ readers each — these weren't news summaries; they were opinion pieces that reflected the real experiences of students living far from home.

I also wrote weekly current affairs news roundups, synthesizing international news and campus events into digestible summaries for readers who needed to stay informed but didn't have time to do it themselves. Over two years, I published 15+ weekly editions with an average of 1,000+ readers per article.

Consistency was the discipline that mattered most here. Showing up with quality content every week — regardless of how busy the semester got — is something I'm proud of.`,
    highlights: [
      '8 long-form articles averaging 1,200+ readers each',
      '15+ weekly current affairs editions, 1,000+ readers/article',
      'Topics drawn from real international student experiences',
      'Led department content strategy for 2 full academic years',
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
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: `${item.color}18`, border: `1px solid ${item.color}35` }}
        >
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
        <div
          ref={ref}
          className={`mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
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
            Community, content, and the discipline of showing up consistently.
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
