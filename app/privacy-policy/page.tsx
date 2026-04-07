import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy | SmartMoneyPath',
  description: 'Learn how SmartMoneyPath collects, uses, and protects your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
              Privacy Policy
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
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Introduction</h2>
            <p className="text-secondary-600 mb-6">
              Welcome to SmartMoneyPath. We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you about how we look after your personal data when you visit our website
              and tell you about your privacy rights.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Information We Collect</h2>
            <p className="text-secondary-600 mb-4">We may collect, use, store and transfer different kinds of personal data about you, including:</p>
            <ul className="list-disc list-inside text-secondary-600 mb-6 space-y-2">
              <li><strong>Identity Data:</strong> first name, last name, username</li>
              <li><strong>Contact Data:</strong> email address</li>
              <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting</li>
              <li><strong>Usage Data:</strong> information about how you use our website</li>
            </ul>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">How We Use Your Information</h2>
            <p className="text-secondary-600 mb-4">We use your personal data for the following purposes:</p>
            <ul className="list-disc list-inside text-secondary-600 mb-6 space-y-2">
              <li>To provide and maintain our website</li>
              <li>To notify you about changes to our website</li>
              <li>To allow you to participate in interactive features</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our website</li>
              <li>To send you our newsletter (if you have subscribed)</li>
            </ul>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Cookies</h2>
            <p className="text-secondary-600 mb-6">
              We use cookies and similar tracking technologies to track the activity on our website and store certain information.
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Google AdSense</h2>
            <p className="text-secondary-600 mb-6">
              We use Google AdSense to display advertisements on our website. Google uses cookies to serve ads based on
              your prior visits to our website or other websites. You may opt out of personalized advertising by visiting
              <a href="https://www.google.com/settings/ads" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer"> Google Ads Settings</a>.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Data Security</h2>
            <p className="text-secondary-600 mb-6">
              We have implemented appropriate security measures to prevent your personal data from being accidentally lost,
              used, or accessed in an unauthorized way. We limit access to your personal data to those employees, agents,
              contractors, and third parties who have a business need to know.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Third-Party Links</h2>
            <p className="text-secondary-600 mb-6">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or
              content of these third-party sites. We encourage you to read the privacy policies of any website you visit.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Your Rights</h2>
            <p className="text-secondary-600 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-secondary-600 mb-6 space-y-2">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Contact Us</h2>
            <p className="text-secondary-600 mb-6">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:{' '}
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
