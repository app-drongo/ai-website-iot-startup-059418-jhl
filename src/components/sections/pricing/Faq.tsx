'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, HelpCircle, Star, Check } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FAQ = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about our pricing and features',
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
  discountBadge: '35% OFF Annual Plans',
  faqs: [
    {
      id: 'pricing',
      question: 'How much does it cost?',
      answer:
        "Our plans start at $29/month for the Starter plan, $79/month for Pro, and $199/month for Enterprise. Save 35% when you pay annually - that's just $18.85/month for Starter, $51.35/month for Pro, and $129.35/month for Enterprise.",
    },
    {
      id: 'annual-discount',
      question: "What's included in the 35% annual discount?",
      answer:
        'When you choose annual billing, you get 35% off all plans plus priority support, extended data retention, and access to beta features. The discount applies automatically at checkout and renews at the same rate.',
    },
    {
      id: 'features',
      question: 'What features are included in each plan?',
      answer:
        'Starter includes core analytics, 10K events/month, and email support. Pro adds advanced reporting, 100K events/month, integrations, and chat support. Enterprise includes everything plus custom limits, dedicated support, and SSO.',
    },
    {
      id: 'trial',
      question: 'Do you offer a free trial?',
      answer:
        "Yes! All plans come with a 14-day free trial. No credit card required. You'll have full access to all features during your trial period.",
    },
    {
      id: 'cancellation',
      question: 'Can I cancel anytime?',
      answer:
        "Absolutely. You can cancel your subscription at any time from your account settings. For annual plans, you'll continue to have access until the end of your billing period.",
    },
    {
      id: 'support',
      question: 'What kind of support do you provide?',
      answer:
        'We offer email support for all plans, live chat for Pro and Enterprise, and dedicated account management for Enterprise customers. Our average response time is under 2 hours.',
    },
  ],
} as const;

type FaqProps = Partial<typeof DEFAULT_FAQ>;

export default function Faq(props: FaqProps) {
  const config = { ...DEFAULT_FAQ, ...props };
  const navigate = useSmartNavigation();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="faq" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            <span data-editable="discountBadge">{config.discountBadge}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {config.faqs.map((faq, idx) => {
            const isOpen = openItems.has(faq.id);

            return (
              <Card key={faq.id} className="bg-card text-card-foreground border-border">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-accent/50 transition-colors rounded-lg"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <h3 className="text-lg font-semibold pr-4">
                      <span data-editable={`faqs[${idx}].question`}>{faq.question}</span>
                    </h3>

                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      className="px-6 pb-6 pt-0 animate-in slide-in-from-top-2 duration-200"
                    >
                      <div className="text-muted-foreground leading-relaxed">
                        <span data-editable={`faqs[${idx}].answer`}>{faq.answer}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>

            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start your free trial today and experience all features risk-free for 14 days.
            </p>

            <Button
              onClick={handleCtaClick}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <Check className="w-4 h-4 mr-2" />
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
