import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const links = [
  {
    icon: <Mail className='h-5 w-5 text-primary' />,
    label: 'Email',
    value: 'jisusoham04@gmail.com',
    href: 'mailto:jisusoham04@gmail.com',
  },
  {
    icon: <FaGithub className='h-5 w-5 text-primary' />, // Changed from Github
    label: 'GitHub',
    value: 'SohamDas00',
    href: 'https://github.com/SohamDas00',
  },
  {
    icon: <FaLinkedin className='h-5 w-5 text-primary' />, // Changed from Linkedin
    label: 'LinkedIn',
    value: 'sohamdas00',
    href: 'https://www.linkedin.com/in/sohamdas00/',
  },
]


export function ContactInfo() {
  return (
    <div className='border rounded-2xl p-6 space-y-5 h-full'>
      <h2 className='font-semibold text-lg'>Contact details</h2>
      <div className='space-y-4'>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className='flex items-center gap-3 group'
          >
            <div className='h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0'>
              {link.icon}
            </div>
            <div>
              <p className='text-xs text-gray-500'>{link.label}</p>
              <p className='text-sm font-medium group-hover:text-primary'>{link.value}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}