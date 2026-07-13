import Link from 'next/link'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/site'
import { BreadcrumbSchema } from '@/components/seo/JsonLdSchemas'

export const metadata: Metadata = {
  title: 'Legal Disclaimer | SmartMoneyPath',
  description: 'Important financial, investment, and legal disclaimers for SmartMoneyPath readers and users.',
  alternates: {
    canonical: `${SITE_URL}/disclaimer`,
  },
  openGraph: {
    title: 'Legal Disclaimer | SmartMoneyPath',
    description: 'Understand the limitations of our content and your responsibilities as a reader.',
    url: `${SITE_URL}/disclaimer`,
    siteName: 'SmartMoneyPath',
    type: 'website',
  },
}

export default function DisclaimerPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Disclaimer', url: `${SITE_URL}/disclaimer` },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BreadcrumbSchema items={breadcrumbItems} />

      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
              Legal Disclaimer
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
            <h2 id="financial">1. Financial and Investment Disclaimer</h2>
            <p>
              <strong>SmartMoneyPath is an educational resource.</strong> The information provided on this website does not, and is not intended to, constitute financial, investment, legal, or tax advice. All content, including text, graphics, images, and tools, is for general informational purposes only.
            </p>
            <p>
              We are not financial advisors, planners, brokers, or tax professionals. You should consult with a qualified professional before making any significant financial decisions. Reliance on any information provided by SmartMoneyPath is solely at your own risk.
            </p>

            <h2 id="risk">2. Investment Risk</h2>
            <p>
              Past performance is not indicative of future results. The value of investments and the income derived from them can go down as well as up. You may not get back the amount you invest. Markets are volatile and subject to various risks including economic, political, and regulatory changes.
            </p>

            <h2 id="accuracy">3. Accuracy and Completeness</h2>
            <p>
              While we strive to provide accurate and up-to-date information derived from <Link href="/methodology">primary sources</Link>, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website.
            </p>

            <h2 id="affiliate">4. Affiliate and Advertising Disclosure</h2>
            <p>
              SmartMoneyPath is a participant in various affiliate marketing programs. We may earn a commission when you click on or make purchases via affiliate links. This comes at no additional cost to you. Our editorial team reviews products based on merit, regardless of any affiliate relationship. For more details, see <Link href="/how-we-make-money">How We Make Money</Link>.
            </p>
            <p>
              This website also displays advertisements through Google AdSense. The presence of an advertisement does not constitute an endorsement or recommendation by SmartMoneyPath.
            </p>

            <h2 id="third-party">5. Third-Party Content</h2>
            <p>
              Our website contains links to external websites that are not provided or maintained by or in any way affiliated with SmartMoneyPath. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
            </p>

            <h2 id="liability">6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, SmartMoneyPath and its owners shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in any way connected with your use of our website or reliance on our content.
            </p>

            <h2 id="contact">7. Contact Us</h2>
            <p>
              If you have any questions regarding this disclaimer, please contact us at: <a href="mailto:legal@smartmoneypath.com">legal@smartmoneypath.com</a>.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-secondary-200 flex flex-wrap justify-center gap-6 text-sm text-secondary-500">
            <Link href="/privacy-policy" className="hover:text-primary-600 underline">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary-600 underline">Terms of Service</Link>
            <Link href="/editorial-policy" className="hover:text-primary-600 underline">Editorial Policy</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
