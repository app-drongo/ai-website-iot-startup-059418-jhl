'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Zap, Shield, Rocket } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Transform Your Startup with AI-Powered Solutions',
  subtitle:
    'Build, scale, and optimize your tech startup with cutting-edge tools designed for modern entrepreneurs',
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaHref: '/demo',
  heroImageUrl:
    'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  heroImageAlt: 'Modern tech workspace with multiple screens showing analytics',
  features: ['AI-Powered Analytics', 'Real-time Collaboration', 'Enterprise Security'],
  trustBadge: 'Trusted by 10,000+ startups',
  annualDiscount: '35% OFF',
  discountText: 'Save 35% with annual billing',
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handlePrimaryClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Column */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Trust Badge */}
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <Shield className="w-3 h-3 mr-1" />
                <span data-editable="trustBadge">{config.trustBadge}</span>
              </Badge>
              <Badge
                variant="outline"
                className="bg-accent text-accent-foreground border-accent animate-pulse"
              >
                <Zap className="w-3 h-3 mr-1" />
                <span data-editable="annualDiscount">{config.annualDiscount}</span>
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span data-editable="title">{config.title}</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                <span data-editable="subtitle">{config.subtitle}</span>
              </p>
            </div>

            {/* Features List */}
            <div className="flex flex-wrap gap-4">
              {config.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-muted/50 text-muted-foreground px-3 py-2 rounded-full text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span data-editable={`features[${idx}]`}>{feature}</span>
                </div>
              ))}
            </div>

            {/* Discount Banner */}
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Rocket className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      <span data-editable="discountText">{config.discountText}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Limited time offer for new customers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryClick}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span data-editable="ctaText">{config.ctaText}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>
          </div>

          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative">
              {/* Background Decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl opacity-30"></div>

              {/* Main Image */}
              <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={config.heroImageUrl}
                  alt={config.heroImageAlt}
                  data-editable-src="heroImageUrl"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-foreground">Live</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">AI Powered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
