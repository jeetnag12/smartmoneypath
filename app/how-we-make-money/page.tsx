import Link from 'next/link'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/site'
import { BreadcrumbSchema, FAQSchema } from '@/components/seo/JsonLdSchemas'
import { DollarSign, ShieldCheck, HeartHandshake, Eye, Briefcase, BarChart, Heart, Scale, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Transparency Disclosure: How We Make Money | SmartMoneyPath',
  description: 'Transparency is our core value. Learn about our revenue model, affiliate partnerships, and how we maintain editorial independence.',
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
}

const transparencyPoints = [
  { icon: HeartHandshake, title: "Free for Readers", text: "You never pay to use our site. Our revenue comes from partners, not our audience." },
  { icon: Eye, title: "Clear Disclosures", text: "We label all advertisements and include affiliate disclosures on every relevant guide." },
  { icon: Briefcase, title: "Editorial Firewall", text: "Our business partnerships never dictate our research, reviews, or rankings." },
  { icon: BarChart, title: "Merit-Based", text: "We recommend products based on objective data, regardless of commission rates." },
]

export default function HowWeMakeMoneyPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Transparency', url: `${SITE_URL}/how-we-make-money` },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-secondary-900 pt-32 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-600/20 text-primary-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-primary-600/30 mb-8">
              <Eye className="h-4 w-4" />
              <span>Full Transparency</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              How We <span className="text-primary-500">Make Money</span>
            </h1>
            <p className="text-xl text-secondary-300 leading-relaxed">
              To keep our library of financial guides and calculators free for everyone, we use a transparent revenue model. Here is exactly how we fund SmartMoneyPath.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-600 rounded-full blur-[160px]"></div>
        </div>
      </section>

      {/* Transparency Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {transparencyPoints.map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-secondary-50 border border-secondary-100 hover:bg-white hover:shadow-2xl hover:shadow-secondary-900/5 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-secondary-100">
                  <item.icon className="h-6 w-6 text-primary-700" />
                </div>
                <h3 className="text-lg font-black text-secondary-900 mb-3 tracking-tight">{item.title}</h3>
                <p className="text-sm text-secondary-600 leading-relaxed font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="py-24 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-secondary-100">
            <div className="prose prose-lg max-w-none prose-headings:text-secondary-900 prose-headings:font-black prose-headings:tracking-tight prose-p:text-secondary-700 prose-p:font-medium prose-p:leading-relaxed prose-a:text-primary-700 prose-a:font-bold hover:prose-a:underline">

              <h2 className="text-3xl mb-8">1. Our Business Model</h2>
              <p>
                SmartMoneyPath makes money through <strong>advertising</strong> (like Google AdSense) and <strong>affiliate partnerships</strong> with some of the financial institutions we review. When you click a link or sign up for a product through our site, we may receive a commission.
              </p>
              <p>
                This revenue allows us to pay our expert staff and keep our content free of charge. Most importantly, it allows us to remain independent—we never charge our readers for access to our best research.
              </p>

              <h2 className="text-3xl mt-16 mb-8">2. Advertising & AdSense</h2>
              <p>
                One of the ways we generate revenue is through display advertising. These are the banners and square ads you see placed within our content. We participate in the Google AdSense program, which serves ads automatically based on algorithms.
              </p>
              <p>
                The presence of an ad does not imply an endorsement of the product or brand by SmartMoneyPath. Our editorial team operates completely independently of our advertising operations.
              </p>

              <h2 className="text-3xl mt-16 mb-8">3. Affiliate Partnerships</h2>
              <p>
                When you click on a "Check Rate," "Apply Now," or similar button on our site, you are likely using an affiliate link. This link contains a small piece of code that tells the provider you came from SmartMoneyPath.
              </p>
              <p>
                <strong>This process is seamless for you.</strong> It does not slow down your browser, and it never increases the fees or interest rates you pay. In many instances, our relationships allow us to offer you a special offer or a higher APY than you would find directly.
              </p>
            </div>

            <div className="mt-20 p-10 bg-secondary-900 rounded-[2rem] text-white relative overflow-hidden group">
               <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                 <div className="w-20 h-20 bg-primary-600 rounded-3xl flex items-center justify-center shrink-0 shadow-xl shadow-primary-600/40">
                   <Heart className="h-10 w-10 text-white" />
                 </div>
                 <div>
                   <h4 className="text-2xl font-black mb-4 tracking-tight leading-tight">Trust is Our Only Asset</h4>
                   <p className="text-secondary-300 text-lg font-medium mb-0">We would rather lose a commission than lose your trust. Our recommendations are always based on merit and what is best for the consumer.</p>
                 </div>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[100px]"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
