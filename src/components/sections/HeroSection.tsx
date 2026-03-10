'use client'

import { useEffect, useRef } from 'react'
import { ChevronDown, Linkedin, MapPin, Mail } from 'lucide-react'
import Image from 'next/image'

// ── Sparkle SVG ──────────────────────────────────────────────────
function SparkleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 L13.4 9.5 L20 12 L13.4 14.5 L12 22 L10.6 14.5 L4 12 L10.6 9.5 Z" />
    </svg>
  )
}

function Sparkles() {
  const pos = [
    { top: '10%', left: '6%',  size: 14, delay: '0s',   dur: '3.2s' },
    { top: '18%', left: '16%', size: 9,  delay: '0.7s', dur: '2.8s' },
    { top: '7%',  left: '74%', size: 18, delay: '1.2s', dur: '3.5s' },
    { top: '28%', left: '84%', size: 11, delay: '0.3s', dur: '2.6s' },
    { top: '52%', left: '4%',  size: 13, delay: '1.8s', dur: '3.1s' },
    { top: '62%', left: '89%', size: 9,  delay: '0.9s', dur: '2.9s' },
    { top: '14%', left: '48%', size: 8,  delay: '2.1s', dur: '3.4s' },
    { top: '38%', left: '91%', size: 15, delay: '0.5s', dur: '2.7s' },
    { top: '70%', left: '12%', size: 10, delay: '1.5s', dur: '3.0s' },
    { top: '22%', left: '60%', size: 7,  delay: '1.0s', dur: '2.5s' },
  ]
  return (
    <>
      {pos.map((p, i) => (
        <div key={i} className="sparkle" style={{ top: p.top, left: p.left, animationDuration: p.dur, animationDelay: p.delay, color: 'rgba(30,136,229,0.5)' }}>
          <SparkleIcon size={p.size} />
        </div>
      ))}
    </>
  )
}

