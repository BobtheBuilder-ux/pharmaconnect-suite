
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, User } from 'lucide-react';
import { Patient } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Mock patient data
const mockPatients: Patient[] = [
  {
    id: 'pat-001',
    name: 'John Smith',
    dob: '1985-06-12',
    gender: 'Male',
    phone: '555-123-4567',
    weight: 75,
    height: 180,
    allergies: ['Penicillin', 'Sulfa'],
    medicalHistory: [
      {
        id: 'med-001',
        date: '2023-01-15',
        doctorId: 'doc-123',
        doctorName: 'Dr. Jane Smith',
        diagnosis: 'Hypertension',
        notes: 'Patient presented with elevated blood pressure',
        treatment: 'Prescribed Lisinopril 10mg daily',
      },
    ],
    activePrescriptions: [
      {
        id: 'rx-001',
        patientId: 'pat-001',
        doctorId: 'doc-123',
        doctorName: 'Dr. Jane Smith',
        medicationId: 'med-002',
        medicationName: 'Lisinopril',
        dosage: '10 mg',
        frequency: 'daily',
        duration: '30 days',
        instructions: 'Take with food',
        dateCreated: '2023-01-15',
        expiryDate: '2023-02-15',
        status: 'active',
      },
    ],
  },
  {
    id: 'pat-002',
    name: 'Sarah Johnson',
    dob: '1992-09-23',
    gender: 'Female',
    phone: '555-987-6543',
    weight: 65,
    height: 165,
    allergies: ['Latex'],
    medicalHistory: [
      {
        id: 'med-002',
        date: '2023-02-28',
        doctorId: 'doc-123',
        doctorName: 'Dr. Jane Smith',
        diagnosis: 'Asthma',
        notes: 'Recurrent asthma symptoms',
        treatment: 'Prescribed albuterol inhaler',
      },
    ],
    activePrescriptions: [
      {
        id: 'rx-002',
        patientId: 'pat-002',
        doctorId: 'doc-123',
        doctorName: 'Dr. Jane Smith',
        medicationId: 'med-005',
        medicationName: 'Albuterol',
        dosage: '90 mcg',
        frequency: 'as needed',
        duration: '30 days',
        instructions: 'Use inhaler when experiencing asthma symptoms',
        dateCreated: '2023-02-28',
        expiryDate: '2023-03-28',
        status: 'active',
      },
    ],
  },
];

interface PatientSearchProps {
  onPatientSelect: (patient: Patient) => void;
}

const PatientSearch: React.FC<PatientSearchProps> = ({ onPatientSelect }) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Patient[]>([]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: 'Empty Search',
        description: 'Please enter a patient ID or phone number',
        variant: 'destructive',
      });
      return;
    }

    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      const results = mockPatients.filter(
        (patient) =>
          patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.phone.includes(searchQuery)
      );

      setSearchResults(results);
      setIsSearching(false);

      if (results.length === 0) {
        toast({
          title: 'No Patients Found',
          description: 'No patients match your search criteria',
        });
      }
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Search by Patient ID or Phone Number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={isSearching}>
          {isSearching ? 'Searching...' : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Search
            </>
          )}
        </Button>
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-2">
          {searchResults.map((patient) => (
            <div
              key={patient.id}
              className="p-4 border rounded-md hover:bg-accent cursor-pointer"
              onClick={() => onPatientSelect(patient)}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-medical-light p-2 rounded-full">
                  <User className="h-5 w-5 text-medical-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{patient.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    ID: {patient.id} • DOB: {patient.dob} • Phone: {patient.phone}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientSearch;
