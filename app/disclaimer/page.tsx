import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Disclaimer | SmartMoneyPath',
  description: 'Important disclaimers and disclosures for SmartMoneyPath readers.',
}

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
              Disclaimer
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
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Financial Disclaimer</h2>
            <p className="text-secondary-600 mb-6">
              <strong>IMPORTANT:</strong> The information provided on SmartMoneyPath is for general educational
              and informational purposes only. It should not be construed as professional financial,
              investment, legal, or tax advice. We are not financial advisors, brokers, or licensed
              professionals.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">No Professional Advice</h2>
            <p className="text-secondary-600 mb-6">
              The content on this website is not intended to be a substitute for professional financial advice.
              Always seek the advice of a qualified financial advisor, accountant, or other licensed professional
              with any questions you may have regarding your financial situation. Never disregard professional
              advice or delay seeking it because of something you have read on this website.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Investment Risk</h2>
            <p className="text-secondary-600 mb-6">
              All investments carry risk. Past performance is not indicative of future results. The value of
              investments can go down as well as up, and you may not get back the amount you originally invested.
              Any investment decisions you make are solely your responsibility.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Accuracy of Information</h2>
            <p className="text-secondary-600 mb-6">
              While we strive to provide accurate and up-to-date information, we make no representations or
              warranties of any kind, express or implied, about the completeness, accuracy, reliability,
              suitability, or availability of the information, products, services, or related graphics contained
              on this website. Any reliance you place on such information is strictly at your own risk.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Affiliate Disclosure</h2>
            <p className="text-secondary-600 mb-6">
              SmartMoneyPath may participate in affiliate marketing programs, which means we may earn commissions
              on purchases made through our links to retailer sites. This comes at no additional cost to you.
              We only recommend products and services we believe will add value to our readers.
            </p>
            <p className="text-secondary-600 mb-6">
              We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program
              designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Advertising Disclosure</h2>
            <p className="text-secondary-600 mb-6">
              This website displays advertisements through Google AdSense and other advertising networks.
              We do not endorse the products or services advertised unless explicitly stated. The presence of
              an advertisement does not constitute an endorsement or recommendation by SmartMoneyPath.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Third-Party Links</h2>
            <p className="text-secondary-600 mb-6">
              Our website contains links to third-party websites. We have no control over the nature, content,
              and availability of those sites. The inclusion of any links does not necessarily imply a
              recommendation or endorsement of the views expressed within them.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Personal Responsibility</h2>
            <p className="text-secondary-600 mb-6">
              You acknowledge that you are solely responsible for any decisions or actions you take based on the
              information provided on this website. SmartMoneyPath, its owners, and contributors will not be
              liable for any losses, damages, or other consequences arising from your use of this website or
              reliance on any information provided herein.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Testimonials</h2>
            <p className="text-secondary-600 mb-6">
              Any testimonials or success stories presented on this website are individual experiences and may
              not be typical. Your results may vary based on your personal circumstances, effort, and market conditions.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Changes to This Disclaimer</h2>
            <p className="text-secondary-600 mb-6">
              We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon
              posting to this page. We encourage you to periodically review this page for the latest information on our
              disclaimers and disclosures.
            </p>

            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Contact Us</h2>
            <p className="text-secondary-600 mb-6">
              If you have any questions about this disclaimer, please contact us at:{' '}
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
