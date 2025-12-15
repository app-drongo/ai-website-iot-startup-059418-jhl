'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Zap, Award } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Transform Your Business with Next-Generation IoT Solutions',
  subtitle:
    'Empower your operations with intelligent sensors, real-time analytics, and seamless connectivity. Built for enterprises ready to embrace the future of connected technology.',
  ctaText: 'Start Your IoT Journey',
  ctaHref: '/get-started',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaHref: '/demo',
  heroImageUrl:
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=2125&auto=format&fit=crop',
  heroImageAlt: 'Modern IoT dashboard with connected devices visualization',
  trustIndicators: ['Enterprise-grade security', '99.9% uptime guarantee', 'ISO 27001 certified'],
  statsLabel: 'Trusted by 500+ enterprises worldwide',
  backgroundPattern: true,
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePrimaryCTA = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryCTA = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section id="hero" className="relative bg-background text-foreground overflow-hidden">
      {/* Background Pattern */}
      {config.backgroundPattern && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      )}

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-2 items-center">
          {/* Content Column */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-3">
              {config.trustIndicators.map((indicator, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground px-3 py-1 text-sm font-medium"
                >
                  {idx === 0 && <Shield className="w-3 h-3 mr-1" />}
                  {idx === 1 && <Zap className="w-3 h-3 mr-1" />}
                  {idx === 2 && <Award className="w-3 h-3 mr-1" />}
                  <span data-editable={`trustIndicators[${idx}]`}>{indicator}</span>
                </Badge>
              ))}
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span data-editable="title">{config.title}</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                <span data-editable="subtitle">{config.subtitle}</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryCTA}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold group"
              >
                <span data-editable="ctaText">{config.ctaText}</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryCTA}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg font-semibold"
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground font-medium">
                <span data-editable="statsLabel">{config.statsLabel}</span>
              </p>
            </div>
          </div>

          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <Card className="bg-card border-border shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] lg:aspect-[3/4]">
                  <Image
                    src={config.heroImageUrl}
                    alt={config.heroImageAlt}
                    data-editable-src="heroImageUrl"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />

                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-semibold shadow-lg">
                    Live Dashboard
                  </div>

                  <div className="absolute bottom-4 left-4 bg-card text-card-foreground px-4 py-3 rounded-lg shadow-lg border border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">Connected Devices: 1,247</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
