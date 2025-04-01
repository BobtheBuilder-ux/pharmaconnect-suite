
import React, { useState, useEffect } from 'react';
import { Medication } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DosageCalculatorProps {
  medication?: Medication;
  patientWeight?: number; // in kg
  onDosageCalculated: (dosage: string) => void;
}

const DosageCalculator: React.FC<DosageCalculatorProps> = ({
  medication,
  patientWeight,
  onDosageCalculated,
}) => {
  const [customWeight, setCustomWeight] = useState<number | undefined>(patientWeight);
  const [calculatedDosage, setCalculatedDosage] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('daily');
  const [duration, setDuration] = useState<string>('7');
  const [durationUnit, setDurationUnit] = useState<string>('days');
  const [customDosage, setCustomDosage] = useState<string>('');
  const [isCustomDosage, setIsCustomDosage] = useState<boolean>(false);

  useEffect(() => {
    if (customWeight && medication?.referenceDose?.perWeight) {
      const weight = customWeight;
      const { min, max, unit } = medication.referenceDose;
      
      // Calculate per weight dosage (e.g., mg/kg)
      const minDosage = min * weight;
      const maxDosage = max * weight;
      
      setCalculatedDosage(`${minDosage}-${maxDosage} ${unit}`);
    } else if (medication?.referenceDose && !medication.referenceDose.perWeight) {
      const { min, max, unit } = medication.referenceDose;
      setCalculatedDosage(`${min}-${max} ${unit}`);
    } else {
      setCalculatedDosage('');
    }
  }, [medication, customWeight]);

  const handleCalculate = () => {
    const finalDosage = isCustomDosage ? customDosage : calculatedDosage;
    const dosageWithFrequency = `${finalDosage} ${frequency} for ${duration} ${durationUnit}`;
    onDosageCalculated(dosageWithFrequency);
  };

  return (
    <div className="space-y-4">
      {medication?.referenceDose?.perWeight && (
        <div className="space-y-2">
          <Label htmlFor="weight">Patient Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={customWeight || ''}
            onChange={(e) => setCustomWeight(Number(e.target.value))}
            placeholder="Patient weight in kg"
          />
        </div>
      )}

      {calculatedDosage && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Recommended Dosage Range</AlertTitle>
          <AlertDescription className="font-medium">
            {calculatedDosage}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="customDosage">Dosage</Label>
          <div className="flex-1" />
          <Label htmlFor="isCustomDosage" className="text-xs">Custom</Label>
          <input
            id="isCustomDosage"
            type="checkbox"
            checked={isCustomDosage}
            onChange={(e) => setIsCustomDosage(e.target.checked)}
            className="mr-2"
          />
        </div>
        <Input
          id="customDosage"
          value={isCustomDosage ? customDosage : calculatedDosage}
          onChange={(e) => setCustomDosage(e.target.value)}
          disabled={!isCustomDosage}
          placeholder="Enter custom dosage"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency</Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger id="frequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Once daily</SelectItem>
              <SelectItem value="twice daily">Twice daily</SelectItem>
              <SelectItem value="three times daily">Three times daily</SelectItem>
              <SelectItem value="four times daily">Four times daily</SelectItem>
              <SelectItem value="as needed">As needed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <div className="flex gap-2">
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Duration"
              className="flex-1"
            />
            <Select value={durationUnit} onValueChange={setDurationUnit}>
              <SelectTrigger id="durationUnit" className="w-24">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="days">Days</SelectItem>
                <SelectItem value="weeks">Weeks</SelectItem>
                <SelectItem value="months">Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button
        onClick={handleCalculate}
        className="w-full"
        disabled={!medication}
      >
        <Calculator className="mr-2 h-4 w-4" />
        Calculate Dosage
      </Button>
    </div>
  );
};

export default DosageCalculator;
