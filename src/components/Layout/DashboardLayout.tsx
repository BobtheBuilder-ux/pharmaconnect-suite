
import React from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title = 'Dashboard'
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-muted-foreground mt-1">
                Hospital Management System
              </p>
            </div>
            {user && (
              <div className="mt-2 sm:mt-0 flex items-center">
                <Badge 
                  variant={user.isVerified ? "default" : "outline"}
                  className={user.isVerified ? "bg-medical-success" : ""}
                >
                  {user.isVerified ? 'Verified' : 'Pending Verification'}
                </Badge>
                <span className="ml-2 text-sm">{user.name}</span>
              </div>
            )}
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="flex h-screen overflow-hidden">
    <div className="w-64 bg-sidebar border-r h-screen">
      <Skeleton className="h-full" />
    </div>
    <main className="flex-1 overflow-y-auto">
      <div className="p-6">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-48 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
        </div>
      </div>
    </main>
  </div>
);

export default DashboardLayout;