// ── Ocean creatures canvas ───────────────────────────────────────
function useOceanCanvas(canvasRef: React.RefObject<HTMLCanvasElement>, darkMode: boolean) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    // ── Jellyfish ──
    type Jelly = { x: number; y: number; r: number; color: string; phase: number; speed: number; drift: number }
    const jellyColors = darkMode
      ? ['rgba(91,184,220,0.18)', 'rgba(126,212,240,0.14)', 'rgba(60,140,200,0.16)', 'rgba(180,220,255,0.12)']
      : ['rgba(100,181,246,0.22)', 'rgba(144,202,249,0.18)', 'rgba(173,216,255,0.20)', 'rgba(200,230,255,0.15)']

    const jellies: Jelly[] = Array.from({ length: 7 }, (_, i) => ({
      x: Math.random() * 1400,
      y: Math.random() * 600 + 80,
      r: Math.random() * 28 + 18,
      color: jellyColors[i % jellyColors.length],
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.3 + 0.15,
      drift: (Math.random() - 0.5) * 0.4,
    }))

    // ── Fish ──
    type Fish = { x: number; y: number; size: number; color: string; speed: number; dir: number; phase: number; vy: number }
    const fishColors = darkMode
      ? ['rgba(91,184,220,0.55)', 'rgba(126,212,240,0.45)', 'rgba(180,220,255,0.4)']
      : ['rgba(30,136,229,0.45)', 'rgba(100,181,246,0.5)', 'rgba(144,202,249,0.55)']

    const fishes: Fish[] = Array.from({ length: 10 }, () => ({
      x: Math.random() * 1400,
      y: Math.random() * 500 + 100,
      size: Math.random() * 14 + 8,
      color: fishColors[Math.floor(Math.random() * fishColors.length)],
      speed: Math.random() * 1.2 + 0.6,
      dir: Math.random() > 0.5 ? 1 : -1,
      phase: Math.random() * Math.PI * 2,
      vy: (Math.random() - 0.5) * 0.2,
    }))

    // ── Starfish ──
    type Starfish = { x: number; y: number; r: number; color: string; angle: number; rotSpeed: number }
    const starfishColors = darkMode
      ? ['rgba(180,140,220,0.25)', 'rgba(220,160,200,0.2)', 'rgba(160,200,240,0.22)']
      : ['rgba(186,104,200,0.28)', 'rgba(240,98,146,0.22)', 'rgba(100,181,246,0.25)']

    const starfishes: Starfish[] = Array.from({ length: 4 }, () => ({
      x: Math.random() * 1400,
      y: Math.random() * 400 + 200,
      r: Math.random() * 16 + 10,
      color: starfishColors[Math.floor(Math.random() * starfishColors.length)],
      angle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
    }))

    // ── Bubbles ──
    type Bubble = { x: number; y: number; r: number; speed: number; opacity: number }
    const bubbles: Bubble[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * 1400,
      y: Math.random() * 800 + 400,
      r: Math.random() * 6 + 2,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.4 + 0.1,
    }))

    // Draw jellyfish
    function drawJelly(j: Jelly, t: number) {
      const bob = Math.sin(t * j.speed + j.phase) * 12
      const cy = j.y + bob
      ctx.save()
      ctx.translate(j.x, cy)

      // Bell
      ctx.beginPath()
      ctx.arc(0, 0, j.r, Math.PI, 0)
      ctx.quadraticCurveTo(j.r * 0.5, j.r * 0.4, 0, j.r * 0.3)
      ctx.quadraticCurveTo(-j.r * 0.5, j.r * 0.4, -j.r, 0)
      const bellGrad = ctx.createRadialGradient(0, -j.r * 0.3, 0, 0, 0, j.r)
      bellGrad.addColorStop(0, j.color.replace(/[\d.]+\)$/, '0.35)'))
      bellGrad.addColorStop(1, j.color)
      ctx.fillStyle = bellGrad
      ctx.fill()

      // Tentacles
      const numTentacles = 6
      for (let i = 0; i < numTentacles; i++) {
        const tx = -j.r * 0.7 + (j.r * 1.4 / (numTentacles - 1)) * i
        const wave = Math.sin(t * 1.5 + i * 0.8 + j.phase) * 6
        ctx.beginPath()
        ctx.moveTo(tx, j.r * 0.3)
        ctx.quadraticCurveTo(tx + wave, j.r * 1.2, tx - wave * 0.5, j.r * 2.2)
        ctx.strokeStyle = j.color.replace(/[\d.]+\)$/, '0.35)')
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
      ctx.restore()

      // Drift horizontally
      j.x += j.drift
      if (j.x > canvas!.width + 80) j.x = -80
      if (j.x < -80) j.x = canvas!.width + 80
    }

    // Draw fish
    function drawFish(f: Fish, t: number) {
      const wobble = Math.sin(t * 2 + f.phase) * 4
      f.y += f.vy + wobble * 0.05
      if (f.y < 60) f.vy = Math.abs(f.vy)
      if (f.y > canvas!.height - 60) f.vy = -Math.abs(f.vy)

      ctx.save()
      ctx.translate(f.x, f.y)
      if (f.dir < 0) ctx.scale(-1, 1)

      // Body
      ctx.beginPath()
      ctx.ellipse(0, wobble * 0.3, f.size, f.size * 0.5, 0, 0, Math.PI * 2)
      ctx.fillStyle = f.color
      ctx.fill()

      // Tail
      ctx.beginPath()
      ctx.moveTo(-f.size * 0.8, wobble * 0.3)
      ctx.lineTo(-f.size * 1.6, wobble * 0.3 - f.size * 0.6)
      ctx.lineTo(-f.size * 1.6, wobble * 0.3 + f.size * 0.6)
      ctx.closePath()
      ctx.fillStyle = f.color.replace(/[\d.]+\)$/, '0.6)')
      ctx.fill()

      // Eye
      ctx.beginPath()
      ctx.arc(f.size * 0.4, wobble * 0.3 - f.size * 0.1, f.size * 0.12, 0, Math.PI * 2)
      ctx.fillStyle = darkMode ? 'rgba(200,240,255,0.8)' : 'rgba(10,30,80,0.7)'
      ctx.fill()

      ctx.restore()

      f.x += f.speed * f.dir
      if (f.x > canvas!.width + 100) f.x = -100
      if (f.x < -100) f.x = canvas!.width + 100
    }

    // Draw 5-pointed starfish
    function drawStarfish(s: Starfish, t: number) {
      s.angle += s.rotSpeed
      ctx.save()
      ctx.translate(s.x, s.y)
      ctx.rotate(s.angle + Math.sin(t * 0.3) * 0.15)

      ctx.beginPath()
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI / 5) * i - Math.PI / 2
        const r = i % 2 === 0 ? s.r : s.r * 0.4
        const px = Math.cos(angle) * r
        const py = Math.sin(angle) * r
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      }
      ctx.closePath()
      const sg = ctx.createRadialGradient(0, 0, 0, 0, 0, s.r)
      sg.addColorStop(0, s.color.replace(/[\d.]+\)$/, '0.45)'))
      sg.addColorStop(1, s.color)
      ctx.fillStyle = sg
      ctx.fill()
      ctx.restore()
    }

    // Draw bubbles
    function drawBubble(b: Bubble) {
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
      ctx.strokeStyle = darkMode
        ? `rgba(126,212,240,${b.opacity})`
        : `rgba(30,136,229,${b.opacity})`
      ctx.lineWidth = 1
      ctx.stroke()

      // Highlight
      ctx.beginPath()
      ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.25, 0, Math.PI * 2)
      ctx.fillStyle = darkMode
        ? `rgba(200,240,255,${b.opacity * 0.6})`
        : `rgba(255,255,255,${b.opacity * 0.8})`
      ctx.fill()

      b.y -= b.speed
      if (b.y < -20) {
        b.y = canvas!.height + 20
        b.x = Math.random() * canvas!.width
      }
    }

    let frame = 0
    let rafId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame += 0.016

      // Subtle light rays
      for (let i = 0; i < 5; i++) {
        const x = (canvas.width / 5) * i + Math.sin(frame * 0.4 + i) * 20
        const g = ctx.createLinearGradient(x, 0, x + 40, canvas.height)
        g.addColorStop(0, darkMode ? 'rgba(91,184,220,0.04)' : 'rgba(100,181,246,0.05)')
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.moveTo(x, 0); ctx.lineTo(x + 50, canvas.height); ctx.lineTo(x + 70, canvas.height); ctx.lineTo(x + 20, 0)
        ctx.closePath(); ctx.fillStyle = g; ctx.fill()
      }

      bubbles.forEach(b => drawBubble(b))
      starfishes.forEach(s => drawStarfish(s, frame))
      jellies.forEach(j => drawJelly(j, frame))
      fishes.forEach(f => drawFish(f, frame))

      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize) }
  }, [canvasRef, darkMode])
}

