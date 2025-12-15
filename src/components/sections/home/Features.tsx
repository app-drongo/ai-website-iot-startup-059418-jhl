'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Shield, Rocket, Star, ArrowRight } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FEATURES = {
  title: 'Powerful Features for Modern Teams',
  subtitle: 'Everything you need to build, deploy, and scale your applications with confidence',
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
  badge: 'New Features',
  features: [
    {
      icon: 'Zap',
      title: 'Lightning Fast Performance',
      description:
        'Deploy in seconds with our optimized infrastructure. 99.9% uptime guaranteed with global CDN coverage.',
      highlights: ['Sub-second deployments', 'Global edge network', 'Auto-scaling'],
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description:
        'Bank-grade security with end-to-end encryption, SOC 2 compliance, and advanced threat protection.',
      highlights: ['256-bit encryption', 'SOC 2 certified', 'Zero-trust architecture'],
    },
    {
      icon: 'Rocket',
      title: 'Developer Experience',
      description:
        'Intuitive APIs, comprehensive documentation, and tools that developers love to use every day.',
      highlights: ['RESTful APIs', 'SDK libraries', '24/7 support'],
    },
  ],
  pricing: {
    monthlyPrice: '$49',
    annualPrice: '$32',
    discount: '35% off',
    billingNote: 'Billed annually',
  },
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };
  const navigate = useSmartNavigation();

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  const getIcon = (iconName: string) => {
    const icons = {
      Zap: Zap,
      Shield: Shield,
      Rocket: Rocket,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Zap;
    return <IconComponent className="h-6 w-6" />;
  };

  return (
    <section id="features" className="bg-background text-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Star className="h-3 w-3 mr-1" />
            <span data-editable="badge">{config.badge}</span>
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            <span data-editable="title">{config.title}</span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {config.features.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  {getIcon(feature.icon)}
                </div>

                <h3 className="text-xl font-semibold mb-4">
                  <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  <span data-editable={`features[${idx}].description`}>{feature.description}</span>
                </p>

                <ul className="space-y-2">
                  {feature.highlights.map((highlight, highlightIdx) => (
                    <li key={highlightIdx} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span data-editable={`features[${idx}].highlights[${highlightIdx}]`}>
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing CTA */}
        <div className="text-center">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 max-w-md mx-auto mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl font-bold text-muted-foreground line-through">
                <span data-editable="pricing.monthlyPrice">{config.pricing.monthlyPrice}</span>
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-3xl font-bold text-primary">
                <span data-editable="pricing.annualPrice">{config.pricing.annualPrice}</span>
                <span className="text-sm text-muted-foreground font-normal">/month</span>
              </span>
            </div>

            <Badge variant="destructive" className="mb-2">
              <span data-editable="pricing.discount">{config.pricing.discount}</span>
            </Badge>

            <p className="text-sm text-muted-foreground">
              <span data-editable="pricing.billingNote">{config.pricing.billingNote}</span>
            </p>
          </div>

          <Button
            size="lg"
            onClick={handleCTAClick}
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
          >
            <span data-editable="ctaText">{config.ctaText}</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
