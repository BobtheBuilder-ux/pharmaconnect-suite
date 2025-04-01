
import React, { useState, useEffect } from 'react';
import { Medication } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, X, Search } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Mock FDA medication data
const mockMedications: Medication[] = [
  {
    id: 'med-001',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin',
    form: 'Capsule',
    strength: '500 mg',
    manufacturer: 'Pfizer',
    referenceDose: {
      min: 250,
      max: 500,
      unit: 'mg',
      perWeight: true,
    },
  },
  {
    id: 'med-002',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    form: 'Tablet',
    strength: '10 mg',
    manufacturer: 'Merck',
    referenceDose: {
      min: 5,
      max: 40,
      unit: 'mg',
      perWeight: false,
    },
  },
  {
    id: 'med-003',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    form: 'Tablet',
    strength: '200 mg',
    manufacturer: 'Johnson & Johnson',
    referenceDose: {
      min: 200,
      max: 800,
      unit: 'mg',
      perWeight: false,
    },
  },
  {
    id: 'med-004',
    name: 'Metformin',
    genericName: 'Metformin Hydrochloride',
    form: 'Tablet',
    strength: '500 mg',
    manufacturer: 'GlaxoSmithKline',
    referenceDose: {
      min: 500,
      max: 2000,
      unit: 'mg',
      perWeight: false,
    },
  },
  {
    id: 'med-005',
    name: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    form: 'Tablet',
    strength: '20 mg',
    manufacturer: 'Pfizer',
    referenceDose: {
      min: 10,
      max: 80,
      unit: 'mg',
      perWeight: false,
    },
  },
];

interface MedicationSearchProps {
  onSelectMedication: (medication: Medication) => void;
  selectedMedication?: Medication;
}

const MedicationSearch: React.FC<MedicationSearchProps> = ({
  onSelectMedication,
  selectedMedication,
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [medications, setMedications] = useState<Medication[]>(mockMedications);

  // Simulated API search
  useEffect(() => {
    const searchMedications = () => {
      // In a real implementation, this would be an API call
      const filteredMeds = mockMedications.filter(
        (med) =>
          med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          med.genericName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setMedications(filteredMeds);
    };

    if (searchTerm) {
      searchMedications();
    } else {
      setMedications(mockMedications);
    }
  }, [searchTerm]);

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedMedication
              ? `${selectedMedication.name} (${selectedMedication.strength})`
              : "Search medications..."}
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search FDA database..."
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <CommandList>
              <CommandEmpty>No medications found.</CommandEmpty>
              <CommandGroup>
                {medications.map((medication) => (
                  <CommandItem
                    key={medication.id}
                    onSelect={() => {
                      onSelectMedication(medication);
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <span>{medication.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {medication.genericName} • {medication.form} • {medication.strength}
                      </span>
                    </div>
                    <Check
                      className={`ml-auto h-4 w-4 ${
                        selectedMedication?.id === medication.id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedMedication && (
        <div className="flex items-center p-2 bg-medical-light rounded-md">
          <div className="flex-1">
            <div className="font-medium">{selectedMedication.name}</div>
            <div className="text-sm text-muted-foreground">
              {selectedMedication.form} • {selectedMedication.strength} • {selectedMedication.manufacturer}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSelectMedication(undefined as any)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MedicationSearch;
