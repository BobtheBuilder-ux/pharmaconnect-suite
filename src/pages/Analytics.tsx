
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import AnalyticsDashboard from '@/components/Analytics/AnalyticsDashboard';

const Analytics = () => {
  return (
    <AuthProvider>
      <DashboardLayout title="Analytics">
        <div className="space-y-6">
          <AnalyticsDashboard />
        </div>
      </DashboardLayout>
    </AuthProvider>
  );
};

export default Analytics;
