import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Check } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  popular?: boolean;
  features: string[];
  variant: 'outline' | 'accent';
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Get Started',
    price: '$97',
    features: [
      '1 avatar (personalized)',
      'Voice recording',
      'Photo uploads',
      'Family access (2 people)',
      'Knowledge base',
    ],
    variant: 'outline',
  },
  {
    name: 'True Connection',
    price: '$197',
    popular: true,
    features: [
      'Avatars (3)',
      'Enhanced knowledge base',
      'Priority responses',
      'Family access (5 people)',
      'Advanced learning',
      'Email + phone support',
    ],
    variant: 'accent',
  },
  {
    name: 'Complete Legacy',
    price: '$497',
    features: [
      'Multiple avatars (max 10)',
      'Family access (15 People)',
      'Video interaction',
      'Full knowledge base',
      'Priority support',
      'Legacy management',
    ],
    variant: 'outline',
  },
];

interface PricingProps {
  onOpenWaitlist: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenWaitlist }) => {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-neutral via-white to-support">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-text-dark mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg sm:text-xl text-text-light">
            Simple pricing. Start anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {tier.popular && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center z-10">
                  <Badge className="bg-accent text-white shadow-lg">
                    ⭐ MOST POPULAR
                  </Badge>
                </div>
              )}

              <div
                className={`bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col ${
                  tier.popular ? 'ring-4 ring-accent ring-opacity-50 transform scale-105' : ''
                }`}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold font-heading text-text-dark mb-4">
                    {tier.name}
                  </h3>
                  <div className="text-4xl font-bold text-primary mb-6">
                    {tier.price}
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-text-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.variant}
                  size="lg"
                  className="w-full"
                  onClick={onOpenWaitlist}
                >
                  Join Waitlist
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
