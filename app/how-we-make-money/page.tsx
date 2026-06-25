import Link from 'next/link'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/site'
import { BreadcrumbSchema, FAQSchema } from '@/components/seo/JsonLdSchemas'
import { DollarSign, ShieldCheck, HeartHandshake, Eye, Briefcase, BarChart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How We Make Money | SmartMoneyPath',
  description: 'Transparency is our core value. Learn about our revenue model, affiliate partnerships, and how we maintain editorial independence while providing free financial education.',
  alternates: {
    canonical: `${SITE_URL}/how-we-make-money`,
  },
  openGraph: {
    title: 'Transparency Disclosure: How SmartMoneyPath is Funded',
    description: 'A detailed look at our business model, including how we use affiliate links and advertising to keep our content free.',
    url: `${SITE_URL}/how-we-make-money`,
    siteName: 'SmartMoneyPath',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How We Make Money | SmartMoneyPath',
    description: 'Learn about our commitment to transparency and how our revenue model supports our mission.',
  }
}

const faqs = [
  {
    question: "Does clicking on your links cost me anything?",
    answer: "No. Clicking on our affiliate links or signing up for a product through them will never cost you any extra money. In fact, some of our partnerships allow us to offer exclusive bonuses or better rates for our readers."
  },
  {
    question: "Do you only review products that pay you a commission?",
    answer: "Absolutely not. Our editorial team reviews and ranks products based on their merit and value to our readers. Many of the products we recommend do not have affiliate programs. If a product is the best in its category, we will tell you, regardless of whether we make money from it."
  },
  {
    question: "How do you handle sponsored content?",
    answer: "SmartMoneyPath does not currently publish sponsored content or 'native advertising' that looks like editorial. If we ever decide to work with a partner on a specific article, it will be clearly and prominently labeled as 'Sponsored' at the very top of the page."
  },
  {
    question: "Does Google AdSense influence your content?",
    answer: "No. Google AdSense serves ads based on automated algorithms. Our editorial team has no control over which specific ads appear on a page, and those ads have no impact on the educational content or reviews we produce."
  },
  {
    question: "How do you avoid conflicts of interest?",
    answer: "We maintain a strict 'firewall' between our editorial and business teams. Our writers and researchers are not privy to affiliate payout data, ensuring their recommendations are based solely on objective product analysis."
  },
  {
    question: "Where does the money go?",
    answer: "The revenue generated supports the operation of this site, including paying our expert writers, funding deep-dive research projects, maintaining our server infrastructure, and ensuring our tools and calculators remain accurate and free for everyone."
  },
  {
    question: "What if I have a problem with a product you recommended?",
    answer: "While we strive for accuracy, we do not own or operate any of the financial products we review. If you have an issue with a specific bank or service, you should contact their customer support directly. However, we value your feedback—if you feel a product we recommend has changed for the worse, please let us know."
  },
  {
    question: "Can I use your site without clicking affiliate links?",
    answer: "Yes. All our guides, calculations, and research are available for free. You are under no obligation to use our links to sign up for products. You can always visit a provider's website directly by typing their URL into your browser."
  }
]

