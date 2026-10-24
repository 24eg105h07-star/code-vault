import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Zap,
  TrendingUp,
  Award,
  Flame,
  Target,
  BarChart3,
  BookOpen
} from 'lucide-react';

const Feature = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <div
    style={{
      padding: '20px',
      borderRadius: 12,
      background: '#14171F',
      border: '1px solid rgba(255,255,255,0.06)',
      transition: 'all 0.2s'
    }}
    onMouseOver={e => {
      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 168, 67, 0.2)';
      (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
    }}
    onMouseOut={e => {
      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
    }}
  >
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: 10,
        background: 'rgba(212, 168, 67, 0.1)',
        border: '1px solid rgba(212, 168, 67, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12
      }}
    >
      <Icon className="w-4.5 h-4.5" style={{ color: '#D4A843', width: 18, height: 18 }} />
    </div>
    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#E8EAF0', marginBottom: 6 }}>{title}</h4>
    <p style={{ fontSize: 12, color: '#7A8098', lineHeight: 1.6 }}>{desc}</p>
  </div>
);

export const LandingPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div style={{ background: '#0D0F14', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient background glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 400,
          background: 'radial-gradient(ellipse at center, rgba(212, 168, 67, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '5px 14px',
                borderRadius: 30,
                background: 'rgba(212, 168, 67, 0.08)',
                border: '1px solid rgba(212, 168, 67, 0.2)',
                width: 'fit-content'
              }}>
                <Zap className="w-3.5 h-3.5" style={{ color: '#D4A843' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#D4A843', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  AI-Powered Engineering Career Platform
                </span>
              </div>

              <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, lineHeight: 1.1, color: '#E8EAF0', letterSpacing: '-1px' }}>
                Build Your{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #D4A843, #F0C860)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Engineering Career
                </span>{' '}
                with Precision
              </h1>

              <p style={{ fontSize: 15, color: '#7A8098', lineHeight: 1.7, maxWidth: 480 }}>
                CodeVault maps your technical gaps with AI-powered assessments, then builds a personalized roadmap to land your target engineering role. Stop guessing — start building.
              </p>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: 28, paddingTop: 8 }}>
                {[
                  { val: '100%', label: 'Deterministic Scoring' },
                  { val: '9+', label: 'DSA Track Categories' },
                  { val: 'Daily', label: 'Streak Enforcement' },
                ].map(s => (
                  <div key={s.val}>
                    <p style={{ fontSize: 22, fontWeight: 800, color: '#D4A843', fontFamily: "'IBM Plex Mono', monospace" }}>{s.val}</p>
                    <p style={{ fontSize: 11, color: '#5A6080', marginTop: 2 }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, paddingTop: 4 }}>
                <Link
                  to={user ? '/assessment' : '/register'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '11px 24px',
                    borderRadius: 9,
                    background: 'linear-gradient(135deg, #D4A843 0%, #C8963A 100%)',
                    color: '#0D0F14',
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(212, 168, 67, 0.3)',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>Start Free Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/dsa-editor"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '11px 24px',
                    borderRadius: 9,
                    background: 'rgba(167, 139, 250, 0.1)',
                    border: '1px solid rgba(167, 139, 250, 0.25)',
                    color: '#A78BFA',
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <Code2 className="w-4 h-4" />
                  <span>Open Code Lab</span>
                </Link>

                <Link
                  to={user ? '/dashboard' : '/login'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '11px 20px',
                    borderRadius: 9,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#B0B4C8',
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>View Dashboard</span>
                </Link>
              </div>
            </div>

            {/* Right — Dashboard preview card */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: 16,
                  background: '#14171F',
                  border: '1px solid rgba(212, 168, 67, 0.15)',
                  overflow: 'hidden',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(212, 168, 67, 0.08)'
                }}
              >
                {/* Mock browser bar */}
                <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3A4050' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3A4050' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3A4050' }} />
                  <div style={{ flex: 1, marginLeft: 12, height: 20, borderRadius: 4, background: '#1C2030', display: 'flex', alignItems: 'center', padding: '0 8px' }}>
                    <span style={{ fontSize: 10, color: '#4A5068', fontFamily: "'IBM Plex Mono', monospace" }}>codevault.dev/dashboard</span>
                  </div>
                </div>

                {/* Dashboard snippet */}
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 700, color: '#E8EAF0' }}>Career Dashboard</p>
                      <p style={{ fontSize: 11, color: '#7A8098' }}>Java Full Stack Developer Track</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 6, background: 'rgba(251, 146, 60, 0.1)', border: '1px solid rgba(251, 146, 60, 0.2)' }}>
                      <Flame className="w-3.5 h-3.5" style={{ color: '#fb923c' }} />
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#fb923c', fontFamily: "'IBM Plex Mono', monospace" }}>7d Streak</span>
                    </div>
                  </div>

                  {/* Mini metrics */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
                    {[
                      { label: 'Assessment', val: '82%', color: '#D4A843' },
                      { label: 'Roadmap', val: '45%', color: '#4ade80' },
                      { label: 'Study Hours', val: '24h', color: '#A78BFA' },
                    ].map(m => (
                      <div key={m.label} style={{ padding: '10px', borderRadius: 8, background: '#1C2030', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <p style={{ fontSize: 16, fontWeight: 800, color: m.color, fontFamily: "'IBM Plex Mono', monospace" }}>{m.val}</p>
                        <p style={{ fontSize: 9, color: '#5A6080', marginTop: 2 }}>{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Skill bars */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                      { skill: 'Java & JVM', pct: 78 },
                      { skill: 'Spring Boot', pct: 62 },
                      { skill: 'SQL & Databases', pct: 55 },
                    ].map(s => (
                      <div key={s.skill}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 11, color: '#B0B4C8' }}>{s.skill}</span>
                          <span style={{ fontSize: 11, color: '#D4A843', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>{s.pct}%</span>
                        </div>
                        <div style={{ height: 4, background: '#1C2030', borderRadius: 4 }}>
                          <div style={{ height: 4, width: `${s.pct}%`, background: 'linear-gradient(90deg, #C8963A, #D4A843)', borderRadius: 4 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: -16,
                  right: -16,
                  padding: '10px 16px',
                  borderRadius: 10,
                  background: '#1C2030',
                  border: '1px solid rgba(212, 168, 67, 0.2)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 className="w-4 h-4" style={{ color: '#4ade80' }} />
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#E8EAF0' }}>Role Match</p>
                    <p style={{ fontSize: 10, color: '#D4A843', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>78% Aligned</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '72px 0', background: '#0A0C10', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#D4A843', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 10 }}>
              How It Works
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, color: '#E8EAF0', letterSpacing: '-0.5px' }}>
              Your Engineered Path to Landing the Job
            </h2>
            <p style={{ fontSize: 13, color: '#7A8098', marginTop: 10, maxWidth: 460, margin: '10px auto 0' }}>
              Not a generic course marketplace. An evidence-based career acceleration system built for engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { n: '01', title: 'Diagnostic Test', desc: 'Take a timed 10–15 question exam covering Java, OOP, SQL, REST, and Spring Boot patterns.', color: '#D4A843' },
              { n: '02', title: 'Gap Analysis', desc: 'AI evaluates your answers against the industry competency matrix — identifying exact weak spots.', color: '#fb923c' },
              { n: '03', title: 'Personalized Roadmap', desc: 'Gemini AI structures a phased learning plan tailored to your gaps, schedule, and learning style.', color: '#A78BFA' },
              { n: '04', title: 'Build & Reassess', desc: 'Complete real enterprise projects, solve DSA challenges, and retake tests to track verified growth.', color: '#4ade80' },
            ].map(s => (
              <div
                key={s.n}
                style={{
                  padding: '24px',
                  borderRadius: 12,
                  background: '#14171F',
                  border: '1px solid rgba(255,255,255,0.06)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${s.color}60, transparent)`
                }} />
                <span style={{ fontSize: 28, fontWeight: 800, color: `${s.color}30`, fontFamily: "'IBM Plex Mono', monospace", display: 'block', marginBottom: 12 }}>
                  {s.n}
                </span>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#E8EAF0', marginBottom: 8 }}>{s.title}</h4>
                <p style={{ fontSize: 12, color: '#7A8098', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '72px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#D4A843', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 10 }}>
              Platform Features
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, color: '#E8EAF0', letterSpacing: '-0.5px' }}>
              Everything You Need. Nothing You Don't.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Feature icon={Target} title="Precision Gap Detection" desc="Industry-calibrated scoring against a real Java Full Stack competency matrix — not just right/wrong percentages." />
            <Feature icon={Code2} title="Interactive Code Lab" desc="Multi-language DSA editor with 9+ curated problem tracks. Solve in-browser and log solutions to keep your streak." />
            <Feature icon={Zap} title="AI Roadmap Generation" desc="Gemini builds a phase-by-phase curriculum based on your actual weak topics, weekly availability, and preferences." />
            <Feature icon={BarChart3} title="Progress Analytics" desc="Visual dashboards tracking assessment history, skill trajectory, study hours logged, and roadmap velocity." />
            <Feature icon={Flame} title="Daily Streak System" desc="Strict daily accountability through streak tracking. Connect external platforms like LeetCode and HackerRank." />
            <Feature icon={BookOpen} title="Curated Resource Library" desc="Vetted learning resources, official docs, and enterprise project milestones aligned to your roadmap phases." />
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link
              to={user ? '/assessment' : '/register'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '13px 28px',
                borderRadius: 9,
                background: 'linear-gradient(135deg, #D4A843 0%, #C8963A 100%)',
                color: '#0D0F14',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(212, 168, 67, 0.25)'
              }}
            >
              <span>Launch Your Career Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: 7,
              background: 'linear-gradient(135deg, #D4A843, #C8963A)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 800,
              color: '#0D0F14'
            }}>CV</div>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#D4A843' }}>CodeVault</span>
          </div>
          <p style={{ fontSize: 11, color: '#4A5068' }}>AI-Powered Engineering Career Launchpad · Built with React, TypeScript, Spring Boot 3.x & Google Gemini</p>
        </div>
      </footer>
    </div>
  );
};
