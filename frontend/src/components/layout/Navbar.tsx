import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import {
  Menu,
  LogOut,
  User,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Flame,
  Code2,
  Zap,
  X
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
  onOpenAiGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, onOpenAiGuide }) => {
  const { user, role, logout, switchUserRole } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const currentStreak = user ? storageService.calculateLearningStreak(user.id) : 0;

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
      <div className="flex items-center justify-between gap-6 px-4 sm:px-6 py-3 max-w-[1440px] mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: '#7A8098' }}
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <Link to="/" className="flex items-center gap-2.5 group" style={{ textDecoration: 'none' }}>
            {/* Logo mark */}
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #D4A843 0%, #C8963A 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 15,
                fontWeight: 800,
                color: '#0D0F14',
                boxShadow: '0 2px 12px rgba(212, 168, 67, 0.35)',
                transition: 'transform 0.2s'
              }}
              className="group-hover:scale-105"
            >
              CV
            </div>
            <div className="flex flex-col leading-none">
              <span style={{ fontWeight: 800, fontSize: 16, color: '#E8EAF0', letterSpacing: '-0.3px' }}>
                CodeVault
              </span>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#D4A843', letterSpacing: '1.2px', textTransform: 'uppercase', marginTop: 1 }}>
                Career Launchpad
              </span>
            </div>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { to: '/dashboard', label: 'Dashboard' },
            { to: '/dsa-editor', label: 'Code Lab', icon: Code2, accent: true },
            { to: '/assessment', label: 'Assessments' },
            { to: '/roadmap', label: 'Roadmap' },
            { to: '/streak-platforms', label: 'Practice Hub' },
          ].map(item => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                color: item.accent ? '#A78BFA' : '#7A8098',
                fontSize: 13,
                fontWeight: 500,
                padding: '6px 12px',
                borderRadius: 7,
                textDecoration: 'none',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: 5
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = item.accent ? '#C4B5FD' : '#E8EAF0';
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = item.accent ? '#A78BFA' : '#7A8098';
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              }}
            >
              {item.icon && <item.icon className="w-3.5 h-3.5" />}
              <span>{item.label}</span>
            </Link>
          ))}
          {role === 'admin' && (
            <Link
              to="/admin"
              style={{
                color: '#D4A843',
                fontSize: 13,
                fontWeight: 600,
                padding: '6px 12px',
                borderRadius: 7,
                textDecoration: 'none',
              }}
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Streak pill */}
          {user && (
            <Link
              to="/streak-platforms"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 12px',
                borderRadius: 8,
                border: currentStreak > 0 ? '1px solid rgba(251, 146, 60, 0.3)' : '1px solid rgba(255,255,255,0.08)',
                background: currentStreak > 0 ? 'rgba(251, 146, 60, 0.1)' : 'rgba(255,255,255,0.04)',
                fontSize: 12,
                fontWeight: 700,
                color: currentStreak > 0 ? '#fb923c' : '#7A8098',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
              title="View Daily Streak"
            >
              <Flame className={`w-3.5 h-3.5 ${currentStreak > 0 ? 'fill-orange-500 text-orange-400' : ''}`} />
              <span className="mono">{currentStreak}d</span>
            </Link>
          )}

          {/* AI button */}
          <button
            onClick={onOpenAiGuide}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 12px',
              borderRadius: 8,
              border: '1px solid rgba(212, 168, 67, 0.25)',
              background: 'rgba(212, 168, 67, 0.08)',
              fontSize: 12,
              fontWeight: 700,
              color: '#D4A843',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(212, 168, 67, 0.15)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 16px rgba(212, 168, 67, 0.2)';
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(212, 168, 67, 0.08)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
            }}
            title="Ask AI Mentor"
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Mentor</span>
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '5px 10px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#E8EAF0',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #D4A843, #C8963A)',
                    color: '#0D0F14',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 800
                  }}
                >
                  {user.name.charAt(0)}
                </div>
                <span style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3" style={{ color: '#7A8098' }} />
              </button>

              {profileDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    marginTop: 8,
                    width: 240,
                    background: '#1C2030',
                    border: '1px solid rgba(212, 168, 67, 0.15)',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    padding: '6px 0',
                    zIndex: 50,
                    animation: 'slideIn 0.15s ease-out'
                  }}
                >
                  <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ fontWeight: 700, fontSize: 13, color: '#E8EAF0' }}>{user.name}</p>
                    <p style={{ fontSize: 11, color: '#7A8098', marginTop: 2 }}>{user.email}</p>
                    <p style={{ fontSize: 11, color: '#D4A843', fontWeight: 600, marginTop: 3 }}>
                      {user.role === 'admin' ? 'Administrator' : 'Learner'}
                    </p>
                  </div>

                  <div style={{ padding: '4px 0' }}>
                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', fontSize: 12, color: '#B0B4C8', textDecoration: 'none', transition: 'background 0.15s' }}
                      onMouseOver={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'}
                      onMouseOut={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      to="/streak-platforms"
                      onClick={() => setProfileDropdownOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', fontSize: 12, color: '#B0B4C8', textDecoration: 'none', transition: 'background 0.15s' }}
                      onMouseOver={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'}
                      onMouseOut={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    >
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      <span>Streak & Platforms</span>
                    </Link>

                    <button
                      onClick={() => {
                        switchUserRole(user.role === 'admin' ? 'student' : 'admin');
                        setProfileDropdownOpen(false);
                      }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', fontSize: 12, color: '#B0B4C8', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s' }}
                      onMouseOver={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'}
                      onMouseOut={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Switch to {user.role === 'admin' ? 'Learner View' : 'Admin View'}</span>
                    </button>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '4px 0' }}>
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                        navigate('/login');
                      }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', fontSize: 12, color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 600, transition: 'background 0.15s' }}
                      onMouseOver={e => (e.currentTarget as HTMLElement).style.background = 'rgba(239, 68, 68, 0.06)'}
                      onMouseOut={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              style={{
                padding: '6px 16px',
                fontSize: 12,
                fontWeight: 700,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #D4A843 0%, #C8963A 100%)',
                color: '#0D0F14',
                textDecoration: 'none',
                transition: 'all 0.2s',
                boxShadow: '0 2px 10px rgba(212, 168, 67, 0.25)'
              }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
