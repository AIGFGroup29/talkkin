import React from 'react';
import { Card } from '../ui/Card';
import { Smartphone, Mic, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  {
    icon: Smartphone,
    title: 'Easy to Use',
    description: 'Simply record your voice and share your stories. No typing, no complicated steps. If you can make a phone call, you can create your personal avatar.',
  },
  {
    icon: Mic,
    title: 'Sounds Just Like You',
    description: 'Your avatar uses your real voice, your expressions, and your personality. Family will recognize you immediately, 99% say it sounds exactly like them.',
  },
  {
    icon: Heart,
    title: 'Always There for Family',
    description: 'Your grandchildren can ask for your pasta recipe at midnight. Your kids can hear your advice whenever they need it. You\'re always available to help.',
  },
];

export const Benefits: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-text-dark mb-4">
            Why Choose TalkKin
          </h2>
          <p className="text-lg sm:text-xl text-text-light max-w-3xl mx-auto">
            Keep your stories, voice, and wisdom alive so your loved ones can connect with you anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-dark mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-text-light leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
