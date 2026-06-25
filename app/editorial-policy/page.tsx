import Link from 'next/link'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/site'
import { BreadcrumbSchema, FAQSchema } from '@/components/seo/JsonLdSchemas'

export const metadata: Metadata = {
  title: 'Editorial Policy | SmartMoneyPath',
  description: 'Our commitment to editorial integrity, independence, and accurate financial reporting. Learn how we research and fact-check our content.',
  alternates: {
    canonical: `${SITE_URL}/editorial-policy`,
  },
}

const faqs = [
  {
    question: "Who writes the content on SmartMoneyPath?",
    answer: "Our content is written and reviewed by a dedicated editorial team with backgrounds in personal finance, economics, and data analysis. We prioritize expertise and primary source research in every article."
  },
  {
    question: "Do you receive payment to recommend specific financial products?",
    answer: "No. Our editorial team operates independently from our advertising and affiliate partnerships. Ratings and reviews are based on objective criteria, not compensation."
  },
  {
    question: "How often is your financial data updated?",
    answer: "We review and update our core guides and product data at least once per quarter, or whenever significant regulatory changes (such as IRS limit adjustments or Fed rate moves) occur."
  },
  {
    question: "Do you use AI to write your articles?",
    answer: "We use AI as a research and efficiency tool, but all final content is drafted, edited, and fact-checked by human experts to ensure accuracy and nuance that AI currently cannot provide."
  },
  {
    question: "Can I trust the advice on this website?",
    answer: "While we strive for maximum accuracy and use primary official sources, our content is for educational purposes only. It is not individualized financial, legal, or tax advice. We always recommend consulting with a certified professional for your specific situation."
  },
  {
    question: "How do you choose which topics to cover?",
    answer: "We choose topics based on their impact on the average American household's financial health. We prioritize essential topics like emergency funds, debt management, and retirement planning over speculative or niche financial trends."
  }
]

