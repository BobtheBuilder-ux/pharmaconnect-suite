
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import PrescriptionCreator from '@/components/Prescription/PrescriptionCreator';
import PatientRecords from '@/components/Patient/PatientRecords';
import DoctorVerification from '@/components/Doctor/DoctorVerification';
import AnalyticsDashboard from '@/components/Analytics/AnalyticsDashboard';

const Index = () => {
  return (
    <AuthProvider>
      <DashboardLayout title="Hospital Dashboard">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="order-1 lg:order-1">
            <PrescriptionCreator />
          </div>
          <div className="order-2 lg:order-2">
            <PatientRecords />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="order-4 lg:order-3">
            <DoctorVerification />
          </div>
          <div className="order-3 lg:order-4">
            <AnalyticsDashboard />
          </div>
        </div>
      </DashboardLayout>
    </AuthProvider>
  );
};

export default Index;
