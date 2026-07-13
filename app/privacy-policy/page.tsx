import Link from 'next/link'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/site'
import { BreadcrumbSchema } from '@/components/seo/JsonLdSchemas'

export const metadata: Metadata = {
  title: 'Privacy Policy | SmartMoneyPath',
  description: 'Learn how SmartMoneyPath collects, uses, and protects your personal information in compliance with US privacy standards.',
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  openGraph: {
    title: 'Privacy Policy | SmartMoneyPath',
    description: 'Our commitment to protecting your data and your rights while using our financial education library.',
    url: `${SITE_URL}/privacy-policy`,
    siteName: 'SmartMoneyPath',
    type: 'website',
  },
}

export default function PrivacyPolicyPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Privacy Policy', url: `${SITE_URL}/privacy-policy` },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BreadcrumbSchema items={breadcrumbItems} />

      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
              Privacy Policy
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
            <h2 id="introduction">1. Introduction</h2>
            <p>
              Welcome to SmartMoneyPath ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you about how we look after your personal data when you visit our website
              and tell you about your privacy rights and how the law protects you.
            </p>

            <h2 id="collection">2. Information We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you, including:</p>
            <ul>
              <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
              <li><strong>Contact Data:</strong> If you reach out via our contact form, we collect your name and email address.</li>
            </ul>

            <h2 id="usage">3. How We Use Your Information</h2>
            <p>We use your personal data only when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul>
              <li>To provide and improve our website and services.</li>
              <li>To gather analytics to understand how users interact with our content.</li>
              <li>To manage our relationship with you (e.g., responding to your inquiries).</li>
              <li>To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you.</li>
            </ul>

            <h2 id="cookies">4. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track the activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </p>
            <p>
              Specifically, we use:
            </p>
            <ul>
              <li><strong>Analytical/Performance Cookies:</strong> These allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.</li>
              <li><strong>Targeting Cookies:</strong> These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests.</li>
            </ul>

            <h2 id="adsense">5. Google AdSense & DoubleClick Cookie</h2>
            <p>
              Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DoubleClick cookie enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
            </p>
            <p>
              You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
            </p>

            <h2 id="data-sharing">6. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal data. We may share your information with third-party service providers (like analytics providers) who perform services on our behalf and are bound by confidentiality agreements.
            </p>

            <h2 id="security">7. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.
            </p>

            <h2 id="third-party">8. Third-Party Links</h2>
            <p>
              This website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. We encourage you to read the privacy policy of every website you visit, especially our <Link href="/how-we-make-money">affiliate partners</Link>.
            </p>

            <h2 id="your-rights">9. Your Legal Rights</h2>
            <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, or to object to processing.</p>

            <h2 id="contact">10. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-secondary-200 flex flex-wrap justify-center gap-6 text-sm text-secondary-500">
            <Link href="/terms-of-service" className="hover:text-primary-600 underline">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-primary-600 underline">Cookie Policy</Link>
            <Link href="/disclaimer" className="hover:text-primary-600 underline">Legal Disclaimer</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
