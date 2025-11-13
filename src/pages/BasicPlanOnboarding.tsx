import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, MessageCircle, User, Check, Play, FileText, Volume2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const BasicPlanOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<Array<{ name: string; size: string }>>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState('');
  const [avatar, setAvatar] = useState<number | null>(null);
  const [voice, setVoice] = useState<number | null>(null);

  const questions = [
    "Let's start at the beginning. Where were you born and what was your childhood like?",
    "Tell me about your family. Who were the most important people in your early life?",
    "What was your first job? How did you choose your career path?",
    "Can you share a favorite memory from your younger years?",
    "What values or lessons do you want to pass on to future generations?"
  ];

  const avatars = [
    { id: 1, name: 'Sophia', style: 'Realistic', gender: 'Female' },
    { id: 2, name: 'James', style: 'Realistic', gender: 'Male' },
    { id: 3, name: 'Maya', style: 'Pixar', gender: 'Female' },
    { id: 4, name: 'Oliver', style: 'Pixar', gender: 'Male' }
  ];

  const voices = [
    { id: 1, name: 'Warm & Friendly', gender: 'Female' },
    { id: 2, name: 'Gentle & Calm', gender: 'Male' },
    { id: 3, name: 'Cheerful & Bright', gender: 'Female' },
    { id: 4, name: 'Wise & Thoughtful', gender: 'Male' }
  ];

  const addFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileArray = Array.from(e.target.files);
    const newFiles = fileArray.map(f => ({
      name: f.name,
      size: (f.size / 1024).toFixed(2) + ' KB'
    }));
    setFiles([...files, ...newFiles]);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.error('User not authenticated');
        return;
      }

      const documentsToInsert = fileArray.map(file => {
        const fileExtension = file.name.split('.').pop() || '';
        return {
          user_id: user.id,
          file_name: file.name,
          file_type: fileExtension,
          file_size: file.size,
          file_url: '',
          status: 'uploaded'
        };
      });

      const { error } = await supabase
        .from('rag_documents')
        .insert(documentsToInsert);

      if (error) {
        console.error('Error saving files to database:', error);
      }
    } catch (error) {
      console.error('Error in addFile:', error);
    }
  };

  const saveAnswer = async () => {
    if (!answer.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.error('User not authenticated');
        return;
      }

      const { error } = await supabase
        .from('story_answers')
        .insert({
          user_id: user.id,
          question_number: currentQ + 1,
          question_text: questions[currentQ],
          answer_text: answer.trim()
        });

      if (error) {
        console.error('Error saving answer to database:', error);
      }
    } catch (error) {
      console.error('Error in saveAnswer:', error);
    }

    setAnswers([...answers, answer]);
    setAnswer('');
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep(4);
    }
  };

  const goBackInQuestions = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setAnswer(answers[currentQ - 1] || '');
      setAnswers(answers.slice(0, -1));
    } else {
      setStep(2);
    }
  };

  return (
    <div>
      {/* Step 1: Welcome */}
      {step === 1 && (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f5f9fa, #b3e1f4)', padding: '24px' }}>
          <div style={{ maxWidth: '672px', margin: '48px auto', background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', padding: '48px' }}>

            <div style={{ width: '96px', height: '96px', background: 'linear-gradient(to bottom right, #83b3d8, #f2911b)', borderRadius: '50%', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle style={{ width: '48px', height: '48px', color: 'white' }} />
            </div>

            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', textAlign: 'center', marginBottom: '16px' }}>Welcome to TalkKin!</h1>
            <p style={{ fontSize: '20px', color: '#6b7280', textAlign: 'center', marginBottom: '32px' }}>Preserve your stories and memories in 5 simple steps</p>

            <div style={{ background: '#f5f9fa', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>What we will do together:</h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', background: '#83b3d8', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>1</div>
                <span style={{ color: '#1f2937' }}>Upload your documents and recordings</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', background: '#83b3d8', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>2</div>
                <span style={{ color: '#1f2937' }}>Share your life story through guided questions</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', background: '#83b3d8', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>3</div>
                <span style={{ color: '#1f2937' }}>Choose your avatar</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', background: '#83b3d8', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>4</div>
                <span style={{ color: '#1f2937' }}>Select a voice personality</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', background: '#83b3d8', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>5</div>
                <span style={{ color: '#1f2937' }}>Review and submit</span>
              </div>
            </div>

            <div
              onClick={() => setStep(2)}
              style={{
                width: '100%',
                background: 'linear-gradient(to right, #83b3d8, #f2911b)',
                color: 'white',
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '24px',
                borderRadius: '9999px',
                cursor: 'pointer',
                marginBottom: '12px',
                boxShadow: '0 4px 12px rgba(131, 179, 216, 0.4)'
              }}
            >
              GET STARTED →
            </div>

            <p style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>This will take about 15-20 minutes</p>
          </div>
        </div>
      )}

      {/* Step 2: Upload Documents */}
      {step === 2 && (
        <div style={{ minHeight: '100vh', background: '#f5f9fa', padding: '24px' }}>
          <div style={{ maxWidth: '896px', margin: '48px auto' }}>
            <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Step 1: Upload Your Memories</h1>
                  <p style={{ fontSize: '18px', color: '#6b7280' }}>Add documents or audio recordings</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Step 1 of 5</span>
                  <div style={{ width: '128px', height: '8px', background: '#b3e1f4', borderRadius: '9999px', marginTop: '8px' }}>
                    <div style={{ width: '20%', height: '100%', background: '#83b3d8', borderRadius: '9999px' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ border: '4px dashed #83b3d8', borderRadius: '16px', padding: '48px', textAlign: 'center', marginBottom: '24px', background: '#f5f9fa' }}>
                <Upload style={{ width: '64px', height: '64px', color: '#83b3d8', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>Drag and Drop Files Here</h3>
                <p style={{ color: '#6b7280', marginBottom: '16px' }}>or click to browse</p>
                <input
                  type="file"
                  multiple
                  onChange={addFile}
                  style={{ display: 'none' }}
                  id="file"
                />
                <label htmlFor="file" style={{ display: 'inline-block', background: '#83b3d8', color: 'white', padding: '12px 32px', borderRadius: '9999px', fontWeight: '600', cursor: 'pointer' }}>
                  Choose Files
                </label>
                <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '16px' }}>Accepted: PDF, Word, Text, Audio</p>
              </div>

              {files.length > 0 && (
                <div style={{ background: '#f5f9fa', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>Uploaded Files ({files.length})</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {files.map((file, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'white', padding: '16px', borderRadius: '12px' }}>
                        <FileText style={{ width: '32px', height: '32px', color: '#83b3d8' }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: '600', color: '#1f2937' }}>{file.name}</p>
                          <p style={{ fontSize: '14px', color: '#6b7280' }}>{file.size}</p>
                        </div>
                        <Check style={{ width: '24px', height: '24px', color: '#10b981' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ background: '#b3e1f4', borderRadius: '16px', padding: '24px', marginBottom: '32px' }}>
                <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>Tips for Great Results:</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#1f2937', lineHeight: 1.6 }}>
                  <li>Upload recipe books, journals, letters, or family documents</li>
                  <li>Audio recordings of you telling stories work wonderfully</li>
                  <li>The more content you add, the richer your avatar memory</li>
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    padding: '16px 32px',
                    borderRadius: '9999px',
                    border: '2px solid #83b3d8',
                    background: 'white',
                    color: '#83b3d8',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(to right, #83b3d8, #f2911b)',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: '600',
                    padding: '16px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(131, 179, 216, 0.4)'
                  }}
                >
                  Continue to Story Questions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Share Your Story */}
      {step === 3 && (
        <div style={{ minHeight: '100vh', background: '#f5f9fa', padding: '24px' }}>
          <div style={{ maxWidth: '896px', margin: '48px auto' }}>
            <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Step 2: Share Your Story</h1>
                  <p style={{ fontSize: '18px', color: '#6b7280' }}>Question {currentQ + 1} of {questions.length}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Step 2 of 5</span>
                  <div style={{ width: '128px', height: '8px', background: '#b3e1f4', borderRadius: '9999px', marginTop: '8px' }}>
                    <div style={{ width: '40%', height: '100%', background: '#83b3d8', borderRadius: '9999px' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ background: '#f5f9fa', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                <MessageCircle style={{ width: '32px', height: '32px', color: '#83b3d8', marginBottom: '16px' }} />
                <p style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', lineHeight: 1.6 }}>
                  {questions[currentQ]}
                </p>
              </div>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Share your thoughts here... Take your time and be as detailed as you like."
                style={{
                  width: '100%',
                  minHeight: '200px',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '2px solid #b3e1f4',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  marginBottom: '24px',
                  outline: 'none'
                }}
              />

              <div style={{ background: '#e6f7ff', borderRadius: '12px', padding: '16px', marginBottom: '32px', border: '1px solid #83b3d8' }}>
                <p style={{ fontSize: '14px', color: '#1f2937', margin: 0 }}>
                  💡 <strong>Tip:</strong> The more details you share, the more authentic your digital avatar will be. Don't worry about length—speak from the heart!
                </p>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={goBackInQuestions}
                  style={{
                    padding: '16px 32px',
                    borderRadius: '9999px',
                    border: '2px solid #83b3d8',
                    background: 'white',
                    color: '#83b3d8',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Back
                </button>
                <button
                  onClick={saveAnswer}
                  disabled={!answer.trim()}
                  style={{
                    flex: 1,
                    background: answer.trim() ? 'linear-gradient(to right, #83b3d8, #f2911b)' : '#d1d5db',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: '600',
                    padding: '16px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: answer.trim() ? 'pointer' : 'not-allowed',
                    boxShadow: answer.trim() ? '0 4px 12px rgba(131, 179, 216, 0.4)' : 'none'
                  }}
                >
                  {currentQ < questions.length - 1 ? 'Next Question' : 'Continue to Avatar Selection'}
                </button>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: idx === currentQ ? '32px' : '8px',
                      height: '8px',
                      background: idx <= currentQ ? '#83b3d8' : '#b3e1f4',
                      borderRadius: '9999px',
                      transition: 'all 0.3s'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Choose Avatar */}
      {step === 4 && (
        <div style={{ minHeight: '100vh', background: '#f5f9fa', padding: '24px' }}>
          <div style={{ maxWidth: '896px', margin: '48px auto' }}>
            <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Step 3: Choose Your Avatar</h1>
                  <p style={{ fontSize: '18px', color: '#6b7280' }}>Select the visual representation for your digital memory</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Step 3 of 5</span>
                  <div style={{ width: '128px', height: '8px', background: '#b3e1f4', borderRadius: '9999px', marginTop: '8px' }}>
                    <div style={{ width: '60%', height: '100%', background: '#83b3d8', borderRadius: '9999px' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '32px' }}>
                {avatars.map((av) => (
                  <div
                    key={av.id}
                    onClick={() => setAvatar(av.id)}
                    style={{
                      border: avatar === av.id ? '3px solid #83b3d8' : '2px solid #e5e7eb',
                      borderRadius: '16px',
                      padding: '24px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      background: avatar === av.id ? '#f5f9fa' : 'white',
                      transition: 'all 0.3s'
                    }}
                  >
                    <div style={{ width: '120px', height: '120px', background: 'linear-gradient(135deg, #83b3d8, #f2911b)', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User style={{ width: '60px', height: '60px', color: 'white' }} />
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>{av.name}</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '4px' }}>{av.style} Style</p>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>{av.gender}</p>
                    {avatar === av.id && (
                      <div style={{ marginTop: '12px' }}>
                        <Check style={{ width: '24px', height: '24px', color: '#83b3d8', margin: '0 auto' }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => setStep(3)}
                  style={{
                    padding: '16px 32px',
                    borderRadius: '9999px',
                    border: '2px solid #83b3d8',
                    background: 'white',
                    color: '#83b3d8',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(5)}
                  disabled={!avatar}
                  style={{
                    flex: 1,
                    background: avatar ? 'linear-gradient(to right, #83b3d8, #f2911b)' : '#d1d5db',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: '600',
                    padding: '16px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: avatar ? 'pointer' : 'not-allowed',
                    boxShadow: avatar ? '0 4px 12px rgba(131, 179, 216, 0.4)' : 'none'
                  }}
                >
                  Continue to Voice Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Select Voice */}
      {step === 5 && (
        <div style={{ minHeight: '100vh', background: '#f5f9fa', padding: '24px' }}>
          <div style={{ maxWidth: '896px', margin: '48px auto' }}>
            <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Step 4: Select a Voice</h1>
                  <p style={{ fontSize: '18px', color: '#6b7280' }}>Choose the voice personality for your avatar</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Step 4 of 5</span>
                  <div style={{ width: '128px', height: '8px', background: '#b3e1f4', borderRadius: '9999px', marginTop: '8px' }}>
                    <div style={{ width: '80%', height: '100%', background: '#83b3d8', borderRadius: '9999px' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '32px' }}>
                {voices.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setVoice(v.id)}
                    style={{
                      border: voice === v.id ? '3px solid #83b3d8' : '2px solid #e5e7eb',
                      borderRadius: '16px',
                      padding: '24px',
                      cursor: 'pointer',
                      background: voice === v.id ? '#f5f9fa' : 'white',
                      transition: 'all 0.3s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <Volume2 style={{ width: '32px', height: '32px', color: '#83b3d8' }} />
                      {voice === v.id && <Check style={{ width: '24px', height: '24px', color: '#83b3d8' }} />}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>{v.name}</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>{v.gender}</p>
                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      border: '1px solid #83b3d8',
                      background: 'white',
                      color: '#83b3d8',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}>
                      <Play style={{ width: '16px', height: '16px' }} />
                      Preview
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => setStep(4)}
                  style={{
                    padding: '16px 32px',
                    borderRadius: '9999px',
                    border: '2px solid #83b3d8',
                    background: 'white',
                    color: '#83b3d8',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(6)}
                  disabled={!voice}
                  style={{
                    flex: 1,
                    background: voice ? 'linear-gradient(to right, #83b3d8, #f2911b)' : '#d1d5db',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: '600',
                    padding: '16px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: voice ? 'pointer' : 'not-allowed',
                    boxShadow: voice ? '0 4px 12px rgba(131, 179, 216, 0.4)' : 'none'
                  }}
                >
                  Continue to Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 6: Review & Submit */}
      {step === 6 && (
        <div style={{ minHeight: '100vh', background: '#f5f9fa', padding: '24px' }}>
          <div style={{ maxWidth: '896px', margin: '48px auto' }}>
            <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Step 5: Review & Submit</h1>
                  <p style={{ fontSize: '18px', color: '#6b7280' }}>Almost there! Review your choices</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Step 5 of 5</span>
                  <div style={{ width: '128px', height: '8px', background: '#b3e1f4', borderRadius: '9999px', marginTop: '8px' }}>
                    <div style={{ width: '100%', height: '100%', background: '#83b3d8', borderRadius: '9999px' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ background: '#f5f9fa', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Your Summary</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                    <span style={{ color: '#6b7280' }}>Documents Uploaded:</span>
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>{files.length} files</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                    <span style={{ color: '#6b7280' }}>Story Questions Answered:</span>
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>{answers.length} of {questions.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                    <span style={{ color: '#6b7280' }}>Avatar Selected:</span>
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>{avatar ? avatars.find(a => a.id === avatar)?.name : 'None'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                    <span style={{ color: '#6b7280' }}>Voice Selected:</span>
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>{voice ? voices.find(v => v.id === voice)?.name : 'None'}</span>
                  </div>
                </div>
              </div>

              <div style={{ background: '#dcfce7', border: '1px solid #10b981', borderRadius: '16px', padding: '20px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Check style={{ width: '24px', height: '24px', color: '#10b981', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>You're All Set!</p>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>Your digital memory avatar will be ready shortly. We'll process your information and notify you when it's ready to interact with.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => setStep(5)}
                  style={{
                    padding: '16px 32px',
                    borderRadius: '9999px',
                    border: '2px solid #83b3d8',
                    background: 'white',
                    color: '#83b3d8',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(7)}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(to right, #83b3d8, #f2911b)',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: '600',
                    padding: '16px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(131, 179, 216, 0.4)'
                  }}
                >
                  Submit & Create My Avatar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 7: Processing/Creating Avatar */}
      {step === 7 && (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f5f9fa, #b3e1f4)', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ maxWidth: '600px', width: '100%', background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', padding: '64px 48px', textAlign: 'center' }}>

            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 32px' }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                border: '8px solid #e5e7eb',
                borderRadius: '50%'
              }}></div>
              <div style={{
                position: 'absolute',
                inset: 0,
                border: '8px solid transparent',
                borderTopColor: '#83b3d8',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            </div>

            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>

            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
              Creating Your Memory Avatar...
            </h1>
            <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '48px' }}>
              This usually takes 2-5 minutes
            </p>

            <div style={{ textAlign: 'left', marginBottom: '48px' }}>
              <p style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>
                What is happening now:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Check style={{ width: '24px', height: '24px', color: '#10b981' }} />
                  <span style={{ fontSize: '16px', color: '#1f2937' }}>Processing your files</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Check style={{ width: '24px', height: '24px', color: '#10b981' }} />
                  <span style={{ fontSize: '16px', color: '#1f2937' }}>Building knowledge base</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    border: '3px solid #e5e7eb',
                    borderTopColor: '#83b3d8',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <span style={{ fontSize: '16px', color: '#6b7280' }}>Configuring avatar...</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/dashboard/basic')}
              style={{
                padding: '12px 24px',
                borderRadius: '9999px',
                border: '1px solid #e5e7eb',
                background: 'white',
                color: '#1f2937',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicPlanOnboarding;
