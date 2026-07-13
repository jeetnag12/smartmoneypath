import Link from 'next/link'
import { Clock, ArrowRight, Calendar, RefreshCw, ShieldCheck } from 'lucide-react'

interface Post {
  id: number
  title: string
  excerpt: string
  category: string
  readTime: string
  publishedAt: string
  updatedAt: string
  imageUrl: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  imageAlt?: string
}

interface ArticleCardProps {
  post: Post
  variant?: 'default' | 'horizontal' | 'compact'
}

export default function ArticleCard({ post, variant = 'default' }: ArticleCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Investing': 'bg-indigo-50 text-indigo-700 border-indigo-100',
      'Budgeting': 'bg-blue-50 text-blue-700 border-blue-100',
      'Career': 'bg-purple-50 text-purple-700 border-purple-100',
      'Saving': 'bg-green-50 text-green-700 border-green-100',
      'Credit Cards': 'bg-cyan-50 text-cyan-700 border-cyan-100',
      'Banking': 'bg-sky-50 text-sky-700 border-sky-100',
      'Mortgages': 'bg-amber-50 text-amber-700 border-amber-100',
      'Insurance': 'bg-emerald-50 text-emerald-700 border-emerald-100',
      'Personal Finance': 'bg-teal-50 text-teal-700 border-teal-100',
      'Small Business': 'bg-rose-50 text-rose-700 border-rose-100',
      'Retirement': 'bg-violet-50 text-violet-700 border-violet-100',
      'Debt': 'bg-orange-50 text-orange-700 border-orange-100',
      'Education': 'bg-pink-50 text-pink-700 border-pink-100',
      'Auto': 'bg-red-50 text-red-700 border-red-100',
      'Loans': 'bg-amber-50 text-amber-700 border-amber-100',
      'Taxes': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    }
    return colors[category] || 'bg-secondary-50 text-secondary-700 border-secondary-100'
  }

  const publishDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const updateDate = new Date(post.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const hasBeenUpdated = post.updatedAt !== post.publishedAt

  if (variant === 'compact') {
    return (
      <Link href={`/articles/${post.id}`} className="group flex gap-4 items-center">
        <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border border-secondary-100 shadow-sm text-[0]">
          <img
            src={post.imageUrl}
            alt={post.imageAlt || post.title}
            width={80}
            height={80}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-[10px] font-black uppercase tracking-wider mb-1 ${getCategoryColor(post.category).split(' ')[1]}`}>
            {post.category}
          </p>
          <h4 className="text-sm font-bold text-secondary-900 line-clamp-2 group-hover:text-primary-700 transition-colors leading-snug">
            {post.title}
          </h4>
        </div>
      </Link>
    )
  }

  if (variant === 'horizontal') {
    return (
      <Link href={`/articles/${post.id}`} className="group block bg-white rounded-[2rem] border border-secondary-100 hover:shadow-2xl hover:shadow-secondary-900/5 transition-all duration-500 overflow-hidden">
        <div className="flex flex-col sm:flex-row h-full">
          <div className="sm:w-2/5 aspect-[16/10] sm:aspect-auto relative overflow-hidden text-[0]">
            <img
              src={post.imageUrl}
              alt={post.imageAlt || post.title}
              width={600}
              height={400}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="sm:w-3/5 p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getCategoryColor(post.category)}`}>
                {post.category}
              </span>
              <span className="text-secondary-400 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-secondary-900 mb-4 group-hover:text-primary-700 transition-colors line-clamp-2 leading-tight">
              {post.title}
            </h3>
            <p className="text-secondary-500 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-secondary-50">
              <div className="flex items-center gap-3">
                <img src={post.author.avatar} alt={post.author.name} width={28} height={28} className="w-7 h-7 rounded-full object-cover border border-secondary-100" />
                <span className="text-[11px] font-black text-secondary-700 uppercase tracking-widest">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-secondary-400 uppercase tracking-widest">
                {hasBeenUpdated ? (
                  <span className="flex items-center gap-1"><RefreshCw className="h-3 w-3" /> Updated {updateDate}</span>
                ) : (
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {publishDate}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/articles/${post.id}`} className="group flex flex-col bg-white rounded-[2.5rem] border border-secondary-100 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full">
      <div className="aspect-[16/10] relative overflow-hidden text-[0]">
        <img
          src={post.imageUrl}
          alt={post.imageAlt || post.title}
          width={800}
          height={500}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-6 left-6">
          <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg ${getCategoryColor(post.category)}`}>
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-10 flex-1 flex flex-col">
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.15em] text-secondary-400 mb-6">
          <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{publishDate}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500/30"></span>
          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
        </div>

        <h3 className="text-2xl font-black text-secondary-900 mb-4 group-hover:text-primary-700 transition-colors line-clamp-2 leading-tight tracking-tight">
          {post.title}
        </h3>

        <p className="text-secondary-500 text-base mb-10 line-clamp-3 leading-relaxed flex-1 font-medium opacity-80">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-8 border-t border-secondary-50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={post.author.avatar} alt={post.author.name} width={40} height={40} className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-md" />
              <div className="absolute -bottom-1 -right-1 bg-primary-600 border-2 border-white w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                <ShieldCheck className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <p className="text-xs font-black text-secondary-900 leading-none mb-1 tracking-tight">{post.author.name}</p>
              <p className="text-[10px] text-secondary-400 font-bold uppercase tracking-widest">Verified Expert</p>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-secondary-50 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white group-hover:rotate-45 transition-all duration-500 shadow-sm">
            <ArrowRight className="h-6 w-6" />
          </div>
        </div>

        {hasBeenUpdated && (
          <div className="mt-4 flex items-center gap-1.5 text-[9px] font-black text-secondary-300 uppercase tracking-[0.2em]">
            <RefreshCw className="h-2.5 w-2.5" />
            Last Updated: {updateDate}
          </div>
        )}
      </div>
    </Link>
  )
}
