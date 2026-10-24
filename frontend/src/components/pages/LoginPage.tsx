import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LogIn,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Zap,
  Code2
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide a valid email address.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await login(email);
      navigate('/dashboard');
    } catch {
      setError('Failed to sign in. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, role: 'student' | 'admin') => {
    setIsLoading(true);
    await login(demoEmail, role);
    setIsLoading(false);
    navigate(role === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(212, 168, 67, 0.06) 0%, transparent 60%)'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#14171F',
          borderRadius: 16,
          border: '1px solid rgba(212, 168, 67, 0.15)',
          padding: '32px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #D4A843, #C8963A)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              fontWeight: 800,
              color: '#0D0F14',
              margin: '0 auto 16px',
              boxShadow: '0 4px 16px rgba(212, 168, 67, 0.3)'
            }}
          >
            CV
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#E8EAF0', marginBottom: 6 }}>
            Sign in to CodeVault
          </h1>
          <p style={{ fontSize: 12, color: '#7A8098' }}>
            Access your assessments, skill gap reports, and personalized roadmaps.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              color: '#f87171'
            }}
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {resetSent && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              background: 'rgba(74, 222, 128, 0.08)',
              border: '1px solid rgba(74, 222, 128, 0.2)',
              fontSize: 12,
              color: '#4ade80'
            }}
          >
            Password reset link sent to {email || 'your registered address'}.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#B0B4C8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="engineer@example.com"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                background: '#1C2030',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#E8EAF0',
                fontSize: 13,
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(212, 168, 67, 0.4)';
                e.target.style.boxShadow = '0 0 0 3px rgba(212, 168, 67, 0.08)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#B0B4C8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Password
              </label>
              <button
                type="button"
                onClick={() => setResetSent(true)}
                style={{ fontSize: 11, color: '#D4A843', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                background: '#1C2030',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#E8EAF0',
                fontSize: 13,
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(212, 168, 67, 0.4)';
                e.target.style.boxShadow = '0 0 0 3px rgba(212, 168, 67, 0.08)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 8,
              background: 'linear-gradient(135deg, #D4A843 0%, #C8963A 100%)',
              color: '#0D0F14',
              fontSize: 13,
              fontWeight: 700,
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(212, 168, 67, 0.2)'
            }}
          >
            <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Profiles */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#4A5068', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', marginBottom: 12 }}>
            Quick Demo Access
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <button
              onClick={() => handleDemoLogin('student@codevault.dev', 'student')}
              style={{
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.08)',
                background: '#1C2030',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s'
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 168, 67, 0.2)';
                (e.currentTarget as HTMLElement).style.background = '#242840';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLElement).style.background = '#1C2030';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <UserCheck className="w-3.5 h-3.5" style={{ color: '#4ade80' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#E8EAF0' }}>Alex Chen</span>
              </div>
              <p style={{ fontSize: 10, color: '#7A8098' }}>Learner Account</p>
            </button>

            <button
              onClick={() => handleDemoLogin('rajusurna18@gmail.com', 'admin')}
              style={{
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.08)',
                background: '#1C2030',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s'
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 168, 67, 0.2)';
                (e.currentTarget as HTMLElement).style.background = '#242840';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLElement).style.background = '#1C2030';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <ShieldCheck className="w-3.5 h-3.5" style={{ color: '#D4A843' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#E8EAF0' }}>Raju Surna</span>
              </div>
              <p style={{ fontSize: 10, color: '#7A8098' }}>Administrator</p>
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: 12, color: '#5A6080' }}>
          <span>New engineer? </span>
          <Link to="/register" style={{ color: '#D4A843', fontWeight: 700, textDecoration: 'none' }}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};
