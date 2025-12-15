'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, Shield, Zap, BarChart3, Globe, Settings } from 'lucide-react';

const DEFAULT_FEATURES = {
  sectionTitle: 'Powerful IoT Capabilities Built for Scale',
  sectionSubtitle: 'Everything you need to deploy, manage, and optimize your IoT infrastructure',
  features: [
    {
      icon: 'Cpu',
      title: 'Edge Computing',
      description:
        'Process data locally with our advanced edge computing platform, reducing latency and improving response times for critical IoT applications.',
      badge: 'Real-time',
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description:
        'Bank-grade encryption and multi-layer security protocols protect your IoT devices and data from cyber threats and unauthorized access.',
      badge: 'Secure',
    },
    {
      icon: 'Zap',
      title: 'Instant Deployment',
      description:
        'Deploy thousands of IoT devices in minutes with our automated provisioning system and zero-touch configuration capabilities.',
      badge: 'Fast',
    },
    {
      icon: 'BarChart3',
      title: 'Advanced Analytics',
      description:
        'Transform raw sensor data into actionable insights with machine learning algorithms and predictive analytics dashboards.',
      badge: 'Smart',
    },
    {
      icon: 'Globe',
      title: 'Global Connectivity',
      description:
        'Connect devices worldwide with support for 5G, LoRaWAN, NB-IoT, and satellite networks for comprehensive coverage.',
      badge: 'Connected',
    },
    {
      icon: 'Settings',
      title: 'Device Management',
      description:
        'Monitor, update, and control your entire IoT fleet from a single dashboard with remote diagnostics and OTA updates.',
      badge: 'Managed',
    },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };

  const getIcon = (iconName: string) => {
    const icons = {
      Cpu,
      Shield,
      Zap,
      BarChart3,
      Globe,
      Settings,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Cpu;
    return <IconComponent className="h-8 w-8 text-primary" />;
  };

  return (
    <section id="features" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="sectionTitle">{config.sectionTitle}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="sectionSubtitle">{config.sectionSubtitle}</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {config.features.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-card text-card-foreground border-border hover:bg-accent/5 transition-colors duration-300 group"
            >
              <CardContent className="p-8">
                {/* Icon and Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                    {getIcon(feature.icon)}
                  </div>
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    <span data-editable={`features[${idx}].badge`}>{feature.badge}</span>
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    <span data-editable={`features[${idx}].description`}>
                      {feature.description}
                    </span>
                  </p>
                </div>

                {/* Hover Effect Line */}
                <div className="mt-6 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Accent */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-muted text-muted-foreground rounded-full">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">Trusted by 500+ enterprises worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
}
