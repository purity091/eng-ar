import React from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppProvider, useApp } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { SettingsProvider } from './contexts/SettingsContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import PlacementTestPage from './pages/PlacementTestPage';
import StudentAuthPage from './pages/auth/StudentAuthPage';
import JoinTeamPage from './pages/JoinTeamPage';
import CurriculumPage from './pages/CurriculumPage';
import TeachersPage from './pages/TeachersPage';
import ClassroomPage from './pages/ClassroomPage';

import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';

import ParentDashboardPage from './pages/parent/ParentDashboardPage';
import ChildProgressPage from './pages/parent/ChildProgressPage';
import ChildReportsPage from './pages/parent/ChildReportsPage';
import ChildAudioProgressPage from './pages/parent/ChildAudioProgressPage';
import ParentSessionsPage from './pages/parent/ParentSessionsPage';
import ParentBillingPage from './pages/parent/ParentBillingPage';

import StudentDashboardPage from './pages/student/StudentDashboardPage';
import DailyPracticePage from './pages/student/DailyPracticePage';
import StudentLiveClassPage from './pages/student/StudentLiveClassPage';
import StudentRewardsPage from './pages/student/StudentRewardsPage';
import StudentVoicePracticePage from './pages/student/VoicePracticePage';

import TeacherDashboardPage from './pages/teacher/TeacherDashboardPage';
import TeacherStudentProfilePage from './pages/teacher/TeacherStudentProfilePage';
import SessionBriefPage from './pages/teacher/SessionBriefPage';
import SessionLivePage from './pages/teacher/SessionLivePage';
import SessionSummaryPage from './pages/teacher/SessionSummaryPage';
import StudentsPage from './pages/teacher/StudentsPage';
import TeacherAiPlansPage from './pages/teacher/TeacherAiPlansPage';
import TeacherHomeworkPage from './pages/teacher/TeacherHomeworkPage';
import TeacherParentMessagesPage from './pages/teacher/TeacherParentMessagesPage';
import TeacherRiskAlertsPage from './pages/teacher/TeacherRiskAlertsPage';
import TeacherClassAnalyticsPage from './pages/teacher/TeacherClassAnalyticsPage';

import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminStudentsPage from './pages/admin/AdminStudentsPage';
import AdminTeachersPage from './pages/admin/AdminTeachersPage';
import AdminSchedulePage from './pages/admin/AdminSchedulePage';
import AdminCurriculumPage from './pages/admin/AdminCurriculumPage';
import AdminSubscriptionsPage from './pages/admin/AdminSubscriptionsPage';

const AppRoutes: React.FC = () => {
    const { isAuthenticated } = useApp();
    const { t } = useTranslation();

    return (
        <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <LandingPage />} />

            <Route element={<PublicLayout />}>
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/placement-test" element={<PlacementTestPage />} />
                <Route path="/curriculum" element={<CurriculumPage />} />
                <Route path="/teachers" element={<TeachersPage />} />
                <Route path="/methodology" element={<Navigate to="/curriculum" replace />} />
                <Route path="/success-stories" element={<Navigate to="/teachers" replace />} />
                <Route path="/help" element={<Navigate to="/join-team" replace />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/join-team" element={<JoinTeamPage />} />
            </Route>

            <Route path="/join" element={<StudentAuthPage />} />
            <Route path="/login" element={<Navigate to="/join" replace />} />
            <Route path="/register" element={<Navigate to="/join" replace />} />
            <Route path="/auth/login" element={<Navigate to="/join" replace />} />
            <Route path="/auth/register" element={<Navigate to="/join" replace />} />

            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/home" element={<HomePage />} />

                <Route path="/parent/dashboard" element={<ParentDashboardPage />} />
                <Route path="/parent/report/omar" element={<Navigate to="/parent/child/omar-01/reports" replace />} />
                <Route path="/parent/child/:id/progress" element={<ChildProgressPage />} />
                <Route path="/parent/child/:id/reports" element={<ChildReportsPage />} />
                <Route path="/parent/child/:id/audio-progress" element={<ChildAudioProgressPage />} />
                <Route path="/parent/sessions" element={<ParentSessionsPage />} />
                <Route path="/parent/billing" element={<ParentBillingPage />} />

                <Route path="/student/dashboard" element={<StudentDashboardPage />} />
                <Route path="/student/daily-practice" element={<DailyPracticePage />} />
                <Route path="/student/live-class" element={<StudentLiveClassPage />} />
                <Route path="/student/classroom" element={<ClassroomPage />} />
                <Route path="/student/rewards" element={<StudentRewardsPage />} />
                <Route path="/student/voice-practice" element={<StudentVoicePracticePage />} />

                <Route path="/teacher/dashboard" element={<TeacherDashboardPage />} />
                <Route path="/teacher/students" element={<StudentsPage />} />
                <Route path="/teacher/students/:id" element={<TeacherStudentProfilePage />} />
                <Route path="/teacher/ai-plans" element={<TeacherAiPlansPage />} />
                <Route path="/teacher/homework" element={<TeacherHomeworkPage />} />
                <Route path="/teacher/parent-messages" element={<TeacherParentMessagesPage />} />
                <Route path="/teacher/risk-alerts" element={<TeacherRiskAlertsPage />} />
                <Route path="/teacher/class-analytics" element={<TeacherClassAnalyticsPage />} />
                <Route path="/teacher/session/:id/brief" element={<SessionBriefPage />} />
                <Route path="/teacher/session/:id/live" element={<SessionLivePage />} />
                <Route path="/teacher/session/:id/summary" element={<SessionSummaryPage />} />
            </Route>

            <Route
                path="/admin"
                element={
                    <ProtectedRoute requireAdmin={true}>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="students" element={<AdminStudentsPage />} />
                <Route path="teachers" element={<AdminTeachersPage />} />
                <Route path="schedule" element={<AdminSchedulePage />} />
                <Route path="curriculum" element={<AdminCurriculumPage />} />
                <Route path="subscriptions" element={<AdminSubscriptionsPage />} />
            </Route>

            <Route
                path="*"
                element={
                    <div className="py-20 text-center">
                        <h1 className="mb-4 text-6xl font-bold text-slate-300">404</h1>
                        <p className="mb-6 text-2xl font-bold text-slate-600">{t('notFound.title')}</p>
                        <Link to="/" className="inline-block rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition-colors hover:bg-orange-600">
                            {t('notFound.backHome')}
                        </Link>
                    </div>
                }
            />
        </Routes>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppProvider>
                <SettingsProvider>
                    <NotificationProvider>
                        <BrowserRouter>
                            <AppRoutes />
                        </BrowserRouter>
                    </NotificationProvider>
                </SettingsProvider>
            </AppProvider>
        </AuthProvider>
    );
};

export default App;
