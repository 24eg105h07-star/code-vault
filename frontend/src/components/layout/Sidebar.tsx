import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  CheckCircle2,
  TrendingUp,
  Map,
  BookOpen,
  LineChart,
  UserCheck,
  Shield,
  Code2,
  Flame,
  Zap,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAiGuide?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onOpenAiGuide }) => {
  const { user, role } = useAuth();

  const studentNavItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/dsa-editor', label: 'Code Lab', icon: Code2, badge: 'Live' },
    { to: '/streak-platforms', label: 'Activity Streak', icon: Flame, isStreak: true },
    { to: '/assessment', label: 'Skill Tests', icon: CheckCircle2 },
    { to: '/skill-gap', label: 'Gap Analysis', icon: TrendingUp },
    { to: '/roadmap', label: 'Learning Roadmap', icon: Map },
    { to: '/resources-projects', label: 'Resources & Labs', icon: BookOpen },
    { to: '/analytics', label: 'Analytics', icon: LineChart },
    { to: '/profile', label: 'My Profile', icon: UserCheck },
  ];

  const adminNavItems = [
    { to: '/admin', label: 'Admin Overview', icon: Shield },
    { to: '/admin?tab=questions', label: 'Question Bank', icon: CheckCircle2 },
    { to: '/admin?tab=resources', label: 'Resource Library', icon: BookOpen },
    { to: '/admin?tab=stats', label: 'Platform Metrics', icon: LineChart },
  ];

  const sidebarBase: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 40,
    height: '100%',
    width: 240,
    background: '#0D0F14',
    borderRight: '1px solid rgba(212, 168, 67, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s ease-in-out',
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    boxShadow: '4px 0 24px rgba(0,0,0,0.4)'
  };

  const mdStyle: React.CSSProperties = window.innerWidth >= 768 ? {
    position: 'sticky',
    top: 61,
    height: 'calc(100vh - 61px)',
    transform: 'translateX(0)',
    boxShadow: 'none'
  } : {};

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 39,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
          }}
          className="md:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        style={{ ...sidebarBase, ...(window.innerWidth >= 768 ? mdStyle : {}) }}
        className={`fixed md:sticky top-0 md:top-[61px] left-0 z-40 h-full md:h-[calc(100vh-61px)] w-60 flex flex-col justify-between transition-transform duration-200 ease-in-out shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-5 overflow-y-auto">
          {/* Career Target Card */}
          <div
            style={{
              padding: '10px 12px',
              borderRadius: 10,
              background: 'rgba(212, 168, 67, 0.06)',
              border: '1px solid rgba(212, 168, 67, 0.15)',
            }}
          >
            <p style={{ fontSize: 10, fontWeight: 600, color: '#7A8098', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Target Role
            </p>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#D4A843', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.targetRole || 'Java Full Stack Developer'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#7A8098', marginTop: 5 }}>
              <span className="mono" style={{ color: '#B0B4C8', fontWeight: 500 }}>{user?.weeklyHours || 12}h/wk</span>
              <span style={{ color: '#3A4050' }}>·</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.experienceLevel || 'Intermediate'}</span>
            </div>
          </div>

          {/* Student Navigation */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, color: '#3A4560', textTransform: 'uppercase', letterSpacing: '0.8px', paddingLeft: 6, marginBottom: 6 }}>
              Learning Path
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {studentNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => { if (window.innerWidth < 768) onClose(); }}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '7px 10px',
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#D4A843' : '#7A8098',
                      background: isActive ? 'rgba(212, 168, 67, 0.1)' : 'transparent',
                      border: isActive ? '1px solid rgba(212, 168, 67, 0.2)' : '1px solid transparent',
                      textDecoration: 'none',
                      transition: 'all 0.15s',
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 9, overflow: 'hidden' }}>
                          <Icon
                            className={`w-3.5 h-3.5 shrink-0 ${item.isStreak ? 'text-orange-400' : ''}`}
                            style={{ color: item.isStreak ? '#fb923c' : (isActive ? '#D4A843' : '#5A6080') }}
                          />
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span style={{
                            fontSize: 9,
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: 4,
                            background: 'rgba(167, 139, 250, 0.15)',
                            color: '#A78BFA',
                            border: '1px solid rgba(167, 139, 250, 0.2)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* AI Mentor Banner */}
          {onOpenAiGuide && (
            <div
              style={{
                padding: '12px',
                borderRadius: 10,
                background: 'rgba(212, 168, 67, 0.05)',
                border: '1px solid rgba(212, 168, 67, 0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Zap className="w-3.5 h-3.5" style={{ color: '#D4A843' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#D4A843' }}>AI Career Mentor</span>
              </div>
              <p style={{ fontSize: 11, color: '#7A8098', lineHeight: 1.5, marginBottom: 8 }}>
                Ask about DSA solutions, architecture, career advice, or study plans.
              </p>
              <button
                onClick={() => {
                  onOpenAiGuide();
                  if (window.innerWidth < 768) onClose();
                }}
                style={{
                  width: '100%',
                  padding: '6px 0',
                  borderRadius: 7,
                  background: 'linear-gradient(135deg, #D4A843, #C8963A)',
                  color: '#0D0F14',
                  fontWeight: 700,
                  fontSize: 11,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  transition: 'all 0.2s'
                }}
              >
                <Zap className="w-3 h-3" />
                <span>Ask AI Mentor</span>
              </button>
            </div>
          )}

          {/* Admin Section */}
          {role === 'admin' && (
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, color: '#3A4560', textTransform: 'uppercase', letterSpacing: '0.8px', paddingLeft: 6, marginBottom: 6 }}>
                Administration
              </p>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {adminNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => { if (window.innerWidth < 768) onClose(); }}
                      style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: 9,
                        padding: '7px 10px',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? '#D4A843' : '#7A8098',
                        background: isActive ? 'rgba(212, 168, 67, 0.1)' : 'transparent',
                        border: isActive ? '1px solid rgba(212, 168, 67, 0.2)' : '1px solid transparent',
                        textDecoration: 'none',
                        transition: 'all 0.15s',
                      })}
                    >
                      {({ isActive }) => (
                        <>
                          <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: isActive ? '#D4A843' : '#5A6080' }} />
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div
          style={{
            padding: '14px 16px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <p style={{ fontSize: 12, fontWeight: 800, color: '#D4A843' }}>CodeVault</p>
          <p style={{ fontSize: 10, color: '#4A5068', marginTop: 2 }}>Engineering Career Launchpad</p>
        </div>
      </aside>
    </>
  );
};
