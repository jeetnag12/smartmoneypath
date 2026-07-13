import Link from 'next/link'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/site'
import { BreadcrumbSchema } from '@/components/seo/JsonLdSchemas'

export const metadata: Metadata = {
  title: 'Cookie Policy | SmartMoneyPath',
  description: 'How we use cookies and similar technologies to improve your experience and deliver relevant content.',
  alternates: {
    canonical: `${SITE_URL}/cookie-policy`,
  },
  openGraph: {
    title: 'Cookie Policy | SmartMoneyPath',
    description: 'Understand how and why we use cookies on our financial education platform.',
    url: `${SITE_URL}/cookie-policy`,
    siteName: 'SmartMoneyPath',
    type: 'website',
  },
}

export default function CookiePolicyPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Cookie Policy', url: `${SITE_URL}/cookie-policy` },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BreadcrumbSchema items={breadcrumbItems} />

      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
              Cookie Policy
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
            <h2 id="what-are-cookies">1. What Are Cookies?</h2>
            <p>
              Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the service or a third-party to recognize you and make your next visit easier and the service more useful to you.
            </p>

            <h2 id="how-we-use">2. How SmartMoneyPath Uses Cookies</h2>
            <p>
              When you use and access our website, we may place a number of cookies files in your web browser. We use cookies for the following purposes:
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> To enable certain functions of the service, such as security and user authentication.</li>
              <li><strong>Analytics Cookies:</strong> To track information how the service is used so we can make improvements. We may also use analytics cookies to test new advertisements, pages, features or new functionality of the service to see how our users react to them.</li>
              <li><strong>Advertising Cookies:</strong> These cookies are used by third-party vendors, including Google, to serve ads based on a user's prior visits to our website or other websites.</li>
            </ul>

            <h2 id="third-party">3. Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the service, deliver advertisements on and through the service, and so on.
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> Used to monitor and analyze website traffic.</li>
              <li><strong>Google AdSense:</strong> Used to deliver personalized advertising.</li>
            </ul>

            <h2 id="choices">4. What Are Your Choices Regarding Cookies?</h2>
            <p>
              If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer.
            </p>

            <h2 id="more-info">5. More Information</h2>
            <p>
              You can learn more about cookies at <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer">AllAboutCookies.org</a>. For information on how we protect your data generally, please see our <Link href="/privacy-policy">Privacy Policy</Link>.
            </p>

            <h2 id="contact">6. Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at: <a href="mailto:privacy@smartmoneypath.com">privacy@smartmoneypath.com</a>.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-secondary-200 flex flex-wrap justify-center gap-6 text-sm text-secondary-500">
            <Link href="/privacy-policy" className="hover:text-primary-600 underline">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary-600 underline">Terms of Service</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
