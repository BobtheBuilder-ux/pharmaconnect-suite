
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import RoleBasedComponent from '@/components/ui/RoleBasedComponent';
import { Medication, Prescription } from '@/types';
import MedicationSearch from './MedicationSearch';
import DosageCalculator from './DosageCalculator';
import QRCodeGenerator from './QRCodeGenerator';
import { FilePlus, Shield } from 'lucide-react';

const PrescriptionCreator: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [patientId, setPatientId] = useState('');
  const [selectedMedication, setSelectedMedication] = useState<Medication>();
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [patientWeight, setPatientWeight] = useState<number>();
  const [isCreating, setIsCreating] = useState(false);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [prescription, setPrescription] = useState<Partial<Prescription>>();

  const handleSelectMedication = (medication: Medication) => {
    setSelectedMedication(medication);
  };

  const handleDosageCalculated = (calculatedDosage: string) => {
    setDosage(calculatedDosage);
    toast({
      title: "Dosage Calculated",
      description: `Recommended dosage: ${calculatedDosage}`,
    });
  };

  const handleCreatePrescription = () => {
    if (!patientId || !selectedMedication || !dosage) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPrescription: Partial<Prescription> = {
        id: `rx-${Math.random().toString(36).substr(2, 9)}`,
        patientId,
        doctorId: user?.id,
        doctorName: user?.name,
        medicationId: selectedMedication.id,
        medicationName: selectedMedication.name,
        dosage,
        instructions,
        dateCreated: new Date().toISOString(),
      };
      
      setPrescription(newPrescription);
      setIsCreating(false);
      
      toast({
        title: "Prescription Created",
        description: `Prescription for ${selectedMedication.name} created successfully`,
      });
    }, 1500);
  };

  const handleGenerateQR = () => {
    setIsGeneratingQR(true);
    // The QRCodeGenerator component handles the generation logic
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-medical-primary">
          <FilePlus className="mr-2" />
          Create Prescription
        </CardTitle>
        <CardDescription>
          Create a new prescription for a patient
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RoleBasedComponent
          allowedRoles={['doctor', 'admin']}
          requireVerified={true}
          fallback={
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-center space-x-2">
              <Shield className="h-5 w-5 text-yellow-500" />
              <p className="text-sm text-yellow-700">
                You need to be a verified doctor to create prescriptions
              </p>
            </div>
          }
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID or Phone Number</Label>
              <Input
                id="patientId"
                placeholder="Enter patient ID or phone number"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patientWeight">Patient Weight (kg)</Label>
              <Input
                id="patientWeight"
                type="number"
                placeholder="Enter patient weight in kg"
                value={patientWeight || ''}
                onChange={(e) => setPatientWeight(Number(e.target.value))}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Medication</Label>
              <MedicationSearch
                onSelectMedication={handleSelectMedication}
                selectedMedication={selectedMedication}
              />
            </div>

            {selectedMedication && (
              <>
                <div className="space-y-2">
                  <Label>Dosage Calculator</Label>
                  <DosageCalculator
                    medication={selectedMedication}
                    patientWeight={patientWeight}
                    onDosageCalculated={handleDosageCalculated}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Additional Instructions</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Enter any additional instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                  />
                </div>
              </>
            )}

            {prescription && (
              <div className="space-y-2">
                <Label>QR Code Generator</Label>
                <QRCodeGenerator
                  prescription={prescription}
                  isGenerating={isGeneratingQR}
                  onGenerate={handleGenerateQR}
                />
              </div>
            )}
          </div>
        </RoleBasedComponent>
      </CardContent>
      <CardFooter>
        <RoleBasedComponent
          allowedRoles={['doctor', 'admin']}
          requireVerified={true}
        >
          <div className="flex justify-end w-full">
            <Button
              onClick={handleCreatePrescription}
              disabled={!patientId || !selectedMedication || !dosage || isCreating}
            >
              {isCreating ? 'Creating...' : 'Create Prescription'}
            </Button>
          </div>
        </RoleBasedComponent>
      </CardFooter>
    </Card>
  );
};

export default PrescriptionCreator;
