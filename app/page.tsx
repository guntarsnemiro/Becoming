import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
            Becoming
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            A calm, mindful approach to personal growth. Track your journey and become the person you want to be.
          </p>
          <Link
            href="/start"
            className="inline-block px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-lg font-medium"
          >
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="px-4 py-16 md:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 text-center">
            Personal growth shouldn&apos;t feel overwhelming
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed text-center">
            Most self-improvement tools are cluttered, overwhelming, or focus on quick fixes. 
            Becoming offers a calm, sustainable approach to growth—one step at a time, 
            across all areas of your life.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center">
            How it works
          </h2>
          <div className="space-y-8 md:space-y-10">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Choose your focus areas</h3>
                <p className="text-gray-600 leading-relaxed">
                  Select the life areas you want to grow in—health, relationships, career, creativity, and more.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Set meaningful goals</h3>
                <p className="text-gray-600 leading-relaxed">
                  Define what growth looks like for you in each area. No pressure, just clarity.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Track your progress</h3>
                <p className="text-gray-600 leading-relaxed">
                  Log your daily actions and reflections. See your growth unfold over time.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-lg">
                4
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Reflect and adjust</h3>
                <p className="text-gray-600 leading-relaxed">
                  Regular check-ins help you understand what&apos;s working and what needs adjustment.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-lg">
                5
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Grow at your pace</h3>
                <p className="text-gray-600 leading-relaxed">
                  There&apos;s no rush. Sustainable growth happens gradually, with intention and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Life Areas List */}
      <section className="px-4 py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center">
            Life areas you can grow in
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Physical Health</h3>
              <p className="text-gray-600 text-sm">Exercise, nutrition, sleep, and wellness</p>
            </div>
            <div className="bg-white p-6 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Mental Health</h3>
              <p className="text-gray-600 text-sm">Mindfulness, stress management, emotional well-being</p>
            </div>
            <div className="bg-white p-6 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Relationships</h3>
              <p className="text-gray-600 text-sm">Family, friends, romantic, and social connections</p>
            </div>
            <div className="bg-white p-6 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Career & Work</h3>
              <p className="text-gray-600 text-sm">Professional growth, skills, and fulfillment</p>
            </div>
            <div className="bg-white p-6 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Learning & Growth</h3>
              <p className="text-gray-600 text-sm">Education, new skills, and knowledge</p>
            </div>
            <div className="bg-white p-6 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Creativity</h3>
              <p className="text-gray-600 text-sm">Art, writing, music, and creative expression</p>
            </div>
            <div className="bg-white p-6 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Finances</h3>
              <p className="text-gray-600 text-sm">Budgeting, saving, and financial wellness</p>
            </div>
            <div className="bg-white p-6 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Spirituality</h3>
              <p className="text-gray-600 text-sm">Purpose, values, and inner peace</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 text-center">
            Our philosophy
          </h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              Growth isn&apos;t about perfection or speed. It&apos;s about showing up consistently, 
              being kind to yourself, and making small, meaningful changes over time.
            </p>
            <p>
              Becoming is designed to be calm and uncluttered—a quiet space where you can 
              reflect on your journey without the noise of notifications, gamification, or 
              pressure to perform.
            </p>
            <p>
              We believe that sustainable personal growth happens when you honor your own pace, 
              celebrate small wins, and approach yourself with compassion.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 md:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            Ready to begin?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Start your personal growth journey today. It&apos;s simple, calm, and designed for you.
          </p>
          <Link
            href="/start"
            className="inline-block px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-lg font-medium"
          >
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Becoming. All rights reserved.</p>
            <nav className="flex gap-6 text-sm">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/start" className="text-gray-600 hover:text-gray-900">Start</Link>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  )
}
