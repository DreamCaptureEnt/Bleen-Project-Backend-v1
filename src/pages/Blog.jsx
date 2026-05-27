import React from 'react';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';

const blogPosts = [
  {
    title: 'Why Quality Medicines Matter for Your Health',
    excerpt: 'Using low-quality or unverified products can lead to serious health risks. High-quality medicines ensure effective recovery, reduced side effects, and consistent, reliable results.',
    category: 'Health & Safety',
    readTime: '5 min read',
    color: 'from-teal-500 to-teal-700',
    icon: '💊',
  },
  {
    title: 'Affordable Healthcare for All: Our Mission',
    excerpt: 'One of the biggest challenges in healthcare is affordability. We believe healthcare should not be a privilege — it should be accessible to everyone, regardless of income or location.',
    category: 'Company Mission',
    readTime: '4 min read',
    color: 'from-blue-500 to-navy-600',
    icon: '🏥',
  },
  {
    title: 'Bridging the Urban-Rural Healthcare Gap',
    excerpt: 'Rural areas face limited medical infrastructure and lower health awareness. Galaxy Health Care is actively expanding distribution networks and delivering products to remote areas.',
    category: 'Distribution',
    readTime: '6 min read',
    color: 'from-green-500 to-teal-600',
    icon: '🌍',
  },
  {
    title: 'Daily Health & Hygiene Practices',
    excerpt: 'Good health starts with simple daily habits. Regular handwashing, clean water, oral hygiene, adequate sleep, balanced diet, and regular physical activity prevent many common illnesses.',
    category: 'Wellness',
    readTime: '5 min read',
    color: 'from-orange-500 to-amber-600',
    icon: '🧼',
  },
  {
    title: 'Safe Use of Medicines: Key Guidelines',
    excerpt: 'Medicines should always be used responsibly. Always follow a doctor\'s prescription, avoid self-medication, check expiry dates, and follow recommended dosage instructions.',
    category: 'Health & Safety',
    readTime: '4 min read',
    color: 'from-purple-500 to-indigo-600',
    icon: '📋',
  },
  {
    title: 'Proper Storage of Medicines at Home',
    excerpt: 'Improper storage can reduce the effectiveness of medicines. Store in a cool, dry place, keep away from direct sunlight, and always close containers tightly after use.',
    category: 'Healthcare Tips',
    readTime: '3 min read',
    color: 'from-pink-500 to-rose-600',
    icon: '🏠',
  },
  {
    title: 'Choosing the Right Personal Care Products',
    excerpt: 'Selecting the right personal care products is essential for maintaining skin and body health. Consider suitability for your skin type, safe ingredients, and trusted brands.',
    category: 'Cosmetics',
    readTime: '4 min read',
    color: 'from-teal-400 to-cyan-600',
    icon: '✨',
  },
  {
    title: 'Our Commitment to Society',
    excerpt: 'At Galaxy Health Care, we believe in more than just business — we believe in responsibility. Promoting health awareness, supporting underserved communities, and delivering affordable healthcare.',
    category: 'Company',
    readTime: '5 min read',
    color: 'from-navy-500 to-blue-700',
    icon: '🤝',
  },
];

const highlightPost = {
  title: 'Health & Wellness: Our Vision for a Healthier India',
  excerpt: 'In today\'s fast-moving world, maintaining good health has become more important than ever. Access to safe, effective, and affordable healthcare is not just a necessity — it is a fundamental right. At Galaxy Health Care, we are committed to bridging this gap, ensuring essential medicines reach everyone.',
  category: 'Featured',
  readTime: '8 min read',
  icon: '🌟',
};

export default function Blog() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-bg py-24 px-4 relative overflow-hidden">
        <div className="hero-blob w-96 h-96 bg-white/10 -top-20 -right-20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-full mb-4">
            <BookOpen size={14} className="inline mr-2" />Health & Wellness Blog
          </div>
          <h1 className="text-5xl font-black text-white mb-4">Insights & Awareness</h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Educating, informing, and empowering individuals with the right knowledge about health, hygiene, and safe use of healthcare products.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="gradient-bg rounded-3xl p-8 md:p-12 text-white relative overflow-hidden reveal">
            <div className="absolute top-0 right-0 text-[120px] opacity-10 leading-none">{highlightPost.icon}</div>
            <div className="relative z-10 max-w-2xl">
              <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                {highlightPost.category}
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{highlightPost.title}</h2>
              <p className="text-white/80 leading-relaxed mb-6">{highlightPost.excerpt}</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Clock size={14} /> {highlightPost.readTime}
                </div>
                <button className="bg-white text-teal-600 font-bold px-6 py-2.5 rounded-xl inline-flex items-center gap-2 hover:shadow-lg transition-all text-sm">
                  Read Article <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog grid */}
      <section className="py-12 pb-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal">
            <div className="gradient-text text-sm font-bold uppercase tracking-widest mb-3">Latest Articles</div>
            <h2 className="text-4xl font-black text-gray-900">Health & Wellness Topics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post, i) => (
              <div key={post.title} className={`reveal delay-${(i % 4 + 1) * 100} card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer`}>
                <div className={`bg-gradient-to-br ${post.color} p-8 text-white relative`}>
                  <div className="text-4xl mb-2 opacity-80">{post.icon}</div>
                  <div className="text-xs font-bold uppercase tracking-wider opacity-80 bg-white/20 rounded-full px-3 py-1 inline-block">
                    {post.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 leading-tight group-hover:text-teal-600 transition-colors">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <Clock size={12} /> {post.readTime}
                    </div>
                    <button className="gradient-text text-xs font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health tips section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="gradient-text text-sm font-bold uppercase tracking-widest mb-3">Quick Health Tips</div>
            <h2 className="text-4xl font-black text-gray-900">Essential Daily Practices</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Safe Medicine Usage',
                icon: '💊',
                tips: ['Always follow a doctor\'s prescription', 'Avoid self-medication for strong drugs', 'Check expiry dates before use', 'Follow recommended dosage', 'Keep medicines out of children\'s reach']
              },
              {
                title: 'Proper Medicine Storage',
                icon: '🏠',
                tips: ['Store in a cool, dry place', 'Keep away from direct sunlight', 'Close containers tightly after use', 'Use refrigeration only if recommended', 'Monitor expiry dates regularly']
              },
              {
                title: 'Daily Hygiene',
                icon: '🧼',
                tips: ['Regular handwashing with quality handwash', 'Drink clean and safe water', 'Maintain oral hygiene', 'Get adequate sleep (7-8 hours)', 'Follow a balanced diet']
              },
              {
                title: 'Personal Care',
                icon: '✨',
                tips: ['Choose products suitable for your skin type', 'Look for safe and gentle ingredients', 'Avoid harsh chemicals', 'Use trusted and reliable brands', 'Check for certifications and standards']
              },
            ].map((section, i) => (
              <div key={section.title} className={`reveal delay-${(i % 2 + 1) * 200} bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{section.icon}</div>
                  <h3 className="font-bold text-xl text-gray-900">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.tips.map(tip => (
                    <li key={tip} className="flex items-start gap-2 text-gray-600 text-sm">
                      <div className="w-1.5 h-1.5 gradient-bg rounded-full mt-2 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