// ── Waves ────────────────────────────────────────────────────────
function OceanWaves() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-56 overflow-hidden pointer-events-none">
      <svg className="absolute bottom-0 w-full" style={{ animation: 'wave 14s ease-in-out infinite', height: '150px' }} viewBox="0 0 1440 150" preserveAspectRatio="none">
        <path d="M0,75 C180,130 360,20 540,75 C720,130 900,20 1080,75 C1260,130 1350,55 1440,75 L1440,150 L0,150 Z" fill="var(--wave-1)" opacity="0.5" />
      </svg>
      <svg className="absolute bottom-0 w-full" style={{ animation: 'wave 10s ease-in-out infinite reverse', height: '118px' }} viewBox="0 0 1440 118" preserveAspectRatio="none">
        <path d="M0,59 C200,104 400,14 600,59 C800,104 1000,14 1200,59 C1320,84 1380,44 1440,59 L1440,118 L0,118 Z" fill="var(--wave-2)" opacity="0.62" />
      </svg>
      <svg className="absolute bottom-0 w-full" style={{ animation: 'wave 7s ease-in-out infinite', height: '88px' }} viewBox="0 0 1440 88" preserveAspectRatio="none">
        <path d="M0,44 C240,80 480,8 720,44 C960,80 1200,8 1440,44 L1440,88 L0,88 Z" fill="var(--wave-3)" opacity="0.72" />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 h-14" style={{ background: 'var(--sand)' }} />
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────
export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Detect dark mode
  const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark')
  useOceanCanvas(canvasRef, isDark)

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(-3%) scaleY(1.06); }
        }
        /* ☀️ Light: pale sky → sky blue → medium ocean blue */
        #home .hero-bg {
          background: linear-gradient(
            180deg,
            #d6eeff 0%,
            #b3d9f7 18%,
            #8ec8f0 36%,
            #6db5e8 54%,
            #56a8e0 72%,
            #4a9ed8 88%,
            #f0f8ff 100%
          );
        }
        /* 🌙 Dark: deep navy with deep-ocean blue */
        .dark #home .hero-bg {
          background: linear-gradient(
            180deg,
            #010a14 0%,
            #020d1c 20%,
            #040f22 40%,
            #061428 60%,
            #071825 80%,
            #050e1a 100%
          );
        }
        .dark #home .sparkle { color: rgba(91,184,220,0.5); }
      `}</style>

      {/* Gradient background */}
      <div className="hero-bg absolute inset-0" />

      {/* Ocean creatures canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Sparkles on top */}
      <Sparkles />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-44 flex flex-col md:flex-row items-center gap-10 md:gap-16">

        {/* Profile photo */}
        <div className="flex-shrink-0">
          <div className="relative" style={{ width: '210px', height: '255px' }}>
            <Image
              src="/images/jun-profile.jpg"
              alt="Jun Ren"
              fill
              priority
              className="object-cover profile-feather"
              style={{ objectPosition: 'center top' }}
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-6"
            style={{
              background: 'rgba(30,136,229,0.12)',
              border: '1px solid rgba(30,136,229,0.3)',
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.09em',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Open to SDE Opportunities · 2026 &amp; 2027
          </div>

          {/* Name */}
          <h1
            className="font-display font-bold mb-2"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            Jun Ren
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl font-display italic mb-5" style={{ color: 'var(--text-secondary)' }}>
            I build systems that scale.
            <br />
            I tell stories through data.
          </p>

          {/* Bio — 3 lines */}
          <div className="mb-7 max-w-lg space-y-1 text-sm" style={{ lineHeight: 1.85, fontWeight: 300 }}>
            <p style={{ color: 'var(--text-muted)' }}>
              M.S. Software Engineering ·{' '}
              <strong style={{ color: 'var(--accent)' }}>Carnegie Mellon University</strong>, Silicon Valley
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              B.S. Mathematics &amp; Computer Science ·{' '}
              <strong style={{ color: 'var(--accent)' }}>Boston University</strong>
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              Building scalable infrastructure &amp; intelligent systems that power real-world applications.
            </p>
          </div>

          {/* Contacts */}
          <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
            <a
              href="https://www.linkedin.com/in/jun-ren-563643250/"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 text-sm"
              style={{ background: 'rgba(30,136,229,0.1)', border: '1px solid rgba(30,136,229,0.3)', color: 'var(--accent)' }}
            >
              <Linkedin size={15} /> LinkedIn
            </a>
            <a
              href="mailto:junren121111@gmail.com"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 text-sm"
              style={{ background: 'rgba(30,136,229,0.1)', border: '1px solid rgba(30,136,229,0.3)', color: 'var(--accent)' }}
            >
              <Mail size={15} /> junren121111@gmail.com
            </a>
            <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-muted)' }}>
              <MapPin size={13} /> Mountain View, CA
            </span>
          </div>
        </div>
      </div>

      <OceanWaves />

      {/* Scroll cue */}
      <a
        href="#experience"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        style={{ color: 'var(--text-muted)' }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em' }}>scroll to explore</span>
        <ChevronDown size={17} className="animate-bounce" />
      </a>
    </section>
  )
}
