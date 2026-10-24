import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { storageService } from '../../services/storageService';
import { DashboardMetrics, RoadmapTask } from '../../types';
import {
  Award,
  TrendingUp,
  Map,
  Flame,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Code2,
  Trash2,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const cardStyle: React.CSSProperties = {
  background: '#14171F',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 12,
  padding: '20px',
};

const goldBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '7px 14px',
  borderRadius: 7,
  background: 'linear-gradient(135deg, #D4A843 0%, #C8963A 100%)',
  color: '#0D0F14',
  fontSize: 12,
  fontWeight: 700,
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  boxShadow: '0 2px 8px rgba(212, 168, 67, 0.2)',
  transition: 'all 0.2s'
};

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [quickLogHours, setQuickLogHours] = useState<number>(1);
  const [logSuccess, setLogSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user) loadDashboard();
  }, [user]);

  const loadDashboard = async () => {
    if (!user) return;
    setIsLoading(false);
    const data = await apiService.getDashboard(user.id);
    setMetrics(data);
  };

  const handleCompleteNextTask = async (task: RoadmapTask) => {
    if (!user) return;
    await apiService.updateRoadmapTaskProgress(user.id, task.id, 'completed', 2);
    setLogSuccess(`Completed "${task.title}" — 2 study hours logged!`);
    setTimeout(() => setLogSuccess(null), 4000);
    loadDashboard();
  };

  const handleQuickLogTime = () => {
    if (!user) return;
    storageService.logActivity({
      id: `act-${Date.now()}`,
      userId: user.id,
      date: new Date().toISOString(),
      hoursSpent: quickLogHours,
      activityType: 'resource_study',
      description: `Self-directed study on ${user.targetRole || 'Java Full Stack Developer'}`
    });
    setLogSuccess(`Logged ${quickLogHours} hour(s) of focused study!`);
    setTimeout(() => setLogSuccess(null), 3000);
    loadDashboard();
  };

  if (!user) {
    return (
      <div style={{ padding: 32, textAlign: 'center', color: '#7A8098', fontSize: 13 }}>
        Please sign in to view your dashboard.
      </div>
    );
  }

  const userActivities = storageService.getUserActivities(user.id);
  const chartData = [
    { day: 'Mon', hours: 0 }, { day: 'Tue', hours: 0 }, { day: 'Wed', hours: 0 },
    { day: 'Thu', hours: 0 }, { day: 'Fri', hours: 0 }, { day: 'Sat', hours: 0 }, { day: 'Sun', hours: 0 }
  ];
  userActivities.slice(0, 10).forEach(act => {
    const d = new Date(act.date);
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()];
    const entry = chartData.find(c => c.day === dayName);
    if (entry) entry.hours = Number((entry.hours + (act.hoursSpent || 1)).toFixed(1));
  });

  const todayStr = new Date().toISOString().split('T')[0];
  const hasStudiedToday = userActivities.some(a => a.date.startsWith(todayStr));
  const streakDays = metrics?.currentStreakDays || 0;

  return (
    <div style={{ padding: '24px', maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Welcome banner */}
      <div
        style={{
          ...cardStyle,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          background: 'linear-gradient(135deg, #14171F 0%, #1C2030 100%)',
          borderColor: 'rgba(212, 168, 67, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle top accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #D4A843, rgba(212,168,67,0.2), transparent)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #D4A843, #C8963A)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 800,
              color: '#0D0F14',
              boxShadow: '0 4px 16px rgba(212, 168, 67, 0.3)',
              flexShrink: 0
            }}
          >
            {user.name.charAt(0)}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: '#E8EAF0' }}>Welcome back, {user.name}</h1>
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                padding: '2px 8px',
                borderRadius: 5,
                background: 'rgba(212, 168, 67, 0.1)',
                color: '#D4A843',
                border: '1px solid rgba(212, 168, 67, 0.2)'
              }}>
                {user.role}
              </span>
            </div>
            <p style={{ fontSize: 12, color: '#7A8098' }}>
              Target:{' '}
              <span style={{ color: '#D4A843', fontWeight: 600 }}>{user.targetRole || 'Java Full Stack Developer'}</span>
              <span style={{ margin: '0 8px', color: '#2A2F3E' }}>·</span>
              <span>{user.educationLevel || 'Undergraduate'} · {user.course || 'Computer Science'}</span>
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
          <Link to="/dsa-editor" style={{ ...goldBtnStyle, background: 'rgba(167, 139, 250, 0.15)', color: '#A78BFA', boxShadow: 'none', border: '1px solid rgba(167, 139, 250, 0.25)' }}>
            <Code2 className="w-3.5 h-3.5" />
            <span>Code Lab</span>
          </Link>
          <Link to="/streak-platforms" style={{ ...goldBtnStyle, background: 'rgba(251, 146, 60, 0.1)', color: '#fb923c', boxShadow: 'none', border: '1px solid rgba(251, 146, 60, 0.2)' }}>
            <Flame className="w-3.5 h-3.5" />
            <span>Activity Hub</span>
          </Link>
          <Link to="/assessment" style={goldBtnStyle}>
            <Award className="w-3.5 h-3.5" />
            <span>Take Test</span>
          </Link>
          <button
            onClick={() => {
              if (confirm('Reset this profile to a clean slate for real evaluation?')) {
                storageService.resetUserData(user.id);
                loadDashboard();
                setLogSuccess('Account reset! Ready for your real data.');
                setTimeout(() => setLogSuccess(null), 4000);
              }
            }}
            style={{ padding: '7px 8px', borderRadius: 7, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', color: '#5A6080', transition: 'all 0.2s' }}
            title="Reset Account Data"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Success notice */}
      {logSuccess && (
        <div style={{ padding: '11px 14px', borderRadius: 8, background: 'rgba(74, 222, 128, 0.08)', border: '1px solid rgba(74, 222, 128, 0.2)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#4ade80' }}>
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{logSuccess}</span>
        </div>
      )}

      {/* Streak banner */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: 12,
          border: `1px solid ${hasStudiedToday ? 'rgba(74, 222, 128, 0.2)' : streakDays > 0 ? 'rgba(251, 146, 60, 0.3)' : 'rgba(251, 146, 60, 0.15)'}`,
          background: hasStudiedToday ? 'rgba(74, 222, 128, 0.05)' : streakDays > 0 ? 'rgba(251, 146, 60, 0.07)' : 'rgba(255,255,255,0.02)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: hasStudiedToday ? 'rgba(74, 222, 128, 0.15)' : 'rgba(251, 146, 60, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Flame className="w-5 h-5" style={{ color: hasStudiedToday ? '#4ade80' : '#fb923c' }} />
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#E8EAF0', marginBottom: 3 }}>
              {hasStudiedToday ? `Streak Active — ${streakDays} Day(s)` : streakDays > 0 ? `⚠ Streak At Risk — ${streakDays} Day(s)` : 'Daily Learning Streak'}
            </p>
            <p style={{ fontSize: 11, color: '#7A8098' }}>
              {hasStudiedToday
                ? 'Great work! You\'ve completed your learning activity today.'
                : streakDays > 0
                ? 'Solve 1 DSA problem before midnight to protect your streak!'
                : 'Solve a DSA problem today to start your streak. Consistency lands jobs.'}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/dsa-editor" style={goldBtnStyle}>Solve DSA Problem</Link>
          <Link to="/streak-platforms" style={{ ...goldBtnStyle, background: 'rgba(255,255,255,0.05)', color: '#B0B4C8', boxShadow: 'none', border: '1px solid rgba(255,255,255,0.08)' }}>Activity Hub</Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {[
          {
            label: 'Latest Assessment',
            value: metrics?.latestAssessmentScore !== null && metrics?.latestAssessmentScore !== undefined ? `${metrics.latestAssessmentScore}%` : '—',
            sub: metrics?.totalAssessmentsTaken ? `${metrics.totalAssessmentsTaken} attempt(s) completed` : 'No attempts yet',
            icon: Award,
            color: '#D4A843'
          },
          {
            label: 'Roadmap Progress',
            value: `${metrics?.roadmapCompletionPercentage || 0}%`,
            sub: `${metrics?.completedRoadmapTasks || 0} of ${metrics?.totalRoadmapTasks || 0} tasks done`,
            icon: Map,
            color: '#4ade80'
          },
          {
            label: 'Activity Streak',
            value: `${metrics?.currentStreakDays || 0}`,
            sub: 'Days of consistent learning',
            icon: Flame,
            color: '#fb923c',
            mono: true,
            suffix: 'd'
          },
          {
            label: 'Weekly Study',
            value: `${metrics?.weeklyHoursLogged || 0}`,
            sub: `Goal: ${user.weeklyHours || 12}h/wk · Lifetime: ${metrics?.totalHoursLearned || 0}h`,
            icon: Clock,
            color: '#A78BFA',
            suffix: 'h'
          }
        ].map(m => (
          <div key={m.label} style={{ ...cardStyle, transition: 'border-color 0.2s' }}
            onMouseOver={e => (e.currentTarget as HTMLElement).style.borderColor = `${m.color}30`}
            onMouseOut={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, fontSize: 11, color: '#7A8098', fontWeight: 500 }}>
              <span>{m.label}</span>
              <m.icon className="w-4 h-4" style={{ color: m.color }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: 30, fontWeight: 800, color: m.color, fontFamily: "'IBM Plex Mono', monospace" }}>{m.value}</span>
              {m.suffix && <span style={{ fontSize: 13, color: '#5A6080' }}>{m.suffix}</span>}
            </div>
            <p style={{ fontSize: 11, color: '#5A6080', marginTop: 6 }}>{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Problem of the Day */}
      <div
        style={{
          borderRadius: 12,
          background: 'linear-gradient(135deg, #0A0C10 0%, #14171F 100%)',
          border: '1px solid rgba(167, 139, 250, 0.15)',
          padding: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #A78BFA60, transparent)' }} />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 5, background: 'rgba(167, 139, 250, 0.1)', border: '1px solid rgba(167, 139, 250, 0.2)', color: '#A78BFA', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Zap className="w-3 h-3" /> Daily Challenge
            </span>
            <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 5, background: 'rgba(74, 222, 128, 0.08)', border: '1px solid rgba(74, 222, 128, 0.15)', color: '#4ade80' }}>
              Easy · Arrays & Hashing
            </span>
          </div>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#E8EAF0', marginBottom: 6 }}>
            Two Sum — Master O(N) Hash Map Lookup
          </h2>
          <p style={{ fontSize: 12, color: '#7A8098', maxWidth: 520, lineHeight: 1.6 }}>
            The foundation of technical interviews. Solve in the Code Lab or log your external solution to maintain your daily streak.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          <Link to="/dsa-editor?problem=two-sum" style={{ ...goldBtnStyle, background: 'rgba(74, 222, 128, 0.15)', color: '#4ade80', border: '1px solid rgba(74, 222, 128, 0.25)', boxShadow: 'none', padding: '9px 18px', fontSize: 13 }}>
            <Code2 className="w-4 h-4" />
            <span>Solve in Code Lab</span>
          </Link>
          <Link to="/dsa-editor" style={{ ...goldBtnStyle, background: 'rgba(255,255,255,0.04)', color: '#B0B4C8', boxShadow: 'none', border: '1px solid rgba(255,255,255,0.08)', padding: '9px 16px', fontSize: 13 }}>
            Browse Tracks
          </Link>
        </div>
      </div>

      {/* Two-column: Next Task & Weak Areas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="grid-cols-1 lg:grid-cols-2">
        {/* Recommended task */}
        <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: 11, fontWeight: 700, color: '#E8EAF0', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Zap className="w-4 h-4" style={{ color: '#D4A843' }} />
              Recommended Next Task
            </h2>
            <Link to="/roadmap" style={{ fontSize: 11, color: '#D4A843', textDecoration: 'none', fontWeight: 600 }}>View All →</Link>
          </div>

          {metrics?.recommendedNextTask ? (
            <div style={{ padding: '14px', borderRadius: 10, background: '#1C2030', border: '1px solid rgba(255,255,255,0.05)', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#7A8098' }}>{metrics.recommendedNextTask.skillCategory}</span>
                <span style={{ fontSize: 10, color: '#D4A843', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>~{metrics.recommendedNextTask.estimatedHours}h</span>
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#E8EAF0' }}>{metrics.recommendedNextTask.title}</h3>
              <p style={{ fontSize: 12, color: '#7A8098', lineHeight: 1.6 }}>{metrics.recommendedNextTask.description}</p>
              <div style={{ padding: '10px 12px', borderRadius: 8, background: '#14171F', border: '1px solid rgba(255,255,255,0.04)' }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#B0B4C8', marginBottom: 4 }}>Practice Goal:</p>
                <p style={{ fontSize: 11, color: '#7A8098' }}>{metrics.recommendedNextTask.practiceExercise}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                <button
                  onClick={() => handleCompleteNextTask(metrics.recommendedNextTask!)}
                  style={{ ...goldBtnStyle, fontSize: 11, padding: '7px 14px' }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Completed</span>
                </button>
                <Link to="/roadmap" style={{ fontSize: 11, color: '#7A8098', textDecoration: 'none' }}>Open Roadmap →</Link>
              </div>
            </div>
          ) : (
            <div style={{ padding: '24px', textAlign: 'center', borderRadius: 10, background: '#1C2030', border: '1px solid rgba(255,255,255,0.04)', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <Target className="w-8 h-8" style={{ color: '#D4A843' }} />
              <p style={{ fontSize: 13, fontWeight: 700, color: '#E8EAF0' }}>No Active Tasks</p>
              <p style={{ fontSize: 11, color: '#7A8098', maxWidth: 240, lineHeight: 1.5 }}>Take an assessment to generate your personalized roadmap.</p>
              <Link to="/assessment" style={goldBtnStyle}>Start Assessment</Link>
            </div>
          )}

          {/* Quick log */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#7A8098' }}>Quick Log Study Hours:</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <select
                value={quickLogHours}
                onChange={e => setQuickLogHours(Number(e.target.value))}
                style={{ padding: '5px 10px', fontSize: 11, borderRadius: 6, background: '#1C2030', border: '1px solid rgba(255,255,255,0.08)', color: '#E8EAF0', outline: 'none' }}
              >
                <option value={0.5}>0.5h</option>
                <option value={1}>1.0h</option>
                <option value={2}>2.0h</option>
                <option value={3}>3.0h</option>
              </select>
              <button onClick={handleQuickLogTime} style={{ ...goldBtnStyle, padding: '5px 12px', fontSize: 11 }}>
                Log Hours
              </button>
            </div>
          </div>
        </div>

        {/* Weak areas */}
        <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: 11, fontWeight: 700, color: '#E8EAF0', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle className="w-4 h-4" style={{ color: '#fb923c' }} />
              Priority Focus Areas
            </h2>
            <Link to="/skill-gap" style={{ fontSize: 11, color: '#D4A843', textDecoration: 'none', fontWeight: 600 }}>View Matrix →</Link>
          </div>

          {metrics?.weakestSkillAreas && metrics.weakestSkillAreas.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {metrics.weakestSkillAreas.map((skill, idx) => (
                <div key={idx} style={{ padding: '12px', borderRadius: 8, background: 'rgba(251, 146, 60, 0.05)', border: '1px solid rgba(251, 146, 60, 0.15)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#E8EAF0' }}>{skill}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: 'rgba(251, 146, 60, 0.1)', color: '#fb923c', border: '1px solid rgba(251, 146, 60, 0.2)' }}>Gap</span>
                  </div>
                  <p style={{ fontSize: 11, color: '#7A8098' }}>
                    Detected by diagnostic assessment. Roadmap contains targeted exercises for this area.
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '24px', textAlign: 'center', borderRadius: 10, background: '#1C2030', border: '1px solid rgba(255,255,255,0.04)', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <BarChart3 className="w-8 h-8" style={{ color: '#5A6080' }} />
              <p style={{ fontSize: 12, fontWeight: 600, color: '#B0B4C8' }}>No Gaps Detected</p>
              <p style={{ fontSize: 11, color: '#5A6080', maxWidth: 220, lineHeight: 1.5 }}>Complete a diagnostic assessment to identify your competency gaps.</p>
              <Link to="/assessment" style={{ fontSize: 11, color: '#D4A843', textDecoration: 'none', fontWeight: 700 }}>Take Assessment →</Link>
            </div>
          )}

          {/* Activity chart */}
          <div style={{ paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#4A5068', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: 10 }}>Weekly Activity (Hours)</p>
            <div style={{ height: 100 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <XAxis dataKey="day" stroke="#3A4050" fontSize={10} tickLine={false} />
                  <YAxis stroke="#3A4050" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#1C2030', border: '1px solid rgba(212,168,67,0.2)', borderRadius: 8, fontSize: 11, color: '#E8EAF0' }}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#D4A843" fill="#D4A843" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment history table */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: '#E8EAF0', marginBottom: 4 }}>Assessment History</h2>
            <p style={{ fontSize: 11, color: '#5A6080' }}>Complete records of all diagnostic and reassessment attempts.</p>
          </div>
          <Link to="/assessment" style={{ ...goldBtnStyle, fontSize: 11 }}>
            <span>New Attempt</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {metrics?.recentAttempts && metrics.recentAttempts.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {['Date & Time', 'Domain', 'Score', 'Correct', 'Time', ''].map(h => (
                    <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#4A5068', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metrics.recentAttempts.map(attempt => (
                  <tr key={attempt.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.15s' }}
                    onMouseOver={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
                    onMouseOut={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    <td style={{ padding: '11px 14px', color: '#7A8098', fontFamily: "'IBM Plex Mono', monospace" }}>
                      {new Date(attempt.completedAt).toLocaleDateString()} {new Date(attempt.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td style={{ padding: '11px 14px', fontWeight: 600, color: '#B0B4C8' }}>{attempt.domain}</td>
                    <td style={{ padding: '11px 14px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: 5,
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontWeight: 700,
                        fontSize: 11,
                        background: attempt.scorePercentage >= 75 ? 'rgba(74, 222, 128, 0.1)' : attempt.scorePercentage >= 50 ? 'rgba(251, 146, 60, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: attempt.scorePercentage >= 75 ? '#4ade80' : attempt.scorePercentage >= 50 ? '#fb923c' : '#f87171',
                        border: `1px solid ${attempt.scorePercentage >= 75 ? 'rgba(74,222,128,0.2)' : attempt.scorePercentage >= 50 ? 'rgba(251,146,60,0.2)' : 'rgba(239,68,68,0.2)'}`
                      }}>
                        {attempt.scorePercentage}%
                      </span>
                    </td>
                    <td style={{ padding: '11px 14px', color: '#7A8098', fontFamily: "'IBM Plex Mono', monospace" }}>{attempt.correctAnswersCount}/{attempt.totalQuestions}</td>
                    <td style={{ padding: '11px 14px', color: '#7A8098', fontFamily: "'IBM Plex Mono', monospace" }}>{Math.round(attempt.timeSpentSeconds / 60)}m {attempt.timeSpentSeconds % 60}s</td>
                    <td style={{ padding: '11px 14px', textAlign: 'right' }}>
                      <Link to={`/assessment/results/${attempt.id}`} style={{ fontSize: 11, color: '#D4A843', textDecoration: 'none', fontWeight: 600 }}>
                        Review →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: '32px', textAlign: 'center', color: '#5A6080', fontSize: 12 }}>
            No assessment attempts yet. Take your first diagnostic exam to establish your baseline.
          </div>
        )}
      </div>
    </div>
  );
};
