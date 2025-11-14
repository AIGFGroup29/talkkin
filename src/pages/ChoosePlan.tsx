import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChoosePlanPage = () => {
  const navigate = useNavigate();

  const handlePlanSelect = async (planType: 'basic' | 'premium') => {
    if (planType === 'basic') {
      navigate('/onboarding/basic');
    } else {
      navigate('/onboarding/premium');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f9fa 0%, #e3f2fd 50%, #b3e1f4 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '60px', animation: 'fadeInDown 0.8s ease' }}>
          <div style={{
            fontSize: '80px',
            fontWeight: '700',
            letterSpacing: '-2px',
            marginBottom: '48px',
            fontFamily: 'Poppins, sans-serif'
          }}>
            <span style={{ color: '#83b3d8' }}>T</span>
            <span style={{ color: '#f2911b' }}>a</span>
            <span style={{ color: '#83b3d8' }}>l</span>
            <span style={{ color: '#83b3d8' }}>k</span>
            <span style={{ color: '#83b3d8' }}>K</span>
            <span style={{ color: '#f2911b' }}>i</span>
            <span style={{ color: '#83b3d8' }}>n</span>
          </div>

          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #1f2937, #374151)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '16px',
            letterSpacing: '-1px'
          }}>
            Choose Your Plan
          </h1>
          <p style={{ fontSize: '22px', color: '#6b7280', fontWeight: '400' }}>
            Simple pricing. Start anytime.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 1024 ? '1fr 1fr' : '1fr',
          gap: '40px',
          maxWidth: window.innerWidth > 1024 ? '1100px' : '550px',
          margin: '0 auto'
        }}>

          <div style={{
            background: 'white',
            borderRadius: '32px',
            padding: '48px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            animation: 'fadeInUp 0.8s ease',
            animationDelay: '0.2s',
            animationFillMode: 'both',
            display: 'grid',
            gridTemplateRows: '55px auto auto 1fr auto',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 30px 80px rgba(131, 179, 216, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.1)';
          }}>

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

            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1f2937', margin: 0 }}>
                Basic Plan
              </h2>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '8px' }}>One-time setup</p>
              <div style={{ fontSize: '48px', fontWeight: '800', color: '#1f2937', marginBottom: '8px', lineHeight: 1 }}>
                $97
              </div>
              <p style={{ fontSize: '18px', color: '#6b7280', fontWeight: '600' }}>
                then <span style={{ color: '#83b3d8', fontWeight: '700' }}>$19/month</span>
              </p>
              <div style={{
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #e5e7eb, transparent)',
                margin: '24px 0'
              }}></div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {[
                  'Text-based avatar with your stories',
                  '2 family access seats',
                  'Generic avatar appearance',
                  'Unlimited story uploads (up to 1GB)'
                ].map((feature, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
                    <span style={{ color: '#374151', fontSize: '16px', lineHeight: '1.5', fontWeight: '500' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ alignSelf: 'end' }}>
              <button
                onClick={() => handlePlanSelect('basic')}
                style={{
                  width: '100%',
                  padding: '20px 40px',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  background: 'linear-gradient(135deg, #83b3d8, #5a9bc6)',
                  color: 'white',
                  boxShadow: '0 10px 30px rgba(131, 179, 216, 0.4)',
                  transition: 'all 0.3s ease'
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
                Begin Your Journey →
              </button>
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '32px',
            padding: '48px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            animation: 'fadeInUp 0.8s ease',
            animationDelay: '0.4s',
            animationFillMode: 'both',
            border: '3px solid transparent',
            backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #83b3d8, #f2911b)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            display: 'grid',
            gridTemplateRows: '55px auto auto 1fr auto',
            position: 'relative',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 30px 80px rgba(131, 179, 216, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.1)';
          }}>

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

            <div style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                margin: 0,
                background: 'linear-gradient(135deg, #83b3d8, #f2911b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Premium Plan
              </h2>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '8px' }}>One-time setup</p>
              <div style={{
                fontSize: '48px',
                fontWeight: '800',
                marginBottom: '8px',
                lineHeight: 1,
                background: 'linear-gradient(135deg, #83b3d8, #f2911b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                $497
              </div>
              <p style={{ fontSize: '18px', color: '#6b7280', fontWeight: '600' }}>
                then <span style={{ color: '#83b3d8', fontWeight: '700' }}>$59/month</span>
              </p>
              <div style={{
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #e5e7eb, transparent)',
                margin: '24px 0'
              }}></div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {[
                  'Custom video avatar with your voice',
                  '5 family access seats',
                  'Voice clone technology',
                  'Video avatar rendering',
                  'Unlimited story uploads (up to 10GB)',
                  'Priority support'
                ].map((feature, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
                    <span style={{ color: '#374151', fontSize: '16px', lineHeight: '1.5', fontWeight: '500' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ alignSelf: 'end' }}>
              <button
                onClick={() => handlePlanSelect('premium')}
                style={{
                  width: '100%',
                  padding: '20px 40px',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  background: 'linear-gradient(135deg, #f2911b, #ff6b35)',
                  color: 'white',
                  boxShadow: '0 10px 30px rgba(242, 145, 27, 0.4)',
                  transition: 'all 0.3s ease'
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
                Create Your Legacy →
              </button>
            </div>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '48px',
          color: '#6b7280',
          fontSize: '15px',
          animation: 'fadeIn 1.2s ease'
        }}>
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

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ChoosePlanPage;
