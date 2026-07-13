import { Metadata } from 'next'
import { Mail, MessageSquare, ShieldCheck, MapPin, Zap } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/site'
import { BreadcrumbSchema } from '@/components/seo/JsonLdSchemas'

export const metadata: Metadata = {
  title: 'Contact Us | SmartMoneyPath Editorial Team',
  description: 'Have a question about our methodology or a content correction? Reach out to the SmartMoneyPath editorial team.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact SmartMoneyPath | Help and Feedback',
    description: 'We value your input. Contact us for corrections, questions, or business inquiries.',
    url: `${SITE_URL}/contact`,
    siteName: 'SmartMoneyPath',
    type: 'website',
  },
}

export default function ContactPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Contact', url: `${SITE_URL}/contact` },
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
              <Zap className="h-4 w-4" />
              <span>Connect with us</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              Get in <span className="text-primary-500">Touch</span>
            </h1>
            <p className="text-xl text-secondary-300 leading-relaxed">
              Have a question about our research, a correction for an article, or a business inquiry? Our team is here to help.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-600 rounded-full blur-[160px]"></div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-10">
              <div>
                <h2 className="text-3xl font-black text-secondary-900 mb-8 tracking-tight">Contact Information</h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center border border-primary-100 shadow-sm">
                      <Mail className="h-6 w-6 text-primary-700" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-secondary-400 uppercase tracking-[0.2em] mb-2">Email Our Team</p>
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-xl text-secondary-900 font-black hover:text-primary-700 transition-colors">
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-secondary-50 rounded-2xl flex items-center justify-center border border-secondary-100 shadow-sm">
                      <MessageSquare className="h-6 w-6 text-secondary-700" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-secondary-400 uppercase tracking-[0.2em] mb-2">Community</p>
                      <p className="text-lg text-secondary-900 font-bold leading-tight">Follow us on LinkedIn for latest research.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl group">
                <div className="relative z-10">
                   <ShieldCheck className="h-10 w-10 text-primary-400 mb-6" />
                   <h3 className="text-2xl font-black mb-4 tracking-tight leading-tight">
                     Privacy First
                   </h3>
                   <p className="text-primary-100 text-sm leading-relaxed mb-0 font-medium">
                     Your communication is encrypted and private. We never share or sell your contact data to third-party marketing firms.
                   </p>
                </div>
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary-700 rounded-full blur-3xl opacity-30 group-hover:scale-150 transition-transform duration-700"></div>
              </div>

              <div className="p-8 bg-secondary-50 rounded-[2rem] border border-secondary-100">
                <h3 className="text-xs font-black text-secondary-900 uppercase tracking-[0.2em] mb-4">Response Time</h3>
                <p className="text-secondary-600 text-sm font-medium leading-relaxed mb-0">
                  We investigate all editorial corrections and data discrepancies within 24-48 business hours. Thank you for helping us maintain accuracy.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
