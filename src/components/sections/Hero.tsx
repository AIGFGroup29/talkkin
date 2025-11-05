import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Play } from 'lucide-react';

interface HeroProps {
  onOpenWaitlist: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWaitlist }) => {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-neutral via-white to-support pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-text-dark leading-tight">
              Turn Family Wisdom Into <span className="text-accent">Living Conversations</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-light leading-relaxed">
              Create a personalized digital version of yourself that looks, sounds, and talks just like you, so your family can ask for your stories, recipes, and advice anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" onClick={onOpenWaitlist}>
                Join The Waitlist
              </Button>
              <Button variant="outline" size="lg" className="flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="p-1 bg-gradient-to-br from-primary via-accent to-secondary rounded-3xl shadow-2xl">
              <div className="aspect-square rounded-[1.375rem] overflow-hidden bg-white">
                <img
                  src="https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Multigenerational family enjoying time together"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary rounded-full opacity-20 blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
