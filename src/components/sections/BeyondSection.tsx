'use client'

import { useInView } from 'react-intersection-observer'
import { Globe, Heart, Compass, Sparkles } from 'lucide-react'
import Image from 'next/image'

// ── Photo grid helpers ──────────────────────────────────────────
function PhotoSlot({ label, src, tall }: { label: string; src?: string; tall?: boolean }) {
  const h = tall ? 'h-52' : 'h-36'
  if (src) {
    return (
      <div className={`relative ${h} rounded-xl overflow-hidden`}>
        <Image src={src} alt={label} fill className="object-cover" />
      </div>
    )
  }
  return (
    <div className={`photo-placeholder ${h} p-2`}>
      <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', textAlign: 'center' }}>
        📷 {label}
      </span>
    </div>
  )
}

// ── Section label ───────────────────────────────────────────────
function SectionDivider({ tag }: { tag: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
      <span className="text-xs px-3 py-1 rounded-full"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', border: '1px solid var(--border)', letterSpacing: '0.1em' }}>
        {tag}
      </span>
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
    </div>
  )
}

// ── 1. Born by the Sea ─────────────────────────────────────────
function BornByTheSea() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <div ref={ref} className={`grid md:grid-cols-2 gap-8 mb-20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Globe size={18} style={{ color: '#1e88e5' }} />
          <h3 className="text-xl font-display font-semibold" style={{ color: 'var(--text-primary)' }}>Born by the Sea</h3>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
          I grew up in Dalian, a coastal city in northeastern China where the sea meets you at every turn.
          The city is surrounded by ocean on three sides — and I think that openness, that sense of
          boundlessness and constant movement, has always shaped how I see the world.
        </p>
        <br />
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
          At sixteen, I made a decision that would define the decade that followed: I moved to the
          United States alone to attend high school. Since then, I've completed my high school,
          undergraduate, and graduate education here — each chapter building on the last, far from
          home but never feeling lost.
        </p>
      </div>

      {/* Dalian photo grid */}
      <div className="grid grid-cols-2 gap-3">
        <PhotoSlot label="Dalian" src="/images/Dalian3.png" tall />
        <PhotoSlot label="Dalian" src="/images/Dalian2.jpeg" tall />
        <PhotoSlot label="Hometown memory" src="/images/Dalian1.jpeg" />
        <PhotoSlot label="Undergraduate" src="/images/BostonU.jpeg" />
      </div>
    </div>
  )
}

// ── 2. Family & Cat ────────────────────────────────────────────
function FamilySection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <div ref={ref} className={`grid md:grid-cols-2 gap-8 mb-20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
      {/* Photos first on this row */}
      <div className="grid grid-cols-3 gap-3">
        <PhotoSlot label="Family" src="/images/family1.png" tall />
        <PhotoSlot label="Family" src="/images/family2.jpeg" tall />
        <PhotoSlot label="Mutou 🐱" src="/images/mutou1.png" tall />
        <PhotoSlot label="Mutou 🐱" src="/images/mutou2.png" tall />
        <PhotoSlot label="Mutou 🐱" src="/images/mutou3.png" tall />
        <PhotoSlot label="Mutou 🐱" src="/images/mutou4.png" tall />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Heart size={18} style={{ color: '#e76f51' }} />
          <h3 className="text-xl font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
            The People (and Cat) Who Keep Me Grounded
          </h3>
        </div>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
          My family is my strongest support system: my parents, my younger sister, and our
          silver-shaded British Shorthair cat named Mutou.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
          Mutou is, objectively, the best-looking member of the household. He has the energy of
          a philosopher — deeply contemplative, occasionally destructive — and has supervised
          more late-night study sessions than I can count. My family has always been my emotional
          foundation: through the disorientation of moving abroad as a teenager, through graduate
          school, through the uncertainty of job searching. Having roots makes it easier to grow outward.
        </p>
      </div>
    </div>
  )
}

// ── 3. Hobbies (Singing + Swimming + Boardgame + Toy business + Community) ──
const travelPlaces = ['Canada', 'UAE', 'Australia', 'Japan', 'South Korea', 'China · Multiple cities', 'USA · Multiple cities']

function HobbiesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
      <div className="flex items-center gap-2 mb-5">
        <Sparkles size={18} style={{ color: '#f4a261' }} />
        <h3 className="text-xl font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
          Beyond Engineering
        </h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Singing */}
        <div className="glass-card p-5" style={{ borderTop: '3px solid #e76f51' }}>
          <div className="text-2xl mb-2">🎤</div>
          <h4 className="font-display font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Singing</h4>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
            Music has been part of my identity long before code was. I earned a National Vocal
            Level 10 certification — the highest civilian vocal grade — and received a National
            Outstanding Vocalist award. As a child I performed frequently in singing competitions
            and public showcases. I believe performing teaches something invaluable: how to be
            fully present under pressure.
          </p>
        </div>

        {/* Swimming + Boardgames */}
        <div className="glass-card p-5" style={{ borderTop: '3px solid #1e88e5' }}>
          <div className="text-2xl mb-2">🏊‍♀️</div>
          <h4 className="font-display font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Swimming & Board Games</h4>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
            Swimming keeps me grounded — there's something about being in water that resets my
            thinking. Growing up near the sea probably helped. Board games are the other side of
            that coin: strategy, reading people, making decisions with incomplete information.
            Good preparation for engineering, honestly.
          </p>
        </div>

        {/* Toy business + Community */}
        <div className="glass-card p-5" style={{ borderTop: '3px solid #f4a261' }}>
          <div className="text-2xl mb-2">🧸</div>
          <h4 className="font-display font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Creator & Community Builder</h4>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
            I ran a handmade squeeze-toy business — 300+ orders shipped, 1,000+ followers, a
            single post reaching 100K+ views. And an accountability community platform with 800+
            followers and 10K+ viewers. Both taught me that consistency, user empathy, and
            iteration are universal — in business, content, and code.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {['300+ orders', '1K+ followers', '100K views', '800+ community'].map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded"
                style={{ background: 'rgba(244,162,97,0.1)', border: '1px solid rgba(244,162,97,0.3)', color: '#f4a261', fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Travel */}
        <div className="glass-card p-5" style={{ borderTop: '3px solid #2a9d8f' }}>
          <div className="text-2xl mb-2">✈️</div>
          <h4 className="font-display font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Traveling the World</h4>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
            Travel reminds me how large and interconnected the world is. Every place teaches
            something that reading about it never could.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {travelPlaces.map((p) => (
              <span key={p} className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(42,157,143,0.1)', border: '1px solid rgba(42,157,143,0.25)', color: '#2a9d8f', fontSize: '0.65rem' }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main export ────────────────────────────────────────────────
export default function BeyondSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="beyond" className="relative py-24 px-6" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <SectionDivider tag="05 · THE HUMAN SIDE" />
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-4" style={{ color: 'var(--text-primary)' }}>
            The Life Behind
            <br />
            <span style={{ fontStyle: 'italic' }}>the Engineer</span>
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'var(--text-muted)', fontWeight: 300 }}>
            Engineering is what I do. But it's not everything I am.
          </p>
        </div>

        <BornByTheSea />
        <FamilySection />
        <HobbiesSection />
      </div>
    </section>
  )
}
