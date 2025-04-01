
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import PatientRecords from '@/components/Patient/PatientRecords';

const Patients = () => {
  return (
    <AuthProvider>
      <DashboardLayout title="Patients">
        <div className="space-y-6">
          <PatientRecords />
        </div>
      </DashboardLayout>
    </AuthProvider>
  );
};

export default Patients;
