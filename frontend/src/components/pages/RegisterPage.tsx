import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserCheck, ArrowRight, AlertCircle } from 'lucide-react';

const inputStyle: React.CSSProperties = {
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
};

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all registration fields.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await register(name, email, 'student');
      navigate('/profile');
    } catch {
      setError('Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'radial-gradient(ellipse at 50% 0%, rgba(212, 168, 67, 0.05) 0%, transparent 60%)' }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#14171F', borderRadius: 16, border: '1px solid rgba(212, 168, 67, 0.15)', padding: 32, boxShadow: '0 24px 64px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #D4A843, #C8963A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: '#0D0F14', margin: '0 auto 16px', boxShadow: '0 4px 16px rgba(212, 168, 67, 0.3)' }}>
            CV
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#E8EAF0', marginBottom: 6 }}>Create Your Account</h1>
          <p style={{ fontSize: 12, color: '#7A8098' }}>
            Join CodeVault to start AI-powered skill assessments and get your personalized career roadmap.
          </p>
        </div>

        {error && (
          <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#f87171' }}>
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: 'Full Name', type: 'text', val: name, set: setName, ph: 'e.g. Jordan Smith' },
            { label: 'Email Address', type: 'email', val: email, set: setEmail, ph: 'engineer@example.com' },
            { label: 'Password', type: 'password', val: password, set: setPassword, ph: 'At least 8 characters' },
          ].map(f => (
            <div key={f.label}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#B0B4C8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {f.label}
              </label>
              <input
                type={f.type}
                required
                value={f.val}
                onChange={e => f.set(e.target.value)}
                placeholder={f.ph}
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'rgba(212, 168, 67, 0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(212, 168, 67, 0.08)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          ))}

          <div style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', fontSize: 11, color: '#5A6080', lineHeight: 1.5 }}>
            Registration creates a standard learner account. Administrator access is provisioned exclusively through the backend.
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{ width: '100%', padding: 12, borderRadius: 8, background: 'linear-gradient(135deg, #D4A843 0%, #C8963A 100%)', color: '#0D0F14', fontSize: 13, fontWeight: 700, border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 12px rgba(212, 168, 67, 0.2)' }}
          >
            <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: 12, color: '#5A6080' }}>
          <span>Already have an account? </span>
          <Link to="/login" style={{ color: '#D4A843', fontWeight: 700, textDecoration: 'none' }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
};
