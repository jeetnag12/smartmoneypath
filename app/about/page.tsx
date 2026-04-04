import Link from 'next/link'
import { Target, Users, Award, TrendingUp } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'About Us | SmartMoneyPath',
  description: 'Learn about SmartMoneyPath - your trusted guide to personal finance, budgeting, investing, and building wealth.',
}

const values = [
  {
    icon: Target,
    title: 'Clear & Actionable',
    description: 'We break down complex financial topics into simple, actionable steps you can take today.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'We\'re building a community of people helping each other achieve financial freedom.',
  },
  {
    icon: Award,
    title: 'Research-Backed',
    description: 'Our advice is based on proven financial principles and real-world experience.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Mindset',
    description: 'We believe everyone can improve their financial situation with the right knowledge and tools.',
  },
]

const team = [
  {
    name: 'Sarah Chen',
    role: 'Founder & Editor',
    bio: 'Personal finance expert with 10+ years helping families achieve financial independence.',
  },
  {
    name: 'Michael Ross',
    role: 'Investment Writer',
    bio: 'Former investment banker passionate about making investing accessible to everyone.',
  },
  {
    name: 'Emma Wilson',
    role: 'Certified Financial Planner',
    bio: 'CFP helping millennials master their money through practical budgeting advice.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
              About SmartMoneyPath
            </h1>
            <p className="text-lg text-secondary-600 mb-8">
              We're on a mission to make personal finance simple, accessible, and actionable
              for everyone. No jargon, no gatekeeping – just practical advice that works.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/articles"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Browse Articles
              </Link>
              <Link
                href="/contact"
                className="bg-white text-secondary-700 border border-secondary-200 px-6 py-3 rounded-lg font-medium hover:bg-secondary-50 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">Our Story</h2>
              <p className="text-secondary-600 mb-4">
                SmartMoneyPath was born from a simple observation: most financial advice is either
                too basic to be useful or too complex to understand. We wanted to change that.
              </p>
              <p className="text-secondary-600 mb-4">
                Founded in 2024, we've grown from a small blog into a trusted resource for thousands
                of readers who want to take control of their finances without getting overwhelmed.
              </p>
              <p className="text-secondary-600">
                Whether you're just starting your financial journey or looking to optimize your
                existing strategy, we're here to guide you every step of the way.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <span className="text-9xl">💰</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Our Values</h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              These principles guide everything we do at SmartMoneyPath.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="bg-white rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-bold text-secondary-900 mb-2">{value.title}</h3>
                  <p className="text-secondary-600 text-sm">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Meet the Team</h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              The passionate people behind SmartMoneyPath.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-24 h-24 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold text-2xl mx-auto mb-4">
                  {member.name[0]}
                </div>
                <h3 className="font-bold text-secondary-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 text-sm mb-2">{member.role}</p>
                <p className="text-secondary-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Financial Journey?
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Join thousands of readers who are taking control of their finances with SmartMoneyPath.
          </p>
          <Link
            href="/articles"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
          >
            Start Reading
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
