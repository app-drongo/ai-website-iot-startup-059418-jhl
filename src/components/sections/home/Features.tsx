'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Shield, Rocket, Globe, Users, BarChart3 } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FEATURES = {
  title: 'Powerful Features for Modern Teams',
  subtitle: 'Everything you need to scale your tech startup from MVP to enterprise',
  description:
    'Our platform combines cutting-edge technology with intuitive design to help you build, deploy, and scale faster than ever before.',
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
  secondaryCtaText: 'View Pricing',
  secondaryCtaHref: '/pricing',
  features: [
    {
      id: '1',
      icon: 'Zap',
      title: 'Lightning Fast Performance',
      description:
        'Built on modern infrastructure with edge computing for sub-100ms response times globally.',
      highlights: ['99.99% uptime SLA', 'Global CDN', 'Auto-scaling'],
    },
    {
      id: '2',
      icon: 'Shield',
      title: 'Enterprise Security',
      description:
        'Bank-grade security with SOC 2 compliance, end-to-end encryption, and advanced threat protection.',
      highlights: ['SOC 2 Type II', 'Zero-trust architecture', '24/7 monitoring'],
    },
    {
      id: '3',
      icon: 'Rocket',
      title: 'Rapid Deployment',
      description:
        'Deploy in minutes with our automated CI/CD pipeline and one-click infrastructure provisioning.',
      highlights: ['One-click deploy', 'Auto rollbacks', 'Blue-green deployments'],
    },
    {
      id: '4',
      icon: 'Globe',
      title: 'Global Scale',
      description:
        'Reach users worldwide with our multi-region infrastructure and intelligent traffic routing.',
      highlights: ['15+ regions', 'Smart routing', 'Edge caching'],
    },
    {
      id: '5',
      icon: 'Users',
      title: 'Team Collaboration',
      description:
        'Built-in tools for code review, project management, and real-time collaboration across teams.',
      highlights: ['Real-time sync', 'Role-based access', 'Audit logs'],
    },
    {
      id: '6',
      icon: 'BarChart3',
      title: 'Advanced Analytics',
      description:
        'Deep insights into performance, user behavior, and business metrics with custom dashboards.',
      highlights: ['Real-time metrics', 'Custom dashboards', 'AI insights'],
    },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

const iconMap = {
  Zap,
  Shield,
  Rocket,
  Globe,
  Users,
  BarChart3,
};

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };
  const navigate = useSmartNavigation();

  const handleCtaClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryCtaClick = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section id="features" className="bg-background text-foreground py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-6">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            <span data-editable="description">{config.description}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleCtaClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleSecondaryCtaClick}
              data-editable-href="secondaryCtaHref"
              data-href={config.secondaryCtaHref}
              className="border-border hover:bg-accent hover:text-accent-foreground"
            >
              <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {config.features.map((feature, idx) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Zap;

            return (
              <Card
                key={feature.id}
                className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg mr-4">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                    </h3>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    <span data-editable={`features[${idx}].description`}>
                      {feature.description}
                    </span>
                  </p>

                  <div className="space-y-2">
                    {feature.highlights.map((highlight, highlightIdx) => (
                      <div key={highlightIdx} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span data-editable={`features[${idx}].highlights[${highlightIdx}]`}>
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-muted text-muted-foreground rounded-2xl p-8 sm:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
              Ready to transform your development workflow?
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of developers who have already accelerated their projects with our
              platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleCtaClick}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <span data-editable="ctaText">{config.ctaText}</span>
              </Button>
              <Badge
                variant="secondary"
                className="bg-secondary text-secondary-foreground px-4 py-2 text-sm"
              >
                No credit card required
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
