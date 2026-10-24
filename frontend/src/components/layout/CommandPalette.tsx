import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import {
  Search,
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
  RefreshCw,
  LogOut,
  Clock,
  ExternalLink,
  Command,
  X
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAiGuide: (context?: string) => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Workspaces' | 'Career Strategy' | 'Knowledge & Tools' | 'Actions';
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  shortcut?: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenAiGuide
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user, role, logout, switchUserRole } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    // Workspaces
    {
      id: 'dashboard',
      title: 'Mission Control',
      subtitle: 'Personalized engineering dashboard & metrics',
      category: 'Workspaces',
      icon: LayoutDashboard,
      shortcut: 'G D',
      action: () => { navigate('/dashboard'); onClose(); }
    },
    {
      id: 'dsa-editor',
      title: 'Code Studio & Compiler',
      subtitle: 'Live interactive coding environment with multi-language testcases',
      category: 'Workspaces',
      icon: Code2,
      shortcut: 'G C',
      action: () => { navigate('/dsa-editor'); onClose(); }
    },
    {
      id: 'challenges',
      title: 'Problem Arena',
      subtitle: 'Curated technical interview challenge tracks & problem sets',
      category: 'Workspaces',
      icon: Swords,
      shortcut: 'G A',
      action: () => { navigate('/challenges'); onClose(); }
    },

    // Career Strategy
    {
      id: 'roadmap',
      title: 'Milestone Roadmap',
      subtitle: 'Role-aligned engineering learning path & prerequisites',
      category: 'Career Strategy',
      icon: Map,
      shortcut: 'G R',
      action: () => { navigate('/roadmap'); onClose(); }
    },
    {
      id: 'skill-gap',
      title: 'Skill Gap Matrix',
      subtitle: 'Benchmarking current skills vs targeted engineering role',
      category: 'Career Strategy',
      icon: TrendingUp,
      shortcut: 'G S',
      action: () => { navigate('/skill-gap'); onClose(); }
    },
    {
      id: 'assessment',
      title: 'Verified Assessments',
      subtitle: 'Diagnostic and topical skill validation tests',
      category: 'Career Strategy',
      icon: CheckCircle2,
      shortcut: 'G T',
      action: () => { navigate('/assessment'); onClose(); }
    },

    // Knowledge & Tools
    {
      id: 'streak',
      title: 'Activity Pulse & External Streaks',
      subtitle: 'LeetCode, Codeforces, HackerRank profile integrations',
      category: 'Knowledge & Tools',
      icon: Flame,
      shortcut: 'G P',
      action: () => { navigate('/streak-platforms'); onClose(); }
    },
    {
      id: 'resources',
      title: 'Resource Vault & Guided Projects',
      subtitle: 'Curated books, cheat sheets, tutorials, and portfolio projects',
      category: 'Knowledge & Tools',
      icon: BookOpen,
      shortcut: 'G V',
      action: () => { navigate('/resources-projects'); onClose(); }
    },
    {
      id: 'analytics',
      title: 'Performance Analytics',
      subtitle: 'Study distribution, difficulty mastery, and velocity breakdown',
      category: 'Knowledge & Tools',
      icon: LineChart,
      shortcut: 'G Y',
      action: () => { navigate('/analytics'); onClose(); }
    },
    {
      id: 'profile',
      title: 'Profile & Career Preferences',
      subtitle: 'Update target role, experience level, and weekly study goal',
      category: 'Knowledge & Tools',
      icon: UserCheck,
      shortcut: 'G U',
      action: () => { navigate('/profile'); onClose(); }
    },
    {
      id: 'admin',
      title: 'Admin Control Center',
      subtitle: 'Manage question bank, curate resources, and review metrics',
      category: 'Knowledge & Tools',
      icon: Shield,
      shortcut: 'G M',
      action: () => { navigate('/admin'); onClose(); }
    },

    // Actions
    {
      id: 'ai-mentor',
      title: 'Ask AI Career Copilot',
      subtitle: 'Get real-time guidance on roadmaps, DSA, or interview prep',
      category: 'Actions',
      icon: Sparkles,
      shortcut: 'Alt + A',
      action: () => {
        onClose();
        onOpenAiGuide('General Platform Guidance');
      }
    },
    {
      id: 'switch-role',
      title: `Switch Mode (Currently: ${(role || 'student').toUpperCase()})`,
      subtitle: `Toggle environment view between Student and Platform Admin`,
      category: 'Actions',
      icon: RefreshCw,
      action: () => {
        switchUserRole((role || 'student') === 'admin' ? 'student' : 'admin');
        onClose();
      }
    },
    {
      id: 'quick-log',
      title: 'Quick Log 1 Hour Study',
      subtitle: 'Register 60 minutes of dedicated engineering study to daily streak',
      category: 'Actions',
      icon: Clock,
      action: () => {
        if (user) {
          storageService.logActivity({
            id: `act-${Date.now()}`,
            userId: user.id,
            date: new Date().toISOString(),
            hoursSpent: 1,
            activityType: 'resource_study',
            description: `Quick-logged study session via Command Palette`
          });
        }
        onClose();
      }
    },
    {
      id: 'logout',
      title: 'Sign Out of CodeVault',
      subtitle: 'Safely end your current session',
      category: 'Actions',
      icon: LogOut,
      action: () => {
        logout();
        onClose();
        navigate('/login');
      }
    }
  ];

  const filteredCommands = commands.filter(cmd => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(5, 7, 10, 0.78)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 16px 24px',
        animation: 'fadeIn 0.15s ease-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 640,
          background: '#12151E',
          border: '1px solid rgba(212, 168, 67, 0.25)',
          borderRadius: 14,
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh'
        }}
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '16px 18px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(255, 255, 255, 0.02)'
          }}
        >
          <Search className="w-5 h-5 shrink-0" style={{ color: '#D4A843' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search workspaces, roadmaps, tools..."
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#E8EAF0',
              fontSize: 15,
              fontWeight: 500,
              fontFamily: "'Sora', sans-serif"
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#7A8098',
                cursor: 'pointer',
                padding: 4
              }}
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span
            className="mono"
            style={{
              fontSize: 10,
              padding: '3px 7px',
              borderRadius: 5,
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#7A8098'
            }}
          >
            ESC
          </span>
        </div>

        {/* Results List */}
        <div
          style={{
            overflowY: 'auto',
            padding: '10px 8px',
            flex: 1
          }}
        >
          {filteredCommands.length === 0 ? (
            <div style={{ padding: '36px 16px', textAlign: 'center', color: '#7A8098' }}>
              <p style={{ fontSize: 13, fontWeight: 500 }}>No matching commands or destinations found</p>
              <p style={{ fontSize: 11, marginTop: 4 }}>Try searching "Code", "Roadmap", "Streak", or "AI"</p>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: '10px 14px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(212, 168, 67, 0.12)' : 'transparent',
                    border: isSelected ? '1px solid rgba(212, 168, 67, 0.25)' : '1px solid transparent',
                    transition: 'all 0.12s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: isSelected ? 'rgba(212, 168, 67, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isSelected ? '#D4A843' : '#8A90A6',
                        shrink: 0
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: isSelected ? 600 : 500,
                            color: isSelected ? '#FFFFFF' : '#E8EAF0'
                          }}
                        >
                          {cmd.title}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            textTransform: 'uppercase',
                            letterSpacing: '0.6px',
                            color: '#7A8098',
                            background: 'rgba(255, 255, 255, 0.04)',
                            padding: '1px 6px',
                            borderRadius: 4
                          }}
                        >
                          {cmd.category}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: 11,
                          color: isSelected ? '#B8BAC8' : '#7A8098',
                          margin: '2px 0 0 0',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {cmd.subtitle}
                      </p>
                    </div>
                  </div>

                  {cmd.shortcut && (
                    <span
                      className="mono"
                      style={{
                        fontSize: 11,
                        color: isSelected ? '#D4A843' : '#5A6075',
                        background: 'rgba(0,0,0,0.2)',
                        padding: '3px 7px',
                        borderRadius: 4,
                        shrink: 0
                      }}
                    >
                      {cmd.shortcut}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div
          style={{
            padding: '10px 18px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'rgba(10, 12, 16, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 11,
            color: '#6A7085'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span><strong style={{ color: '#A0A4B8' }}>↑↓</strong> to navigate</span>
            <span><strong style={{ color: '#A0A4B8' }}>↵</strong> to select</span>
            <span><strong style={{ color: '#A0A4B8' }}>esc</strong> to dismiss</span>
          </div>
          <span style={{ color: '#D4A843', fontWeight: 600 }}>CodeVault Command Hub</span>
        </div>
      </div>
    </div>
  );
};
