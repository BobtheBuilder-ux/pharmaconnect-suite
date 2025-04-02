
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, UserCircle, ShieldCheck, BarChart3, Settings, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard 
        title="Prescriptions" 
        description="Manage and create prescriptions" 
        icon={<FileText className="h-8 w-8 text-medical-primary" />}
        linkTo="/prescriptions"
      />
      
      <DashboardCard 
        title="Patients" 
        description="View and manage patient records" 
        icon={<UserCircle className="h-8 w-8 text-medical-primary" />}
        linkTo="/patients"
      />
      
      <DashboardCard 
        title="Verification" 
        description="Verify doctor credentials" 
        icon={<ShieldCheck className="h-8 w-8 text-medical-primary" />}
        linkTo="/verification"
      />
      
      <DashboardCard 
        title="Analytics" 
        description="View system analytics and reports" 
        icon={<BarChart3 className="h-8 w-8 text-medical-primary" />}
        linkTo="/analytics"
      />
      
      <DashboardCard 
        title="Settings" 
        description="Configure system settings" 
        icon={<Settings className="h-8 w-8 text-medical-primary" />}
        linkTo="/settings"
      />
    </div>
  );
};

const LoginOptions = () => {
  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Hospital Management System</CardTitle>
          <CardDescription className="text-center">
            Login or sign up to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Welcome to the Hospital Management System. Please login with your doctor credentials to continue.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button asChild className="w-full">
            <Link to="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/signup">
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <IndexContent />
    </AuthProvider>
  );
};

const IndexContent = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
        <LoginOptions />
      </div>
    );
  }

  return (
    <DashboardLayout title="Hospital Dashboard">
      <DashboardCards />
    </DashboardLayout>
  );
};

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon, linkTo }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Click below to access the {title.toLowerCase()} module.
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={linkTo}>Go to {title}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Index;
