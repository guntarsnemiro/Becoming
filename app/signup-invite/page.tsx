'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SignupInvite() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    // Save email to localStorage for now
    // In production, this would send to your backend/email service
    localStorage.setItem('becoming-user-email', email)
    localStorage.setItem('becoming-signup-date', new Date().toISOString())
    
    // Schedule weekly reminder (stored in localStorage)
    const nextReminder = new Date()
    nextReminder.setDate(nextReminder.getDate() + 7)
    localStorage.setItem('becoming-next-reminder', nextReminder.toISOString())

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              You&apos;re all set
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-xl mx-auto">
              We&apos;ll send you a gentle reminder in one week to check in on your alignment. 
              No spam, just a simple nudge to return to what matters.
            </p>
            <div className="space-y-4">
              <Link
                href="/checkin"
                className="inline-block px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-lg font-medium"
              >
                Continue to check-in
              </Link>
              <div>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Return to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
          Keep your momentum going
        </h1>

        <div className="space-y-6 mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            Get weekly reminders and track your progress automatically. Stay aligned with your top focus and never lose sight of your future self.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Enjoy a 1-week free trial to start your journey.
          </p>

          <div className="space-y-3 pt-4">
            <div className="flex items-start">
              <span className="text-gray-400 mr-3 mt-1">•</span>
              <p className="text-gray-700">Weekly reminders to reflect on your alignment</p>
            </div>
            <div className="flex items-start">
              <span className="text-gray-400 mr-3 mt-1">•</span>
              <p className="text-gray-700">Automatic tracking of your top life focus</p>
            </div>
            <div className="flex items-start">
              <span className="text-gray-400 mr-3 mt-1">•</span>
              <p className="text-gray-700">Access to weekly insights and guidance</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-lg font-medium"
            >
              Start 1-week free trial
            </button>
            <Link
              href="/checkin"
              className="block w-full text-center px-8 py-3 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 text-lg font-medium"
            >
              Maybe later
            </Link>
          </div>
        </form>

        <p className="mt-8 text-sm text-gray-500 text-center">
          No credit card required. Cancel anytime.
        </p>
      </div>
    </main>
  )
}
