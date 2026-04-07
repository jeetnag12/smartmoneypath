import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeaturedPosts from '@/components/FeaturedPosts'
import Categories from '@/components/Categories'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="py-16 text-center">Loading articles...</div>}>
        <FeaturedPosts />
      </Suspense>
      <Categories />
      <Newsletter />
      <Footer />
    </main>
  )
}
