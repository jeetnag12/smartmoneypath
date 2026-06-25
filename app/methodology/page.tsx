import Link from 'next/link'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/site'
import { BreadcrumbSchema, FAQSchema } from '@/components/seo/JsonLdSchemas'
import { CheckCircle, Search, BarChart3, ShieldCheck, Database, RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Methodology | SmartMoneyPath',
  description: 'Discover how SmartMoneyPath evaluates financial products and services. Our data-driven research process ensures accuracy, objectivity, and transparency.',
  alternates: {
    canonical: `${SITE_URL}/methodology`,
  },
  openGraph: {
    title: 'How We Review Financial Products | SmartMoneyPath Methodology',
    description: 'A deep dive into our 16-step research and evaluation process for financial education and product reviews.',
    url: `${SITE_URL}/methodology`,
    siteName: 'SmartMoneyPath',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Methodology | SmartMoneyPath',
    description: 'Learn exactly how we verify interest rates, audit data, and review financial products.',
  }
}

const faqs = [
  {
    question: "How does SmartMoneyPath choose which products to review?",
    answer: "We select products based on market relevance, consumer search volume, and potential impact on a household's financial health. We prioritize products from established institutions (FDIC/NCUA insured) and innovative fintechs that offer significant value (low fees or high APYs)."
  },
  {
    question: "Are your reviews influenced by affiliate partnerships?",
    answer: "No. Our review process is data-driven and objective. We use the same scoring criteria for all products, regardless of whether we have a partnership with the provider. Editorial decisions are made independently of revenue considerations."
  },
  {
    question: "How often do you update interest rates and APY data?",
    answer: "Interest rates are checked and updated at least weekly for our most popular guides. For less volatile products, we conduct quarterly audits. We also perform emergency updates when the Federal Reserve announces significant rate changes."
  },
  {
    question: "What sources of data do you trust for your research?",
    answer: "We rely on primary sources including the IRS, CFPB, SEC, and Federal Reserve. For bank and credit union data, we pull directly from the institution's official fee schedules and terms of service documents."
  },
  {
    question: "How do you calculate your ratings and scores?",
    answer: "We use a weighted scoring model that considers Cost (40%), Accessibility (20%), Safety/Insurance (20%), and Features/Perks (20%). Each category has specific data points that are measured objectively."
  },
  {
    question: "Do you personally test the products you review?",
    answer: "Yes, where possible, our team opens accounts or uses the platforms to evaluate the user interface, customer support response times, and the ease of typical transactions like transfers or bill pay."
  },
  {
    question: "Can readers suggest products for review?",
    answer: "Absolutely. We value reader input. If there is a financial product or service you would like us to investigate, please contact our editorial team via email."
  },
  {
    question: "How do you handle corrections if a mistake is found?",
    answer: "We have a strict corrections policy. Factual errors are corrected immediately upon verification, and a correction note is appended to the bottom of the article for transparency."
  }
]

