'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Star, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Simple, Transparent Pricing',
  subtitle: 'Choose the perfect plan for your startup journey',
  billingToggleText: 'Annual billing (35% off)',
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for early-stage startups',
      monthlyPrice: 29,
      annualPrice: 19,
      popular: false,
      features: ['Up to 5 team members', '10GB storage', 'Basic analytics', 'Email support'],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=starter',
    },
    {
      name: 'Growth',
      description: 'Ideal for scaling companies',
      monthlyPrice: 79,
      annualPrice: 51,
      popular: true,
      features: [
        'Up to 25 team members',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'Custom integrations',
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=growth',
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      monthlyPrice: 199,
      annualPrice: 129,
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
  guaranteeText: '30-day money-back guarantee',
  footerText: 'All plans include SSL, backups, and 99.9% uptime SLA',
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isAnnual, setIsAnnual] = useState(true);

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  const calculateSavings = (monthly: number, annual: number) => {
    const monthlyCost = monthly * 12;
    const savings = Math.round(((monthlyCost - annual * 12) / monthlyCost) * 100);
    return savings;
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                isAnnual ? 'bg-primary' : 'bg-muted'
              }`}
              role="switch"
              aria-checked={isAnnual}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Annual
              </span>
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                <span data-editable="billingToggleText">{config.billingToggleText}</span>
              </Badge>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative bg-card text-card-foreground border-border transition-all duration-300 hover:shadow-lg ${
                plan.popular ? 'border-primary shadow-lg scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <h3 className="text-2xl font-bold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <p className="text-muted-foreground mb-4">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>

                <div className="mb-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  {isAnnual && (
                    <div className="text-sm text-muted-foreground mt-1">
                      <span className="line-through">${plan.monthlyPrice}/month</span>
                      <span className="text-primary ml-2 font-medium">
                        Save {calculateSavings(plan.monthlyPrice, plan.annualPrice)}%
                      </span>
                    </div>
                  )}
                  {isAnnual && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Billed annually (${plan.annualPrice * 12}/year)
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  className={`w-full mb-6 ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Zap className="w-4 h-4 text-primary" />
            <span data-editable="guaranteeText">{config.guaranteeText}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            <span data-editable="footerText">{config.footerText}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
