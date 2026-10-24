import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Code2,
  Swords,
  Map,
  TrendingUp,
  CheckCircle2,
  Flame,
  BookOpen,
  LineChart,
  UserCheck,
  Shield,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LogOut,
  RefreshCw,
  Zap,
  Target
} from 'lucide-react';

interface WorkspaceSidebarProps {
  isOpen: boolean; // For mobile drawer
  onClose: () => void;
  isCollapsed: boolean; // For desktop compact mode
  onToggleCollapse: () => void;
  onOpenAiGuide?: () => void;
}

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
  onOpenAiGuide
}) => {
  const { user, role, logout, switchUserRole } = useAuth();

  const navigationGroups = [
    {
      label: 'Core Workspaces',
      items: [
        { to: '/dashboard', label: 'Mission Control', icon: LayoutDashboard },
        { to: '/dsa-editor', label: 'Code Studio', icon: Code2, badge: 'Live', badgeColor: '#10B981' },
        { to: '/challenges', label: 'Problem Arena', icon: Swords, badge: '40+', badgeColor: '#D4A843' },
      ]
    },
    {
      label: 'Career Strategy',
      items: [
        { to: '/roadmap', label: 'Milestone Roadmap', icon: Map },
        { to: '/skill-gap', label: 'Skill Gap Matrix', icon: TrendingUp },
        { to: '/assessment', label: 'Skill Assessments', icon: CheckCircle2 },
      ]
    },
    {
      label: 'Intelligence & Vault',
      items: [
        { to: '/streak-platforms', label: 'Activity Pulse', icon: Flame, isStreak: true },
        { to: '/resources-projects', label: 'Resource Vault', icon: BookOpen },
        { to: '/analytics', label: 'Performance Analytics', icon: LineChart },
      ]
    },
    {
      label: 'Management',
      items: [
        { to: '/profile', label: 'Profile & Targets', icon: UserCheck },
        ...(role === 'admin'
          ? [{ to: '/admin', label: 'Control Center', icon: Shield, badge: 'Admin', badgeColor: '#8B5CF6' }]
          : [{ to: '/admin', label: 'Control Center', icon: Shield, badge: 'Demo', badgeColor: '#6B7280' }]),
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 49,
            background: 'rgba(5, 7, 10, 0.7)',
            backdropFilter: 'blur(4px)',
          }}
          className="lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        style={{
          width: isCollapsed ? 72 : 256,
          background: '#0E1118',
          borderRight: '1px solid rgba(212, 168, 67, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          transition: 'width 0.22s cubic-bezier(0.4, 0, 0.2, 1), transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '4px 0 24px rgba(0,0,0,0.3)',
          overflow: 'hidden'
        }}
        className={`fixed lg:sticky top-0 left-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Brand Bar */}
        <div
          style={{
            height: 58,
            padding: isCollapsed ? '0 12px' : '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            shrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                background: 'linear-gradient(135deg, #D4A843 0%, #C8963A 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 800,
                color: '#0D0F14',
                boxShadow: '0 2px 10px rgba(212, 168, 67, 0.3)',
                flexShrink: 0
              }}
            >
              CV
            </div>
            {!isCollapsed && (
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.3px', lineHeight: 1.1 }}>
                  CodeVault
                </span>
                <span style={{ fontSize: 9.5, fontWeight: 700, color: '#D4A843', letterSpacing: '1px', textTransform: 'uppercase', marginTop: 1 }}>
                  Career Launchpad
                </span>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={onToggleCollapse}
              title="Collapse sidebar (Ctrl+B)"
              style={{
                width: 26,
                height: 26,
                borderRadius: 6,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#7A8098',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#E8EAF0';
                e.currentTarget.style.background = 'rgba(212, 168, 67, 0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#7A8098';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Scrollable Navigation Area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: isCollapsed ? '12px 8px' : '12px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}
        >
          {/* Target Role Mini Widget (Expanded Mode) */}
          {!isCollapsed && user && (
            <div
              style={{
                padding: '9px 12px',
                borderRadius: 10,
                background: 'rgba(212, 168, 67, 0.06)',
                border: '1px solid rgba(212, 168, 67, 0.16)',
                display: 'flex',
                flexDirection: 'column',
                gap: 4
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 9.5, fontWeight: 700, color: '#D4A843', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  Target Track
                </span>
                <span className="mono" style={{ fontSize: 10, color: '#A0A4B8', fontWeight: 600 }}>
                  {user.weeklyHours || 12}h/wk
                </span>
              </div>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#E8EAF0',
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {user.targetRole || 'Java Full Stack Developer'}
              </p>
            </div>
          )}

          {/* Grouped Links */}
          {navigationGroups.map((group, gIdx) => (
            <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {!isCollapsed && (
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: '#4B5267',
                    letterSpacing: '0.9px',
                    textTransform: 'uppercase',
                    padding: '4px 8px 6px'
                  }}
                >
                  {group.label}
                </span>
              )}

              {group.items.map(item => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    title={isCollapsed ? item.label : undefined}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isCollapsed ? 'center' : 'space-between',
                      padding: isCollapsed ? '9px 0' : '8px 10px',
                      borderRadius: 8,
                      fontSize: 12.5,
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#FFFFFF' : '#8A90A6',
                      background: isActive ? 'rgba(212, 168, 67, 0.14)' : 'transparent',
                      border: isActive ? '1px solid rgba(212, 168, 67, 0.25)' : '1px solid transparent',
                      textDecoration: 'none',
                      transition: 'all 0.15s',
                      position: 'relative'
                    })}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                      <Icon
                        className="w-4 h-4 shrink-0"
                        style={{
                          color: 'inherit'
                        }}
                      />
                      {!isCollapsed && (
                        <span
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {item.label}
                        </span>
                      )}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span
                        className="mono"
                        style={{
                          fontSize: 9.5,
                          fontWeight: 700,
                          padding: '1px 5px',
                          borderRadius: 4,
                          background: `${item.badgeColor || '#D4A843'}22`,
                          color: item.badgeColor || '#D4A843',
                          border: `1px solid ${item.badgeColor || '#D4A843'}44`,
                          flexShrink: 0
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}

          {/* AI Guide Trigger Card (Expanded mode) */}
          {!isCollapsed && onOpenAiGuide && (
            <div
              style={{
                marginTop: 'auto',
                padding: '12px',
                borderRadius: 10,
                background: 'linear-gradient(135deg, rgba(212, 168, 67, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                border: '1px solid rgba(212, 168, 67, 0.22)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    background: '#D4A843',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0D0F14'
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p style={{ fontSize: 11.5, fontWeight: 700, color: '#E8EAF0', margin: 0 }}>
                    AI Career Copilot
                  </p>
                  <p style={{ fontSize: 9.5, color: '#8A90A6', margin: 0 }}>
                    Instant roadmap & DSA mentor
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenAiGuide}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  borderRadius: 6,
                  background: 'rgba(212, 168, 67, 0.18)',
                  border: '1px solid rgba(212, 168, 67, 0.35)',
                  color: '#F0C860',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  transition: 'all 0.15s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#D4A843';
                  e.currentTarget.style.color = '#0D0F14';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(212, 168, 67, 0.18)';
                  e.currentTarget.style.color = '#F0C860';
                }}
              >
                <Zap className="w-3.5 h-3.5" />
                Launch Assistant
              </button>
            </div>
          )}
        </div>

        {/* Bottom Profile / Quick Action Bar */}
        <div
          style={{
            padding: isCollapsed ? '10px 8px' : '10px 12px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'rgba(10, 12, 16, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            shrink: 0
          }}
        >
          {isCollapsed ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <button
                onClick={onToggleCollapse}
                title="Expand sidebar"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#7A8098',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {onOpenAiGuide && (
                <button
                  onClick={onOpenAiGuide}
                  title="Open AI Guide"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: 'rgba(212, 168, 67, 0.15)',
                    border: '1px solid rgba(212, 168, 67, 0.3)',
                    color: '#D4A843',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #D4A843 0%, #F0C860 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 800,
                    color: '#0D0F14',
                    flexShrink: 0
                  }}
                >
                  {user?.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#E8EAF0',
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {user?.name || 'Engineer'}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: (role || 'student') === 'admin' ? '#A78BFA' : '#4ADE80'
                      }}
                    >
                      {role || 'student'}
                    </span>
                    <button
                      onClick={() => switchUserRole((role || 'student') === 'admin' ? 'student' : 'admin')}
                      title="Toggle role"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#6B7280',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                title="Sign Out"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#6B7280',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.15s'
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#EF4444'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#6B7280'; }}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
