import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface PricingProps {
  onOpenWaitlist: () => void;
}

export const Pricing: React.FC<PricingProps> = () => {
  const navigate = useNavigate();

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

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[32px] shadow-xl p-12 flex flex-col hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
            style={{ display: 'grid', gridTemplateRows: '55px auto auto 1fr auto' }}
          >
            <div style={{ height: '55px', marginBottom: 0 }}>
              <span style={{
                display: 'inline-flex',
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #83b3d8, #5a9bc6)',
                color: 'white',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 4px 15px rgba(131, 179, 216, 0.3)'
              }}>
                🚀 Perfect Start
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-[32px] font-extrabold text-text-dark mb-0">
                Basic Plan
              </h3>
            </div>

            <div className="mb-8">
              <p className="text-base text-text-light mb-2">One-time setup</p>
              <div className="text-5xl font-extrabold text-text-dark mb-2 leading-none">
                $97
              </div>
              <p className="text-lg text-text-light font-semibold">
                then <span style={{ color: '#83b3d8', fontWeight: '700' }}>$19/month</span>
              </p>
              <div style={{
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #e5e7eb, transparent)',
                margin: '24px 0'
              }}></div>
            </div>

            <ul className="space-y-[18px] mb-8 flex-grow">
              {[
                'Text-based avatar with your stories',
                '2 family access seats',
                'Generic avatar appearance',
                'Unlimited story uploads (up to 1GB)'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <div style={{
                    width: '28px',
                    height: '28px',
                    background: 'linear-gradient(135deg, #83b3d8, #5a9bc6)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 text-base leading-relaxed font-medium">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate('/signup')}
              className="w-full py-5 px-10 border-none rounded-full text-lg font-bold cursor-pointer uppercase tracking-wide transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #83b3d8, #5a9bc6)',
                color: 'white',
                boxShadow: '0 10px 30px rgba(131, 179, 216, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(131, 179, 216, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(131, 179, 216, 0.4)';
              }}
            >
              Get Started →
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-[32px] shadow-xl p-12 flex flex-col hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 relative"
            style={{
              display: 'grid',
              gridTemplateRows: '55px auto auto 1fr auto',
              border: '3px solid transparent',
              backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #83b3d8, #f2911b)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            <div style={{ height: '55px', marginBottom: 0 }}>
              <span style={{
                display: 'inline-flex',
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #f2911b, #ff6b35)',
                color: 'white',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 4px 15px rgba(242, 145, 27, 0.3)'
              }}>
                ✨ Most Popular
              </span>
            </div>

            <div className="mb-6">
              <h3
                className="text-[32px] font-extrabold mb-0"
                style={{
                  background: 'linear-gradient(135deg, #83b3d8, #f2911b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Premium Plan
              </h3>
            </div>

            <div className="mb-8">
              <p className="text-base text-text-light mb-2">One-time setup</p>
              <div
                className="text-5xl font-extrabold mb-2 leading-none"
                style={{
                  background: 'linear-gradient(135deg, #83b3d8, #f2911b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                $497
              </div>
              <p className="text-lg text-text-light font-semibold">
                then <span style={{ color: '#83b3d8', fontWeight: '700' }}>$59/month</span>
              </p>
              <div style={{
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #e5e7eb, transparent)',
                margin: '24px 0'
              }}></div>
            </div>

            <ul className="space-y-[18px] mb-8 flex-grow">
              {[
                'Custom video avatar with your voice',
                '5 family access seats',
                'Voice clone technology',
                'Video avatar rendering',
                'Unlimited story uploads (up to 10GB)',
                'Priority support'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <div style={{
                    width: '28px',
                    height: '28px',
                    background: 'linear-gradient(135deg, #f2911b, #ff6b35)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(242, 145, 27, 0.3)'
                  }}>
                    <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 text-base leading-relaxed font-medium">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate('/signup')}
              className="w-full py-5 px-10 border-none rounded-full text-lg font-bold cursor-pointer uppercase tracking-wide transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #f2911b, #ff6b35)',
                color: 'white',
                boxShadow: '0 10px 30px rgba(242, 145, 27, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(242, 145, 27, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(242, 145, 27, 0.4)';
              }}
            >
              Get Started →
            </button>
          </motion.div>
        </div>

        <div className="text-center mt-12 text-text-light text-[15px]">
          <p>
            Need help deciding? <span style={{
              display: 'inline-block',
              padding: '2px 8px',
              background: '#fef3c7',
              borderRadius: '4px',
              color: '#92400e',
              fontWeight: '600'
            }}>All plans</span> include our AI-powered memory preservation technology
          </p>
        </div>
      </div>
    </section>
  );
};
