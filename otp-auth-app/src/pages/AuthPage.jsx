import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/Auth/AuthForm';

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const { signup, login, verifyOTP } = useAuth();
  const navigate = useNavigate();

  const handleSendOTP = async ({ email, name, isLogin }) => {
    setLoading(true);
    try {
      if (isLogin) {
        await login(email);
      } else {
        await signup(name, email);
      }
      setLoading(false);
      return true; // Notify form that OTP was sent
    } catch (error) {
      console.error("Auth flow failed", error);
      alert(error.response?.data?.message || "User not found. Please Signup.");
      setLoading(false);
      return false;
    }
  };

  const handleVerifyOTP = async (email, otp) => {
    setLoading(true);
    try {
      const res = await verifyOTP(email, otp);
      if (res.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Verification failed", error);
      alert(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 py-5">
      <AuthForm 
        onSendOTP={handleSendOTP} 
        onVerifyOTP={handleVerifyOTP}
        loading={loading} 
      />
    </div>
  );
};

export default AuthPage;
