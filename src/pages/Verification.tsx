
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import DoctorVerification from '@/components/Doctor/DoctorVerification';

const Verification = () => {
  return (
    <AuthProvider>
      <DashboardLayout title="Verification">
        <div className="space-y-6">
          <DoctorVerification />
        </div>
      </DashboardLayout>
    </AuthProvider>
  );
};

export default Verification;
