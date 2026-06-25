import Link from 'next/link'
import { BookOpen, Calculator, ExternalLink, ShieldCheck } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = { title: 'About SmartMoneyPath', description: 'Our editorial approach, sourcing standards, and limitations.' }

const standards = [
  { icon: ExternalLink, title: 'Primary sources first', text: 'We link to agencies and regulators such as the CFPB, SEC, FDIC, IRS, Department of Labor, and Federal Student Aid.' },
  { icon: Calculator, title: 'Show the calculation', text: 'Examples state their assumptions and label hypothetical figures instead of presenting them as reader results.' },
  { icon: ShieldCheck, title: 'No invented authority', text: 'Articles use an editorial-team byline. We do not claim professional credentials, customer counts, or personal case studies we cannot verify.' },
  { icon: BookOpen, title: 'Education, not advice', text: 'Content explains options and tradeoffs. It is not individualized financial, tax, investment, or legal advice.' },
]

export default function AboutPage() {
  return <main className="min-h-screen bg-white"><Navbar />
    <section className="bg-gradient-to-br from-primary-50 to-secondary-50 pt-32 pb-16"><div className="max-w-3xl mx-auto px-4 text-center"><p className="text-primary-700 font-semibold mb-3">ABOUT SMARTMONEYPATH</p><h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">A small financial-education library built for clarity</h1><p className="text-lg text-secondary-600">SmartMoneyPath publishes focused explanations of common personal-finance decisions. Our goal is to make the math, assumptions, risks, and official sources easy to inspect.</p></div></section>
    <section className="py-16"><div className="max-w-5xl mx-auto px-4"><div className="grid md:grid-cols-2 gap-6">{standards.map(({ icon: Icon, title, text }) => <div key={title} className="border rounded-2xl p-6"><Icon className="h-7 w-7 text-primary-700 mb-4"/><h2 className="text-xl font-bold mb-2">{title}</h2><p className="text-secondary-600">{text}</p></div>)}</div>
      <div className="mt-12 bg-secondary-50 rounded-2xl p-8"><h2 className="text-2xl font-bold mb-3">Corrections and questions</h2><p className="text-secondary-600 mb-5">Rules, limits, and programs change. Each guide shows an updated date and links readers to current official information. If you spot an error or a broken source, tell us what needs review.</p><Link href="/contact" className="inline-block bg-primary-700 text-white px-5 py-3 rounded-lg font-medium">Contact the editorial team</Link></div>
    </div></section><Footer /></main>
}
