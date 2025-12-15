'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Shield, Rocket, Code, Database, Globe } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FEATURES = {
  title: 'Drongo',
  subtitle: 'Powerful Features for Modern Tech Teams',
  description: 'Everything you need to build, deploy, and scale your applications with confidence.',
  ctaText: 'Get Started',
  ctaHref: '/signup',
  features: [
    {
      icon: 'Zap',
      title: 'Lightning Fast',
      description: 'Optimized performance with sub-second response times and intelligent caching.',
      badge: 'Performance',
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-grade encryption, SOC 2 compliance, and advanced threat protection.',
      badge: 'Security',
    },
    {
      icon: 'Rocket',
      title: 'Auto Scaling',
      description: 'Seamlessly handle traffic spikes with intelligent auto-scaling infrastructure.',
      badge: 'Infrastructure',
    },
    {
      icon: 'Code',
      title: 'Developer First',
      description:
        'Intuitive APIs, comprehensive docs, and powerful CLI tools for rapid development.',
      badge: 'DX',
    },
    {
      icon: 'Database',
      title: 'Real-time Analytics',
      description: 'Deep insights with real-time monitoring, custom dashboards, and smart alerts.',
      badge: 'Analytics',
    },
    {
      icon: 'Globe',
      title: 'Global CDN',
      description: 'Lightning-fast content delivery with 200+ edge locations worldwide.',
      badge: 'Network',
    },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };
  const navigate = useSmartNavigation();

  const getIcon = (iconName: string) => {
    const icons = {
      Zap,
      Shield,
      Rocket,
      Code,
      Database,
      Globe,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Zap;
    return <IconComponent className="h-8 w-8" />;
  };

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="features" className="bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            <span data-editable="title">{config.title}</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-6">
            <span data-editable="subtitle">{config.subtitle}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            <span data-editable="description">{config.description}</span>
          </p>
          <Button
            size="lg"
            onClick={handleCTAClick}
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span data-editable="ctaText">{config.ctaText}</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {config.features.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {getIcon(feature.icon)}
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground text-xs font-medium"
                  >
                    <span data-editable={`features[${idx}].badge`}>{feature.badge}</span>
                  </Badge>
                </div>

                <h3 className="text-xl font-bold mb-4 text-foreground">
                  <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  <span data-editable={`features[${idx}].description`}>{feature.description}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-muted text-muted-foreground rounded-2xl p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Ready to experience the power of Drongo?
            </h3>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of developers who trust Drongo for their mission-critical applications.
            </p>
            <Button
              size="lg"
              onClick={handleCTAClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
