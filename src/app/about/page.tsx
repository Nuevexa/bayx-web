import { defaultMetadata } from '@/utils/generateMetaData'
import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Users, Target, Zap, Shield, Heart } from 'lucide-react'
import RevealAnimation from '@/components/animation/RevealAnimation'

export const metadata: Metadata = {
  //
  // Assuming defaultMetadata is imported or defined elsewhere, or this is a placeholder.
  // If defaultMetadata is not defined, this line will cause an error.
  // For this edit, it's included as per the instruction.
  // If defaultMetadata is not intended, remove the line below.
  // If defaultMetadata is intended to be imported, add `import { defaultMetadata } from '@/lib/metadata'` or similar.
  ...defaultMetadata,
  title: 'About Us - The Team Behind BayX',
  description:
    'Learn about our mission to empower independent auto repair shops with cutting-edge technology.',
  openGraph: {
    title: 'About BayX - Built for Real Workshops',
    description: 'Discover the story behind BayX and why we\'re passionate about transforming automotive workshops.',
  },
}

export default function AboutPage() {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      {/* Hero Section */}
      <section className="pt-32 pb-14 sm:pt-36 md:pt-42 md:pb-16 lg:pb-[88px] xl:pt-[180px]">
        <div className="main-container">
          <RevealAnimation delay={0.1}>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-heading-2 sm:text-heading-1 text-secondary dark:text-accent mb-6">
                We Get It. Running a Workshop is Hard.
              </h1>
              <p className="text-tagline-1 text-secondary/70 dark:text-accent/70 mb-8 max-w-2xl mx-auto">
                That's exactly why we built BayX. We've seen firsthand how much time gets lost to paperwork,
                missed follow-ups, and scattered information. There had to be a better way.
              </p>
            </div>
          </RevealAnimation>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="main-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <RevealAnimation delay={0.2}>
              <div>
                <h2 className="text-heading-3 sm:text-heading-2 text-secondary dark:text-accent mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-tagline-1 text-secondary/70 dark:text-accent/70">
                  <p>
                    BayX started with a simple question: Why do workshop owners spend more time on admin work than actually helping customers?
                  </p>
                  <p>
                    We talked to dozens of shop owners, technicians, and service advisors. We watched them juggle phone calls, scribble notes, dig through paperwork, and struggle to keep track of jobs. It was clear, the tools available weren't built for how real workshops actually work.
                  </p>
                  <p>
                    So we decided to build something different. Something that actually makes your day easier, not more complicated.
                  </p>
                </div>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.3}>
              <div className="bg-background-1 dark:bg-background-6 rounded-2xl p-8 border border-stroke-3 dark:border-stroke-7">
                <h3 className="text-heading-5 text-secondary dark:text-accent mb-6">What We Believe</h3>
                <div className="space-y-4 text-tagline-1">
                  <div className="flex gap-3">
                    <Heart className="w-5 h-5 text-primary-500 shrink-0 mt-1" />
                    <p className="text-secondary/70 dark:text-accent/70">Your time is valuable. Software should save it, not waste it.</p>
                  </div>
                  <div className="flex gap-3">
                    <Heart className="w-5 h-5 text-primary-500 shrink-0 mt-1" />
                    <p className="text-secondary/70 dark:text-accent/70">Simple beats complicated. Every time.</p>
                  </div>
                  <div className="flex gap-3">
                    <Heart className="w-5 h-5 text-primary-500 shrink-0 mt-1" />
                    <p className="text-secondary/70 dark:text-accent/70">Great software is built with real feedback from real users.</p>
                  </div>
                  <div className="flex gap-3">
                    <Heart className="w-5 h-5 text-primary-500 shrink-0 mt-1" />
                    <p className="text-secondary/70 dark:text-accent/70">When your business grows, we've done our job.</p>
                  </div>
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 lg:py-24 bg-background-1 dark:bg-background-6">
        <div className="main-container">
          <RevealAnimation delay={0.1}>
            <div className="text-center mb-12">
              <h2 className="text-heading-3 sm:text-heading-2 text-secondary dark:text-accent mb-4">
                Where We're Headed
              </h2>
              <p className="text-tagline-1 text-secondary/70 dark:text-accent/70 max-w-2xl mx-auto">
                We're not trying to build "just another software." We're building something that actually matters to the people who use it.
              </p>
            </div>
          </RevealAnimation>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <RevealAnimation delay={0.2}>
              <div className="bg-background-3 dark:bg-background-7 rounded-xl p-8 border border-stroke-3 dark:border-stroke-7">
                <div className="bg-primary-500/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary-500" />
                </div>
                <h3 className="text-heading-5 text-secondary dark:text-accent mb-4">Our Mission</h3>
                <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">
                  Help workshop owners spend less time on busywork and more time doing what they love, taking care of customers and building their business.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.3}>
              <div className="bg-background-3 dark:bg-background-7 rounded-xl p-8 border border-stroke-3 dark:border-stroke-7">
                <div className="bg-primary-500/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7 text-primary-500" />
                </div>
                <h3 className="text-heading-5 text-secondary dark:text-accent mb-4">Our Vision</h3>
                <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">
                  A world where every workshop, big or small, has access to tools that help them compete, grow, and deliver amazing service to their customers.
                </p>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="main-container">
          <RevealAnimation delay={0.1}>
            <div className="text-center mb-12">
              <h2 className="text-heading-3 sm:text-heading-2 text-secondary dark:text-accent mb-4">
                How We Work
              </h2>
              <p className="text-tagline-1 text-secondary/70 dark:text-accent/70 max-w-2xl mx-auto">
                These aren't just words on a wall. They're how we make decisions every day.
              </p>
            </div>
          </RevealAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'Listen First',
                description: 'We talk to workshop owners constantly. Your feedback directly shapes what we build next.',
              },
              {
                icon: Shield,
                title: 'Earn Your Trust',
                description: 'Your data is your business. We protect it like it\'s our own, because trust is everything.',
              },
              {
                icon: Zap,
                title: 'Keep Improving',
                description: 'Good enough isn\'t good enough. We\'re always looking for ways to make BayX better.',
              },
              {
                icon: CheckCircle2,
                title: 'Be Reliable',
                description: 'When you need BayX, it\'s there. No excuses. Your workshop depends on it.',
              },
              {
                icon: Target,
                title: 'Stay Simple',
                description: 'We fight complexity. If something feels confusing, we haven\'t done our job yet.',
              },
              {
                icon: Heart,
                title: 'Care Deeply',
                description: 'We\'re not just building software. We genuinely care about helping you succeed.',
              },
            ].map((value, index) => (
              <RevealAnimation key={value.title} delay={0.2 + index * 0.1}>
                <div className="bg-background-1 dark:bg-background-6 rounded-xl p-6 border border-stroke-3 dark:border-stroke-7 hover:border-primary-500 transition-colors">
                  <div className="bg-primary-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="text-heading-6 text-secondary dark:text-accent mb-2">{value.title}</h3>
                  <p className="text-tagline-2 text-secondary/70 dark:text-accent/70">{value.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose BayX */}
      <section className="py-16 md:py-20 lg:py-24 bg-background-1 dark:bg-background-6">
        <div className="main-container">
          <div className="max-w-4xl mx-auto">
            <RevealAnimation delay={0.1}>
              <div className="text-center mb-12">
                <h2 className="text-heading-3 sm:text-heading-2 text-secondary dark:text-accent mb-4">
                  Why People Choose BayX
                </h2>
                <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">
                  We let our work speak for itself. Here's what matters to our users:
                </p>
              </div>
            </RevealAnimation>

            <div className="space-y-4">
              {[
                'Built by people who actually understand how workshops run',
                'Works the way you work, not the other way around',
                'Your data stays secure with enterprise-grade protection',
                'New features and improvements ship regularly based on your feedback',
                'Real humans answer when you need help',
                'Honest pricing with no surprises or hidden fees',
                'Access your workshop from anywhere, on any device',
                'Try it free for 14 days and see for yourself',
              ].map((point, index) => (
                <RevealAnimation key={index} delay={0.2 + index * 0.05}>
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-6 h-6 text-primary-500 shrink-0 mt-0.5" />
                    <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">{point}</p>
                  </div>
                </RevealAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[50px] md:py-20 lg:py-28 dark:bg-background-5 bg-background-1" aria-label="cta section">
        <div className="main-container">
          <div className="flex flex-col items-center justify-center gap-8 text-center">
            <div className="mx-3 max-w-[649px] space-y-3 sm:mx-0 md:w-full">
              <RevealAnimation delay={0.1}>
                <span className="badge badge-green-v2">Get started</span>
              </RevealAnimation>
              <div className="space-y-3">
                <RevealAnimation delay={0.2}>
                  <h2 className="md:text-heading-2 text-heading-5" aria-label="cta-heading">
                    Ready to streamline your shop?
                  </h2>
                </RevealAnimation>
                <RevealAnimation delay={0.3}>
                  <p aria-label="cta-description">
                    Join our early access program and lock in founding member rates.
                  </p>
                </RevealAnimation>
              </div>
            </div>
            <RevealAnimation delay={0.4}>
              <div className="group/btn-v2 inline-block rounded-full transition-transform duration-500 ease-in-out">
                <Link
                  className="btn-xl-v2 btn-primary-v2 group-hover/btn-v2:btn-secondary-v2 inline-flex h-14 cursor-pointer items-center justify-center gap-2 rounded-full px-8 text-center font-medium text-nowrap transition-all duration-500 ease-in-out"
                  href="/early-access"
                >
                  <span className="inline-block transition-transform duration-300 ease-in-out first-letter:uppercase">
                    Get Early Access
                  </span>
                  <div className="relative size-6 overflow-hidden">
                    <span className="btn-v2-icon absolute inset-0 size-6 -translate-x-6 transition-all duration-300 ease-in-out group-hover/btn-v2:translate-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M11 5H13V7H11V5Z"></path>
                        <path d="M5 5H7V7H5V5Z"></path>
                        <path d="M14 8H16V10H14V8Z"></path>
                        <path d="M8 8H10V10H8V8Z"></path>
                        <path d="M17 11H19V13H17V11Z"></path>
                        <path d="M11 11H13V13H11V11Z"></path>
                        <path d="M14 14H16V16H14V14Z"></path>
                        <path d="M8 14H10V16H8V14Z"></path>
                        <path d="M11 17H13V19H11V17Z"></path>
                        <path d="M5 17H7V19H5V17Z"></path>
                      </svg>
                    </span>
                    <span className="btn-v2-icon absolute size-6 -translate-x-2 transition-all duration-300 ease-in-out group-hover/btn-v2:translate-x-6">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M11 5H13V7H11V5Z"></path>
                        <path d="M5 5H7V7H5V5Z"></path>
                        <path d="M14 8H16V10H14V8Z"></path>
                        <path d="M8 8H10V10H8V8Z"></path>
                        <path d="M17 11H19V13H17V11Z"></path>
                        <path d="M11 11H13V13H11V11Z"></path>
                        <path d="M14 14H16V16H14V14Z"></path>
                        <path d="M8 14H10V16H8V14Z"></path>
                        <path d="M11 17H13V19H11V17Z"></path>
                        <path d="M5 17H7V19H5V17Z"></path>
                      </svg>
                    </span>
                  </div>
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>
    </main>
  )
}
