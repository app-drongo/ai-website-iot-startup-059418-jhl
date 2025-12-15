'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FAQ = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about Drongo',
  description: "Can't find the answer you're looking for? Reach out to our customer support team.",
  contactText: 'Contact Support',
  contactHref: '/contact',
  faqs: [
    {
      question: 'What is Drongo and how does it work?',
      answer:
        'Drongo is a cutting-edge tech platform that streamlines your workflow with intelligent automation. Our AI-powered system learns from your patterns and optimizes processes in real-time, helping you achieve more with less effort.',
    },
    {
      question: 'How much does Drongo cost?',
      answer:
        'We offer flexible pricing plans to suit teams of all sizes. Our Starter plan begins at $29/month, Professional at $99/month, and Enterprise with custom pricing. All plans include a 14-day free trial with no credit card required.',
    },
    {
      question: 'Is my data secure with Drongo?',
      answer:
        'Absolutely. We use enterprise-grade encryption, SOC 2 compliance, and follow industry best practices for data security. Your data is encrypted both in transit and at rest, and we never share your information with third parties.',
    },
    {
      question: 'Can I integrate Drongo with my existing tools?',
      answer:
        'Yes! Drongo integrates seamlessly with over 100+ popular tools including Slack, Google Workspace, Microsoft 365, Salesforce, and many more. Our API also allows for custom integrations to fit your specific workflow needs.',
    },
    {
      question: 'What kind of support do you offer?',
      answer:
        'We provide 24/7 customer support via chat and email for all paid plans. Enterprise customers also get dedicated account management and priority phone support. Plus, we have extensive documentation and video tutorials to help you get started.',
    },
  ],
} as const;

type FaqProps = Partial<typeof DEFAULT_FAQ>;

export default function Faq(props: FaqProps) {
  const config = { ...DEFAULT_FAQ, ...props };
  const navigate = useSmartNavigation();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]));
  };

  const handleContactClick = () => {
    navigate(config.contactHref);
  };

  return (
    <section id="faq" className="bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-2">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
          <p className="text-muted-foreground">
            <span data-editable="description">{config.description}</span>
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {config.faqs.map((faq, index) => (
            <Card key={index} className="bg-card text-card-foreground border-border">
              <Collapsible open={openItems.includes(index)} onOpenChange={() => toggleItem(index)}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-6 h-auto text-left hover:bg-accent hover:text-accent-foreground"
                  >
                    <span className="text-lg font-semibold pr-4">
                      <span data-editable={`faqs[${index}].question`}>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                        openItems.includes(index) ? 'rotate-180' : ''
                      }`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6">
                  <CardContent className="p-0">
                    <p className="text-muted-foreground leading-relaxed">
                      <span data-editable={`faqs[${index}].answer`}>{faq.answer}</span>
                    </p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <Card className="bg-muted text-muted-foreground p-8 inline-block">
            <CardContent className="p-0">
              <div className="flex items-center justify-center mb-4">
                <MessageCircle className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-foreground">Still have questions?</h3>
              </div>
              <p className="mb-6 text-muted-foreground">
                Our team is here to help you get the most out of Drongo.
              </p>
              <Button
                onClick={handleContactClick}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-editable-href="contactHref"
                data-href={config.contactHref}
              >
                <span data-editable="contactText">{config.contactText}</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
