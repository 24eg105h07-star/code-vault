import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout Structure
import { LandingNavbar } from './components/layout/LandingNavbar';
import { WorkspaceSidebar } from './components/layout/WorkspaceSidebar';
import { WorkspaceHeader } from './components/layout/WorkspaceHeader';
import { WorkspaceStatusBar } from './components/layout/WorkspaceStatusBar';
import { CommandPalette } from './components/layout/CommandPalette';
import { AiGuideDrawer } from './components/ai/AiGuideDrawer';

// Pages
import { LandingPage } from './components/pages/LandingPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { AssessmentListPage } from './components/pages/AssessmentListPage';
import { AssessmentTakePage } from './components/pages/AssessmentTakePage';
import { AssessmentResultPage } from './components/pages/AssessmentResultPage';
import { SkillGapPage } from './components/pages/SkillGapPage';
import { RoadmapPage } from './components/pages/RoadmapPage';
import { ResourcesProjectsPage } from './components/pages/ResourcesProjectsPage';
import { ProgressAnalyticsPage } from './components/pages/ProgressAnalyticsPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { AdminPage } from './components/pages/AdminPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { DsaEditorPage } from './components/dsa/DsaEditorPage';
import { DsaChallengesPage } from './components/pages/DsaChallengesPage';
import { StreakPlatformsPage } from './components/pages/StreakPlatformsPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AppLayout: React.FC = () => {
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('cv_sidebar_collapsed') === 'true';
  });
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [aiGuideOpen, setAiGuideOpen] = useState(false);
  const [aiGuideContext, setAiGuideContext] = useState<string | undefined>(undefined);

  const toggleSidebarCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('cv_sidebar_collapsed', String(next));
      return next;
    });
  };

  const handleOpenAiGuide = (context?: string) => {
    setAiGuideContext(context);
    setAiGuideOpen(true);
  };

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K / Cmd+K -> Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      // Ctrl+B / Cmd+B -> Toggle Sidebar Collapse
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleSidebarCollapse();
      }
      // Alt+A -> AI Copilot
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        handleOpenAiGuide('General Platform Guidance');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isLanding = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isTakingAssessment = location.pathname.startsWith('/assessment/take');

  // Public Landing / Auth Views
  if (isLanding || isAuthPage) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: '#0D0F14', fontFamily: "'Sora', sans-serif" }}>
        <LandingNavbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    );
  }

  // Focused Full-Screen Assessment Exam Session
  if (isTakingAssessment) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: '#0D0F14', fontFamily: "'Sora', sans-serif" }}>
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/assessment/take" element={<ProtectedRoute><AssessmentTakePage /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    );
  }

  // Authenticated Pro Engineering Workspace Shell
  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{ background: '#0D0F14', fontFamily: "'Sora', sans-serif", color: '#E8EAF0' }}
    >
      {/* Full-Height Left Navigation Rail */}
      <WorkspaceSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
        onOpenAiGuide={() => handleOpenAiGuide('General Career & DSA Guidance')}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Workspace Top Command & Context Header */}
        <WorkspaceHeader
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenAiGuide={() => handleOpenAiGuide('General Platform Guidance')}
        />

        {/* Scrollable Workspace Body */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <Routes>
            {/* Protected Core Engineering Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/dsa-editor" element={<ProtectedRoute><DsaEditorPage onOpenAiGuide={handleOpenAiGuide} /></ProtectedRoute>} />
            <Route path="/dsa" element={<ProtectedRoute><DsaEditorPage onOpenAiGuide={handleOpenAiGuide} /></ProtectedRoute>} />
            <Route path="/challenges" element={<ProtectedRoute><DsaChallengesPage onOpenAiGuide={handleOpenAiGuide} /></ProtectedRoute>} />
            <Route path="/dsa-challenges" element={<ProtectedRoute><DsaChallengesPage onOpenAiGuide={handleOpenAiGuide} /></ProtectedRoute>} />
            <Route path="/streak-platforms" element={<ProtectedRoute><StreakPlatformsPage /></ProtectedRoute>} />
            <Route path="/streak" element={<ProtectedRoute><StreakPlatformsPage /></ProtectedRoute>} />
            <Route path="/assessment" element={<ProtectedRoute><AssessmentListPage /></ProtectedRoute>} />
            <Route path="/assessment/results/:attemptId" element={<ProtectedRoute><AssessmentResultPage /></ProtectedRoute>} />
            <Route path="/skill-gap" element={<ProtectedRoute><SkillGapPage /></ProtectedRoute>} />
            <Route path="/roadmap" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
            <Route path="/resources-projects" element={<ProtectedRoute><ResourcesProjectsPage /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><ProgressAnalyticsPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>

        {/* IDE-Style Telemetry Status Bar */}
        <WorkspaceStatusBar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenAiGuide={() => handleOpenAiGuide('General Platform Guidance')}
        />
      </div>

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenAiGuide={handleOpenAiGuide}
      />

      {/* AI Career Copilot Drawer */}
      <AiGuideDrawer
        isOpen={aiGuideOpen}
        onClose={() => setAiGuideOpen(false)}
        contextHint={aiGuideContext}
      />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}
