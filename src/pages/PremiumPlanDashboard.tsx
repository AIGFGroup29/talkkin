import React, { useState } from 'react';
import { MessageCircle, Users, Settings, CreditCard, Send, Check, Upload, LogOut, Video, Volume2, VolumeX, Download, Trash2, Lock, Sparkles, TrendingUp } from 'lucide-react';

const PremiumPlanDashboard = () => {
  const [activeTab, setActiveTab] = useState('interact');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { role: 'assistant', content: "Hello! I'm your AI digital twin. I can share memories from my life and answer questions about my experiences. What would you like to know?" }
  ]);
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [avatarName, setAvatarName] = useState('Grandma Rose');
  const [tempAvatarName, setTempAvatarName] = useState('Grandma Rose');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const sendMsg = () => {
    if (!message.trim()) return;
    setIsAvatarSpeaking(true);
    setChat([...chat,
      { role: 'user', content: message },
      { role: 'assistant', content: "That's a wonderful question! Based on my memories, I remember..." }
    ]);
    setMessage('');
    setTimeout(() => setIsAvatarSpeaking(false), 3000);
  };

  const saveAvatarSettings = () => {
    setAvatarName(tempAvatarName);
    setShowSaveSuccess(true);
    setTimeout(() => {
      setShowSaveSuccess(false);
    }, 3000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f9fa' }}>
      {showSaveSuccess && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 1000,
          animation: 'slideInRight 0.3s ease-out'
        }}>
          <Check style={{ width: '24px', height: '24px' }} />
          <div>
            <p style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>Settings Saved!</p>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Avatar name updated to "{avatarName}"</p>
          </div>
        </div>
      )}

      <div style={{
        background: 'linear-gradient(135deg, #83b3d8 0%, #f2911b 100%)',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(131, 179, 216, 0.3)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <Video style={{ width: '28px', height: '28px', color: '#83b3d8' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0 }}>TalkKin</h1>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', margin: 0 }}>Premium Digital Twin</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: 'white', margin: 0 }}>Premium Plan</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', margin: 0 }}>4 of 5 family seats</p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#83b3d8',
              fontWeight: 'bold',
              fontSize: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              JD
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: 'white', borderBottom: '2px solid #b3e1f4', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {[
            { id: 'interact', icon: Video, label: 'Chat with Avatar' },
            { id: 'family', icon: Users, label: 'Family Access' },
            { id: 'settings', icon: Settings, label: 'Settings' },
            { id: 'billing', icon: CreditCard, label: 'Billing' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 24px',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                borderBottom: activeTab === id ? '4px solid #f2911b' : '4px solid transparent',
                color: activeTab === id ? '#1f2937' : '#6b7280',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Icon style={{ width: '20px', height: '20px' }} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>

        {activeTab === 'interact' && (
          <div>
            <div style={{
              background: 'linear-gradient(135deg, #83b3d8 0%, #f2911b 100%)',
              borderRadius: '32px',
              padding: '48px',
              marginBottom: '32px',
              boxShadow: '0 20px 60px rgba(131, 179, 216, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '300px',
                height: '300px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                filter: 'blur(60px)'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-100px',
                left: '-100px',
                width: '400px',
                height: '400px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '50%',
                filter: 'blur(80px)'
              }}></div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', margin: 0 }}>{avatarName}</h2>
                      <Sparkles style={{ width: '28px', height: '28px', color: 'rgba(255,255,255,0.8)' }} />
                    </div>
                    <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', margin: 0 }}>Ready to share memories and stories</p>
                  </div>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    style={{
                      width: '56px',
                      height: '56px',
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '50%',
                      border: '2px solid rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s'
                    }}
                  >
                    {isMuted ?
                      <VolumeX style={{ width: '24px', height: '24px', color: 'white' }} /> :
                      <Volume2 style={{ width: '24px', height: '24px', color: 'white' }} />
                    }
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '32px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '280px'
                  }}>
                    <div style={{
                      width: '140px',
                      height: '140px',
                      background: 'rgba(255,255,255,0.25)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '24px',
                      animation: isAvatarSpeaking ? 'pulse 1.5s infinite' : 'none',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                    }}>
                      <Video style={{ width: '64px', height: '64px', color: 'white' }} />
                    </div>
                    <p style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: 'white',
                      margin: 0,
                      textAlign: 'center'
                    }}>
                      {isAvatarSpeaking ? 'Speaking...' : 'Ready to chat'}
                    </p>
                    {isAvatarSpeaking && (
                      <div style={{ display: 'flex', gap: '6px', marginTop: '16px' }}>
                        {[0, 150, 300].map((delay, idx) => (
                          <div
                            key={idx}
                            style={{
                              width: '8px',
                              height: '8px',
                              background: 'white',
                              borderRadius: '50%',
                              animation: `bounce 1s infinite ${delay}ms`
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {[
                      { icon: MessageCircle, value: '247', label: 'Conversations', color: 'rgba(255,255,255,0.9)' },
                      { icon: Upload, value: '156', label: 'Memories', color: 'rgba(255,255,255,0.9)' },
                      { icon: Users, value: '4/5', label: 'Family Access', color: 'rgba(255,255,255,0.9)' },
                      { icon: TrendingUp, value: '+23%', label: 'This Month', color: 'rgba(255,255,255,0.9)' }
                    ].map(({ icon: Icon, value, label }, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'rgba(255,255,255,0.15)',
                          backdropFilter: 'blur(20px)',
                          borderRadius: '16px',
                          padding: '20px',
                          border: '1px solid rgba(255,255,255,0.2)',
                          textAlign: 'center'
                        }}
                      >
                        <Icon style={{ width: '28px', height: '28px', color: 'white', margin: '0 auto 12px' }} />
                        <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: '0 0 4px 0' }}>{value}</p>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '32px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '32px 32px 24px',
                borderBottom: '2px solid #b3e1f4',
                background: 'linear-gradient(to bottom, #f8fbfc, white)'
              }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: '0 0 8px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <Video style={{ width: '28px', height: '28px', color: '#83b3d8' }} />
                  Chat History
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                  Conversing with your premium digital twin
                </p>
              </div>

              <div style={{
                padding: '32px',
                minHeight: '400px',
                maxHeight: '500px',
                overflowY: 'auto',
                background: '#f8fbfc'
              }}>
                {chat.map((msg, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      maxWidth: '75%',
                      padding: '18px 24px',
                      borderRadius: '24px',
                      background: msg.role === 'user'
                        ? 'linear-gradient(135deg, #83b3d8, #f2911b)'
                        : 'white',
                      color: msg.role === 'user' ? 'white' : '#1f2937',
                      boxShadow: msg.role === 'user'
                        ? '0 4px 16px rgba(131, 179, 216, 0.3)'
                        : '0 2px 12px rgba(0,0,0,0.08)',
                      border: msg.role === 'assistant' ? '1px solid #e5e7eb' : 'none',
                      fontSize: '15px',
                      lineHeight: '1.6'
                    }}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                padding: '24px 32px',
                borderTop: '2px solid #b3e1f4',
                background: 'white'
              }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMsg()}
                    placeholder="Ask about memories, stories, experiences..."
                    style={{
                      flex: 1,
                      padding: '18px 28px',
                      border: '2px solid #b3e1f4',
                      borderRadius: '9999px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      background: '#f8fbfc'
                    }}
                  />
                  <button
                    onClick={sendMsg}
                    disabled={!message.trim()}
                    style={{
                      background: message.trim() ? 'linear-gradient(135deg, #83b3d8, #f2911b)' : '#d1d5db',
                      color: 'white',
                      padding: '18px',
                      borderRadius: '50%',
                      border: 'none',
                      cursor: message.trim() ? 'pointer' : 'not-allowed',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: message.trim() ? '0 4px 16px rgba(131, 179, 216, 0.4)' : 'none',
                      transition: 'all 0.3s'
                    }}
                  >
                    <Send style={{ width: '24px', height: '24px' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'family' && (
          <div style={{
            background: 'white',
            borderRadius: '32px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            padding: '48px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>Family Access</h2>
              <p style={{ fontSize: '18px', color: '#6b7280', margin: 0 }}>Share your AI digital twin with up to 5 family members</p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #b3e1f4 0%, #83b3d8 100%)',
              borderRadius: '24px',
              padding: '40px',
              marginBottom: '40px',
              boxShadow: '0 8px 24px rgba(131, 179, 216, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                <h3 style={{ fontSize: '28px', fontWeight: '600', color: '#1f2937', margin: 0 }}>Available Seats</h3>
                <span style={{ fontSize: '56px', fontWeight: 'bold', color: '#1f2937' }}>5 / 5</span>
              </div>
              <div style={{ width: '100%', height: '16px', background: 'rgba(255,255,255,0.4)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{
                  width: '80%',
                  height: '100%',
                  background: 'linear-gradient(to right, #83b3d8, #f2911b)',
                  transition: 'width 0.5s ease'
                }}></div>
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '10px'
              }}>
                Family Member's Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  border: '2px solid #b3e1f4',
                  borderRadius: '16px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '10px'
              }}>
                Family Member's Email
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  border: '2px solid #b3e1f4',
                  borderRadius: '16px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>

            <div style={{
              background: '#b3e1f4',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '32px'
            }}>
              <label style={{ display: 'flex', gap: '16px', cursor: 'pointer', alignItems: 'flex-start' }}>
                <input type="checkbox" style={{
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  marginTop: '2px'
                }} />
                <div>
                  <p style={{
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 6px 0',
                    fontSize: '16px'
                  }}>
                    Allow conversations to enrich main memory
                  </p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>
                    When enabled, family conversations can add to your avatar's knowledge base. Recommended: OFF for privacy.
                  </p>
                </div>
              </label>
            </div>

            <button style={{
              width: '100%',
              background: 'linear-gradient(135deg, #83b3d8, #f2911b)',
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
              padding: '20px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(131, 179, 216, 0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              Send Invitation
            </button>

            <div style={{
              marginTop: '48px',
              paddingTop: '48px',
              borderTop: '2px solid #b3e1f4'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Users style={{ width: '28px', height: '28px', color: '#83b3d8' }} />
                Active Members
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: 'Sarah Johnson', email: 'sarah.j@email.com', status: 'Active' },
                  { name: 'Michael Chen', email: 'm.chen@email.com', status: 'Active' },
                  { name: 'Emily Davis', email: 'emily.davis@email.com', status: 'Active' },
                  { name: 'Robert Martinez', email: 'r.martinez@email.com', status: 'Pending' }
                ].map((member, idx) => (
                  <div key={idx} style={{
                    background: '#f8fbfc',
                    borderRadius: '16px',
                    padding: '20px',
                    border: '2px solid #b3e1f4',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}>
                    <div>
                      <p style={{ fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0', fontSize: '16px' }}>
                        {member.name}
                      </p>
                      <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                        {member.email}
                      </p>
                    </div>
                    <span style={{
                      padding: '6px 16px',
                      borderRadius: '9999px',
                      fontSize: '14px',
                      fontWeight: '600',
                      background: member.status === 'Active' ? '#d1fae5' : '#fed7aa',
                      color: member.status === 'Active' ? '#065f46' : '#92400e'
                    }}>
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              padding: '40px'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Video style={{ width: '28px', height: '28px', color: '#83b3d8' }} />
                Avatar Settings
              </h2>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  Avatar Display Name
                </label>
                <input
                  type="text"
                  value={tempAvatarName}
                  onChange={(e) => setTempAvatarName(e.target.value)}
                  placeholder="Enter avatar name"
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    border: '2px solid #b3e1f4',
                    borderRadius: '16px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                />
                <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
                  This name will appear in the chat interface
                </p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  Add More Stories
                </label>
                <button style={{
                  width: '100%',
                  padding: '16px 24px',
                  border: '2px solid #83b3d8',
                  borderRadius: '16px',
                  background: 'white',
                  color: '#83b3d8',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  transition: 'all 0.2s'
                }}>
                  <Upload style={{ width: '20px', height: '20px' }} />
                  Upload Additional Documents
                </button>
                <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
                  Supported formats: PDF, TXT, DOCX, MP3, MP4 (up to 50MB each)
                </p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  Update Voice Clone
                </label>
                <button style={{
                  width: '100%',
                  padding: '16px 24px',
                  border: '2px solid #83b3d8',
                  borderRadius: '16px',
                  background: 'white',
                  color: '#83b3d8',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  transition: 'all 0.2s'
                }}>
                  <Volume2 style={{ width: '20px', height: '20px' }} />
                  Re-record Voice Sample
                </button>
                <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
                  Record at least 30 seconds of clear speech
                </p>
              </div>

              <button
                onClick={saveAvatarSettings}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #83b3d8, #f2911b)',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: '600',
                  padding: '16px',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(131, 179, 216, 0.4)',
                  transition: 'transform 0.2s'
                }}
              >
                Save Changes
              </button>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              padding: '40px'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Settings style={{ width: '28px', height: '28px', color: '#83b3d8' }} />
                Account Settings
              </h2>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="your@email.com"
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    border: '2px solid #b3e1f4',
                    borderRadius: '16px',
                    fontSize: '16px',
                    outline: 'none',
                    background: '#f8fbfc'
                  }}
                  disabled
                />
                <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
                  Contact support to change your email address
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 0',
                borderTop: '1px solid #e5e7eb'
              }}>
                <div>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 4px 0'
                  }}>
                    Password
                  </p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                    Last changed 3 months ago
                  </p>
                </div>
                <button style={{
                  color: '#83b3d8',
                  fontWeight: '600',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '16px',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  transition: 'background 0.2s'
                }}>
                  Change Password
                </button>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 0',
                borderTop: '1px solid #e5e7eb'
              }}>
                <div>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 4px 0'
                  }}>
                    Email Notifications
                  </p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                    Receive updates about family activity
                  </p>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '56px', height: '32px' }}>
                  <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: '#83b3d8',
                    borderRadius: '34px',
                    transition: '0.4s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '',
                      height: '24px',
                      width: '24px',
                      left: '28px',
                      bottom: '4px',
                      background: 'white',
                      borderRadius: '50%',
                      transition: '0.4s'
                    }}></span>
                  </span>
                </label>
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              padding: '40px'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Lock style={{ width: '28px', height: '28px', color: '#83b3d8' }} />
                Privacy & Data
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
                Manage your data and account privacy
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: '#f8fbfc',
                  border: '2px solid #b3e1f4',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Download style={{ width: '20px', height: '20px', color: '#83b3d8' }} />
                    <span style={{ color: '#1f2937', fontWeight: '600', fontSize: '16px' }}>
                      Download All Data
                    </span>
                  </div>
                  <span style={{ color: '#6b7280', fontSize: '14px' }}>Export your memories</span>
                </button>

                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: '#fef2f2',
                  border: '2px solid #fecaca',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Trash2 style={{ width: '20px', height: '20px', color: '#ef4444' }} />
                    <span style={{ color: '#ef4444', fontWeight: '600', fontSize: '16px' }}>
                      Delete Account
                    </span>
                  </div>
                  <span style={{ color: '#991b1b', fontSize: '14px' }}>Permanent action</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div style={{
            background: 'white',
            borderRadius: '32px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            padding: '48px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>Billing & Subscription</h2>
              <p style={{ fontSize: '18px', color: '#6b7280', margin: 0 }}>Manage your plan and payment details</p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #83b3d8 0%, #f2911b 100%)',
              borderRadius: '24px',
              padding: '48px',
              color: 'white',
              marginBottom: '40px',
              boxShadow: '0 12px 40px rgba(131, 179, 216, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                filter: 'blur(40px)'
              }}></div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' }}>Premium Plan</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
                  <p style={{ fontSize: '56px', fontWeight: 'bold', margin: 0 }}>$59</p>
                  <span style={{ fontSize: '24px', fontWeight: 'normal', opacity: 0.9 }}>/month</span>
                </div>
                <p style={{ opacity: 0.9, fontSize: '16px', margin: 0 }}>Next billing: December 10, 2025</p>
              </div>
            </div>

            <div style={{
              background: '#f8fbfc',
              borderRadius: '24px',
              padding: '32px',
              marginBottom: '32px',
              border: '2px solid #b3e1f4'
            }}>
              <h4 style={{
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '24px',
                fontSize: '20px'
              }}>Plan Features</h4>
              {[
                'Custom video avatar with your voice',
                '5 family access seats',
                'Voice clone technology',
                'Video avatar rendering',
                'Unlimited story uploads',
                'Priority support'
              ].map((f, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '16px',
                  padding: '8px 0'
                }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Check style={{ width: '16px', height: '16px', color: 'white' }} />
                  </div>
                  <span style={{ fontSize: '15px', color: '#1f2937' }}>{f}</span>
                </div>
              ))}
            </div>

            <button style={{
              width: '100%',
              padding: '18px',
              border: '2px solid #b3e1f4',
              borderRadius: '16px',
              background: 'white',
              color: '#6b7280',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '16px',
              fontSize: '16px',
              transition: 'all 0.2s'
            }}>
              Manage Payment Method
            </button>

            <div style={{ textAlign: 'center', paddingTop: '32px', borderTop: '2px solid #f3f4f6' }}>
              <button style={{
                color: '#ef4444',
                fontWeight: '600',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '15px',
                padding: '8px 16px',
                borderRadius: '8px',
                transition: 'background 0.2s'
              }}>
                Cancel Subscription
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 24px',
        textAlign: 'center',
        borderTop: '2px solid #e5e7eb'
      }}>
        <button style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          color: '#6b7280',
          fontWeight: '600',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '12px 24px',
          borderRadius: '12px',
          transition: 'all 0.2s',
          fontSize: '15px'
        }}>
          <LogOut style={{ width: '20px', height: '20px' }} />
          Sign Out
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default PremiumPlanDashboard;
