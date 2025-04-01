
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Patient, MedicalRecord, Prescription } from '@/types';
import PatientSearch from './PatientSearch';
import RoleBasedComponent from '@/components/ui/RoleBasedComponent';
import { UserCircle, Plus, AlertCircle, FileText, Clock, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const PatientRecords: React.FC = () => {
  const { toast } = useToast();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    toast({
      title: 'Patient Records Loaded',
      description: `Loaded records for ${patient.name}`,
    });
  };

  const handleAddRecord = () => {
    toast({
      title: 'Add Record',
      description: 'This would open a form to add a new medical record.',
    });
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-medical-primary">
          <UserCircle className="mr-2" />
          Patient Records
        </CardTitle>
        <CardDescription>
          Search and view patient medical records
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <PatientSearch onPatientSelect={handlePatientSelect} />

        {selectedPatient && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">{selectedPatient.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ID: {selectedPatient.id} • DOB: {selectedPatient.dob} • Gender: {selectedPatient.gender}
                </p>
              </div>
              <RoleBasedComponent
                allowedRoles={['doctor', 'admin']}
                requireVerified={true}
              >
                <Button size="sm" onClick={handleAddRecord}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Record
                </Button>
              </RoleBasedComponent>
            </div>

            <Tabs defaultValue="history">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="history">Medical History</TabsTrigger>
                <TabsTrigger value="prescriptions">Active Prescriptions</TabsTrigger>
                <TabsTrigger value="allergies">Allergies</TabsTrigger>
              </TabsList>

              <TabsContent value="history" className="border rounded-md p-4 mt-2">
                <ScrollArea className="h-[300px]">
                  {selectedPatient.medicalHistory.length > 0 ? (
                    <div className="space-y-4">
                      {selectedPatient.medicalHistory.map((record) => (
                        <MedicalRecordItem key={record.id} record={record} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState 
                      icon={<FileText />}
                      message="No medical history records found"
                    />
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="prescriptions" className="border rounded-md p-4 mt-2">
                <ScrollArea className="h-[300px]">
                  {selectedPatient.activePrescriptions.length > 0 ? (
                    <div className="space-y-4">
                      {selectedPatient.activePrescriptions.map((prescription) => (
                        <PrescriptionItem key={prescription.id} prescription={prescription} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState 
                      icon={<FileText />}
                      message="No active prescriptions found"
                    />
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="allergies" className="border rounded-md p-4 mt-2">
                <ScrollArea className="h-[300px]">
                  {selectedPatient.allergies.length > 0 ? (
                    <div className="space-y-2">
                      {selectedPatient.allergies.map((allergy, index) => (
                        <div 
                          key={index}
                          className="flex items-center p-3 border rounded-md"
                        >
                          <AlertCircle className="h-5 w-5 text-medical-warning mr-2" />
                          <span>{allergy}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState 
                      icon={<Check />}
                      message="No allergies recorded"
                    />
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface MedicalRecordItemProps {
  record: MedicalRecord;
}

const MedicalRecordItem: React.FC<MedicalRecordItemProps> = ({ record }) => {
  return (
    <div className="p-4 border rounded-md">
      <div className="flex justify-between mb-2">
        <div className="font-medium">{record.diagnosis}</div>
        <div className="text-sm text-muted-foreground">{record.date}</div>
      </div>
      <div className="text-sm mb-2">{record.notes}</div>
      <div className="text-sm">
        <span className="font-medium">Treatment:</span> {record.treatment}
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        Doctor: {record.doctorName}
      </div>
    </div>
  );
};

interface PrescriptionItemProps {
  prescription: Prescription;
}

const PrescriptionItem: React.FC<PrescriptionItemProps> = ({ prescription }) => {
  return (
    <div className="p-4 border rounded-md">
      <div className="flex justify-between mb-2">
        <div className="font-medium">{prescription.medicationName}</div>
        <Badge
          variant={
            prescription.status === 'active'
              ? 'default'
              : prescription.status === 'cancelled'
              ? 'destructive'
              : 'outline'
          }
        >
          {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
        </Badge>
      </div>
      <div className="text-sm mb-2">
        <span className="font-medium">Dosage:</span> {prescription.dosage}
      </div>
      <div className="text-sm mb-2">
        <span className="font-medium">Instructions:</span> {prescription.instructions}
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {new Date(prescription.dateCreated).toLocaleDateString()}
        </div>
        <div>Dr. {prescription.doctorName}</div>
      </div>
    </div>
  );
};

interface EmptyStateProps {
  icon: React.ReactNode;
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, message }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8">
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
        {icon}
      </div>
      <p>{message}</p>
    </div>
  );
};

export default PatientRecords;
