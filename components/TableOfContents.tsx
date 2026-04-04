'use client'

import { useState } from 'react'
import { ChevronDown, List } from 'lucide-react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: Heading[]
  activeHeading: string
}

export default function TableOfContents({ headings, activeHeading }: TableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const scrollToHeading = (id: string) => {
    if (typeof window === 'undefined') return
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  if (headings.length === 0) return null

  return (
    <div className="bg-white rounded-xl border border-secondary-200 p-4 shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full mb-3"
      >
        <div className="flex items-center gap-2 text-secondary-900 font-semibold">
          <List className="h-5 w-5 text-primary-600" />
          <span>Table of Contents</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-secondary-500 transition-transform ${
            isExpanded ? '' : '-rotate-180'
          }`}
        />
      </button>

      {isExpanded && (
        <nav className="space-y-1">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`block w-full text-left text-sm py-1.5 px-2 rounded-md transition-colors ${
                heading.level === 2 ? 'font-medium' : 'pl-6 text-secondary-500'
              } ${
                activeHeading === heading.id
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
              }`}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}
