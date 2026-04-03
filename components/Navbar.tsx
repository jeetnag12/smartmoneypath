'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Wallet } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'Budgeting', href: '/budgeting' },
  { name: 'Investing', href: '/investing' },
  { name: 'About', href: '/about' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary-600 p-2 rounded-lg group-hover:bg-primary-700 transition-colors">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-secondary-900">
                SmartMoneyPath
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-secondary-600 hover:text-primary-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button className="bg-primary-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
              Subscribe
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary-600 hover:text-secondary-900 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-md font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button className="w-full mt-2 bg-primary-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
