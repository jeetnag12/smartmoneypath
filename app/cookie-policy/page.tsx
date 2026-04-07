import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Cookie Policy | SmartMoneyPath',
  description: 'Learn how SmartMoneyPath uses cookies and similar technologies.',
}

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
              Cookie Policy
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
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">What Are Cookies</h2>
            <p className="text-secondary-600 mb-6">
              Cookies are small text files that are stored on your computer or mobile device when you visit a website.
              They help the website recognize your device and remember information about your visit.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">How We Use Cookies</h2>
            <p className="text-secondary-600 mb-4">We use cookies for the following purposes:</p>
            <ul className="list-disc list-inside text-secondary-600 mb-6 space-y-2">
              <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Advertising cookies:</strong> Used to deliver relevant advertisements</li>
              <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
            </ul>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Third-Party Cookies</h2>
            <p className="text-secondary-600 mb-6">
              We use services from third parties that may set cookies on your device, including:
            </p>
            <ul className="list-disc list-inside text-secondary-600 mb-6 space-y-2">
              <li>Google Analytics (usage analytics)</li>
              <li>Google AdSense (advertising)</li>
            </ul>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Managing Cookies</h2>
            <p className="text-secondary-600 mb-6">
              Most web browsers allow you to control cookies through their settings. You can choose to
              accept or decline cookies, or to be notified when a cookie is being sent. However, disabling
              cookies may affect the functionality of this website.
            </p>
            <p className="text-secondary-600 mb-6">
              To learn more about managing cookies, visit{' '}
              <a href="https://www.allaboutcookies.org" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
                allaboutcookies.org
              </a>.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Changes to This Policy</h2>
            <p className="text-secondary-600 mb-6">
              We may update this Cookie Policy from time to time. We will notify you of any changes by
              posting the new policy on this page.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Contact Us</h2>
            <p className="text-secondary-600 mb-6">
              If you have any questions about our Cookie Policy, please contact us at:{' '}
              <a href="mailto:privacy@smartmoneypath.com" className="text-primary-600 hover:underline">
                privacy@smartmoneypath.com
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