export default function HowWeMakeMoneyPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'How We Make Money', url: `${SITE_URL}/how-we-make-money` },
  ]

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'How We Make Money',
    description: 'Disclosure of the revenue models used by SmartMoneyPath to provide free financial education.',
    url: `${SITE_URL}/how-we-make-money`,
    publisher: {
      '@type': 'Organization',
      name: 'SmartMoneyPath',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.svg`
      }
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema questions={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
              How We Make Money
            </h1>
            <p className="text-xl text-secondary-600 leading-relaxed">
              To keep our library of financial guides and calculators free for everyone, we use a transparent revenue model. Here is exactly how we fund SmartMoneyPath.
            </p>
            <div className="mt-8 flex justify-center gap-4 text-sm text-secondary-500">
              <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-primary-600" /> Transparent</span>
              <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-primary-600" /> Reader-First</span>
              <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-primary-600" /> Independent</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Summary & Key Takeaways */}
      <section className="py-16 border-b border-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 bg-secondary-900 text-white p-8 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Quick Summary</h2>
              <p className="text-secondary-100 text-lg leading-relaxed">
                SmartMoneyPath makes money through <strong>advertising</strong> (like Google AdSense) and <strong>affiliate partnerships</strong> with some of the financial institutions we review. When you click a link or sign up for a product through our site, we may receive a commission. This revenue allows us to pay our expert staff and keep our content free of charge.
              </p>
              <div className="mt-8 pt-8 border-t border-white/10 italic text-secondary-300 text-sm">
                "We would rather lose a commission than lose your trust. Our recommendations are always based on merit."
              </div>
            </div>
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-bold text-secondary-900 mb-8">Key Takeaways</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: HeartHandshake, title: "Free for Readers", text: "You never pay to use our site. Our revenue comes from partners, not you." },
                  { icon: Eye, title: "Clear Disclosures", text: "We label all ads and include affiliate disclosures on relevant articles." },
                  { icon: Briefcase, title: "Editorial Firewall", text: "Business partnerships never dictate our reviews or rankings." },
                  { icon: BarChart, title: "Merit-Based", text: "We recommend products based on data, regardless of whether we make money." },
                  { icon: DollarSign, title: "No Extra Cost", text: "Using our links never increases the price you pay for a service." },
                  { icon: ShieldCheck, title: "Mission-Driven", text: "Revenue is reinvested into better research and deeper financial guides." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-secondary-900">{item.title}</h3>
                      <p className="text-secondary-600 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Detailed Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:text-secondary-900 prose-p:text-secondary-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-secondary-900 prose-li:text-secondary-700">

            <h2 id="mission">1. Our Mission</h2>
            <p>
              SmartMoneyPath was founded with a clear and unwavering mission: to provide independent, data-driven financial education that helps American households make smarter decisions with their money. We believe that everyone deserves access to high-quality financial research, regardless of their net worth or income level.
            </p>
            <p>
              Our <Link href="/articles">articles</Link> and <Link href="/methodology">methodology</Link> are built on the principles of transparency and objectivity. We don't just give you a "top 10" list; we show you the primary sources, the math, and the trade-offs involved in every decision. To fulfill this mission while remaining independent, we have adopted a business model that aligns our interests with yours.
            </p>

            <h2 id="why-revenue">2. Why We Need Revenue</h2>
            <p>
              Producing high-quality financial content is an expensive and time-consuming process. A single product review at SmartMoneyPath can involve 20 to 40 hours of research, including reading through hundreds of pages of legal disclosures, verifying interest rates with the <Link href="https://www.fdic.gov">FDIC</Link> and <Link href="https://www.ncua.gov">NCUA</Link>, and testing user interfaces.
            </p>
            <p>
              We employ expert writers, researchers, and editors who are dedicated to accuracy. Additionally, we invest in technology to keep our interest rate data updated and our calculators functional. Revenue is what allows us to keep this engine running without charging you a subscription fee or hiding our best content behind a paywall.
            </p>

            <h2 id="advertising">3. Advertising</h2>
            <p>
              One of the ways we generate revenue is through display advertising. These are the banners and square ads you see placed within our content or in the sidebars. We work with premium ad networks to ensure that the ads displayed are relevant and not intrusive to your reading experience.
            </p>
            <p>
              All advertisements are clearly marked as "Sponsored" or "Advertisement" to distinguish them from our editorial content. The presence of an ad does not imply an endorsement of the product or brand by SmartMoneyPath.
            </p>

            <h2 id="google-adsense">4. Google AdSense</h2>
            <p>
              We participate in the Google AdSense program. Google uses cookies to serve ads based on a user's prior visits to our website or other websites on the internet. These ads are served automatically by Google's algorithms.
            </p>
            <p>
              While we use technical filters to block inappropriate or predatory ads, we do not have direct control over every individual ad that appears. Our editorial team operates completely independently of AdSense; the presence of a Google ad on a page has no bearing on our articles, reviews, or rankings. For more information, please see our <Link href="/privacy-policy">Privacy Policy</Link>.
            </p>

            <h2 id="affiliate-partnerships">5. Affiliate Partnerships</h2>
            <p>
              Affiliate partnerships are our primary source of revenue. We partner with some of the financial institutions we review—such as banks, credit card issuers, and investment platforms. When a reader clicks a link on our site and subsequently opens an account or is approved for a product, we may receive a commission from that partner.
            </p>
            <p>
              These partnerships allow us to provide deep-dive reviews for free. However, we maintain a strict policy: **we review products based on their value to you, not their value to us.** We frequently recommend products that pay us nothing because they are the best options for our readers.
            </p>

            <h2 id="how-links-work">6. How Affiliate Links Work</h2>
            <p>
              When you click on a "Check Rate," "Apply Now," or similar button on our site, you are likely using an affiliate link. This link contains a small piece of code that tells the provider you came from SmartMoneyPath.
            </p>
            <p>
              **Importantly, this process is seamless for you.** It does not slow down your browser, and it never increases the fees or interest rates you pay. In many instances, our relationships with providers allow us to offer you a "special offer" or a higher APY than you would find by going to the provider's site directly.
            </p>

            <h2 id="editorial-independence">7. Editorial Independence</h2>
            <p>
              Our <Link href="/editorial-policy">Editorial Policy</Link> is built on a "firewall" between our business development team and our content creators. Our writers and researchers do not know the commission rates of our affiliate partners. They are instructed to evaluate every product based on our objective <Link href="/methodology">Methodology</Link>.
            </p>
            <p>
              Business partners do not get to review our articles before they are published. They cannot dictate our tone, change our rankings, or remove negative points from a review. Our primary loyalty is to our readers; if a partner's product is subpar, we will say so clearly.
            </p>

            <h2 id="product-recommendations">8. Product Recommendations</h2>
            <p>
              How do we decide which products to recommend? It comes down to data. We look at factors like:
            </p>
            <ul>
              <li><strong>Cost:</strong> We prioritize low fees and transparent pricing.</li>
              <li><strong>Yield:</strong> We highlight the highest APYs from insured institutions.</li>
              <li><strong>Accessibility:</strong> We value great mobile apps and responsive customer service.</li>
              <li><strong>Safety:</strong> We only recommend banking products from FDIC or NCUA insured institutions.</li>
            </ul>
            <p>
              Our "Best Of" lists are updated regularly to reflect the current market, regardless of which partners are currently paying the highest commissions.
            </p>

            <h2 id="sponsored-content">9. Sponsored Content Policy</h2>
            <p>
              Some websites publish "sponsored stories" that are written by advertisers but designed to look like news. **SmartMoneyPath does not do this.**
            </p>
            <p>
              Every article on this site is produced by our editorial team. If we ever partner with a brand on a specific piece of content, it will be labeled with a large, unmistakable disclosure at the top of the page. We believe in keeping a clear line between what is education and what is an advertisement.
            </p>

            <h2 id="conflicts-of-interest">10. How We Avoid Conflicts of Interest</h2>
            <p>
              To ensure objectivity, we follow these guidelines:
            </p>
            <ul>
              <li><strong>No Pay-to-Play:</strong> No institution can pay to be included in a list or to receive a specific rating.</li>
              <li><strong>Standardized Scoring:</strong> We use the same scoring model for all products in a category, whether they are a partner or not.</li>
              <li><strong>Diversified Revenue:</strong> We work with dozens of different partners and ad networks so that we aren't beholden to any single company.</li>
            </ul>

            <h2 id="reader-first">11. Reader-First Promise</h2>
            <p>
              Our promise to you is simple: we will never recommend a financial product that we wouldn't suggest to our own friends or family. We understand the gravity of financial decisions, and we take our responsibility as educators seriously. If a product has a great sign-up bonus but terrible fine print, we will highlight the fine print as much as the bonus.
            </p>

            <h2 id="transparency">12. Transparency Standards</h2>
            <p>
              Transparency isn't just a buzzword for us; it's a technical requirement. We follow the <Link href="https://www.ftc.gov">Federal Trade Commission (FTC)</Link> guidelines regarding disclosures. You will see a clear disclosure at the top of any page that contains affiliate links, and our "How We Make Money" link is visible on every single page of our website.
            </p>

            <h2 id="revenue-support">13. How Revenue Supports the Website</h2>
            <p>
              When you use our links, you are directly supporting the future of SmartMoneyPath. This revenue is reinvested into:
            </p>
            <ul>
              <li><strong>Deep-Dive Research:</strong> Funding the weeks of work required for complex guides on student loans or estate planning.</li>
              <li><strong>Data Verification:</strong> Paying for the tools we use to track interest rates across the banking industry.</li>
              <li><strong>Expert Staff:</strong> Ensuring we can afford the most qualified financial writers and editors.</li>
              <li><strong>Free Tools:</strong> Keeping our calculators and interactive maps free of charge and free of paywalls.</li>
            </ul>

            <h2 id="faq">Frequently Asked Questions</h2>
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
                  <h3 className="text-xl font-bold text-secondary-900 mb-2 mt-0">{faq.question}</h3>
                  <p className="text-secondary-700 mb-0">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 space-y-6 text-sm text-secondary-500 border-t border-secondary-100 pt-8">
              <p className="font-semibold uppercase tracking-wider text-secondary-400">Related Disclosures:</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <Link href="/about" className="hover:text-primary-600 underline underline-offset-4">About SmartMoneyPath</Link>
                <Link href="/editorial-policy" className="hover:text-primary-600 underline underline-offset-4">Editorial Policy</Link>
                <Link href="/methodology" className="hover:text-primary-600 underline underline-offset-4">Our Methodology</Link>
                <Link href="/disclaimer" className="hover:text-primary-600 underline underline-offset-4">General Disclaimer</Link>
                <Link href="/privacy-policy" className="hover:text-primary-600 underline underline-offset-4">Privacy Policy</Link>
                <Link href="/terms-of-service" className="hover:text-primary-600 underline underline-offset-4">Terms of Service</Link>
                <Link href="/contact" className="hover:text-primary-600 underline underline-offset-4">Contact Us</Link>
              </div>
              <p className="italic">
                Disclosure: SmartMoneyPath is an independent, advertising-supported publisher and comparison service. Our content is for educational purposes only. We receive compensation from some of the companies whose products we review, which may impact how and where products appear on this site.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
