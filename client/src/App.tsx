import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store';

// Layout
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Leads from './pages/leads/Leads';
import LeadDetails from './pages/leads/LeadDetails';
import Campaigns from './pages/campaigns/Campaigns';
import CampaignDetails from './pages/campaigns/CampaignDetails';
import LandingPages from './pages/landing-pages/LandingPages';
import LandingPageDetails from './pages/landing-pages/LandingPageDetails';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/leads"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Leads />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/leads/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <LeadDetails />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/campaigns"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Campaigns />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/campaigns/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CampaignDetails />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/landing-pages"
              element={
                <ProtectedRoute>
                  <Layout>
                    <LandingPages />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/landing-pages/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <LandingPageDetails />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Analytics />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App; 