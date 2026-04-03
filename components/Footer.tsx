import Link from 'next/link'
import { Wallet, Twitter, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

const footerLinks = {
  Resources: [
    { name: 'Budgeting Guide', href: '/budgeting' },
    { name: 'Investing 101', href: '/investing' },
    { name: 'Debt Payoff Calculator', href: '/calculators/debt' },
    { name: 'Retirement Planner', href: '/calculators/retirement' },
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press Kit', href: '/press' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
}

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
]

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-secondary-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                SmartMoneyPath
              </span>
            </Link>
            <p className="text-sm mb-6 max-w-xs">
              Empowering you to take control of your finances and build lasting wealth.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-400 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-secondary-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary-500">
            © {new Date().getFullYear()} SmartMoneyPath. All rights reserved.
          </p>
          <p className="text-sm text-secondary-500">
            Made with care for your financial journey.
          </p>
        </div>
      </div>
    </footer>
  )
}