export default function EditorialPolicyPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Editorial Policy', url: `${SITE_URL}/editorial-policy` },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema questions={faqs} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
              Editorial Policy
            </h1>
            <p className="text-lg text-secondary-600">
              Integrity, Independence, and Accuracy in Financial Education.
            </p>
            <p className="mt-2 text-sm text-secondary-500">
              Last updated: June 25, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:text-secondary-900 prose-p:text-secondary-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-secondary-900 prose-li:text-secondary-700">

            <h2 id="mission">1. Our Editorial Mission</h2>
            <p>
              SmartMoneyPath was founded with a singular purpose: to provide clear, actionable, and meticulously researched financial education for the modern American household. In an era where "financial advice" is often delivered in 30-second soundbites or through biased marketing channels, we aim to be a beacon of clarity and depth. Our mission is to empower readers to make informed decisions about their money by breaking down complex concepts into understandable, data-driven guides.
            </p>
            <p>
              We believe that financial literacy is a fundamental right that facilitates social mobility and economic stability. To support this, we provide our entire library of content free of charge, supported by transparent revenue models that never compromise our editorial standards. Every guide we publish is built on a foundation of primary sources, transparent calculations, and a clear statement of limitations. We don't just tell you what to do; we show you the math and the "why" behind every recommendation.
            </p>
            <p>
              Our goal is to help you navigate the entire "money path"—from saving your first $1,000 in an emergency fund to optimizing a multi-decade retirement strategy. We prioritize the needs of the reader above all else, ensuring that our content is accessible to beginners while remaining rigorous enough for experienced financial planners.
            </p>

            <h2 id="independence">2. Editorial Independence</h2>
            <p>
              Editorial independence is the cornerstone of our trust with you. Our editorial team has full autonomy over the topics we cover, the products we review, and the conclusions we draw. We maintain a strict and impenetrable "firewall" between our editorial staff and our business development, sales, or advertising teams.
            </p>
            <p>
              Business partners, advertisers, and affiliate networks have zero influence over our content. They do not see articles before they are published, nor can they dictate the tone, direction, or "verdict" of our reporting. We do not accept "pay-to-play" arrangements where a company can pay for a positive review or a higher ranking in our comparison tables.
            </p>
            <p>
              Our writers and editors are not compensated based on the performance of specific financial products or the volume of clicks generated by affiliate links. Their primary performance metric is the accuracy, clarity, and helpfulness of the content as measured by internal quality audits and reader feedback.
            </p>

            <h2 id="research">3. Research & Fact-Checking Process</h2>
            <p>
              Financial information is only useful if it is accurate and current. A single misplaced decimal point or an outdated tax limit can lead to significant real-world consequences. Our multi-stage research process ensures that every claim we make is supported by verifiable evidence:
            </p>
            <ul>
              <li><strong>Initial Research Phase:</strong> Writers begin by consulting the most recent federal regulations, white papers from reputable economic institutions, and raw data from primary financial providers. We look at the "fine print" so you don't have to.</li>
              <li><strong>The Math-First Approach:</strong> If an article includes a calculation (such as a debt snowball vs. avalanche comparison), the math is performed independently by the writer and then verified by an editor using different software or manual verification to ensure no errors exist in the logic or the output.</li>
              <li><strong>Peer Review:</strong> Every article undergoes a rigorous review by at least one other member of the editorial team. This review focuses on logical flow, accessibility of language, and the exclusion of any personal bias.</li>
              <li><strong>Technical Fact-Checking:</strong> A dedicated fact-check pass is performed immediately prior to publication. This pass verifies every date, percentage, dollar limit, and regulatory reference against current official government sources (e.g., verifying that the 401(k) contribution limit cited is for the correct tax year).</li>
            </ul>

            <h2 id="sources">4. Source Standards</h2>
            <p>
              We prioritize primary sources above all else. When you read a guide on SmartMoneyPath, you are seeing information derived directly from the source of authority. We do not rely on "hearsay" or secondary reporting. Our preferred sources include:
            </p>
            <ul>
              <li><strong>Federal and State Agencies:</strong> The Internal Revenue Service (IRS), Securities and Exchange Commission (SEC), Consumer Financial Protection Bureau (CFPB), Federal Deposit Insurance Corporation (FDIC), and National Credit Union Administration (NCUA).</li>
              <li><strong>Official Legislative Documentation:</strong> We cite specific sections of the U.S. Code, Congressional Budget Office (CBO) reports, and the full text of enacted financial legislation.</li>
              <li><strong>Academic and Economic Research:</strong> Peer-reviewed journals, economic data from the Federal Reserve (specifically the St. Louis Fed's FRED database), and research from major universities.</li>
              <li><strong>Direct Institutional Data:</strong> Official bank fee schedules, insurance policy templates, and stock exchange listing requirements.</li>
            </ul>
            <p>
              We explicitly avoid citing secondary news reports, "opinion" pieces from other blogs, or expert quotes that do not provide raw data to support their claims. If we cannot find a primary source to verify a claim, we will either omit the claim or clearly label it as an industry "rule of thumb" rather than a factual certainty.
            </p>

            <h2 id="review">5. Financial Content Review Process</h2>
            <p>
              The financial world is in a constant state of flux. To combat "content decay," our review process is iterative and ongoing. We categorize all content into two streams:
            </p>
            <p>
              <strong>Core Education:</strong> These are articles on fundamental concepts (e.g., "What is an index fund?") that change slowly. These are audited annually to ensure the language and examples remain modern and effective.
            </p>
            <p>
              <strong>Market Active:</strong> these are articles that contain interest rates, tax limits, or specific product terms. These guides are audited quarterly at a minimum. However, we also employ "Trigger-Based Updates"—if the Federal Reserve moves interest rates or the IRS announces new inflation adjustments, we aim to update all relevant "Market Active" guides within 48 business hours of the official announcement.
            </p>

            <h2 id="methodology">6. Product Reviews & Rating Methodology</h2>
            <p>
              When we review financial products—such as high-yield savings accounts, credit cards, or brokerage platforms—we use a standardized, data-driven scoring system. Our ratings are never based on brand recognition or marketing budgets; they are based on the actual value delivered to the consumer. Our primary pillars of evaluation include:
            </p>
            <ul>
              <li><strong>Total Cost:</strong> We analyze the "all-in" cost, including monthly maintenance fees, transaction fees, interest rates, and any hidden "junk" fees.</li>
              <li><strong>Ease of Access:</strong> We evaluate the user experience across mobile and desktop platforms, the quality of customer support (response times and helpfulness), and the speed of fund transfers.</li>
              <li><strong>Security and Insurance:</strong> We verify FDIC or NCUA insurance status for every banking product and SIPC coverage for brokerage products. We also look at the institution's history of security and transparency.</li>
              <li><strong>Consumer Benefit:</strong> We assess the "extras"—rewards programs, educational tools, and features that help the user stay on their "money path."</li>
            </ul>
            <p>
              Each category (e.g., "Best Savings Accounts") has its own unique sub-methodology which is linked at the bottom of the relevant review page.
            </p>

            <h2 id="affiliate">7. Affiliate Disclosure</h2>
            <p>
              Transparency is essential for maintaining reader trust. To keep our educational resources free for everyone, SmartMoneyPath participates in various affiliate marketing programs. This means that if you click on a link to a financial product and subsequently sign up for that product, we may receive a commission from the provider.
            </p>
            <p>
              <strong>Crucially, this does not cost you anything extra.</strong> In many cases, our partnerships allow us to highlight special offers or improved rates for our readers.
            </p>
            <p>
              Most importantly: our editorial integrity is not for sale. We review and rank products based on their objective merit. If a product is the "best in class" for our readers but does not offer an affiliate program, we will still feature it prominently and recommend it. We would rather lose a commission than lose your trust. You can find our full <Link href="/disclaimer">Disclaimer</Link> for additional details on our revenue models.
            </p>

            <h2 id="advertising">8. Advertising Independence</h2>
            <p>
              In addition to affiliate links, we may display traditional display advertisements (e.g., Google AdSense) on our site. These are always clearly demarcated from our editorial content with labels such as "Sponsored" or "Advertisement."
            </p>
            <p>
              We do not have direct control over the specific ads shown to individual users (as these are often determined by the ad network's algorithms), and the appearance of an advertisement on a page does not constitute an endorsement of that specific product or service by SmartMoneyPath. We use technical filters to block ads from predatory lenders or known financial scams to the best of our ability.
            </p>

            <h2 id="corrections">9. Corrections Policy</h2>
            <p>
              Accuracy is our obsession, but even the most diligent human editors can occasionally make an error. When we discover a factual mistake, we follow a standardized correction process:
            </p>
            <ul>
              <li><strong>Immediate Fix:</strong> The error is corrected in the article text as soon as it is verified.</li>
              <li><strong>Correction Notice:</strong> For significant factual errors (e.g., an incorrect interest rate or a misstated legal limit), we add a "Correction Note" at the bottom of the article. This note specifies the original error, the date of the correction, and the correct information.</li>
              <li><strong>Grammatical Fixes:</strong> Minor typos, spelling errors, or formatting updates that do not alter the factual meaning of the content are corrected without a public note.</li>
            </ul>
            <p>
              If you believe you have found an error in our content, please help us improve by reporting it via our <Link href="/contact">Contact Page</Link>. We investigate every report.
            </p>

            <h2 id="updates">10. Content Update Policy</h2>
            <p>
              The financial landscape is not static. An article written in 2024 may be dangerous if read in 2026 without updates. We regularly review our archive to ensure longevity. When an article is significantly revised to reflect new laws or market conditions, we update the "Last Updated" date at the top of the article.
            </p>
            <p>
              If an article becomes fundamentally obsolete (e.g., a specific government program is discontinued), we will either archive the content with a prominent warning or redirect the URL to a modern, relevant guide to ensure readers always have the best information available.
            </p>

            <h2 id="ai">11. AI Usage Disclosure</h2>
            <p>
              At SmartMoneyPath, we believe in using modern tools to provide better content. We use Artificial Intelligence (AI) to assist our human editorial team with research, data organization, and content outlining. AI helps us analyze thousands of data points on banking fees or interest rates more efficiently than a human could alone.
            </p>
            <p>
              <strong>Crucially, we do not publish raw, unedited AI output.</strong> Every sentence published on this site has been written or heavily refined by a human editor. We believe that financial guidance requires a level of ethical judgment, empathy, and awareness of current world events that AI currently cannot achieve. Our "Human-in-the-loop" policy ensures that while technology assists our process, a human expert is always the one responsible for the advice you read.
            </p>

            <h2 id="authors">12. Author Qualifications</h2>
            <p>
              Our contributors are selected for their subject-matter expertise and their ability to communicate complex topics with clarity. While some of our content is attributed to the "SmartMoneyPath Editorial Team" (indicating a collaborative effort between multiple researchers and editors), every individual involved has a background in financial journalism, economics, corporate finance, or professional accounting.
            </p>
            <p>
              Please note: Our writers are educators, not your personal financial advisors. We provide general information designed to help you understand your options. We do not have knowledge of your specific financial situation and cannot provide individualized advice. We strongly recommend consulting with a Certified Financial Planner (CFP), CPA, or tax attorney for specific personal decisions.
            </p>

            <h2 id="feedback">13. Reader Feedback Process</h2>
            <p>
              Our readers are our most valuable fact-checkers. We welcome your feedback, whether it's a question about a calculation, a suggestion for a new topic, or a critique of our methodology.
            </p>
            <p>
              Our editorial team reviews every piece of feedback sent through our site. While the volume of inquiries prevents us from providing a personal response to every message, your input directly influences our editorial calendar and our quality control processes. If multiple readers ask for clarification on a specific topic, we will often create a new, dedicated guide to address that need.
            </p>

            <h2 id="contact">14. Contact the Editorial Team</h2>
            <p>
              If you have questions about our editorial policy, wish to suggest a content partnership, or need to report a technical issue with our site, please reach out via the following channels:
            </p>
            <ul>
              <li><strong>General Inquiries:</strong> {CONTACT_EMAIL}</li>
              <li><strong>Corrections:</strong> Please include "Correction Request" in your subject line for faster routing.</li>
              <li><strong>About Us:</strong> Learn more about our history and values on our <Link href="/about">About Page</Link>.</li>
            </ul>

            <hr className="my-12 border-secondary-200" />

            <h2 id="faq">Editorial Policy FAQ</h2>
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
                  <h3 className="text-xl font-bold text-secondary-900 mb-2 mt-0">{faq.question}</h3>
                  <p className="text-secondary-700 mb-0">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 space-y-6 text-sm text-secondary-500 border-t border-secondary-100 pt-8">
              <p className="font-semibold uppercase tracking-wider text-secondary-400">Related Legal Documentation:</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <Link href="/about" className="hover:text-primary-600 underline underline-offset-4">About SmartMoneyPath</Link>
                <Link href="/privacy-policy" className="hover:text-primary-600 underline underline-offset-4">Privacy Policy</Link>
                <Link href="/terms-of-service" className="hover:text-primary-600 underline underline-offset-4">Terms of Service</Link>
                <Link href="/disclaimer" className="hover:text-primary-600 underline underline-offset-4">Disclaimer</Link>
                <Link href="/contact" className="hover:text-primary-600 underline underline-offset-4">Contact Editorial Team</Link>
              </div>
              <p className="italic">
                Disclaimer: The information provided on SmartMoneyPath is for educational purposes only. We do not provide individualized financial, legal, or tax advice. Past performance of any financial product is not a guarantee of future results.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
