import { useState, useEffect, useRef } from 'react';

const OTPModal = ({ email, onVerify, onResend, onClose, loading }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length === 6) {
      onVerify(email, code);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
          <div className="modal-header border-0 pb-0">
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4 text-center">
            <div className="mb-3">
               <div className="bg-primary bg-opacity-10 text-primary d-inline-flex p-3 rounded-circle mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
               </div>
            </div>
            <h3 className="fw-bold mb-2">Security Verification</h3>
            <p className="text-muted small mb-4">Enter the 6-digit code sent to <br/><b>{email}</b></p>
            
            <div className="d-flex justify-content-center gap-2 mb-4">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={inputRefs[i]}
                  type="text"
                  className="otp-box form-control text-center fw-bold"
                  style={{ width: '45px', height: '55px', fontSize: '1.25rem' }}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleOTPKeyDown(i, e)}
                  maxLength={1}
                />
              ))}
            </div>

            <button 
              onClick={handleVerify}
              className="btn btn-primary w-100 py-2 fw-bold mb-3"
              disabled={loading || otp.some(d => !d)}
            >
              {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
              Verify & Proceed
            </button>

            <div className="small">
              {timer > 0 ? (
                <span className="text-muted">Resend code in <b className="text-primary">{timer}s</b></span>
              ) : (
                <button 
                  onClick={() => { setTimer(30); onResend(); }}
                  className="btn btn-link p-0 text-decoration-none fw-bold"
                >
                  Resend Code
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
