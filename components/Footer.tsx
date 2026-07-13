import Link from 'next/link'
import { Wallet, Facebook, Twitter, Linkedin, Instagram, Youtube, ArrowRight, ShieldCheck, Mail } from 'lucide-react'
import { CONTACT_EMAIL } from '@/lib/site'

export default function Footer() {
  const sections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Meet the Team', href: '/authors' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Resource Center', href: '/resources' },
        { name: 'Editorial Policy', href: '/editorial-policy' },
        { name: 'Research Methodology', href: '/methodology' },
      ]
    },
    {
      title: 'Transparency',
      links: [
        { name: 'How We Make Money', href: '/how-we-make-money' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms-of-service' },
        { name: 'Cookie Policy', href: '/cookie-policy' },
        { name: 'Legal Disclaimer', href: '/disclaimer' },
      ]
    },
    {
      title: 'Categories',
      links: [
        { name: 'Saving Money', href: '/categories/saving' },
        { name: 'Budgeting', href: '/categories/budgeting' },
        { name: 'Investing', href: '/categories/investing' },
        { name: 'Debt Management', href: '/categories/debt' },
        { name: 'Retirement Planning', href: '/categories/retirement' },
        { name: 'Credit Cards', href: '/categories/credit' },
      ]
    }
  ]

  return (
    <footer className="bg-secondary-900 text-secondary-300">
      {/* Newsletter / CTA Section */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-primary-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Smarter Money Decisions Start Here
              </h2>
              <p className="text-primary-100 text-lg">
                Join our community to receive data-driven financial insights and expert-vetted guides.
              </p>
            </div>
            <div className="relative z-10 w-full md:w-auto">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary-900 px-8 py-4 rounded-2xl font-bold hover:bg-primary-50 transition-all shadow-xl shadow-black/20 group"
              >
                Join SmartMoneyPath
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-700/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6 group" aria-label="SmartMoneyPath home">
              <div className="bg-primary-600 p-2 rounded-xl group-hover:bg-primary-500 transition-colors shadow-lg">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                SmartMoneyPath
              </span>
            </Link>
            <p className="text-secondary-400 text-base leading-relaxed mb-8 max-w-sm">
              Independent financial education built on primary sources, transparent calculations, and objective research. We help you find the right path for your money.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Youtube, label: 'YouTube' },
                { icon: Instagram, label: 'Instagram' }
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-600 hover:border-primary-600 hover:scale-110 transition-all group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-secondary-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {sections.map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-secondary-400 hover:text-primary-400 transition-colors text-base flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
              Reach Out
            </h3>
            <div className="space-y-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 text-secondary-400 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{CONTACT_EMAIL}</span>
              </a>
              <div className="flex items-center gap-3 text-secondary-400">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium">100% Secure & Private</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-secondary-500 text-sm">
            © {new Date().getFullYear()} SmartMoneyPath. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <p className="text-secondary-500 text-xs italic max-w-xl text-center md:text-right">
              Disclaimer: The information on SmartMoneyPath is for educational purposes only and does not constitute financial, tax, or legal advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
