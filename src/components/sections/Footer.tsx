import React from 'react';
import { Facebook, Instagram, Shield, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-text-dark text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src="/AIGF_Logo_Transparent.png" alt="TalkKin Logo" className="w-10 h-10" />
              <span className="text-2xl font-bold font-heading">
                <span className="text-accent">T</span>
                <span className="text-primary">a</span>
                <span className="text-accent">lkK</span>
                <span className="text-primary">i</span>
                <span className="text-accent">n</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Keep your voice, wisdom, and memories alive for your family forever.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4 font-heading">
              QUICK LINKS
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="hover:text-accent transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="hover:text-accent transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4 font-heading">
              SUPPORT & INFORMATION
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Privacy & Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4 font-heading">
              TRUST & SECURITY
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>Your data is encrypted and private</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>Only family members you invite can access your avatar</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>We never share your voice or memories</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 TalkKin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
