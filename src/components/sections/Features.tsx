import React from 'react';
import { Card } from '../ui/Card';
import { MessageSquare, Volume2, BookOpen, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: MessageSquare,
    title: 'Just Speak',
    description: 'No typing. No complicated buttons. Simply record your voice and share your stories the way you naturally would. Your family talks to your avatar just like talking to you.',
  },
  {
    icon: Volume2,
    title: 'Sounds Exactly Like You',
    description: 'We use your real voice, your accent, your laugh, your way of speaking. 99% of families say the avatar sounds exactly like their loved one.',
  },
  {
    icon: BookOpen,
    title: 'Your Stories, Your Wisdom',
    description: 'Share your recipes, life advice, love stories, or family traditions. Your avatar remembers everything and answers with your exact knowledge and personality.',
  },
  {
    icon: Shield,
    title: 'Your Privacy, Protected',
    description: 'Your voice, photos, and stories are completely private and secure. Only people you choose can access your avatar. We never share your data.',
  },
];

export const Features: React.FC = () => {
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
            Powerful Features, Simple Experience
          </h2>
          <p className="text-lg sm:text-xl text-text-light max-w-3xl mx-auto">
            Everything designed to make it easy for you to create, and simple for your family to connect.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text-dark mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-text-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
