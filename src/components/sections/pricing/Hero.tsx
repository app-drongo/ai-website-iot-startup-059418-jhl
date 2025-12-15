'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Zap, Shield, Users } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Simple, Transparent Pricing',
  subtitle:
    "Choose the perfect plan for your team's needs. Scale as you grow with our flexible pricing options.",
  description:
    'No hidden fees. No surprises. Just straightforward pricing that grows with your business.',
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
  secondaryCtaText: 'View All Features',
  secondaryCtaHref: '/features',
  highlightText: 'Most Popular',
  plans: [
    {
      name: 'Starter',
      price: '$9',
      period: '/month',
      description: 'Perfect for small teams getting started',
      features: ['Up to 5 team members', '10GB storage', 'Basic analytics'],
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'Advanced features for growing businesses',
      features: ['Up to 25 team members', '100GB storage', 'Advanced analytics'],
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'Full-scale solution for large organizations',
      features: ['Unlimited team members', '1TB storage', 'Custom integrations'],
    },
  ],
  trustIndicators: [
    { icon: 'shield', text: 'Enterprise Security' },
    { icon: 'users', text: '24/7 Support' },
    { icon: 'zap', text: '99.9% Uptime' },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [selectedPlan, setSelectedPlan] = useState(1);

  const handlePlanSelect = (index: number) => {
    setSelectedPlan(index);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryCtaClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return <Shield className="w-5 h-5" />;
      case 'users':
        return <Users className="w-5 h-5" />;
      case 'zap':
        return <Zap className="w-5 h-5" />;
      default:
        return <Check className="w-5 h-5" />;
    }
  };

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            <span data-editable="title">{config.title}</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-4">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
          <p className="text-lg text-muted-foreground">
            <span data-editable="description">{config.description}</span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:gap-12 md:grid-cols-3 max-w-6xl mx-auto mb-16">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative transition-all duration-300 hover:shadow-lg cursor-pointer ${
                selectedPlan === idx ? 'ring-2 ring-primary bg-card' : 'bg-card hover:bg-accent/5'
              }`}
              onClick={() => handlePlanSelect(idx)}
            >
              {idx === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <span data-editable="highlightText">{config.highlightText}</span>
                  </Badge>
                </div>
              )}

              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-card-foreground">
                    <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                  </h3>
                  <div className="flex items-baseline justify-center mb-4">
                    <span
                      className="text-5xl font-bold text-primary"
                      data-editable={`plans[${idx}].price`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className="text-muted-foreground ml-1"
                      data-editable={`plans[${idx}].period`}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span
                        className="text-card-foreground"
                        data-editable={`plans[${idx}].features[${featureIdx}]`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    selectedPlan === idx
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  onClick={handleCtaClick}
                  data-editable-href="ctaHref"
                  data-href={config.ctaHref}
                >
                  <span data-editable="ctaText">{config.ctaText}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
          {config.trustIndicators.map((indicator, idx) => (
            <div key={idx} className="flex items-center gap-3 text-muted-foreground">
              {renderIcon(indicator.icon)}
              <span data-editable={`trustIndicators[${idx}].text`}>{indicator.text}</span>
            </div>
          ))}
        </div>

        {/* Secondary CTA */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleSecondaryCtaClick}
            data-editable-href="secondaryCtaHref"
            data-href={config.secondaryCtaHref}
            className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground"
          >
            <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
