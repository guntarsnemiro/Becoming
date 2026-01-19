'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Domain = 'Health' | 'Work / Craft' | 'Money' | 'Relationships' | 'Growth' | 'Contribution'

type AlignmentLevel = 'mostly' | 'somewhat' | 'not'

interface AlignmentData {
  step1Data: {
    identity: string
    lifeFeels: string
    othersDescribe: string
  }
  step2Data: {
    selectedDomains: Domain[]
    domainGoals: Record<Domain, string>
  }
  step3Data: {
    yearOutcomes: Record<Domain, string>
  }
  step4Data: {
    alignment: Record<Domain, AlignmentLevel>
    whatPulledOffTrack: string
  }
}

export default function AlignSummary() {
  const [data, setData] = useState<AlignmentData | null>(null)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    // Load alignment data from localStorage
    const saved = localStorage.getItem('becoming-previous-checkin')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setData({
          step1Data: parsed.step1Data,
          step2Data: parsed.step2Data,
          step3Data: parsed.step3Data,
          step4Data: parsed.step4Data,
        })
      } catch (e) {
        // If no data, redirect to align
        window.location.href = '/align'
      }
    } else {
      window.location.href = '/align'
    }
  }, [])

  if (!data) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading your alignment summary...</p>
      </main>
    )
  }

  const getTopFocus = () => {
    if (data.step2Data.selectedDomains.length === 0) return null
    return data.step2Data.selectedDomains[0]
  }

  const getAlignmentLevel = () => {
    const selected = data.step2Data.selectedDomains
    if (selected.length === 0) return 'partially'

    const alignmentScores = selected.map(domain => {
      const level = data.step4Data.alignment[domain]
      if (level === 'mostly') return 3
      if (level === 'somewhat') return 2
      if (level === 'not') return 1
      return 2
    })

    const avgScore = alignmentScores.reduce((a, b) => a + b, 0) / alignmentScores.length

    if (avgScore >= 2.5) return 'mostly'
    if (avgScore >= 1.5) return 'partially'
    return 'misaligned'
  }

  const getAlignmentText = () => {
    const level = getAlignmentLevel()
    if (level === 'mostly') {
      return "Your current actions align well with your long-term vision. You're on a path that supports who you're becoming."
    } else if (level === 'partially') {
      return "Your current actions partially align with your long-term vision. There's room to bring your daily choices closer to your future self."
    } else {
      return "There's a gap between your long-term vision and your current actions. This isn't failure—it's information about where to focus."
    }
  }

  const getKeyTakeaways = () => {
    const takeaways: string[] = []
    
    if (data.step1Data.identity) {
      takeaways.push(`You're becoming someone who ${data.step1Data.identity.toLowerCase()}`)
    }
    
    if (data.step2Data.selectedDomains.length > 0) {
      const domains = data.step2Data.selectedDomains.join(' and ')
      takeaways.push(`Your focus areas are ${domains}`)
    }
    
    const mostlyAligned = data.step2Data.selectedDomains.filter(
      d => data.step4Data.alignment[d] === 'mostly'
    )
    if (mostlyAligned.length > 0) {
      takeaways.push(`You're most aligned in ${mostlyAligned.join(' and ')}`)
    }
    
    return takeaways
  }

  const getNextSteps = () => {
    const topFocus = getTopFocus()
    const alignmentLevel = getAlignmentLevel()
    
    const steps: string[] = []
    
    if (topFocus) {
      if (alignmentLevel === 'mostly') {
        steps.push(`Continue supporting your ${topFocus.toLowerCase()} focus with small, consistent actions this week.`)
      } else if (alignmentLevel === 'partially') {
        steps.push(`Pick one small action this week that moves you closer in ${topFocus.toLowerCase()}. It could be as simple as dedicating 15 minutes daily to what matters.`)
      } else {
        steps.push(`Start with one small action in ${topFocus.toLowerCase()} this week. Choose something realistic that you can actually do.`)
      }
    }
    
    steps.push(`Return to this alignment check weekly. Regular reflection helps you notice when you drift and gently return to what matters.`)
    
    return steps
  }

  const formatReflection = () => {
    const alignmentText = getAlignmentLevel() === 'mostly' 
      ? 'Your life is mostly aligned.'
      : getAlignmentLevel() === 'partially'
      ? 'Your life is partially aligned.'
      : 'Your life is currently misaligned.'

    let text = `Your Alignment Summary\n\n`
    text += `${alignmentText}\n\n`
    text += `FUTURE SELF\n`
    if (data.step1Data.identity) text += `I am someone who ${data.step1Data.identity}\n`
    if (data.step1Data.lifeFeels) text += `My life feels ${data.step1Data.lifeFeels}\n`
    if (data.step1Data.othersDescribe) text += `Others would describe me as ${data.step1Data.othersDescribe}\n\n`
    
    text += `WHAT MATTERS\n`
    data.step2Data.selectedDomains.forEach(domain => {
      text += `${domain}: ${data.step2Data.domainGoals[domain] || 'Not specified'}\n`
    })
    text += `\n`
    
    text += `THIS YEAR\n`
    data.step2Data.selectedDomains.forEach(domain => {
      if (data.step3Data.yearOutcomes[domain]) {
        text += `${domain}: ${data.step3Data.yearOutcomes[domain]}\n`
      }
    })
    text += `\n`
    
    text += `REALITY CHECK\n`
    data.step2Data.selectedDomains.forEach(domain => {
      const level = data.step4Data.alignment[domain]
      const levelText = level === 'mostly' ? 'Mostly aligned' : level === 'somewhat' ? 'Somewhat aligned' : 'Not really aligned'
      text += `${domain}: ${levelText}\n`
    })
    if (data.step4Data.whatPulledOffTrack) {
      text += `\nWhat pulled you off track: ${data.step4Data.whatPulledOffTrack}\n`
    }
    text += `\n`
    text += `INSIGHT\n`
    text += `${getAlignmentText()}\n\n`
    text += `The gap is not failure. It's information.\n`
    text += `\n---\n`
    text += `Becoming - A personal growth and life alignment system\n`
    
    return text
  }

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    const reflectionText = formatReflection()
    const subject = 'Your Becoming Alignment Summary'
    const body = encodeURIComponent(reflectionText)
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`
    
    window.location.href = mailtoLink
    navigator.clipboard.writeText(reflectionText).catch(() => {})
    
    setEmailSent(true)
    setTimeout(() => {
      setShowEmailForm(false)
      setEmailSent(false)
      setEmail('')
    }, 3000)
  }

  const topFocus = getTopFocus()
  const alignmentLevel = getAlignmentLevel()
  const alignmentText = getAlignmentText()
  const takeaways = getKeyTakeaways()
  const nextSteps = getNextSteps()

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-8">
          Your Alignment Summary
        </h1>

        {/* Alignment Summary Section */}
        <section className="mb-12">
          <div className="space-y-6">
            {topFocus && (
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-md">
                <p className="text-sm text-gray-600 mb-2">Your top focus</p>
                <p className="text-xl font-medium text-gray-900 mb-4">{topFocus}</p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  In just 5 minutes, you clarified that your top focus is {topFocus}. {alignmentText}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-xl font-medium text-gray-900">Key insights</h2>
              <ul className="space-y-3">
                {takeaways.map((takeaway, index) => (
                  <li key={index} className="text-lg text-gray-700 leading-relaxed flex items-start">
                    <span className="text-gray-400 mr-3">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {data.step4Data.whatPulledOffTrack && (
              <div className="p-4 bg-gray-50 border-l-4 border-gray-300 rounded">
                <p className="text-sm text-gray-600 mb-1">What pulled you off track</p>
                <p className="text-gray-700">{data.step4Data.whatPulledOffTrack}</p>
              </div>
            )}
          </div>
        </section>

        {/* Suggested Next Steps Section */}
        <section className="mb-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-medium text-gray-900 mb-6">Suggested next steps</h2>
          <div className="space-y-4">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex items-start">
                <span className="text-gray-400 mr-4 mt-1 text-xl">{index + 1}.</span>
                <p className="text-lg text-gray-700 leading-relaxed flex-1">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Optional Soft CTA */}
        <section className="pt-8 border-t border-gray-200">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Keep your alignment insights</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Want to keep your alignment summary handy? Save it to revisit weekly or get gentle reminders to check in.
          </p>

          {!showEmailForm && !emailSent && (
            <div className="space-y-3">
              <button
                onClick={() => setShowEmailForm(true)}
                className="w-full px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-lg font-medium"
              >
                Send me this summary
              </button>
              <Link
                href="/signup-invite"
                className="block w-full text-center px-8 py-3 text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 text-lg font-medium"
              >
                Schedule weekly check-in
              </Link>
            </div>
          )}

          {showEmailForm && !emailSent && (
            <form onSubmit={handleSendEmail} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-lg font-medium"
                >
                  Send
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEmailForm(false)
                    setEmail('')
                  }}
                  className="px-8 py-3 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 text-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {emailSent && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-center">
              <p className="text-gray-700">
                Summary sent to {email}. Check your email or clipboard.
              </p>
            </div>
          )}
        </section>

        {/* Footer navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex gap-6 text-sm">
          <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link href="/philosophy" className="text-gray-600 hover:text-gray-900">Philosophy</Link>
          <Link href="/checkin" className="text-gray-600 hover:text-gray-900">Check-in</Link>
        </div>
      </div>
    </main>
  )
}
