'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Simple, Transparent Pricing',
  subtitle: "Choose the perfect plan for your team's needs. No hidden fees, no surprises.",
  billingToggle: {
    monthly: 'Monthly',
    yearly: 'Yearly',
    yearlyDiscount: 'Save 20%',
  },
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small teams getting started',
      monthlyPrice: 29,
      yearlyPrice: 23,
      currency: '$',
      period: 'per user/month',
      features: [
        'Up to 5 team members',
        '10GB storage',
        'Basic analytics',
        'Email support',
        'API access',
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=starter',
      popular: false,
      icon: 'Zap',
    },
    {
      name: 'Professional',
      description: 'Advanced features for growing teams and businesses',
      monthlyPrice: 79,
      yearlyPrice: 63,
      currency: '$',
      period: 'per user/month',
      features: [
        'Up to 25 team members',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'Advanced API access',
        'Custom integrations',
        'Team collaboration tools',
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=professional',
      popular: true,
      icon: 'Star',
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      monthlyPrice: 199,
      yearlyPrice: 159,
      currency: '$',
      period: 'per user/month',
      features: [
        'Unlimited team members',
        'Unlimited storage',
        'Enterprise analytics',
        '24/7 phone support',
        'Custom API solutions',
        'SSO & advanced security',
        'Dedicated account manager',
        'Custom onboarding',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact?plan=enterprise',
      popular: false,
      icon: 'Shield',
    },
  ],
  guarantee: {
    title: '30-day money-back guarantee',
    description: 'Try risk-free with our full refund policy',
  },
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Star':
        return Star;
      case 'Shield':
        return Shield;
      case 'Zap':
      default:
        return Zap;
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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span
              className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              <span data-editable="billingToggle.monthly">{config.billingToggle.monthly}</span>
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[checked]:bg-primary"
              data-checked={isYearly}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
            <span
              className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              <span data-editable="billingToggle.yearly">{config.billingToggle.yearly}</span>
            </span>
            <Badge variant="secondary" className="ml-2">
              <span data-editable="billingToggle.yearlyDiscount">
                {config.billingToggle.yearlyDiscount}
              </span>
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto mb-16">
          {config.plans.map((plan, idx) => {
            const IconComponent = getIcon(plan.icon);
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <Card
                key={idx}
                className={`relative transition-all duration-300 hover:shadow-lg ${
                  plan.popular
                    ? 'border-primary shadow-lg scale-105'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                  </p>
                  <div className="mt-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">
                        <span data-editable={`plans[${idx}].currency`}>{plan.currency}</span>
                        {price}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        <span data-editable={`plans[${idx}].period`}>{plan.period}</span>
                      </span>
                    </div>
                    {isYearly && (
                      <p className="text-sm text-muted-foreground mt-1">Billed annually</p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
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

                  <Button
                    onClick={() => handlePlanSelect(plan.ctaHref)}
                    className={`w-full ${
                      plan.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                    }`}
                    data-editable-href={`plans[${idx}].ctaHref`}
                    data-href={plan.ctaHref}
                  >
                    <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Guarantee */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <Shield className="w-5 h-5" />
            <span className="font-medium">
              <span data-editable="guarantee.title">{config.guarantee.title}</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <span data-editable="guarantee.description">{config.guarantee.description}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
