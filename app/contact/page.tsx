import { ContactForm } from "./_components/contact-form";
import { ContactInfo } from "./_components/contact-info";

export default function ContactPage() {
  return (
    <div className='max-w-5xl mx-auto px-4 py-16'>
      <div className='text-center mb-12'>
        <h1 className='text-xl md:text-4xl font-bold'>Get in touch</h1>
        <p className='text-gray-500 mt-2'>Have a question or feedback? Reach out and we'll get back to you.</p>
      </div>
      <div className='grid md:grid-cols-5 gap-8'>
        <div className='md:col-span-2'>
          <ContactInfo />
        </div>
        <div className='md:col-span-3'>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}