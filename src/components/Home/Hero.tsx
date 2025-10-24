import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Users, TrendingUp } from 'lucide-react'

export default function Hero() {
  return (
    <section className='relative min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 overflow-hidden flex flex-col items-center justify-center'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse' style={{ animationDelay: '2s' }}></div>
        <div className='absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse' style={{ animationDelay: '4s' }}></div>
      </div>

      <div className='relative z-10 w-full'>
        {/* Main content container */}
        <div className='container mx-auto px-4 flex flex-col items-center justify-center'>
          {/* Header section */}
          <div className='space-y-6 text-center max-w-3xl'>
            <div className='flex justify-center'>
              <span className='px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-300 text-sm font-medium'>
                ✨ Welcome to our blog
              </span>
            </div>

            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight'>
              Discover Stories,
              <br />
              <span className='bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent'>
                Share Knowledge
              </span>
            </h1>

            <p className='text-lg md:text-xl text-slate-300 leading-relaxed'>
              Explore insights, ideas, and stories from our community. Stay updated with the latest trends and expert perspectives.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 mt-8 justify-center'>
            <Button size='lg' className='bg-purple-600 hover:bg-purple-700 text-white font-semibold gap-2'>
              Start Reading
              <ArrowRight className='h-4 w-4' />
            </Button>
            <Button size='lg' variant='outline' className='border-2 border-purple-500 text-purple-300 hover:bg-purple-500/10'>
              Browse Categories
            </Button>
          </div>

          {/* Stats section */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-24 p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 w-full max-w-2xl'>
            <div className='flex flex-col items-center space-y-2 text-center'>
              <div className='p-3 rounded-lg bg-purple-500/20'>
                <BookOpen className='h-6 w-6 text-purple-400' />
              </div>
              <div>
                <p className='text-2xl md:text-3xl font-bold text-white'>500+</p>
                <p className='text-sm md:text-base text-slate-400'>Blog Posts</p>
              </div>
            </div>

            <div className='flex flex-col items-center space-y-2 text-center'>
              <div className='p-3 rounded-lg bg-blue-500/20'>
                <Users className='h-6 w-6 text-blue-400' />
              </div>
              <div>
                <p className='text-2xl md:text-3xl font-bold text-white'>50k+</p>
                <p className='text-sm md:text-base text-slate-400'>Readers</p>
              </div>
            </div>

            <div className='flex flex-col items-center space-y-2 text-center'>
              <div className='p-3 rounded-lg bg-pink-500/20'>
                <TrendingUp className='h-6 w-6 text-pink-400' />
              </div>
              <div>
                <p className='text-2xl md:text-3xl font-bold text-white'>100+</p>
                <p className='text-sm md:text-base text-slate-400'>Topics</p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  )
}