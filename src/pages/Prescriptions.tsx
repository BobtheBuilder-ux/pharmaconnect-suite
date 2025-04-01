
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import PrescriptionCreator from '@/components/Prescription/PrescriptionCreator';

const Prescriptions = () => {
  return (
    <AuthProvider>
      <DashboardLayout title="Prescriptions">
        <div className="space-y-6">
          <PrescriptionCreator />
        </div>
      </DashboardLayout>
    </AuthProvider>
  );
};

export default Prescriptions;
