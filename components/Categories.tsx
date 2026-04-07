'use client'

import Link from 'next/link'
import {
  CreditCard,
  Shield,
  Home,
  Wallet,
  Briefcase,
  Building2,
  TrendingUp,
  GraduationCap,
  Users,
  ArrowRight
} from 'lucide-react'

const categories = [
  {
    name: 'Credit Cards',
    description: 'Find the best credit cards with rewards, cash back, and low APR',
    icon: CreditCard,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    href: '/categories/credit',
  },
  {
    name: 'Insurance',
    description: 'Compare auto, home, life, and health insurance rates',
    icon: Shield,
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    href: '/categories/insurance',
  },
  {
    name: 'Mortgages',
    description: 'Find the best mortgage rates and home loan options',
    icon: Home,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    href: '/categories/home-buying',
  },
  {
    name: 'Personal Loans',
    description: 'Compare personal loan rates and find the best lenders',
    icon: Wallet,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    href: '/categories/personal-loans',
  },
  {
    name: 'Small Business',
    description: 'Business credit cards, loans, and financial tools',
    icon: Briefcase,
    color: 'bg-rose-500',
    lightColor: 'bg-rose-50',
    textColor: 'text-rose-600',
    href: '/categories/small-business',
  },
  {
    name: 'Banking',
    description: 'High-yield savings accounts, CDs, and checking accounts',
    icon: Building2,
    color: 'bg-cyan-500',
    lightColor: 'bg-cyan-50',
    textColor: 'text-cyan-600',
    href: '/categories/banking',
  },
  {
    name: 'Investing',
    description: 'Brokerage accounts, retirement planning, and investment tools',
    icon: TrendingUp,
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    href: '/categories/investing',
  },
  {
    name: 'Student Loans',
    description: 'Compare student loan rates and refinancing options',
    icon: GraduationCap,
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    href: '/categories/education',
  },
  {
    name: 'Financial Advisors',
    description: 'Find certified financial advisors near you',
    icon: Users,
    color: 'bg-teal-500',
    lightColor: 'bg-teal-50',
    textColor: 'text-teal-600',
    href: '/categories/financial-advisors',
  },
]

export default function Categories() {
  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Explore Financial Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compare and find the best rates for all your financial needs
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${category.lightColor} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-7 w-7 ${category.textColor}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-darkGreen transition-colors flex items-center gap-2">
                      {category.name}
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
