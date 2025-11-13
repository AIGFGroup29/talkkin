import React, { useState, useRef } from 'react';
import { Upload, MessageCircle, Camera, Mic, Video, Check, X, AlertCircle, FileText } from 'lucide-react';

const PremiumPlanOnboarding = () => {
  const [step, setStep] = useState(1);
  const [uploadedPhotos, setUploadedPhotos] = useState<Array<{ name: string; url: string }>>([]);
  const [voiceRecorded, setVoiceRecorded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [videoUploaded, setVideoUploaded] = useState<{ name: string; url: string } | null>(null);
  const [files, setFiles] = useState<Array<{ name: string; size: string }>>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const docsInputRef = useRef<HTMLInputElement>(null);

  const questions = [
    "Let's start at the beginning. Where were you born and what was your childhood like?",
    "Tell me about your family. Who were the most important people in your early life?",
    "What was your first job? How did you choose your career path?",
    "Can you share a favorite memory from your younger years?",
    "What traditions or recipes are important to your family?",
    "What challenges did you overcome in your life?",
    "What values or lessons do you want to pass on to future generations?",
    "Is there anything else you'd like your family to know about your life story?"
  ];

  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Mandarin', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Dutch'];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).slice(0, 10 - uploadedPhotos.length).map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setUploadedPhotos([...uploadedPhotos, ...newFiles]);
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== index));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      setVideoUploaded({ name: file.name, url: URL.createObjectURL(file) });
    }
  };

  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).map(f => ({
      name: f.name,
      size: (f.size / 1024).toFixed(2) + ' KB'
    }));
    setFiles([...files, ...newFiles]);
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    const timer = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 90) {
          clearInterval(timer);
          setIsRecording(false);
          setVoiceRecorded(true);
          return 90;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setVoiceRecorded(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const saveAnswer = () => {
    if (answer.trim()) {
      setAnswers([...answers, answer]);
    }
    setAnswer('');
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep(7);
    }
  };

  const goBackInQuestions = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setAnswer(answers[currentQ - 1] || '');
      setAnswers(answers.slice(0, -1));
    } else {
      setStep(5);
    }
  };

  return (
    <div>
      {step === 1 && (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f5f9fa, #b3e1f4)', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '672px', background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', padding: '48px' }}>

            <div style={{ width: '96px', height: '96px', background: 'linear-gradient(to bottom right, #83b3d8, #f2911b)', borderRadius: '50%', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Camera style={{ width: '48px', height: '48px', color: 'white' }} />
            </div>

            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', textAlign: 'center', marginBottom: '16px' }}>Welcome to TalkKin Premium!</h1>
            <p style={{ fontSize: '20px', color: '#6b7280', textAlign: 'center', marginBottom: '32px' }}>Create your personalized digital twin in 7 steps</p>

            <div style={{ background: '#f5f9fa', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Here's what we'll do together:</h2>

              {[
                { num: 1, text: 'Upload 5-10 photos of yourself' },
                { num: 2, text: 'Record your voice (60-90 seconds)' },
                { num: 3, text: 'Optional: Upload a short video' },
                { num: 4, text: 'Upload documents & recordings' },
                { num: 5, text: 'Share your life story' },
                { num: 6, text: 'Choose your language' },
                { num: 7, text: 'Review and submit' }
              ].map(({ num, text }) => (
                <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '32px', height: '32px', background: '#83b3d8', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>{num}</div>
                  <span style={{ color: '#1f2937' }}>{text}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#fff5e6', borderLeft: '4px solid #f2911b', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
              <p style={{ fontSize: '14px', color: '#1f2937', margin: 0 }}>
                <strong>Processing time:</strong> Your AI digital twin will be ready in 3-7 days. We'll email you when it's complete!
              </p>
            </div>

            <button
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
                boxShadow: '0 4px 12px rgba(131, 179, 216, 0.4)',
                border: 'none'
              }}
            >
              GET STARTED →
            </button>

            <p style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>This will take about 25-30 minutes</p>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ minHeight: '100vh', background: '#f5f9fa', padding: '24px' }}>
          <div style={{ maxWidth: '896px', margin: '48px auto' }}>
            <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Step 1: Upload Your Photos</h1>
                  <p style={{ fontSize: '18px', color: '#6b7280' }}>Upload 5-10 clear photos of yourself</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Step 1 of 7</span>
                  <div style={{ width: '128px', height: '8px', background: '#b3e1f4', borderRadius: '9999px', marginTop: '8px' }}>
                    <div style={{ width: '14.28%', height: '100%', background: '#83b3d8', borderRadius: '9999px' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ background: '#e6f7ff', border: '1px solid #83b3d8', borderRadius: '16px', padding: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <AlertCircle style={{ width: '24px', height: '24px', color: '#83b3d8', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>For best results:</p>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#6b7280' }}>
                      <li>Use recent, high-quality photos</li>
                      <li>Include different angles and expressions</li>
                      <li>Ensure good lighting and clear visibility</li>
                      <li>Avoid group photos or heavy filters</li>
                    </ul>
                  </div>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: '3px dashed #83b3d8',
                  borderRadius: '16px',
                  padding: '48px',
                  textAlign: 'center',
                  marginBottom: '24px',
                  cursor: 'pointer',
                  background: uploadedPhotos.length >= 5 ? '#e6f7ff' : 'white'
                }}
              >
                <Upload style={{ width: '64px', height: '64px', color: '#83b3d8', margin: '0 auto 16px' }} />
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                  {uploadedPhotos.length === 0 ? 'Click to upload photos' : `${uploadedPhotos.length} of 10 photos uploaded`}
                </p>
                <p style={{ color: '#6b7280' }}>
                  {uploadedPhotos.length < 5 ? `Upload at least ${5 - uploadedPhotos.length} more photos` : 'You can upload more photos if you like'}
                </p>
              </div>

              {uploadedPhotos.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                  {uploadedPhotos.map((photo, idx) => (
                    <div key={idx} style={{ position: 'relative', paddingTop: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                      <img
                        src={photo.url}
                        alt={`Upload ${idx + 1}`}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <button
                        onClick={(e) => { e.stopPropagation(); removePhoto(idx); }}
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          width: '32px',
                          height: '32px',
                          background: 'rgba(0,0,0,0.6)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          border: 'none',
                          padding: 0
                        }}
                      >
                        <X style={{ width: '16px', height: '16px', color: 'white' }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '16px' }}>
                <button onClick={() => setStep(1)} style={{ padding: '16px 32px', borderRadius: '9999px', border: '2px solid #83b3d8', background: 'white', color: '#83b3d8', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>Back</button>
                <button onClick={() => setStep(3)} style={{ flex: 1, background: 'linear-gradient(to right, #83b3d8, #f2911b)', color: 'white', fontSize: '18px', fontWeight: '600', padding: '16px', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>Continue to Voice Recording</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ minHeight: '100vh', background: '#f5f9fa', padding: '24px' }}>
          <div style={{ maxWidth: '896px', margin: '48px auto' }}>
            <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Step 2: Record Your Voice</h1>
                  <p style={{ fontSize: '18px', color: '#6b7280' }}>Record 60-90 seconds of natural speech</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Step 2 of 7</span>
                  <div style={{ width: '128px', height: '8px', background: '#b3e1f4', borderRadius: '9999px', marginTop: '8px' }}>
                    <div style={{ width: '28.56%', height: '100%', background: '#83b3d8', borderRadius: '9999px' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ background: '#e6f7ff', border: '1px solid #83b3d8', borderRadius: '16px', padding: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <AlertCircle style={{ width: '24px', height: '24px', color: '#83b3d8', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>Recording tips:</p>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#6b7280' }}>
                      <li>Find a quiet space with minimal background noise</li>
                      <li>Speak naturally and at a comfortable pace</li>
                      <li>Read a passage, tell a story, or describe your day</li>
                      <li>Aim for 60-90 seconds of clear speech</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div style={{ background: '#f5f9fa', borderRadius: '16px', padding: '32px', marginBottom: '24px', textAlign: 'center' }}>
                <button style={{
                  width: '120px',
                  height: '120px',
                  background: isRecording ? '#ef4444' : '#83b3d8',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  border: 'none'
                }}
                onClick={isRecording ? stopRecording : startRecording}>
                  <Mic style={{ width: '48px', height: '48px', color: 'white' }} />
                </button>

                <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
                  {formatTime(recordingTime)}
                </div>

                {isRecording ? (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          style={{
                            width: '8px',
                            height: Math.random() * 40 + 20 + 'px',
                            background: '#ef4444',
                            borderRadius: '4px'
                          }}
                        />
                      ))}
                    </div>
                    <p style={{ color: '#ef4444', fontWeight: '600' }}>Recording... (max 90 seconds)</p>
                  </div>
                ) : voiceRecorded ? (
                  <div>
                    <Check style={{ width: '32px', height: '32px', color: '#10b981', margin: '0 auto 8px' }} />
                    <p style={{ color: '#10b981', fontWeight: '600' }}>Recording complete!</p>
                  </div>
                ) : (
                  <p style={{ color: '#6b7280' }}>Click the microphone to start recording</p>
                )}
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button onClick={() => setStep(2)} style={{ padding: '16px 32px', borderRadius: '9999px', border: '2px solid #83b3d8', background: 'white', color: '#83b3d8', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>Back</button>
                <button onClick={() => setStep(4)} style={{ flex: 1, background: 'linear-gradient(to right, #83b3d8, #f2911b)', color: 'white', fontSize: '18px', fontWeight: '600', padding: '16px', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>Continue to Video Upload</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div style={{ minHeight: '100vh', background: '#f5f9fa', padding: '24px' }}>
          <div style={{ maxWidth: '896px', margin: '48px auto' }}>
            <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Step 3: Upload Video (Optional)</h1>
                  <p style={{ fontSize: '18px', color: '#6b7280' }}>Add a short video for enhanced realism</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Step 3 of 7</span>
                  <div style={{ width: '128px', height: '8px', background: '#b3e1f4', borderRadius: '9999px', marginTop: '8px' }}>
                    <div style={{ width: '42.84%', height: '100%', background: '#83b3d8', borderRadius: '9999px' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ background: '#fff5e6', border: '1px solid #f2911b', borderRadius: '16px', padding: '16px', marginBottom: '24px' }}>
                <p style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>⭐ Optional but Recommended</p>
                <p style={{ color: '#6b7280', margin: 0 }}>A short video helps us capture your unique mannerisms and expressions for a more authentic digital twin.</p>
              </div>

              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                style={{ display: 'none' }}
              />

              {!videoUploaded ? (
                <div
                  onClick={() => videoInputRef.current?.click()}
                  style={{
                    border: '3px dashed #83b3d8',
                    borderRadius: '16px',
                    padding: '64px 48px',
                    textAlign: 'center',
                    marginBottom: '24px',
                    cursor: 'pointer',
                    background: 'white'
                  }}
                >
                  <Video style={{ width: '64px', height: '64px', color: '#83b3d8', margin: '0 auto 16px' }} />
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Click to upload video</p>
                  <p style={{ color: '#6b7280', marginBottom: '16px' }}>30-60 seconds recommended</p>
                  <div style={{ background: '#f5f9fa', borderRadius: '12px', padding: '16px', marginTop: '16px' }}>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}><strong>Tip:</strong> Record yourself speaking naturally, making eye contact with the camera</p>
                  </div>
                </div>
              ) : (
                <div style={{ background: '#f5f9fa', borderRadius: '16px', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
                  <Check style={{ width: '48px', height: '48px', color: '#10b981', margin: '0 auto 16px' }} />
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Video uploaded successfully!</p>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>{videoUploaded.name}</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '16px' }}>
                <button onClick={() => setStep(3)} style={{ padding: '16px 32px', borderRadius: '9999px', border: '2px solid #83b3d8', background: 'white', color: '#83b3d8', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>Back</button>
                <button onClick={() => setStep(5)} style={{ flex: 1, background: 'linear-gradient(to right, #83b3d8, #f2911b)', color: 'white', fontSize: '18px', fontWeight: '600', padding: '16px', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>Continue to Documents</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 5 && (
        <div style={{ minHeight: '100vh', background: '#f5f9fa', padding: '24px' }}>
          <div style={{ maxWidth: '896px', margin: '48px auto' }}>
            <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Step 4: Upload Documents</h1>
                  <p style={{ fontSize: '18px', color: '#6b7280' }}>Add documents to enrich your digital twin's knowledge</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Step 4 of 7</span>
                  <div style={{ width: '128px', height: '8px', background: '#b3e1f4', borderRadius: '9999px', marginTop: '8px' }}>
                    <div style={{ width: '57.12%', height: '100%', background: '#83b3d8', borderRadius: '9999px' }}></div>
                  </div>
                </div>
              </div>

              <input
                ref={docsInputRef}
                type="file"
                multiple
                onChange={addFile}
                style={{ display: 'none' }}
              />

              <div
                onClick={() => docsInputRef.current?.click()}
                style={{
                  border: '3px dashed #83b3d8',
                  borderRadius: '16px',
                  padding: '48px',
                  textAlign: 'center',
                  marginBottom: '24px',
                  cursor: 'pointer',
                  background: 'white'
                }}
              >
                <Upload style={{ width: '64px', height: '64px', color: '#83b3d8', margin: '0 auto 16px' }} />
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                  {files.length === 0 ? 'Click to upload documents' : `${files.length} files uploaded`}
                </p>
                <p style={{ color: '#6b7280' }}>PDF, Word, Text, Audio files accepted</p>
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
                  <li>Upload journals, letters, or personal writings</li>
                  <li>Recipe books and family traditions</li>
                  <li>Audio recordings of stories or conversations</li>
                  <li>The more content, the richer your digital twin</li>
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button onClick={() => setStep(4)} style={{ padding: '16px 32px', borderRadius: '9999px', border: '2px solid #83b3d8', background: 'white', color: '#83b3d8', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>Back</button>
                <button onClick={() => setStep(6)} style={{ flex: 1, background: 'linear-gradient(to right, #83b3d8, #f2911b)', color: 'white', fontSize: '18px', fontWeight: '600', padding: '16px', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>Continue to Story Questions</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 6 && (
        <div style={{ minHeight: '100vh', background: '#f5f9fa', padding: '24px' }}>
          <div style={{ maxWidth: '896px', margin: '48px auto' }}>
            <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Step 5: Share Your Story</h1>
                  <p style={{ fontSize: '18px', color: '#6b7280' }}>Question {currentQ + 1} of {questions.length}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Step 5 of 7</span>
                  <div style={{ width: '128px', height: '8px', background: '#b3e1f4', borderRadius: '9999px', marginTop: '8px' }}>
                    <div style={{ width: '71.4%', height: '100%', background: '#83b3d8', borderRadius: '9999px' }}></div>
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
                  {currentQ < questions.length - 1 ? 'Next Question' : 'Continue to Language Selection'}
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

      {step === 7 && (
        <div style={{ minHeight: '100vh', background: '#f5f9fa', padding: '24px' }}>
          <div style={{ maxWidth: '896px', margin: '48px auto' }}>
            <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Step 6: Choose Your Language</h1>
                  <p style={{ fontSize: '18px', color: '#6b7280' }}>Select your preferred language for interactions</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Step 6 of 7</span>
                  <div style={{ width: '128px', height: '8px', background: '#b3e1f4', borderRadius: '9999px', marginTop: '8px' }}>
                    <div style={{ width: '85.68%', height: '100%', background: '#83b3d8', borderRadius: '9999px' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
                {languages.map((lang) => (
                  <div
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    style={{
                      border: selectedLanguage === lang ? '3px solid #83b3d8' : '2px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: selectedLanguage === lang ? '#f5f9fa' : 'white',
                      transition: 'all 0.3s'
                    }}
                  >
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>{lang}</p>
                    {selectedLanguage === lang && (
                      <Check style={{ width: '20px', height: '20px', color: '#83b3d8', margin: '8px auto 0' }} />
                    )}
                  </div>
                ))}
              </div>

              <div style={{ background: '#f5f9fa', borderRadius: '16px', padding: '20px', marginBottom: '32px' }}>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                  Your digital twin will be able to respond in the selected language. You can change this later in settings.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button onClick={() => setStep(6)} style={{ padding: '16px 32px', borderRadius: '9999px', border: '2px solid #83b3d8', background: 'white', color: '#83b3d8', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>Back</button>
                <button
                  onClick={() => setStep(8)}
                  disabled={!selectedLanguage}
                  style={{
                    flex: 1,
                    background: selectedLanguage ? 'linear-gradient(to right, #83b3d8, #f2911b)' : '#d1d5db',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: '600',
                    padding: '16px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: selectedLanguage ? 'pointer' : 'not-allowed',
                    boxShadow: selectedLanguage ? '0 4px 12px rgba(131, 179, 216, 0.4)' : 'none'
                  }}
                >
                  Review & Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 8 && (
        <div style={{ minHeight: '100vh', background: '#f5f9fa', padding: '24px' }}>
          <div style={{ maxWidth: '896px', margin: '48px auto' }}>
            <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Step 7: Review & Submit</h1>
                  <p style={{ fontSize: '18px', color: '#6b7280' }}>Almost there! Review your choices</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Step 7 of 7</span>
                  <div style={{ width: '128px', height: '8px', background: '#b3e1f4', borderRadius: '9999px', marginTop: '8px' }}>
                    <div style={{ width: '100%', height: '100%', background: '#83b3d8', borderRadius: '9999px' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ background: '#f5f9fa', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Your Summary</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                    <span style={{ color: '#6b7280' }}>Photos Uploaded:</span>
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>{uploadedPhotos.length} photos</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                    <span style={{ color: '#6b7280' }}>Voice Recording:</span>
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>{voiceRecorded ? 'Complete' : 'Not recorded'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                    <span style={{ color: '#6b7280' }}>Video Upload:</span>
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>{videoUploaded ? 'Uploaded' : 'Skipped'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                    <span style={{ color: '#6b7280' }}>Documents Uploaded:</span>
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>{files.length} files</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                    <span style={{ color: '#6b7280' }}>Story Questions Answered:</span>
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>{answers.length} of {questions.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                    <span style={{ color: '#6b7280' }}>Language Selected:</span>
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>{selectedLanguage}</span>
                  </div>
                </div>
              </div>

              <div style={{ background: '#dcfce7', border: '1px solid #10b981', borderRadius: '16px', padding: '20px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Check style={{ width: '24px', height: '24px', color: '#10b981', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>You're All Set!</p>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>Your AI-enhanced digital twin will be ready in 3-7 days. We'll process your photos, voice, and all content to create a truly lifelike experience. You'll receive an email when it's ready!</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => setStep(7)}
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
                  onClick={() => setStep(9)}
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
                  Submit & Create My Digital Twin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 9 && (
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
              Creating Your Digital Twin...
            </h1>
            <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '48px' }}>
              This usually takes 3-7 days
            </p>

            <div style={{ textAlign: 'left', marginBottom: '48px' }}>
              <p style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>
                What happens next:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    border: '3px solid #e5e7eb',
                    borderTopColor: '#83b3d8',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <span style={{ fontSize: '16px', color: '#6b7280' }}>Processing your photos and videos</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', border: '3px solid #e5e7eb', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '16px', color: '#9ca3af' }}>Training voice synthesis</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', border: '3px solid #e5e7eb', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '16px', color: '#9ca3af' }}>Building knowledge base</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', border: '3px solid #e5e7eb', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '16px', color: '#9ca3af' }}>Generating your digital twin</span>
                </div>
              </div>
            </div>

            <div style={{ background: '#f5f9fa', borderRadius: '12px', padding: '16px', marginBottom: '32px' }}>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                You'll receive an email at <strong>your@email.com</strong> when your digital twin is ready to interact with!
              </p>
            </div>

            <button
              onClick={() => setStep(1)}
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
              Reset Demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumPlanOnboarding;
