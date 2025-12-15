'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Simple, Transparent Pricing',
  subtitle: 'Choose the perfect plan for your startup journey',
  companyName: 'Drongo',
  billingToggle: true,
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for early-stage startups',
      monthlyPrice: 29,
      yearlyPrice: 290,
      icon: 'zap',
      popular: false,
      features: ['Up to 5 team members', '10GB storage', 'Basic analytics', 'Email support'],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=starter',
    },
    {
      name: 'Growth',
      description: 'For scaling teams and growing businesses',
      monthlyPrice: 79,
      yearlyPrice: 790,
      icon: 'star',
      popular: true,
      features: [
        'Up to 25 team members',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'Custom integrations',
      ],
      ctaText: 'Get Started',
      ctaHref: '/signup?plan=growth',
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      icon: 'crown',
      popular: false,
      features: [
        'Unlimited team members',
        '1TB storage',
        'Enterprise analytics',
        '24/7 phone support',
        'Custom integrations',
        'Dedicated account manager',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact?plan=enterprise',
    },
  ],
  faqTitle: 'Frequently Asked Questions',
  faqs: [
    {
      question: 'Can I change plans anytime?',
      answer:
        'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'We offer a 14-day free trial for all plans. No credit card required to get started.',
    },
  ],
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(true);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="h-6 w-6" />;
      case 'star':
        return <Star className="h-6 w-6" />;
      case 'crown':
        return <Crown className="h-6 w-6" />;
      default:
        return <Zap className="h-6 w-6" />;
    }
  };

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          {config.billingToggle && (
            <div className="flex items-center justify-center gap-4 mb-12">
              <span
                className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                  isYearly ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 mb-20">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative ${
                plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    {getIcon(plan.icon)}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">
                    ${isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">/{isYearly ? 'month' : 'month'}</span>
                  {isYearly && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Billed annually (${plan.yearlyPrice})
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span data-editable={`plans[${idx}].features[${featureIdx}]`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span data-editable="faqTitle">{config.faqTitle}</span>
          </h2>
          <div className="space-y-6">
            {config.faqs.map((faq, idx) => (
              <Card key={idx} className="bg-card text-card-foreground">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">
                    <span data-editable={`faqs[${idx}].question`}>{faq.question}</span>
                  </h3>
                  <p className="text-muted-foreground">
                    <span data-editable={`faqs[${idx}].answer`}>{faq.answer}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Branding */}
        <div className="text-center mt-16">
          <p className="text-sm text-muted-foreground">
            Powered by{' '}
            <span className="font-semibold text-foreground" data-editable="companyName">
              {config.companyName}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
