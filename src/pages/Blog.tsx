/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Clock, ChevronRight, ChevronLeft, Sparkles, 
  BookOpen, Calendar, ArrowRight, User 
} from 'lucide-react';
import { blogs, Blog } from '../data/hospitalData';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const categories = ['All', 'Health & Wellness', 'Technology', 'Healthcare', 'Care', 'Prevention'];

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(b => b.category === selectedCategory);

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-800 font-sans pb-16" id="blogs-page-root">
      
      {/* Hero Banner */}
      <section className="bg-[#0B1F3A] text-white py-16 relative overflow-hidden" id="blog-hero">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col gap-3">
          <span className="text-green-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 justify-center">
            <Sparkles className="w-4 h-4 text-yellow-400" /> Publications & Clinical Insights
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">The Medicant Healthcare Bulletin</h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Stay informed with the latest medical research publications, surgical innovation updates, and preventive healthy living tips from our specialists.
          </p>
        </div>
      </section>

      {/* Main Blog Panel */}
      {selectedBlog ? (
        /* Blog Detail View */
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 animate-in fade-in duration-200" id="blog-detail-view">
          <button
            onClick={() => setSelectedBlog(null)}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#006B3F] font-bold mb-6 cursor-pointer"
            id="back-to-blogs-btn"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Healthcare Bulletin
          </button>

          <div className="aspect-[16/9] rounded-3xl bg-slate-100 overflow-hidden shadow-md mb-6" id="blog-detail-img">
            <img 
              src={selectedBlog.image} 
              alt={selectedBlog.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-400 font-bold mb-3" id="blog-detail-meta">
            <span className="bg-green-50 text-[#006B3F] px-3 py-1 rounded border border-green-100 uppercase tracking-widest">{selectedBlog.category}</span>
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedBlog.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedBlog.readTime}</span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-[#0B1F3A] leading-tight mb-5 font-sans tracking-tight">
            {selectedBlog.title}
          </h1>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4 font-sans" id="blog-detail-content">
            <p className="font-semibold text-[#0B1F3A] border-l-4 border-[#006B3F] pl-4 italic">
              {selectedBlog.summary}
            </p>
            <p className="whitespace-pre-line">{selectedBlog.content}</p>
            <p>
              Undergoing regular health screenings is essential in mitigating clinical challenges. Our specialist clinicians customize diagnostics according to individual profiles. Connect with our helpdesks today to prioritize your wellness journey.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6 mt-8 flex items-center gap-3 text-xs text-slate-400" id="blog-detail-author">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-[#006B3F]" />
            </div>
            <div>
              <p className="font-bold text-slate-700">Medicant Clinical Editorial Team</p>
              <p className="text-[10px]">Hospital Advisory Board Panelist</p>
            </div>
          </div>
        </article>
      ) : (
        /* Blogs Directory List View */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10" id="blogs-list-view">
          
          {/* Category Filters bar */}
          <div className="flex flex-wrap gap-2 justify-center border-b border-slate-100 pb-6 mb-10" id="blog-categories-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  selectedCategory === cat 
                    ? 'bg-[#006B3F] text-white shadow-sm' 
                    : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
                }`}
                id={`blog-filter-${cat.replace(' ', '')}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blogs Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="blogs-grid">
              {filteredBlogs.map((blog) => (
                <div 
                  key={blog.id} 
                  className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
                  id={`blog-card-${blog.id}`}
                >
                  <div>
                    <div className="aspect-[16/10] bg-slate-200" id="blog-card-img">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex flex-col gap-3" id="blog-card-info">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold" id="blog-card-meta">
                        <span className="bg-green-50 text-[#006B3F] px-2.5 py-0.5 rounded border border-green-100 uppercase tracking-wider">{blog.category}</span>
                        <span>{blog.date}</span>
                      </div>
                      <h3 className="font-extrabold text-sm text-[#0B1F3A] line-clamp-2 leading-snug">{blog.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2">{blog.summary}</p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between" id="blog-card-actions">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {blog.readTime}
                    </span>
                    <button
                      onClick={() => setSelectedBlog(blog)}
                      className="text-xs font-bold text-[#006B3F] hover:text-[#005431] flex items-center gap-1 cursor-pointer bg-green-50 px-3 py-1.5 rounded-lg border border-green-100/50"
                      id={`read-blog-btn-${blog.id}`}
                    >
                      Read Article <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-100 shadow-sm max-w-sm mx-auto" id="no-blogs-found">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-sm font-medium">No healthcare publications found matching this category.</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-4 bg-[#006B3F] text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          )}

        </section>
      )}

    </div>
  );
}
