import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Terms of Service | SmartMoneyPath',
  description: 'Terms and conditions for using SmartMoneyPath website.',
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-secondary-600">
              Last updated: April 7, 2026
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Agreement to Terms</h2>
            <p className="text-secondary-600 mb-6">
              By accessing or using SmartMoneyPath, you agree to be bound by these Terms of Service.
              If you disagree with any part of these terms, you may not access the website.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Use of Content</h2>
            <p className="text-secondary-600 mb-6">
              All content on this website is for informational purposes only. You may view, download,
              and print content for personal, non-commercial use only. You may not modify, reproduce,
              distribute, or exploit our content for commercial purposes without our prior written consent.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">User Accounts</h2>
            <p className="text-secondary-600 mb-6">
              If you create an account on our website, you are responsible for maintaining the security
              of your account and for all activities that occur under your account. You must notify us
              immediately of any unauthorized use of your account.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Intellectual Property</h2>
            <p className="text-secondary-600 mb-6">
              All content on SmartMoneyPath, including text, graphics, logos, and images, is our property
              or the property of our licensors and is protected by copyright and other intellectual property laws.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Limitation of Liability</h2>
            <p className="text-secondary-600 mb-6">
              In no event shall SmartMoneyPath, its owners, employees, or affiliates be liable for any
              indirect, incidental, special, consequential, or punitive damages arising out of or
              relating to your use of the website.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Governing Law</h2>
            <p className="text-secondary-600 mb-6">
              These Terms shall be governed by and construed in accordance with the laws of the United States,
              without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Changes to Terms</h2>
            <p className="text-secondary-600 mb-6">
              We reserve the right to modify these terms at any time. Changes will be effective immediately
              upon posting to this page. Your continued use of the website after any changes indicates your
              acceptance of the modified terms.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Contact Us</h2>
            <p className="text-secondary-600 mb-6">
              If you have any questions about these Terms of Service, please contact us at:{' '}
              <a href="mailto:legal@smartmoneypath.com" className="text-primary-600 hover:underline">
                legal@smartmoneypath.com
              </a>
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-secondary-200 text-center">
            <Link
              href="/"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
