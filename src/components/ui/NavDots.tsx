'use client'

import { useState, useEffect } from 'react'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'beyond', label: 'Beyond Code' },
  { id: 'connect', label: 'Connect' },
]

export default function NavDots() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowH = window.innerHeight

      // Find which section's top is closest to 40% down the viewport
      let current = sections[0].id
      let minDist = Infinity

      sections.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (!el) return
        const rect = el.getBoundingClientRect()
        // distance from element top to 40% of viewport
        const dist = Math.abs(rect.top - windowH * 0.4)
        if (dist < minDist) {
          minDist = dist
          current = id
        }
      })

      setActive(current)
    }

    // Run on mount and on scroll
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className="group flex items-center gap-2 justify-end"
          aria-label={label}
        >
          <span
            className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            {label}
          </span>
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === id ? 'w-3 h-3' : 'w-2 h-2 group-hover:w-2.5 group-hover:h-2.5'
            }`}
            style={{
              background: active === id ? 'var(--accent)' : 'var(--border)',
              boxShadow: active === id ? '0 0 8px var(--accent)' : 'none',
            }}
          />
        </a>
      ))}
    </div>
  )
}
