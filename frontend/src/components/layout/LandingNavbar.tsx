import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Code2, Zap } from 'lucide-react';

export const LandingNavbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(13, 15, 20, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(212, 168, 67, 0.12)',
        boxShadow: '0 1px 24px rgba(0,0,0,0.4)'
      }}
    >
      <div className="flex items-center justify-between gap-6 px-4 sm:px-8 py-3.5 max-w-[1360px] mx-auto">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group" style={{ textDecoration: 'none' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #D4A843 0%, #C8963A 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              fontWeight: 800,
              color: '#0D0F14',
              boxShadow: '0 2px 14px rgba(212, 168, 67, 0.35)',
              transition: 'transform 0.2s'
            }}
            className="group-hover:scale-105"
          >
            CV
          </div>
          <div className="flex flex-col leading-none">
            <span style={{ fontWeight: 800, fontSize: 17, color: '#FFFFFF', letterSpacing: '-0.3px' }}>
              CodeVault
            </span>
            <span style={{ fontSize: 9.5, fontWeight: 700, color: '#D4A843', letterSpacing: '1.2px', textTransform: 'uppercase', marginTop: 2 }}>
              Career Launchpad
            </span>
          </div>
        </Link>

        {/* Public Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            style={{ color: '#8A90A6', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#8A90A6'; }}
          >
            Platform Pillars
          </a>
          <a
            href="#method"
            style={{ color: '#8A90A6', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#8A90A6'; }}
          >
            Methodology
          </a>
          <a
            href="#roles"
            style={{ color: '#8A90A6', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#8A90A6'; }}
          >
            Engineering Roles
          </a>
        </nav>

        {/* Auth CTA */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              to="/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 16px',
                borderRadius: 8,
                background: 'linear-gradient(135deg, #D4A843 0%, #C8963A 100%)',
                color: '#0D0F14',
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 2px 10px rgba(212, 168, 67, 0.25)',
                transition: 'all 0.15s'
              }}
            >
              <span>Go to Mission Control</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  color: '#8A90A6',
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  padding: '7px 12px'
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#8A90A6'; }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 15px',
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #D4A843 0%, #C8963A 100%)',
                  color: '#0D0F14',
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 2px 10px rgba(212, 168, 67, 0.25)',
                  transition: 'all 0.15s'
                }}
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
