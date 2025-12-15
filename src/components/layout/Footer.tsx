'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  companyName: 'IoTech Solutions',
  tagline: 'Connecting the future with intelligent IoT solutions for modern businesses',
  description:
    'Empowering businesses with cutting-edge IoT technology and intelligent automation solutions.',

  // Company Links
  companyLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
  ],

  // Legal Links
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],

  // Social Links
  socialLinks: [
    { platform: 'GitHub', href: 'https://github.com', icon: 'github' },
    { platform: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
    { platform: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  ],

  // Contact Info
  contactInfo: {
    email: 'hello@iotechsolutions.com',
    phone: '+1 (555) 123-4567',
    address: '123 Innovation Drive, Tech Valley, CA 94000',
  },

  // Newsletter
  newsletterTitle: 'Stay Connected',
  newsletterDescription: 'Get the latest IoT insights and product updates',
  newsletterPlaceholder: 'Enter your email',
  newsletterButtonText: 'Subscribe',

  // Copyright
  copyrightText: '© 2024 IoTech Solutions. All rights reserved.',

  // Quick Links
  quickLinks: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Support', href: '/support' },
    { label: 'API', href: '/api' },
  ],
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      navigate(href);
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      default:
        return <Github className="h-5 w-5" />;
    }
  };

  return (
    <footer id="footer" className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-primary mb-2">
                <span data-editable="companyName">{config.companyName}</span>
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                <span data-editable="tagline">{config.tagline}</span>
              </p>
              <p className="text-sm text-muted-foreground max-w-md">
                <span data-editable="description">{config.description}</span>
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span data-editable="contactInfo.email">{config.contactInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span data-editable="contactInfo.phone">{config.contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span data-editable="contactInfo.address">{config.contactInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {config.quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`quickLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`quickLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
              {config.companyLinks.map((link, idx) => (
                <li key={`company-${idx}`}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`companyLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">
              <span data-editable="newsletterTitle">{config.newsletterTitle}</span>
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              <span data-editable="newsletterDescription">{config.newsletterDescription}</span>
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={config.newsletterPlaceholder}
                className="flex-1 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                data-editable="newsletterPlaceholder"
              />
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <span data-editable="newsletterButtonText">{config.newsletterButtonText}</span>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <span data-editable="copyrightText">{config.copyrightText}</span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-sm">
            {config.legalLinks.map((link, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                onClick={() => handleLinkClick(link.href)}
                data-editable-href={`legalLinks[${idx}].href`}
                data-href={link.href}
              >
                <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
              </Button>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {config.socialLinks.map((social, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                onClick={() => handleLinkClick(social.href)}
                data-editable-href={`socialLinks[${idx}].href`}
                data-href={social.href}
                aria-label={social.platform}
              >
                {getSocialIcon(social.icon)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
