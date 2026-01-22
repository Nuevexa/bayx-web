'use client';

import Link from 'next/link';

import { CheckIcon } from '@/icons';
import { cn } from '@/utils/cn';

import RevealAnimation from '../animation/RevealAnimation';

type PricingPlan = {
  id: string;
  title: string;
  description: string;
  price: string;
  featured?: boolean;
  features: {
    label: string;
    active: boolean;
  }[];
};

const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    title: 'Basic Bay',
    description: 'For small 1-2 bay garages just getting started.',
    price: '59',
    features: [
      { label: 'Up to 2 Service Bays', active: true },
      { label: '3 Technician Accounts', active: true },
      { label: '50 Jobs per Month', active: true },
      { label: 'Drag-and-drop Job Board', active: true },
      { label: 'Customer Tracking Portal', active: true },
      { label: 'Estimates & Approvals', active: true },

    ],
  },
  {
    id: 'professional',
    title: 'Pro Bay',
    description: 'For growing shops with expanding teams.',
    price: '99',
    featured: true,
    features: [
      { label: 'Up to 5 Service Bays', active: true },
      { label: '8 Technician Accounts', active: true },
      { label: '200 Jobs per Month', active: true },
      { label: 'Profitability Analytics', active: true },
      { label: 'In-App Customer Chat', active: true },
      { label: 'Photos in Customer Portal', active: true },
      { label: 'Full Vehicle Service History', active: true },
    ],
  },
  {
    id: 'unlimited',
    title: 'Fleet Master',
    description: 'For multi-location or high-volume operations.',
    price: '149',
    features: [
      { label: 'Unlimited Service Bays', active: true },
      { label: 'Unlimited Technicians', active: true },
      { label: 'Unlimited Jobs', active: true },
      { label: 'Priority Support', active: true },
      { label: '90-Day Photo Archive', active: true },
      { label: 'Multi-location Ready', active: true },
      { label: 'Custom Integrations', active: true },
    ],
  },
];

const Pricing = () => {
  return (
    <section className="relative pt-[100px] pb-20 md:pt-[160px] md:pb-[100px] lg:pb-[150px] xl:pb-[200px]">
      <div className="main-container flex flex-col gap-[70px]">
        <div className="flex flex-col items-center text-center">
          <RevealAnimation delay={0.2}>
            <span className="badge badge-green-v2 mb-5"> Our Pricing </span>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <h2 className="mx-auto mb-4 max-w-[650px] text-heading-3">Transparent pricing for every stage of growth.</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.4}>
            <p className="text-tagline-1 text-secondary/60">
              Early access pricing — Lock in these rates as a founding member.
            </p>
          </RevealAnimation>
        </div>
        <div className="relative">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => {
              return (
                <RevealAnimation key={plan.id} delay={0.3 + index * 0.1} instant>
                  <div
                    className={cn(
                      'flex-1 rounded-[20px] max-lg:w-full',
                      plan.featured && "bg-[url('/images/ns-img-25.png')] bg-cover bg-center bg-no-repeat p-2.5",
                    )}>
                    <div
                      className={cn(
                        'rounded-[20px] p-8 min-h-[580px] flex flex-col',
                        plan.featured ? 'dark:bg-background-8 bg-white' : 'bg-background-3 dark:bg-background-5',
                      )}>
                      <h3 className="text-heading-5 mb-2 font-normal"><b>{plan.title}</b></h3>
                      <p
                        className={cn(
                          'mb-6 max-w-[250px] min-h-[48px]',
                          'text-secondary/60 dark:text-accent/60',
                        )}>
                        {plan.description}
                      </p>
                      <div className="mb-7">
                        <span className="badge badge-green-v2 mb-3 inline-block text-xs">Early Access Pricing</span>
                        <h4 className="text-heading-4 font-normal">
                          <b>$<span>{plan.price}</span></b>
                        </h4>
                        <p className="text-secondary dark:text-accent">Per Month</p>
                      </div>
                      <Link
                        href="/early-access"
                        className={cn(
                          'btn btn-md mb-8 block w-full text-center capitalize before:content-none',
                          plan.featured
                            ? 'btn-secondary dark:btn-accent hover:btn-primary'
                            : 'btn-white dark:btn-white-dark hover:btn-secondary dark:hover:btn-accent',
                        )}>
                        Get Early Access
                      </Link>
                      <ul className="relative list-none space-y-2.5">
                        {plan.features.map((feature) => (
                          <li key={`${plan.id}-${feature.label}`} className="flex items-center gap-2.5">
                            <span
                              className={cn(
                                'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                                feature.active
                                  ? 'bg-secondary dark:bg-accent'
                                  : 'border-secondary/20 dark:border-accent/20 dark:bg-background-9 border bg-white',
                              )}>
                              <CheckIcon className={cn(!feature.active && 'fill-secondary/60 dark:fill-accent/60')} />
                            </span>
                            <span
                              className={cn(
                                'text-tagline-1 font-normal',
                                feature.active
                                  ? 'text-secondary dark:text-accent'
                                  : 'text-secondary/60 dark:text-accent/60',
                              )}>
                              {feature.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </RevealAnimation>
              );
            })}
          </div>
        </div>
      </div>
    </section >
  );
};

export default Pricing;