export default function MethodologyPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Methodology', url: `${SITE_URL}/methodology` },
  ]

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Our Methodology',
    description: 'SmartMoneyPath evaluation and research process for financial products and information.',
    url: `${SITE_URL}/methodology`,
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
              Our Methodology
            </h1>
            <p className="text-xl text-secondary-600 leading-relaxed">
              How SmartMoneyPath researches, evaluates, and verifies financial information to help you find the right path for your money.
            </p>
            <div className="mt-8 flex justify-center gap-4 text-sm text-secondary-500">
              <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-primary-600" /> Data-Driven</span>
              <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-primary-600" /> Primary Sources</span>
              <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-primary-600" /> 100% Objective</span>
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
                SmartMoneyPath evaluates financial products by stripping away the marketing and focusing on <strong>objective data</strong>. We verify interest rates directly with institutions, audit fee schedules monthly, and prioritize safety through FDIC/NCUA insurance verification. Our goal is to provide a standardized, transparent comparison that works for every household budget.
              </p>
              <div className="mt-8 pt-8 border-t border-white/10 italic text-secondary-300 text-sm">
                "Our methodology is built on the belief that financial clarity is a right, not a luxury."
              </div>
            </div>
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-bold text-secondary-900 mb-8">Key Takeaways</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Search, title: "Primary Verification", text: "We don't trust press releases. We verify rates and terms directly from official legal documents." },
                  { icon: BarChart3, title: "Weighted Scoring", text: "Products are rated using a consistent, math-driven formula that eliminates human bias." },
                  { icon: Database, title: "Authoritative Data", text: "We source regulatory data from FRED, the SEC, and the Federal Reserve." },
                  { icon: ShieldCheck, title: "Safety First", text: "Every banking product we list is verified for federal deposit insurance coverage." },
                  { icon: RefreshCw, title: "Dynamic Updates", text: "Financial data decays fast. We perform weekly checks on rates and quarterly full audits." },
                  { icon: CheckCircle, title: "Human Review", text: "Every piece of content is edited and fact-checked by a human expert before publication." },
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
          <div className="prose prose-lg max-w-none prose-headings:text-secondary-900 prose-p:text-secondary-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-secondary-900 prose-li:text-secondary-700 prose-table:border prose-table:rounded-xl overflow-hidden">

            <h2 id="philosophy">1. Our Research Philosophy</h2>
            <p>
              At SmartMoneyPath, we approach personal finance with the rigor of a research institution and the empathy of a neighbor. Our philosophy is rooted in <strong>objectivity</strong>. We understand that behind every data point—an interest rate, a fee, or a tax limit—is a real person making a decision that impacts their future.
            </p>
            <p>
              We adhere to a "math-first" methodology. This means that before we write a single word of advice, we build a model. Whether we are comparing the long-term cost of a car loan or the compounding effect of a high-yield savings account, we start with the spreadsheets. By focusing on the numbers, we can filter out the marketing "noise" and focus on the "signal"—the actual value for the consumer. We prioritize the needs of the reader above all else, ensuring that our <Link href="/articles">library of content</Link> is accessible to beginners while remaining rigorous enough for experienced financial planners.
            </p>

            <h2 id="evaluation">2. Our Financial Product Evaluation Process</h2>
            <p>
              Every product that appears on our site undergoes a multi-step evaluation process that can take anywhere from 10 to 40 hours of research:
            </p>
            <ol>
              <li><strong>Market Scan:</strong> We identify products through consumer feedback, regulatory filings, and industry monitoring.</li>
              <li><strong>Data Collection:</strong> We extract raw data from the provider's official "Terms and Conditions" and "Truth in Savings" disclosures.</li>
              <li><strong>Verification:</strong> We cross-reference the collected data against third-party databases and, in many cases, reach out to the institution's support team to clarify ambiguous language.</li>
              <li><strong>Scoring:</strong> Data points are fed into our category-specific scoring models.</li>
              <li><strong>Editorial Analysis:</strong> A senior editor reviews the findings to ensure they provide a complete picture, including any "hidden" risks.</li>
            </ol>

            <h2 id="comparison">3. How We Compare Financial Products</h2>
            <p>
              Comparison is the core of financial decision-making. To make comparisons fair, we use a <strong>Standardized User Persona</strong> for each category. For example, when comparing credit cards, we evaluate the rewards and fees for an "Average Spender" ($1,500/month) to ensure that a card with a high annual fee but great rewards isn't unfairly ranked against a no-fee card for a user who wouldn't spend enough to break even.
            </p>
            <p>
              Our comparison tables use the same units of measurement across the board. We normalize APYs to an annual figure and convert complex reward structures (points, miles, cash back) into a "cents per dollar" metric based on current market valuations.
            </p>

            <h2 id="sources">4. Data Sources We Trust</h2>
            <p>
              We do not rely on "top 10" lists from other websites or unsourced "expert" claims. Our data comes from high-authority, primary sources:
            </p>
            <ul>
              <li><strong>The Federal Reserve:</strong> We use the FRED (Federal Reserve Economic Data) database for historic interest rate trends and inflation data.</li>
              <li><strong>The Consumer Financial Protection Bureau (CFPB):</strong> We monitor the CFPB's consumer complaint database to identify patterns of poor service or deceptive practices at the institutions we review.</li>
              <li><strong>The Securities and Exchange Commission (SEC):</strong> We review 10-K and 10-Q filings for public financial companies to understand their stability and business model.</li>
              <li><strong>IRS.gov:</strong> For any content involving taxes, 401(k)s, or IRAs, the Internal Revenue Service is our final word.</li>
              <li><strong>Direct Institutional Documentation:</strong> The final data source is always the institution's own legally-binding fee schedules and account agreements.</li>
            </ul>

            <h2 id="verification">5. How Interest Rates and APYs Are Verified</h2>
            <p>
              In a high-rate environment, a 5.00% APY can drop to 4.50% overnight. To maintain accuracy, we employ a "Dual-Check" system:
            </p>
            <ol>
              <li><strong>Automated Monitoring:</strong> We use software to monitor the public-facing interest rate pages of over 100 banks and credit unions.</li>
              <li><strong>Manual Verification:</strong> Every Monday, a member of our research team manually verifies the rates on our "Best Of" pages to catch any discrepancies that automation might miss (such as rates that are only available in specific zip codes).</li>
            </ol>

            <h2 id="credit-cards">6. Credit Card Review Methodology</h2>
            <p>
              Our credit card reviews are weighted heavily toward <strong>Net Value</strong>. We calculate the value of rewards earned over one year, subtract the annual fee, and factor in the "interest cost" for users who carry a balance (though we always recommend paying in full).
            </p>
            <p>
              We specifically look for "junk fees" such as foreign transaction fees, late fees, and returned payment fees. Cards that prioritize consumer protection (e.g., zero-liability protection, extended warranties) receive higher scores in our "Safety" category.
            </p>

            <h2 id="banking">7. Banking Product Methodology</h2>
            <p>
              For savings and checking accounts, our primary focus is <strong>Yield and Liquidity</strong>. A high APY is useless if you can't access your money when you need it. We evaluate:
            </p>
            <ul>
              <li><strong>Transfer Limits:</strong> Does the bank limit outgoing transfers more than the industry standard?</li>
              <li><strong>Mobile Experience:</strong> How easy is it to deposit a check or move money between accounts?</li>
              <li><strong>Customer Support:</strong> We test chat and phone response times during peak and off-peak hours.</li>
              <li><strong>Insurance:</strong> We verify the FDIC certificate number or NCUA charter for every institution.</li>
            </ul>

            <h2 id="investment">8. Investment Content Methodology</h2>
            <p>
              Investing involves risk, and our methodology reflects that responsibility. When reviewing brokerages or investment products:
            </p>
            <ul>
              <li><strong>Expense Ratios:</strong> We prioritize low-cost, broad-market index funds and the brokerages that offer them for free.</li>
              <li><strong>Hidden Costs:</strong> We look for inactivity fees, ACAT transfer-out fees, and markups on currency exchange.</li>
              <li><strong>SIPC Protection:</strong> We verify that the brokerage is a member of the Securities Investor Protection Corporation.</li>
            </ul>
            <p>
              We explicitly avoid "hype" investments. You will not find reviews of speculative assets or high-risk trading strategies that lack long-term data.
            </p>

            <h2 id="mortgages">9. Mortgage & Loan Review Standards</h2>
            <p>
              Loans are a multi-decade commitment. Our methodology for reviewing mortgages and personal loans focuses on <strong>Transparency</strong>. We rank lenders higher if they provide a full "Sample Loan Estimate" without requiring a hard credit pull. We also evaluate the lender's history of selling servicing rights, as this can impact the long-term customer experience.
            </p>

            <h2 id="risk">10. Risk Assessment Process</h2>
            <p>
              Every guide on SmartMoneyPath includes a "Risks and Caveats" section. We believe that showing you the upside of a financial decision without the potential downside is a failure of our methodology. Our risk assessment considers market risk, liquidity risk, and regulatory risk (e.g., how a change in tax law could impact your 401(k) strategy).
            </p>

            <h2 id="workflow">11. Editorial Review Workflow</h2>
            <p>
              Our content goes through a strict four-eye principle:
            </p>
            <ul>
              <li><strong>Drafting:</strong> Writer creates content based on the approved research model.</li>
              <li><strong>Editorial Review:</strong> Editor checks for tone, clarity, and adherence to our <Link href="/editorial-policy">Editorial Policy</Link>.</li>
              <li><strong>Fact-Check Pass:</strong> A researcher (not the original writer) verifies every specific fact.</li>
              <li><strong>Compliance Pass:</strong> A final check to ensure all legal disclaimers and affiliate disclosures are prominent and accurate.</li>
            </ul>

            <h2 id="fact-checking">12. Fact-Checking Standards</h2>
            <p>
              We maintain a "Zero-Guess" policy. If a fact cannot be verified through a primary source, it is removed from the content. We verify the "as of" date for every rate and limit mentioned. For complex topics like student loan forgiveness, we cross-reference information across <Link href="https://studentaid.gov">StudentAid.gov</Link> and current Department of Education press releases.
            </p>

            <h2 id="frequency">13. Update Frequency</h2>
            <p>
              Financial content has a "shelf life." We use a tiered update system:
            </p>
            <ul>
              <li><strong>Tier 1 (High Volatility):</strong> Best Savings Rates, CD Rates, Mortgage Rates — Updated weekly.</li>
              <li><strong>Tier 2 (Medium Volatility):</strong> Tax Limits, Credit Card Offers, Brokerage Promos — Updated monthly.</li>
              <li><strong>Tier 3 (Low Volatility):</strong> Fundamental Guides (e.g., "What is a Will?") — Updated annually.</li>
            </ul>

            <h2 id="ai-usage">14. AI Usage & Human Review Process</h2>
            <p>
              We use AI as a tool, not a creator. AI assists our researchers in organizing large datasets and generating initial outlines for complex topics. However, <strong>no AI-generated content is published without being rewritten and verified by a human expert.</strong> We believe that financial education requires human judgment and an understanding of the current socio-economic climate that AI lacks.
            </p>

            <h2 id="feedback">15. Reader Feedback & Corrections</h2>
            <p>
              Our readers are our most important partners. If you find a discrepancy or have a question about our methodology, we want to hear from you. We investigate every error report within 24 business hours. You can reach our research team at <Link href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Link> or through our <Link href="/contact">Contact Page</Link>.
            </p>

            <h2 id="improvement">16. Continuous Improvement</h2>
            <p>
              Our methodology is not static. As the financial industry evolves—with the rise of DeFi, new banking regulations, and changing consumer habits—we update our processes. We conduct an internal "Methodology Audit" every six months to ensure our scoring models and research standards remain the most accurate in the industry.
            </p>

            <hr className="my-16" />

            <h2 id="faq">Methodology FAQ</h2>
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
                  <h3 className="text-xl font-bold text-secondary-900 mb-2 mt-0">{faq.question}</h3>
                  <p className="text-secondary-700 mb-0">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 space-y-6 text-sm text-secondary-500 border-t border-secondary-100 pt-8">
              <p className="font-semibold uppercase tracking-wider text-secondary-400">Our Professional Standards:</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <Link href="/about" className="hover:text-primary-600 underline underline-offset-4">About SmartMoneyPath</Link>
                <Link href="/editorial-policy" className="hover:text-primary-600 underline underline-offset-4">Editorial Policy</Link>
                <Link href="/privacy-policy" className="hover:text-primary-600 underline underline-offset-4">Privacy Policy</Link>
                <Link href="/terms-of-service" className="hover:text-primary-600 underline underline-offset-4">Terms of Service</Link>
                <Link href="/disclaimer" className="hover:text-primary-600 underline underline-offset-4">Disclaimer</Link>
              </div>
              <p className="italic">
                The SmartMoneyPath methodology is designed to be transparent and replicable. We encourage readers to verify our data through the primary sources provided in our guides.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
