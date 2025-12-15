'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Zap, Shield, Rocket } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_CTA = {
  companyName: 'Drongo',
  title: 'Ready to Transform Your Business?',
  subtitle:
    'Join thousands of companies already using Drongo to accelerate their growth and streamline operations.',
  description:
    'Get started with our comprehensive platform designed for modern businesses. No setup fees, cancel anytime.',
  primaryCtaText: 'Start Free Trial',
  primaryCtaHref: '/signup',
  secondaryCtaText: 'Schedule Demo',
  secondaryCtaHref: '/demo',
  features: ['30-day free trial', 'No credit card required', '24/7 expert support'],
  trustBadges: [
    { icon: 'shield', text: 'Enterprise Security' },
    { icon: 'zap', text: 'Lightning Fast' },
    { icon: 'rocket', text: 'Scale Ready' },
  ],
  testimonialText: 'Drongo helped us increase efficiency by 300% in just 3 months.',
  testimonialAuthor: 'Sarah Chen',
  testimonialRole: 'CTO, TechFlow Inc',
} as const;

type CtaProps = Partial<typeof DEFAULT_CTA>;

export default function Cta(props: CtaProps) {
  const config = { ...DEFAULT_CTA, ...props };
  const navigate = useSmartNavigation();
  const [isHovered, setIsHovered] = useState(false);

  const handlePrimaryClick = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return <Shield className="h-5 w-5" />;
      case 'zap':
        return <Zap className="h-5 w-5" />;
      case 'rocket':
        return <Rocket className="h-5 w-5" />;
      default:
        return <Zap className="h-5 w-5" />;
    }
  };

  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              <span data-editable="companyName">{config.companyName}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              <span data-editable="title">{config.title}</span>
            </h2>

            <p className="text-lg sm:text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              <span data-editable="subtitle">{config.subtitle}</span>
            </p>

            <p className="text-muted-foreground max-w-2xl mx-auto">
              <span data-editable="description">{config.description}</span>
            </p>
          </div>

          {/* Main CTA Card */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
            <CardContent className="p-8 sm:p-12">
              {/* Features List */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {config.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-2 w-2 bg-primary rounded-full" />
                    <span data-editable={`features[${idx}]`}>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 group"
                  onClick={handlePrimaryClick}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  data-editable-href="primaryCtaHref"
                  data-href={config.primaryCtaHref}
                >
                  <span data-editable="primaryCtaText">{config.primaryCtaText}</span>
                  <ArrowRight
                    className={`ml-2 h-4 w-4 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`}
                  />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                  onClick={handleSecondaryClick}
                  data-editable-href="secondaryCtaHref"
                  data-href={config.secondaryCtaHref}
                >
                  <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {config.trustBadges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="text-primary">{getIcon(badge.icon)}</div>
                    <span data-editable={`trustBadges[${idx}].text`}>{badge.text}</span>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="text-center border-t border-border/50 pt-8">
                <blockquote className="text-foreground font-medium mb-3">
                  "<span data-editable="testimonialText">{config.testimonialText}</span>"
                </blockquote>
                <cite className="text-sm text-muted-foreground not-italic">
                  <span data-editable="testimonialAuthor">{config.testimonialAuthor}</span>
                  {', '}
                  <span data-editable="testimonialRole">{config.testimonialRole}</span>
                </cite>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Note */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">Trusted by 10,000+ businesses worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
}
