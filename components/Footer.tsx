import Link from 'next/link'
import { Wallet } from 'lucide-react'
import { CONTACT_EMAIL } from '@/lib/site'

export default function Footer() {
  const links = [
    ['Articles', '/articles'], ['Categories', '/categories'], ['About', '/about'], ['Contact', '/contact'],
    ['Privacy', '/privacy-policy'], ['Terms', '/terms-of-service'], ['Cookies', '/cookie-policy'], ['Disclaimer', '/disclaimer'],
  ]
  return <footer className="bg-darkGreen text-white/80">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row justify-between gap-8 pb-8 border-b border-white/10">
        <div className="max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-4"><span className="bg-brightGreen p-2 rounded-lg"><Wallet className="h-5 w-5 text-white" /></span><span className="text-xl font-bold text-white">SmartMoneyPath</span></Link>
          <p className="text-sm leading-relaxed">Independent educational articles based on public primary sources. We do not sell financial products or provide individualized advice.</p>
          <a className="inline-block mt-3 text-sm text-white hover:underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
        <nav aria-label="Footer navigation" className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-3">
          {links.map(([name, href]) => <Link key={href} href={href} className="text-sm hover:text-white">{name}</Link>)}
        </nav>
      </div>
      <div className="pt-6 flex flex-col md:flex-row justify-between gap-2 text-sm text-white/60"><p>© {new Date().getFullYear()} SmartMoneyPath.</p><p>Educational information only—not financial, tax, or legal advice.</p></div>
    </div>
  </footer>
}
