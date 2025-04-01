
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    });
  };

  return (
    <AuthProvider>
      <DashboardLayout title="Settings">
        <div className="space-y-6">
          <Card className="w-full shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-medical-primary">
                <SettingsIcon className="mr-2" />
                System Settings
              </CardTitle>
              <CardDescription>
                Configure your hospital management system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="integrations">Integrations</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="space-y-4">
                  <div className="text-lg font-medium">General Settings</div>
                  <p className="text-muted-foreground">
                    Configure general system settings like language, timezone, and display preferences.
                  </p>
                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings}>Save Changes</Button>
                  </div>
                </TabsContent>
                <TabsContent value="notifications" className="space-y-4">
                  <div className="text-lg font-medium">Notification Settings</div>
                  <p className="text-muted-foreground">
                    Configure how and when you receive notifications from the system.
                  </p>
                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings}>Save Changes</Button>
                  </div>
                </TabsContent>
                <TabsContent value="security" className="space-y-4">
                  <div className="text-lg font-medium">Security Settings</div>
                  <p className="text-muted-foreground">
                    Configure security settings like 2FA, password policies, and session timeouts.
                  </p>
                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings}>Save Changes</Button>
                  </div>
                </TabsContent>
                <TabsContent value="integrations" className="space-y-4">
                  <div className="text-lg font-medium">Integration Settings</div>
                  <p className="text-muted-foreground">
                    Configure integrations with external systems like EHR, lab systems, or pharmacy systems.
                  </p>
                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings}>Save Changes</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </AuthProvider>
  );
};

export default Settings;
