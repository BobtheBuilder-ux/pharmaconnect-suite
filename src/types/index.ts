
export type UserRole = 'doctor' | 'admin' | 'staff' | 'unauthorized';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  licenseId?: string;
  verificationStatus?: 'verified' | 'pending' | 'expired';
}

export interface Patient {
  id: string;
  name: string;
  dob: string;
  gender: string;
  phone: string;
  weight?: number;
  height?: number;
  allergies: string[];
  medicalHistory: MedicalRecord[];
  activePrescriptions: Prescription[];
}

export interface MedicalRecord {
  id: string;
  date: string;
  doctorId: string;
  doctorName: string;
  diagnosis: string;
  notes: string;
  treatment: string;
}

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  form: string;
  strength: string;
  manufacturer: string;
  referenceDose?: {
    min: number;
    max: number;
    unit: string;
    perWeight?: boolean;
  };
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  medicationId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  dateCreated: string;
  expiryDate: string;
  status: 'active' | 'completed' | 'cancelled';
  qrCodeUrl?: string;
}

export interface DoctorVerification {
  doctorId: string;
  licenseId: string;
  status: 'verified' | 'pending' | 'expired';
  dateVerified?: string;
  expiryDate?: string;
  verifier?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resourceType: string;
  resourceId: string;
  details: string;
  timestamp: string;
}

export interface AnalyticsData {
  prescriptionsPerMonth: {
    month: string;
    count: number;
  }[];
  commonMedications: {
    medication: string;
    count: number;
  }[];
  verificationStats: {
    status: 'verified' | 'pending' | 'expired';
    count: number;
  }[];
}
