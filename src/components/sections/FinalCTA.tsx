import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Play } from 'lucide-react';

interface FinalCTAProps {
  onOpenWaitlist: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-gradient-to-r from-primary via-secondary to-accent relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white leading-tight">
            Keep Your Stories Alive Forever
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto">
            Your voice, your wisdom, your memories, preserved and accessible to your family always.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          <p className="text-sm text-white/80 pt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};
