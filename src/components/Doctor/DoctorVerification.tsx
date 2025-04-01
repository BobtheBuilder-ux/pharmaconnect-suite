
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, ShieldAlert, Clock, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AuditLog } from '@/types';

// Mock audit logs
const mockAuditLogs: AuditLog[] = [
  {
    id: 'log-001',
    userId: 'doc-123',
    userName: 'Dr. Jane Smith',
    action: 'Created',
    resourceType: 'Prescription',
    resourceId: 'rx-001',
    details: 'Created new prescription for John Smith (Lisinopril 10mg daily)',
    timestamp: '2023-06-15T14:32:00Z',
  },
  {
    id: 'log-002',
    userId: 'doc-123',
    userName: 'Dr. Jane Smith',
    action: 'Updated',
    resourceType: 'Prescription',
    resourceId: 'rx-001',
    details: 'Updated dosage from 10mg to 20mg daily',
    timestamp: '2023-06-16T10:15:00Z',
  },
  {
    id: 'log-003',
    userId: 'doc-456',
    userName: 'Dr. Michael Chen',
    action: 'Created',
    resourceType: 'Prescription',
    resourceId: 'rx-002',
    details: 'Created new prescription for Sarah Johnson (Albuterol 90mcg as needed)',
    timestamp: '2023-06-18T09:45:00Z',
  },
];

const DoctorVerification: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [licenseId, setLicenseId] = useState(user?.licenseId || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'verified' | 'pending' | 'expired' | undefined>(
    user?.verificationStatus
  );

  const handleVerify = () => {
    if (!licenseId.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please enter your license ID',
        variant: 'destructive',
      });
      return;
    }

    setIsVerifying(true);

    // Simulate API call to government verification service
    setTimeout(() => {
      // For demo purposes, randomly assign a status
      const statuses: ('verified' | 'pending' | 'expired')[] = ['verified', 'pending', 'expired'];
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      setVerificationStatus(newStatus);
      setIsVerifying(false);
      
      toast({
        title: 'Verification Status',
        description: `Your license verification status is now: ${newStatus}`,
      });
    }, 2000);
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-medical-primary">
          <ShieldCheck className="mr-2" />
          Doctor Verification
        </CardTitle>
        <CardDescription>
          Verify your medical license to access prescription features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/50 p-4 rounded-md">
          <div className="flex items-start space-x-4">
            <div className="mt-1">
              {verificationStatus === 'verified' ? (
                <CheckCircle className="h-8 w-8 text-medical-success" />
              ) : verificationStatus === 'pending' ? (
                <Clock className="h-8 w-8 text-medical-warning" />
              ) : (
                <ShieldAlert className="h-8 w-8 text-medical-danger" />
              )}
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-medium">License Status:</h3>
                <Badge
                  className="ml-2"
                  variant={
                    verificationStatus === 'verified'
                      ? 'default'
                      : verificationStatus === 'pending'
                      ? 'outline'
                      : 'destructive'
                  }
                >
                  {verificationStatus
                    ? verificationStatus.charAt(0).toUpperCase() + verificationStatus.slice(1)
                    : 'Not Verified'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {verificationStatus === 'verified'
                  ? 'Your medical license has been successfully verified. You have full access to all prescription features.'
                  : verificationStatus === 'pending'
                  ? 'Your verification is currently being processed. Limited access is provided during this time.'
                  : verificationStatus === 'expired'
                  ? 'Your medical license verification has expired. Please renew your verification.'
                  : 'Please verify your medical license to gain access to prescription features.'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="licenseId">Medical License ID</Label>
            <Input
              id="licenseId"
              placeholder="Enter your medical license ID"
              value={licenseId}
              onChange={(e) => setLicenseId(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter your government-issued medical license ID for verification
            </p>
          </div>

          <Button
            onClick={handleVerify}
            disabled={isVerifying || !licenseId.trim()}
            className="w-full"
          >
            {isVerifying ? 'Verifying...' : 'Verify License'}
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Prescription Audit Log</h3>
          <ScrollArea className="h-[200px] border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Timestamp</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead className="hidden md:table-cell">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAuditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">
                      {new Date(log.timestamp).toLocaleDateString()}{' '}
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          log.action === 'Created'
                            ? 'default'
                            : log.action === 'Updated'
                            ? 'outline'
                            : 'secondary'
                        }
                      >
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {log.resourceType} #{log.resourceId.split('-')[1]}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {log.details}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          All license verification attempts and prescription actions are logged for compliance purposes.
        </p>
      </CardFooter>
    </Card>
  );
};

export default DoctorVerification;
