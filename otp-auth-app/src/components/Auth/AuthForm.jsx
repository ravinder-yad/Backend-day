import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, ShieldCheck, ArrowRight, ArrowLeft, RefreshCw, Smartphone } from 'lucide-react';

const AuthForm = ({ onSendOTP, onVerifyOTP, loading }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleSend = async (e) => {
    e.preventDefault();
    if (otpSent) return;
    setError('');
    
    const success = await onSendOTP({ email, name, isLogin });
    if (success) {
      setOtpSent(true);
    } else {
      setError(isLogin ? "User not found. Please Signup!" : "Signup failed. Account may exist.");
    }
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs[index + 1].current.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // 🔥 AUTO-PASTE LOGIC
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setOtp(newOtp);
      // Auto focus the last filled box or the next empty box
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs[nextIndex].current.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    onVerifyOTP(email, otp.join(''));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card auth-card border-0 shadow-lg p-4 mx-auto overflow-hidden" 
      style={{ width: '100%', maxWidth: '420px' }}
    >
      <div className="card-body">
        <AnimatePresence mode="wait">
          {!otpSent ? (
            <motion.div
              key="form-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="text-center mb-4">
                <div className="bg-primary bg-opacity-10 text-primary d-inline-flex p-3 rounded-circle mb-3">
                  <Smartphone size={32} />
                </div>
                <h2 className="fw-bold mb-1">{isLogin ? 'Login Now' : 'Join Us'}</h2>
                <p className="text-muted small">Experience premium authentication</p>
              </div>

              {error && (
                <div className="alert alert-danger py-2 small text-center mb-4 border-0 shadow-sm rounded-3">
                  {error}
                </div>
              )}

              <form onSubmit={handleSend}>
                {!isLogin && (
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control shadow-none"
                      id="floatingName"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={!isLogin}
                    />
                    <label htmlFor="floatingName"><User size={14} className="me-1 mb-1" /> Full Name</label>
                  </div>
                )}
                
                <div className="form-floating mb-4">
                  <input
                    type="email"
                    className="form-control shadow-none"
                    id="floatingEmail"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingEmail"><Mail size={14} className="me-1 mb-1" /> Email Address</label>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                  disabled={loading}
                >
                  {loading ? <RefreshCw className="spinner-border spinner-border-sm border-0" /> : <ArrowRight size={18} />}
                  {isLogin ? 'Send Login OTP' : 'Create My Account'}
                </button>
                
                <div className="text-center mt-4">
                  <button 
                    type="button"
                    onClick={handleToggle}
                    className="btn btn-link p-0 text-decoration-none small fw-bold text-primary"
                  >
                    {isLogin ? "New here? Create an account" : "Have an account? Sign in"}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="otp-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-4">
                <div className="bg-primary bg-opacity-10 text-primary d-inline-flex p-3 rounded-circle mb-3">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="fw-bold mb-1">Verify Account</h2>
                <p className="text-muted small">We've sent a code to <br/><b className="text-dark">{email}</b></p>
              </div>

              <form onSubmit={handleVerify}>
                <div className="d-flex justify-content-center gap-2 mb-4">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={inputRefs[i]}
                      type="text"
                      className="form-control text-center fw-bold otp-box shadow-none"
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      onPaste={i === 0 ? handlePaste : undefined}
                      maxLength={1}
                      autoFocus={i === 0}
                    />
                  ))}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-3 fw-bold shadow-sm mb-3 d-flex align-items-center justify-content-center gap-2"
                  disabled={loading || otp.some(d => !d)}
                >
                  {loading ? <RefreshCw className="spinner-border spinner-border-sm border-0" /> : <Smartphone size={18} />}
                  Complete Verification
                </button>

                <div className="text-center">
                  <button 
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="btn btn-link p-0 text-decoration-none small fw-bold text-muted d-flex align-items-center justify-content-center gap-1 mx-auto"
                  >
                    <ArrowLeft size={14} /> Back to details
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AuthForm;
