import supportContact from '@public/images/ns-img-402.jpg';
import Image from 'next/image';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';

const Contact = () => {
  return (
    <section id="contact-form" className="pt-[100px] pb-[100px] md:pb-[200px]">
      <div className="main-container">
        <div className="grid grid-cols-12 max-lg:gap-y-[100px] lg:gap-[100px]">
          <div className="col-span-12 lg:col-span-6">
            <div className="mb-[70px] space-y-5 text-left">
              <RevealAnimation delay={0.1}>
                <span className="badge badge-green">Get in touch</span>
              </RevealAnimation>
              <div className="space-y-3">
                <RevealAnimation delay={0.2}>
                  <h2>Submit a support request</h2>
                </RevealAnimation>
                <RevealAnimation delay={0.3}>
                  <p className="max-w-[550px]">
                    Have a question about BayX, need help with setup, or want to request a feature?
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                </RevealAnimation>
              </div>
            </div>
            <RevealAnimation delay={0.4}>
              <figure className="w-full overflow-hidden rounded-[20px] lg:max-w-[595px]">
                <Image src={supportContact} className="size-full object-cover" alt="BayX Support" />
              </figure>
            </RevealAnimation>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <RevealAnimation delay={0.5}>
              <form className="dark:bg-background-8 rounded-[20px] bg-white p-6 lg:p-[42px]">
                <fieldset className="mb-8 space-y-2">
                  <label htmlFor="name" className="text-tagline-1 text-secondary dark:text-accent block font-medium">
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    className="border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 placeholder:text-tagline-1 placeholder:text-secondary/60 dark:placeholder:text-accent/60 dark:text-accent shadow-1 block h-12 w-full rounded-full border px-[18px] py-3 font-normal placeholder:font-normal focus:ring-0 focus:ring-offset-0 focus:outline-none"
                  />
                </fieldset>
                <fieldset className="mb-8 space-y-2">
                  <label htmlFor="email" className="text-tagline-1 text-secondary dark:text-accent block font-medium">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email address"
                    className="border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 placeholder:text-tagline-1 dark:text-accent placeholder:text-secondary/60 dark:placeholder:text-accent/60 shadow-1 block h-12 w-full rounded-full border px-[18px] py-3 font-normal placeholder:font-normal focus:ring-0 focus:ring-offset-0 focus:outline-none"
                  />
                </fieldset>
                <fieldset className="mb-8 space-y-2">
                  <label htmlFor="subject" className="text-tagline-1 text-secondary dark:text-accent block font-medium">
                    Subject
                  </label>
                  <select
                    name="subject"
                    id="subject"
                    className="border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 text-secondary/60 dark:text-accent/60 shadow-1 block h-12 w-full rounded-full border px-[18px] py-3 font-normal focus:ring-0 focus:ring-offset-0 focus:outline-none"
                  >
                    <option value="">Select a topic</option>
                    <option value="setup">Account & Setup</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Report a Bug</option>
                    <option value="other">Other</option>
                  </select>
                </fieldset>
                <fieldset className="space-y-2">
                  <label htmlFor="message" className="text-tagline-1 text-secondary dark:text-accent block font-medium">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Describe your question or issue..."
                    className="border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 placeholder:text-tagline-1 placeholder:text-secondary/60 dark:placeholder:text-accent/60 dark:text-accent shadow-1 block min-h-[115px] w-full rounded-xl border px-[18px] py-3 font-normal placeholder:font-normal focus:ring-0 focus:ring-offset-0 focus:outline-none"
                    defaultValue={''}
                  />
                </fieldset>
                <fieldset className="mt-4 mb-4 flex items-center gap-2">
                  <label htmlFor="agree-terms" className="flex items-center gap-x-3">
                    <input id="agree-terms" type="checkbox" className="peer sr-only" required />
                    <span className="border-stroke-3 dark:border-stroke-7 after:bg-primary-500 peer-checked:border-primary-500 relative size-4 cursor-pointer rounded-full border after:absolute after:top-1/2 after:left-1/2 after:size-2.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:opacity-0 peer-checked:after:opacity-100" />
                  </label>
                  <label
                    htmlFor="agree-terms"
                    className="text-tagline-3 text-secondary/60 dark:text-accent/60 cursor-pointer">
                    I agree with the
                    <Link href="/privacy-policy" className="text-primary-500 text-tagline-3 underline ml-1">
                      privacy policy
                    </Link>
                  </label>
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-md btn-secondary hover:btn-primary dark:btn-accent w-full first-letter:uppercase before:content-none">
                  Submit Request
                </button>
              </form>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
