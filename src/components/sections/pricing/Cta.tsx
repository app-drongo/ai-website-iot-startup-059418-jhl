'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Shield, Rocket } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_CTA = {
  badge: 'Limited Time Offer',
  title: 'Ready to Scale Your Tech Stack?',
  subtitle:
    "Join thousands of developers and startups who've accelerated their growth with our platform. Start building the future today.",
  primaryCtaText: 'Start Free Trial',
  primaryCtaHref: '/signup',
  secondaryCtaText: 'View Pricing',
  secondaryCtaHref: '/pricing',
  features: ['99.9% uptime guarantee', 'Enterprise-grade security', '24/7 developer support'],
  stats: [
    { value: '50K+', label: 'Developers' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
  ],
  trustText: 'Trusted by innovative companies worldwide',
  backgroundPattern: true,
} as const;

type CtaProps = Partial<typeof DEFAULT_CTA>;

export default function Cta(props: CtaProps) {
  const config = { ...DEFAULT_CTA, ...props };
  const navigate = useSmartNavigation();

  const handlePrimaryClick = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const getFeatureIcon = (index: number) => {
    const icons = [Shield, Zap, Rocket];
    const Icon = icons[index] || Shield;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <section
      id="cta"
      className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 lg:py-32 overflow-hidden"
    >
      {/* Background Pattern */}
      {config.backgroundPattern && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-grid-pattern bg-[length:60px_60px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>
      )}

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-6">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium"
            >
              <Zap className="w-4 h-4 mr-2" />
              <span data-editable="badge">{config.badge}</span>
            </Badge>
          </div>

          {/* Main Content */}
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              <span data-editable="title">{config.title}</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              <span data-editable="subtitle">{config.subtitle}</span>
            </p>
          </div>

          {/* Features */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {config.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                >
                  <div className="text-primary">{getFeatureIcon(idx)}</div>
                  <span data-editable={`features[${idx}]`}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={handlePrimaryClick}
                data-editable-href="primaryCtaHref"
                data-href={config.primaryCtaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span data-editable="primaryCtaText">{config.primaryCtaText}</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg font-semibold transition-all duration-300"
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
              <CardContent className="p-8">
                <div className="grid grid-cols-3 gap-8">
                  {config.stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                        <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Text */}
          <p className="text-sm text-muted-foreground font-medium">
            <span data-editable="trustText">{config.trustText}</span>
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-4 w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-8 w-3 h-3 bg-accent/40 rounded-full animate-pulse delay-1000" />
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-primary/20 rounded-full animate-pulse delay-500" />
    </section>
  );
}
