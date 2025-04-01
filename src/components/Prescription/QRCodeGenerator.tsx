
import React, { useState } from 'react';
import { QrCode, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Prescription } from '@/types';

interface QRCodeGeneratorProps {
  prescription?: Partial<Prescription>;
  isGenerating?: boolean;
  onGenerate: () => void;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  prescription,
  isGenerating = false,
  onGenerate,
}) => {
  const [qrGenerated, setQrGenerated] = useState(false);
  
  // Mock QR code image URL
  const qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + 
    encodeURIComponent(JSON.stringify({
      id: prescription?.id || 'temp-id',
      medication: prescription?.medicationName,
      dosage: prescription?.dosage,
      patient: prescription?.patientId,
      doctor: prescription?.doctorName,
      date: new Date().toISOString(),
    }));

  const handleGenerate = () => {
    onGenerate();
    // Simulate generation delay
    setTimeout(() => {
      setQrGenerated(true);
    }, 1500);
  };

  const handleDownload = () => {
    // In a real app, this would download the QR code
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `prescription-${prescription?.id || 'new'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    // In a real app, this would open the print dialog
    window.print();
  };

  return (
    <div className="space-y-4">
      {qrGenerated ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="border rounded-md p-4 bg-white">
            <img 
              src={qrCodeUrl} 
              alt="Prescription QR Code" 
              className="w-40 h-40 mx-auto"
            />
          </div>
          <div className="text-sm text-center text-muted-foreground">
            Scan to verify prescription details
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handlePrint}
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prescription?.medicationName}
          className="w-full"
        >
          <QrCode className="mr-2 h-4 w-4" />
          {isGenerating ? 'Generating...' : 'Generate QR Code'}
        </Button>
      )}
    </div>
  );
};

export default QRCodeGenerator;
