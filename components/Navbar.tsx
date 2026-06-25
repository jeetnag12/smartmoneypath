'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, Wallet } from 'lucide-react'

const links = [
  { name: 'Articles', href: '/articles' },
  { name: 'Saving', href: '/categories/saving' },
  { name: 'Budgeting', href: '/categories/budgeting' },
  { name: 'Investing', href: '/categories/investing' },
  { name: 'Debt', href: '/categories/debt' },
  { name: 'Education', href: '/categories/education' },
  { name: 'Credit', href: '/categories/credit' },
  { name: 'About', href: '/about' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2" aria-label="SmartMoneyPath home">
            <span className="bg-[#1B5E20] p-2 rounded-lg"><Wallet className="h-5 w-5 text-white" /></span>
            <span className="text-xl font-bold text-[#1B5E20]">SmartMoneyPath</span>
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => <Link key={link.href} href={link.href} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1B5E20]">{link.name}</Link>)}
            <Link href="/articles" aria-label="Search articles" className="p-2 text-gray-600 hover:text-[#1B5E20]"><Search className="h-5 w-5" /></Link>
            <Link href="/contact" className="ml-2 bg-[#1B5E20] text-white px-4 py-2 rounded-lg text-sm font-medium">Contact</Link>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-gray-700" aria-label={isOpen ? 'Close menu' : 'Open menu'}>{isOpen ? <X /> : <Menu />}</button>
        </div>
        {isOpen && <div className="lg:hidden border-t py-3">
          {[...links, { name: 'Contact', href: '/contact' }].map((link) => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-[#1B5E20]">{link.name}</Link>)}
        </div>}
      </div>
    </nav>
  )
}
