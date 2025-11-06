import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/sections/Hero';
import { Benefits } from '../components/sections/Benefits';
import { HowItWorks } from '../components/sections/HowItWorks';
import { Features } from '../components/sections/Features';
import { Pricing } from '../components/sections/Pricing';
import { Testimonials } from '../components/sections/Testimonials';
import { FAQ } from '../components/sections/FAQ';
import { FinalCTA } from '../components/sections/FinalCTA';
import { Footer } from '../components/sections/Footer';
import { WaitlistModal } from '../components/WaitlistModal';

export const Home = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navigation onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <Hero onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <Benefits />
      <HowItWorks />
      <Features />
      <Pricing onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <Testimonials />
      <FAQ />
      <FinalCTA onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <Footer />
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </div>
  );
};
