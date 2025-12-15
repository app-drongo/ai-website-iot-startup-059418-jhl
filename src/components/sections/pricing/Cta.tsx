'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, Zap, Clock } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { useState } from 'react';

const DEFAULT_CTA = {
  title: 'Ready to Transform Your Tech Stack?',
  subtitle: "Join thousands of developers who've already upgraded their workflow",
  description:
    'Get instant access to our premium features and save 35% with annual billing. No setup fees, no hidden costs.',
  discountBadge: '35% OFF Annual',
  discountText: 'Save $420/year with annual billing',
  primaryCtaText: 'Start Free Trial',
  primaryCtaHref: '/signup',
  secondaryCtaText: 'View Pricing',
  secondaryCtaHref: '/pricing',
  features: ['14-day free trial', 'Cancel anytime', 'Premium support included'],
  urgencyText: 'Limited time offer',
  trustText: 'Trusted by 50,000+ developers',
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

  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl max-w-4xl mx-auto">
          <CardContent className="p-8 sm:p-12 lg:p-16">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 px-4 py-2"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  <span data-editable="discountBadge">{config.discountBadge}</span>
                </Badge>
                <Badge variant="outline" className="border-accent text-accent-foreground px-3 py-1">
                  <Clock className="w-3 h-3 mr-1" />
                  <span data-editable="urgencyText">{config.urgencyText}</span>
                </Badge>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                <span data-editable="title">{config.title}</span>
              </h2>

              <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
                <span data-editable="subtitle">{config.subtitle}</span>
              </p>

              <p className="text-lg text-foreground/80 mb-8">
                <span data-editable="description">{config.description}</span>
              </p>

              <div className="bg-accent/20 border border-accent/30 rounded-lg p-4 mb-8 inline-block">
                <p className="text-accent-foreground font-semibold">
                  <span data-editable="discountText">{config.discountText}</span>
                </p>
              </div>
            </div>

            {/* Features List */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {config.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                  <div className="bg-primary/10 rounded-full p-1">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span data-editable={`features[${idx}]`} className="text-sm font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={handlePrimaryClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                data-editable-href="primaryCtaHref"
                data-href={config.primaryCtaHref}
              >
                <span data-editable="primaryCtaText">{config.primaryCtaText}</span>
                <ArrowRight
                  className={`w-5 h-5 ml-2 transition-transform duration-300 ${
                    isHovered ? 'translate-x-1' : ''
                  }`}
                />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg font-medium transition-all duration-300"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Trust Signal */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                <span data-editable="trustText">{config.trustText}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
