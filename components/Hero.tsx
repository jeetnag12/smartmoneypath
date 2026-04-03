import Link from 'next/link'
import { ArrowRight, TrendingUp, PiggyBank, Shield } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              <span>Start Your Financial Journey Today</span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary-900 leading-tight">
              Master Your Money,{' '}
              <span className="text-primary-600">Build Your Future</span>
            </h1>

            <p className="text-lg text-secondary-600 max-w-lg">
              Discover practical strategies for budgeting, saving, and investing.
              Join thousands of readers taking control of their financial future
              with SmartMoneyPath.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/articles"
                className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200"
              >
                Start Reading
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-white text-secondary-700 border-2 border-secondary-200 px-8 py-4 rounded-xl font-semibold hover:border-primary-300 hover:text-primary-600 transition-colors"
              >
                Learn More
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-primary-200 border-2 border-white flex items-center justify-center text-primary-700 text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-secondary-600">
                <span className="font-semibold text-secondary-900">2,500+</span> readers trust us
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary-200 rounded-3xl transform rotate-3 opacity-50"></div>
            <div className="relative bg-white rounded-3xl shadow-xl p-8">
              <div className="grid gap-6">
                <div className="bg-primary-50 rounded-2xl p-6 flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-xl">
                    <PiggyBank className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Smart Saving</h3>
                    <p className="text-sm text-secondary-600 mt-1">Build your emergency fund with proven strategies</p>
                  </div>
                </div>

                <div className="bg-secondary-50 rounded-2xl p-6 flex items-start gap-4">
                  <div className="bg-secondary-200 p-3 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-secondary-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Strategic Investing</h3>
                    <p className="text-sm text-secondary-600 mt-1">Grow your wealth with confidence</p>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-2xl p-6 flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-xl">
                    <Shield className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Financial Security</h3>
                    <p className="text-sm text-secondary-600 mt-1">Protect what matters most</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
