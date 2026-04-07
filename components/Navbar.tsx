'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, ChevronDown, Wallet } from 'lucide-react'

const navLinks = [
  { name: 'Credit Cards', href: '/categories/credit' },
  { name: 'Banking', href: '/categories/banking' },
  { name: 'Investing', href: '/categories/investing' },
  { name: 'Mortgages', href: '/categories/home-buying' },
  { name: 'Insurance', href: '/categories/insurance' },
  {
    name: 'Personal Finance',
    href: '#',
    dropdown: [
      { name: 'Budgeting', href: '/categories/budgeting' },
      { name: 'Saving', href: '/categories/saving' },
      { name: 'Debt', href: '/categories/debt' },
      { name: 'Retirement', href: '/categories/retirement' },
    ]
  },
  { name: 'Small Business', href: '/categories/small-business' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-[#1B5E20] p-2 rounded-lg">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#1B5E20]">
                SmartMoneyPath
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1B5E20] transition-colors"
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="h-4 w-4" />}
                </Link>

                {/* Dropdown Menu */}
                {link.dropdown && activeDropdown === link.name && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E8F5E9] hover:text-[#1B5E20]"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-[#1B5E20] transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="bg-[#1B5E20] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#2E7D32] transition-colors">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button className="p-2 text-gray-600">
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100">
            <div className="space-y-1 pt-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-gray-700 hover:text-[#1B5E20] font-medium"
                    onClick={() => !link.dropdown && setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-6 space-y-1">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-[#1B5E20]"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 px-3">
                <button className="w-full bg-[#1B5E20] text-white px-5 py-3 rounded-lg font-medium">
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
