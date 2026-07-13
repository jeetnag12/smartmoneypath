'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, Wallet, ChevronDown } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'Resources', href: '/resources' },
  { name: 'Categories', href: '/categories', dropdown: [
    { name: 'Saving', href: '/categories/saving' },
    { name: 'Budgeting', href: '/categories/budgeting' },
    { name: 'Investing', href: '/categories/investing' },
    { name: 'Debt Free', href: '/categories/debt' },
    { name: 'Retirement', href: '/categories/retirement' },
    { name: 'Credit Cards', href: '/categories/credit' },
  ]},
  { name: 'Authors', href: '/authors' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-md py-4'
      } border-b border-secondary-100`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="SmartMoneyPath home">
            <div className="bg-primary-800 p-2 rounded-xl group-hover:bg-primary-700 transition-colors shadow-lg shadow-primary-900/10">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-primary-900">
              SmartMoney<span className="text-primary-600">Path</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`px-4 py-2 text-sm font-bold transition-colors flex items-center gap-1 rounded-lg ${
                    pathname === link.href
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-secondary-700 hover:text-primary-700 hover:bg-secondary-50'
                  }`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                </Link>

                {link.dropdown && activeDropdown === link.name && (
                  <div className="absolute top-full left-0 w-48 bg-white border border-secondary-100 shadow-xl rounded-xl py-2 mt-1 animate-in fade-in slide-in-from-top-2">
                    {link.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-secondary-600 hover:text-primary-700 hover:bg-primary-50 transition-colors font-medium"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="h-6 w-px bg-secondary-200 mx-2"></div>

            <Link
              href="/articles"
              aria-label="Search articles"
              className="p-2 text-secondary-500 hover:text-primary-700 hover:bg-secondary-50 rounded-lg transition-all"
            >
              <Search className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-secondary-700 hover:bg-secondary-50 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-secondary-100 shadow-xl animate-in fade-in slide-in-from-top-4 pb-6 overflow-y-auto max-h-[calc(100vh-80px)]">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 text-base font-bold rounded-xl transition-colors ${
                      pathname === link.href
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-secondary-700 hover:bg-secondary-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="ml-4 mt-1 border-l-2 border-secondary-100 pl-4 space-y-1">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm font-medium text-secondary-600 hover:text-primary-700 rounded-lg"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="px-8 mt-4">
              <Link
                href="/articles"
                className="w-full bg-primary-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-900/20"
              >
                <Search className="h-5 w-5" />
                Find Guides
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
