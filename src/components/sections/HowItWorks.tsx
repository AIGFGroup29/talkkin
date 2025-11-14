import React from 'react';
import { motion } from 'framer-motion';
import { Mic2, Sparkles, Users } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Mic2,
    title: 'Share Your Voice & Photos',
    description: 'Talk about your recipes, your advice, your memories. Share your pictures. Just like you\'re talking to someone on the phone.',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Your Avatar is Ready',
    description: 'We create a digital version of you that looks, sounds, and responds just like you would. Your family gets a personal link to connect with your avatar.',
  },
  {
    number: '03',
    icon: Users,
    title: 'Family Connects Anytime',
    description: 'Your granddaughter needs your pasta recipe? Your son needs your advice? Your avatar answers them, in your voice, with your wisdom. Any time of day or night.',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-support via-neutral to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-text-dark mb-4">
            Your Story, Three Simple Steps
          </h2>
          <p className="text-lg sm:text-xl text-text-light max-w-3xl mx-auto">
            Ready to get started? It's easier than you think.
          </p>
        </motion.div>

        <div className="hidden lg:block relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary transform -translate-y-1/2 z-0"></div>

          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-8 relative"
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {step.number}
                  </div>
                </div>

                <div className="pt-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-dark mb-4">
                    {step.title}
                  </h3>
                  <p className="text-text-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {step.number}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="ml-8 h-8 w-1 bg-gradient-to-b from-primary to-accent"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
