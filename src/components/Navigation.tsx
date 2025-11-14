import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  onOpenWaitlist: () => void;
}

export const Navigation: React.FC<NavigationProps> = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/AIGF_Logo_Transparent.png" alt="TalkKin Logo" className="w-16 h-16" />
            <span className="text-2xl font-bold font-heading">
              <span className="text-accent">T</span>
              <span className="text-primary">a</span>
              <span className="text-accent">lkK</span>
              <span className="text-primary">i</span>
              <span className="text-accent">n</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-lg text-text-dark hover:text-primary transition-colors font-normal"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-lg text-text-dark hover:text-primary transition-colors font-normal"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-lg text-text-dark hover:text-primary transition-colors font-normal"
            >
              FAQ
            </button>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate('/login')}
              className="text-lg transition-colors font-normal"
              style={{ color: '#6b7280' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1f2937'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              Sign In
            </button>
            <Button variant="accent" onClick={() => navigate('/signup')}>
              GET STARTED
            </Button>
          </div>

          <button
            className="md:hidden text-text-dark focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left text-lg text-text-dark hover:text-primary transition-colors py-2"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left text-lg text-text-dark hover:text-primary transition-colors py-2"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="block w-full text-left text-lg text-text-dark hover:text-primary transition-colors py-2"
              >
                FAQ
              </button>
              <button
                onClick={() => navigate('/login')}
                className="block w-full text-left text-lg transition-colors py-2"
                style={{ color: '#6b7280' }}
              >
                Sign In
              </button>
              <Button variant="accent" className="w-full" onClick={() => navigate('/signup')}>
                GET STARTED
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
