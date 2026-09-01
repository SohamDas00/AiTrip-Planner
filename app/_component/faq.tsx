'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqData = [
  {
    id: 1,
    question: "How many trips can I create?",
    answer: "You can create up to 2 trips. Your limit resets automatically after 24 hours."
  },
  {
    id: 2,
    question: "Does it book flights for me?",
    answer: "Not yet — we generate a hotel recommendation and a day-by-day itinerary based on your trip details. Flight booking isn't included."
  },
  {
    id: 3,
    question: "How accurate are the hotel and itinerary suggestions?",
    answer: "Suggestions are generated based on the details you provide. We recommend double-checking prices and availability before booking."
  },
  {
    id: 4,
    question: "Do I need an account to create a trip?",
    answer: "Yes, you'll need to sign in first — this saves your trip to your account so you can come back and view it anytime."
  }
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='border-b py-2'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex items-center justify-between text-left font-medium py-2'
      >
        <span>{question}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <p className='mt-2 text-sm text-gray-500 leading-relaxed'>{answer}</p>
      )}
    </div>
  )
}

export default function FAQComponent() {
  return (
    <div className='w-full py-16'>
      <div className='max-w-3xl mx-auto px-4'>
        <h2 className='text-xl md:text-3xl font-bold text-center mb-12'>FAQs</h2>
        <div className='divide-y border-t'>
          {faqData.map((item) => (
            <FAQItem key={item.id} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </div>
  )
}