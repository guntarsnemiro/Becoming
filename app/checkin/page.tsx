'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Domain = 'Health' | 'Work / Craft' | 'Money' | 'Relationships' | 'Growth' | 'Contribution'

type AlignmentLevel = 'mostly' | 'somewhat' | 'not'

interface PreviousData {
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
  timestamp: string
}

interface Step1Data {
  identity: string
  lifeFeels: string
  othersDescribe: string
}

interface Step2Data {
  selectedDomains: Domain[]
  domainGoals: Record<Domain, string>
}

interface Step3Data {
  yearOutcomes: Record<Domain, string>
}

interface Step4Data {
  alignment: Record<Domain, AlignmentLevel>
  whatPulledOffTrack: string
}

export default function Checkin() {
  const [step, setStep] = useState(1)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [previousData, setPreviousData] = useState<PreviousData | null>(null)
  const [step1Data, setStep1Data] = useState<Step1Data>({
    identity: '',
    lifeFeels: '',
    othersDescribe: '',
  })
  const [step2Data, setStep2Data] = useState<Step2Data>({
    selectedDomains: [],
    domainGoals: {} as Record<Domain, string>,
  })
  const [step3Data, setStep3Data] = useState<Step3Data>({
    yearOutcomes: {} as Record<Domain, string>,
  })
  const [step4Data, setStep4Data] = useState<Step4Data>({
    alignment: {} as Record<Domain, AlignmentLevel>,
    whatPulledOffTrack: '',
  })

  useEffect(() => {
    // Load previous check-in data
    const saved = localStorage.getItem('becoming-previous-checkin')
    if (saved) {
      try {
        const data = JSON.parse(saved) as PreviousData
        setPreviousData(data)
        // Pre-fill with previous data
        setStep1Data(data.step1Data)
        setStep2Data(data.step2Data)
        setStep3Data(data.step3Data)
      } catch (e) {
        console.error('Failed to load previous data', e)
      }
    }
  }, [])

  const domains: Domain[] = ['Health', 'Work / Craft', 'Money', 'Relationships', 'Growth', 'Contribution']

  const handleDomainToggle = (domain: Domain) => {
    setStep2Data(prev => {
      const isSelected = prev.selectedDomains.includes(domain)
      if (isSelected) {
        return {
          ...prev,
          selectedDomains: prev.selectedDomains.filter(d => d !== domain),
          domainGoals: { ...prev.domainGoals, [domain]: '' },
        }
      } else if (prev.selectedDomains.length < 3) {
        return {
          ...prev,
          selectedDomains: [...prev.selectedDomains, domain],
          domainGoals: { ...prev.domainGoals, [domain]: '' },
        }
      }
      return prev
    })
  }

  const calculateAlignment = () => {
    const selected = step2Data.selectedDomains
    if (selected.length === 0) return 'mostly'

    const alignmentScores = selected.map(domain => {
      const level = step4Data.alignment[domain]
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

  const getAlignmentInsight = () => {
    const selected = step2Data.selectedDomains
    const mostlyAligned = selected.filter(d => step4Data.alignment[d] === 'mostly')
    const notAligned = selected.filter(d => step4Data.alignment[d] === 'not')

    if (mostlyAligned.length > 0 && notAligned.length === 0) {
      return `You have a clear direction in ${mostlyAligned.join(' and ')}, and your recent actions support it.`
    } else if (mostlyAligned.length > 0) {
      return `You have a clear direction in ${mostlyAligned.join(' and ')}, but your recent actions don't fully support it yet.`
    } else if (notAligned.length > 0) {
      return `You have clarity about what matters, but there's a gap between your direction and your recent actions.`
    }
    return `You're building clarity about what matters. The next step is aligning your daily actions with that direction.`
  }

  const getAlignmentChange = (domain: Domain) => {
    if (!previousData) return null
    const previous = previousData.step4Data.alignment[domain]
    const current = step4Data.alignment[domain]
    if (!previous || !current) return null

    const levels: AlignmentLevel[] = ['not', 'somewhat', 'mostly']
    const prevIndex = levels.indexOf(previous)
    const currIndex = levels.indexOf(current)

    if (currIndex > prevIndex) return 'improved'
    if (currIndex < prevIndex) return 'declined'
    return 'same'
  }

  const handleContinue = () => {
    if (step < 5) {
      setStep(step + 1)
    } else {
      // Save this check-in as the new previous data
      const checkinData: PreviousData = {
        step1Data,
        step2Data,
        step3Data,
        step4Data,
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem('becoming-previous-checkin', JSON.stringify(checkinData))
    }
  }

  const formatReflection = () => {
    const alignmentText = calculateAlignment() === 'mostly' 
      ? 'Your life is mostly aligned.'
      : calculateAlignment() === 'partially'
      ? 'Your life is partially aligned.'
      : 'Your life is currently misaligned.'

    let text = `Your Alignment Reflection\n\n`
    text += `${alignmentText}\n\n`
    text += `FUTURE SELF\n`
    text += `Who are you becoming?\n`
    if (step1Data.identity) text += `I am someone who ${step1Data.identity}\n`
    if (step1Data.lifeFeels) text += `My life feels ${step1Data.lifeFeels}\n`
    if (step1Data.othersDescribe) text += `Others would describe me as ${step1Data.othersDescribe}\n\n`
    
    text += `WHAT MATTERS\n`
    step2Data.selectedDomains.forEach(domain => {
      text += `${domain}: ${step2Data.domainGoals[domain] || 'Not specified'}\n`
    })
    text += `\n`
    
    text += `THIS YEAR\n`
    step2Data.selectedDomains.forEach(domain => {
      if (step3Data.yearOutcomes[domain]) {
        text += `${domain}: ${step3Data.yearOutcomes[domain]}\n`
      }
    })
    text += `\n`
    
    text += `REALITY CHECK\n`
    step2Data.selectedDomains.forEach(domain => {
      const level = step4Data.alignment[domain]
      const levelText = level === 'mostly' ? 'Mostly aligned' : level === 'somewhat' ? 'Somewhat aligned' : 'Not really aligned'
      const change = getAlignmentChange(domain)
      const changeText = change === 'improved' ? ' (↑ Improved)' : change === 'declined' ? ' (↓ Declined)' : change === 'same' ? ' (→ Same)' : ''
      text += `${domain}: ${levelText}${changeText}\n`
    })
    if (step4Data.whatPulledOffTrack) {
      text += `\nWhat pulled you off track: ${step4Data.whatPulledOffTrack}\n`
    }
    text += `\n`
    text += `INSIGHT\n`
    text += `${getAlignmentInsight()}\n\n`
    text += `The gap is not failure. It's information.\n`
    if (previousData) {
      text += `\nPrevious check-in: ${formatDate(previousData.timestamp)}\n`
    }
    text += `\n---\n`
    text += `Becoming - A personal growth and life alignment system\n`
    
    return text
  }

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    const reflectionText = formatReflection()
    const subject = 'Your Becoming Alignment Reflection'
    const body = encodeURIComponent(reflectionText)
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`
    
    // Open mailto link (works if user has email client configured)
    window.location.href = mailtoLink
    
    // Also copy to clipboard as fallback
    navigator.clipboard.writeText(reflectionText).catch(() => {})
    
    setEmailSent(true)
    setTimeout(() => {
      setShowEmailForm(false)
      setEmailSent(false)
      setEmail('')
    }, 3000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-16">
        {/* Progress indicator */}
        <div className="mb-8 text-sm text-gray-500">
          Step {step} of 5
        </div>

        {/* Previous check-in notice */}
        {previousData && step === 1 && (
          <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <p className="text-sm text-gray-600 mb-2">
              Last check-in: {formatDate(previousData.timestamp)}
            </p>
            <p className="text-sm text-gray-500">
              Your previous responses are pre-filled. Update what has changed.
            </p>
          </div>
        )}

        {/* Step 1: Future Self */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Who are you becoming?
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Imagine yourself 10 years from now.
              <br />
              If life goes well — who are you?
            </p>
            <p className="text-sm text-gray-500 mb-8">
              This is about identity, not goals.
            </p>

            <div className="space-y-6 mb-8">
              <div>
                <input
                  type="text"
                  placeholder="I am someone who…"
                  value={step1Data.identity}
                  onChange={(e) => setStep1Data({ ...step1Data, identity: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="My life feels…"
                  value={step1Data.lifeFeels}
                  onChange={(e) => setStep1Data({ ...step1Data, lifeFeels: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Others would describe me as…"
                  value={step1Data.othersDescribe}
                  onChange={(e) => setStep1Data({ ...step1Data, othersDescribe: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-lg font-medium"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: What Matters */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              What actually matters right now?
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Choose the three life areas that matter most in this season.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Choose only three.
            </p>

            <div className="space-y-4 mb-8">
              {domains.map((domain) => {
                const isSelected = step2Data.selectedDomains.includes(domain)
                return (
                  <div key={domain}>
                    <button
                      onClick={() => handleDomainToggle(domain)}
                      className={`w-full text-left px-4 py-3 border-2 rounded-md text-lg transition-colors ${
                        isSelected
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {domain}
                    </button>
                    {isSelected && (
                      <div className="mt-3">
                        <input
                          type="text"
                          placeholder='In 10 years, "good" looks like…'
                          value={step2Data.domainGoals[domain] || ''}
                          onChange={(e) =>
                            setStep2Data({
                              ...step2Data,
                              domainGoals: { ...step2Data.domainGoals, [domain]: e.target.value },
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <button
              onClick={handleContinue}
              disabled={step2Data.selectedDomains.length === 0}
              className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 3: This Year */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Zoom into this year.
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              If this year mattered, what would move you closer?
            </p>

            <div className="space-y-6 mb-8">
              {step2Data.selectedDomains.map((domain) => {
                const placeholders: Record<Domain, string> = {
                  'Health': 'Build a body that feels strong and calm',
                  'Work / Craft': 'Create work that feels meaningful and aligned',
                  'Money': 'Build financial security and freedom',
                  'Relationships': 'Deepen connections that matter most',
                  'Growth': 'Develop skills and understanding that serve my future self',
                  'Contribution': 'Make a meaningful impact in ways that align with my values',
                }
                return (
                  <div key={domain}>
                    <label className="block text-sm text-gray-600 mb-2">{domain}</label>
                    <input
                      type="text"
                      placeholder={placeholders[domain]}
                      value={step3Data.yearOutcomes[domain] || ''}
                      onChange={(e) => {
                        const value = e.target.value.slice(0, 120)
                        setStep3Data({
                          ...step3Data,
                          yearOutcomes: { ...step3Data.yearOutcomes, [domain]: value },
                        })
                      }}
                      maxLength={120}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {step3Data.yearOutcomes[domain]?.length || 0} / 120 characters
                    </p>
                  </div>
                )
              })}
            </div>

            <p className="text-sm text-gray-500 mb-8">
              One meaningful outcome — not a to-do list.
            </p>

            <button
              onClick={handleContinue}
              className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-lg font-medium"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 4: Reality Check */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              What did you actually do?
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Think about the last 7 days.
            </p>

            <div className="space-y-8 mb-8">
              {step2Data.selectedDomains.map((domain) => {
                const change = getAlignmentChange(domain)
                return (
                  <div key={domain}>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-lg font-medium text-gray-900">{domain}</label>
                      {change && previousData && (
                        <span className={`text-xs px-2 py-1 rounded ${
                          change === 'improved' ? 'bg-green-50 text-green-700' :
                          change === 'declined' ? 'bg-red-50 text-red-700' :
                          'bg-gray-50 text-gray-700'
                        }`}>
                          {change === 'improved' ? '↑ Improved' :
                           change === 'declined' ? '↓ Declined' :
                           '→ Same'}
                        </span>
                      )}
                    </div>
                    <div className="space-y-3">
                      {(['mostly', 'somewhat', 'not'] as AlignmentLevel[]).map((level) => (
                        <label
                          key={level}
                          className="flex items-center px-4 py-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                        >
                          <input
                            type="radio"
                            name={domain}
                            value={level}
                            checked={step4Data.alignment[domain] === level}
                            onChange={() =>
                              setStep4Data({
                                ...step4Data,
                                alignment: { ...step4Data.alignment, [domain]: level },
                              })
                            }
                            className="mr-3 w-5 h-5 text-gray-900 focus:ring-gray-900"
                          />
                          <span className="text-lg">
                            {level === 'mostly' && 'Mostly aligned'}
                            {level === 'somewhat' && 'Somewhat aligned'}
                            {level === 'not' && 'Not really aligned'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mb-8">
              <textarea
                placeholder="What pulled you off track?"
                value={step4Data.whatPulledOffTrack}
                onChange={(e) =>
                  setStep4Data({ ...step4Data, whatPulledOffTrack: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleContinue}
              className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-lg font-medium"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 5: Alignment Insight */}
        {step === 5 && (
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-8">
              Your alignment right now
            </h1>

            <div className="space-y-6 mb-8">
              <p className="text-2xl font-light text-gray-900">
                {calculateAlignment() === 'mostly' && "Your life is mostly aligned."}
                {calculateAlignment() === 'partially' && "Your life is partially aligned."}
                {calculateAlignment() === 'misaligned' && "Your life is currently misaligned."}
              </p>

              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  This is not a judgment.
                </p>
                <p>
                  Alignment is not something you achieve once.
                  <br />
                  It&apos;s something you return to.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  {getAlignmentInsight()}
                </p>
                <p className="text-lg font-medium text-gray-900">
                  The gap is not failure. It&apos;s information.
                </p>
              </div>

              {previousData && (
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">
                    Previous check-in: {formatDate(previousData.timestamp)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Keep returning to alignment. Small shifts compound over time.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  handleContinue()
                  // Redirect to home after saving
                  setTimeout(() => {
                    window.location.href = '/'
                  }, 100)
                }}
                className="w-full px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-lg font-medium"
              >
                Continue alignment weekly
              </button>
              {!showEmailForm && !emailSent && (
                <button
                  onClick={() => setShowEmailForm(true)}
                  className="w-full px-8 py-3 text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 text-lg font-medium"
                >
                  Send me this reflection
                </button>
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
                    Reflection sent to {email}. Check your email or clipboard.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </main>
  )
}
