'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Send, Loader2, CircleCheck } from 'lucide-react'

export function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const onChange =
        (field: keyof typeof form) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setForm((prev) => ({ ...prev, [field]: e.target.value }))
            }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            if (!res.ok) {
                throw new Error('Something went wrong. Please try again.')
            }

            setSubmitted(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send message')
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className='border rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center gap-2'>
                <div className='flex items-center gap-2'>
                    <h3 className='font-semibold text-lg'>Message sent</h3>
                    <CircleCheck className='h-5 w-5 text-green-500' />
                </div>
                <p className='text-sm text-gray-500'>Thanks for reaching out — we'll get back to you soon.</p>
            </div>
        )
    }

    return (
        <form onSubmit={onSubmit} className='border rounded-2xl p-6 space-y-4'>
            {error && (
                <div className='bg-red-50 text-red-600 p-3 rounded-lg text-sm'>
                    {error}
                </div>
            )}
            <div className='space-y-2'>
                <label className='text-sm font-medium'>Name</label>
                <Input
                    required
                    value={form.name}
                    onChange={onChange('name')}
                    placeholder='Your name'
                    disabled={loading}
                />
            </div>
            <div className='space-y-2'>
                <label className='text-sm font-medium'>Email</label>
                <Input
                    required
                    type='email'
                    value={form.email}
                    onChange={onChange('email')}
                    placeholder='you@example.com'
                    disabled={loading}
                />
            </div>
            <div className='space-y-2'>
                <label className='text-sm font-medium'>Message</label>
                <Textarea
                    required
                    value={form.message}
                    onChange={onChange('message')}
                    placeholder='What would you like to tell us?'
                    className='min-h-32 resize-none'
                    disabled={loading}
                />
            </div>
            <Button type='submit' className='w-full gap-2' disabled={loading}>
                {loading ? (
                    <>
                        Sending...
                        <Loader2 className='h-4 w-4 animate-spin' />
                    </>
                ) : (
                    <>
                        Send message
                        <Send className='h-4 w-4' />
                    </>
                )}
            </Button>
        </form>
    )
}