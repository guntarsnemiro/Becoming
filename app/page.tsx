import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
            Become aligned with who you&apos;re becoming.
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed font-normal">
            Clarify your long-term goals and future self. Align your daily actions with what truly matters. A personal development system for meaningful personal growth.
          </h2>
          <Link
            href="/align"
            className="inline-block px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-lg font-medium"
          >
            Start a 5-minute alignment check
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            No account. No email. Just clarity.
          </p>
          <p className="text-sm text-gray-600 mt-6">
            Prefer to understand the thinking first?{' '}
            <Link href="/philosophy" className="text-gray-900 underline hover:text-gray-700">
              Read the philosophy
            </Link>
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-4 py-16 md:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 text-center">
            Most people don&apos;t fail because they lack goals.
          </h2>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            <p>
              They start with clarity about their long-term goals and personal growth. Then life happens. Priorities shift. The connection between their future self and present actions fades.
            </p>
            <p>
              Without a system to maintain alignment, long-term goals drift into the background. Daily actions become disconnected from what truly matters. Personal growth stalls not from lack of motivation, but from lost clarity and focus.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 text-center">
            Built on one idea
          </h2>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            <p className="text-xl text-gray-900 font-medium text-center mb-4">
              Your future self should guide your present actions — continuously.
            </p>
            <p>
              This is not about motivation or productivity hacks. Becoming is a personal development system designed to help you maintain clarity about who you&apos;re becoming and ensure your daily choices support that vision.
            </p>
          </div>
        </div>
      </section>

      {/* 3-Layer Model Section */}
      <section className="px-4 py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center">
            A simple model for life alignment
          </h2>
          <div className="space-y-8 md:space-y-10">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Long-term vision</h3>
              <p className="text-gray-600 leading-relaxed">
                Your future identity at 10, 20, and 30 years. Who are you becoming? This vision provides the foundation for clarity and guides all other decisions in your personal growth journey.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Strategy</h3>
              <p className="text-gray-600 leading-relaxed">
                Your priorities, focus areas, and desired outcomes. How will you bridge the gap between your present and future self? This layer brings focus to your long-term goals.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Execution</h3>
              <p className="text-gray-600 leading-relaxed">
                Small daily actions that align with your strategy and vision. These are the practical steps that maintain alignment and support meaningful personal growth over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 text-center">
            Not another productivity app
          </h2>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            <p>Becoming avoids:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Gamification and points systems</li>
              <li>Habit tracking for its own sake</li>
              <li>Daily streaks and notifications</li>
              <li>Quick wins and growth hacks</li>
              <li>Hustle culture messaging</li>
            </ul>
            <p className="mt-6">
              Instead, Becoming supports meaningful personal growth by helping you maintain clarity about your long-term goals, future self, and the alignment between your daily actions and what truly matters.
            </p>
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="px-4 py-16 md:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 text-center">
            Who this is for
          </h2>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Adults interested in personal growth and long-term goals</li>
              <li>People seeking clarity about their future self and life alignment</li>
              <li>Those who want to ensure their daily actions support meaningful progress</li>
              <li>Anyone looking for a personal development system without gamification</li>
            </ul>
            <p className="mt-6">
              This is not for those seeking productivity hacks, motivation apps, or gamified habit tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            Start with clarity
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
            Take a 5-minute alignment check to clarify your long-term goals, future self, and how your daily actions align with what truly matters.
          </p>
          <Link
            href="/align"
            className="inline-block px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-lg font-medium"
          >
            Start a 5-minute alignment check
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            No account. No email. Just clarity.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              Becoming is a personal growth and life alignment system for clarifying long-term goals and aligning daily actions with your future self.
            </p>
            <nav className="flex gap-6 text-sm">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/philosophy" className="text-gray-600 hover:text-gray-900">Philosophy</Link>
              <Link href="/align" className="text-gray-600 hover:text-gray-900">Start</Link>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  )
}
