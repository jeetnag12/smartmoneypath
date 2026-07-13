import Link from 'next/link'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/site'
import { BreadcrumbSchema } from '@/components/seo/JsonLdSchemas'

export const metadata: Metadata = {
  title: 'Terms of Service | SmartMoneyPath',
  description: 'The legal terms and conditions governing your use of SmartMoneyPath financial education library.',
  alternates: {
    canonical: `${SITE_URL}/terms-of-service`,
  },
  openGraph: {
    title: 'Terms of Service | SmartMoneyPath',
    description: 'Read our terms of service before using our website and educational materials.',
    url: `${SITE_URL}/terms-of-service`,
    siteName: 'SmartMoneyPath',
    type: 'website',
  },
}

export default function TermsOfServicePage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Terms of Service', url: `${SITE_URL}/terms-of-service` },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BreadcrumbSchema items={breadcrumbItems} />

      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-secondary-600">
              Last updated: June 25, 2026
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:text-secondary-900 prose-p:text-secondary-700 prose-strong:text-secondary-900 prose-a:text-primary-600 hover:prose-a:text-primary-700">
            <h2 id="agreement">1. Agreement to Terms</h2>
            <p>
              By accessing or using SmartMoneyPath, you agree to be bound by these Terms of Service.
              If you disagree with any part of these terms, you may not access the website. Our <Link href="/privacy-policy">Privacy Policy</Link> also governs your use of our website.
            </p>

            <h2 id="educational-purpose">2. Educational Purpose Only</h2>
            <p>
              The content on this website, including but not limited to articles, guides, calculations, and tables, is for <strong>informational and educational purposes only</strong>. It does not constitute financial, investment, legal, or tax advice. We strongly recommend consulting with a certified professional before making significant financial decisions.
            </p>

            <h2 id="use-of-content">3. Use of Content</h2>
            <p>
              All content on this website is the property of SmartMoneyPath and is protected by copyright laws. You may view, download,
              and print content for personal, non-commercial use only. You may not:
            </p>
            <ul>
              <li>Modify or copy our materials for commercial gain.</li>
              <li>Use the materials for any public display or commercial purpose.</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website.</li>
              <li>Remove any copyright or other proprietary notations from the materials.</li>
            </ul>

            <h2 id="intellectual-property">4. Intellectual Property</h2>
            <p>
              The SmartMoneyPath name, logo, and all related brand elements are trademarks of SmartMoneyPath. All other trademarks, product names, and company names or logos mentioned on our website are the property of their respective owners.
            </p>

            <h2 id="disclaimer-liability">5. Limitation of Liability</h2>
            <p>
              In no event shall SmartMoneyPath, its owners, or contributors be liable for any
              indirect, incidental, special, consequential, or punitive damages arising out of or
              relating to your use of the website. We do not warrant that the website will be available at all times or that the content is error-free. Review our full <Link href="/disclaimer">Legal Disclaimer</Link> for additional details.
            </p>

            <h2 id="governing-law">6. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States,
              without regard to its conflict of law provisions.
            </p>

            <h2 id="changes">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately
              upon posting to this page. Your continued use of the website after any changes indicates your
              acceptance of the modified terms.
            </p>

            <h2 id="contact">8. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:{' '}
              <a href="mailto:legal@smartmoneypath.com">
                legal@smartmoneypath.com
              </a>
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-secondary-200 flex flex-wrap justify-center gap-6 text-sm text-secondary-500">
            <Link href="/privacy-policy" className="hover:text-primary-600 underline">Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-primary-600 underline">Legal Disclaimer</Link>
            <Link href="/editorial-policy" className="hover:text-primary-600 underline">Editorial Policy</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
