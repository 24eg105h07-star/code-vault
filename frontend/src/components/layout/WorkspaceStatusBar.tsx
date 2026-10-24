import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import { Zap, Command, Terminal, CheckCircle2 } from 'lucide-react';

interface WorkspaceStatusBarProps {
  onOpenCommandPalette: () => void;
  onOpenAiGuide: () => void;
}

export const WorkspaceStatusBar: React.FC<WorkspaceStatusBarProps> = ({
  onOpenCommandPalette,
  onOpenAiGuide
}) => {
  const { user, role } = useAuth();
  const streak = user ? storageService.calculateLearningStreak(user.id) : 0;

  return (
    <footer
      style={{
        height: 26,
        background: '#090B0F',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        fontSize: 10.5,
        color: '#60667A',
        zIndex: 30,
        position: 'sticky',
        bottom: 0,
        shrink: 0,
        userSelect: 'none'
      }}
    >
      {/* Left Telemetry */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#10B981',
              boxShadow: '0 0 6px #10B981'
            }}
          />
          <span style={{ fontWeight: 600, color: '#9096A8' }}>CodeVault v2.4</span>
        </div>

        <span style={{ color: '#2A2F3E' }}>|</span>

        <span style={{ color: '#7A8098' }} className="hidden sm:inline">
          Target: <strong style={{ color: '#D4A843' }}>{user?.targetRole || 'Full Stack'}</strong>
        </span>
      </div>

      {/* Center Shortcuts Helper */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
        className="hidden md:flex"
        onClick={onOpenCommandPalette}
      >
        <span style={{ color: '#7A8098' }}>
          <strong style={{ color: '#A0A4B8' }}>Ctrl+K</strong> Quick Jump
        </span>
        <span style={{ color: '#2A2F3E' }}>·</span>
        <span style={{ color: '#7A8098' }} onClick={e => { e.stopPropagation(); onOpenAiGuide(); }}>
          <strong style={{ color: '#A0A4B8' }}>AI Mentor</strong> Ready
        </span>
      </div>

      {/* Right Stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span className="mono" style={{ color: streak > 0 ? '#F97316' : '#7A8098', fontWeight: 600 }}>
          {streak}d Streak
        </span>
        <span style={{ color: '#2A2F3E' }}>|</span>
        <span
          style={{
            textTransform: 'uppercase',
            fontWeight: 700,
            fontSize: 9.5,
            color: (role || 'student') === 'admin' ? '#A78BFA' : '#4ADE80'
          }}
        >
          {role || 'student'}
        </span>
      </div>
    </footer>
  );
};
