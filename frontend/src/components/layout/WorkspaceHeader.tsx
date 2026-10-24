import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import {
  Menu,
  Search,
  Sparkles,
  Flame,
  ChevronRight,
  User,
  ShieldCheck,
  LogOut,
  RefreshCw,
  Zap,
  Command
} from 'lucide-react';

interface WorkspaceHeaderProps {
  onToggleMobileSidebar: () => void;
  onOpenCommandPalette: () => void;
  onOpenAiGuide: () => void;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  onToggleMobileSidebar,
  onOpenCommandPalette,
  onOpenAiGuide
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, logout, switchUserRole } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const streakDays = user ? storageService.calculateLearningStreak(user.id) : 0;

  // Resolve breadcrumbs dynamically
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/dashboard') return { category: 'Core Workspaces', page: 'Mission Control' };
    if (path.startsWith('/dsa-editor') || path === '/dsa') return { category: 'Core Workspaces', page: 'Code Studio' };
    if (path.startsWith('/challenges') || path.startsWith('/dsa-challenges')) return { category: 'Core Workspaces', page: 'Problem Arena' };
    if (path.startsWith('/roadmap')) return { category: 'Career Strategy', page: 'Milestone Roadmap' };
    if (path.startsWith('/skill-gap')) return { category: 'Career Strategy', page: 'Skill Gap Matrix' };
    if (path.startsWith('/assessment/results')) return { category: 'Career Strategy', page: 'Assessment Results' };
    if (path.startsWith('/assessment/take')) return { category: 'Career Strategy', page: 'Exam Session' };
    if (path.startsWith('/assessment')) return { category: 'Career Strategy', page: 'Skill Assessments' };
    if (path.startsWith('/streak-platforms') || path === '/streak') return { category: 'Intelligence & Vault', page: 'Activity Pulse' };
    if (path.startsWith('/resources-projects')) return { category: 'Intelligence & Vault', page: 'Resource Vault' };
    if (path.startsWith('/analytics')) return { category: 'Intelligence & Vault', page: 'Performance Analytics' };
    if (path.startsWith('/profile')) return { category: 'Management', page: 'Profile & Targets' };
    if (path.startsWith('/admin')) return { category: 'Management', page: 'Control Center' };
    return { category: 'Workspace', page: 'Overview' };
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header
      style={{
        height: 56,
        background: '#0D0F14',
        borderBottom: '1px solid rgba(212, 168, 67, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
    >
      {/* Left: Mobile hamburger & Dynamic Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-1.5 rounded-lg transition-colors"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#8A90A6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Breadcrumb Trail */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          <span style={{ color: '#5A6075', fontWeight: 600 }}>CodeVault</span>
          <ChevronRight className="w-3.5 h-3.5" style={{ color: '#3A4052' }} />
          <span style={{ color: '#7A8098', fontWeight: 500 }} className="hidden sm:inline">
            {breadcrumbs.category}
          </span>
          <ChevronRight className="w-3.5 h-3.5 hidden sm:inline" style={{ color: '#3A4052' }} />
          <span
            style={{
              color: '#E8EAF0',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 6,
              background: 'rgba(212, 168, 67, 0.08)',
              border: '1px solid rgba(212, 168, 67, 0.18)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {breadcrumbs.page}
          </span>
        </div>
      </div>

      {/* Center: Command Palette Trigger Bar */}
      <div style={{ flex: 1, maxWidth: 360, margin: '0 16px' }} className="hidden md:block">
        <button
          onClick={onOpenCommandPalette}
          style={{
            width: '100%',
            height: 34,
            padding: '0 12px',
            borderRadius: 8,
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#7A8098',
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(212, 168, 67, 0.3)';
            e.currentTarget.style.background = 'rgba(212, 168, 67, 0.04)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Search className="w-3.5 h-3.5" style={{ color: '#D4A843' }} />
            <span>Search modules, problems, actions...</span>
          </div>
          <span
            className="mono"
            style={{
              fontSize: 10,
              padding: '2px 6px',
              borderRadius: 4,
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#8A90A6'
            }}
          >
            Ctrl K
          </span>
        </button>
      </div>

      {/* Right: Streak, AI Assistant, Role & Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Mobile Search Button */}
        <button
          onClick={onOpenCommandPalette}
          className="md:hidden p-1.5 rounded-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#8A90A6'
          }}
          title="Search (Ctrl+K)"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Streak Flame Pill */}
        <Link
          to="/streak-platforms"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 10px',
            borderRadius: 20,
            background: streakDays > 0 ? 'rgba(239, 68, 68, 0.12)' : 'rgba(255, 255, 255, 0.04)',
            border: streakDays > 0 ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
            textDecoration: 'none',
            transition: 'all 0.15s'
          }}
          title={`${streakDays} Day Continuous Learning Streak`}
        >
          <Flame
            className="w-4 h-4"
            style={{
              color: streakDays > 0 ? '#F97316' : '#7A8098',
              filter: streakDays > 0 ? 'drop-shadow(0 0 6px rgba(249, 115, 22, 0.5))' : 'none'
            }}
          />
          <span
            className="mono"
            style={{
              fontSize: 11.5,
              fontWeight: 700,
              color: streakDays > 0 ? '#F97316' : '#8A90A6'
            }}
          >
            {streakDays}d
          </span>
        </Link>

        {/* AI Career Copilot Pill */}
        <button
          onClick={onOpenAiGuide}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 12px',
            borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(212, 168, 67, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
            border: '1px solid rgba(212, 168, 67, 0.35)',
            color: '#F0C860',
            fontSize: 11.5,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #D4A843 0%, #C8963A 100%)';
            e.currentTarget.style.color = '#0D0F14';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212, 168, 67, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)';
            e.currentTarget.style.color = '#F0C860';
          }}
          title="Open AI Career & DSA Mentor"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AI Copilot</span>
        </button>

        {/* Role Switcher Pill */}
        <button
          onClick={() => switchUserRole(role === 'admin' ? 'student' : 'admin')}
          style={{
            padding: '4px 9px',
            borderRadius: 6,
            background: role === 'admin' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(34, 197, 94, 0.12)',
            border: role === 'admin' ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid rgba(34, 197, 94, 0.25)',
            color: role === 'admin' ? '#C4B5FD' : '#86EFAC',
            fontSize: 10.5,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            transition: 'all 0.15s'
          }}
          title={`Click to switch to ${role === 'admin' ? 'Student' : 'Admin'} mode`}
        >
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{role}</span>
          <RefreshCw className="w-2.5 h-2.5" />
        </button>

        {/* Profile Avatar Capsule */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4A843 0%, #C8963A 100%)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12.5,
              fontWeight: 800,
              color: '#0D0F14',
              cursor: 'pointer'
            }}
          >
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </button>

          {profileMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: 40,
                right: 0,
                width: 220,
                background: '#141722',
                border: '1px solid rgba(212, 168, 67, 0.25)',
                borderRadius: 10,
                boxShadow: '0 12px 36px rgba(0,0,0,0.5)',
                padding: '8px',
                zIndex: 60,
                animation: 'fadeIn 0.1s ease-out'
              }}
            >
              <div style={{ padding: '8px 10px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                  {user?.name || 'Engineer'}
                </p>
                <p style={{ fontSize: 10.5, color: '#D4A843', margin: '2px 0 0', fontWeight: 600 }}>
                  {user?.targetRole || 'Full Stack Developer'}
                </p>
              </div>

              <div style={{ padding: '4px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <button
                  onClick={() => {
                    navigate('/profile');
                    setProfileMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 10px',
                    borderRadius: 6,
                    background: 'transparent',
                    border: 'none',
                    color: '#C0C4D6',
                    fontSize: 12,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <User className="w-3.5 h-3.5" style={{ color: '#D4A843' }} />
                  Profile Settings
                </button>

                <button
                  onClick={() => {
                    navigate('/admin');
                    setProfileMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 10px',
                    borderRadius: 6,
                    background: 'transparent',
                    border: 'none',
                    color: '#C0C4D6',
                    fontSize: 12,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <ShieldCheck className="w-3.5 h-3.5" style={{ color: '#A78BFA' }} />
                  Admin Console
                </button>

                <button
                  onClick={() => {
                    logout();
                    setProfileMenuOpen(false);
                    navigate('/login');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 10px',
                    borderRadius: 6,
                    background: 'transparent',
                    border: 'none',
                    color: '#EF4444',
                    fontSize: 12,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
