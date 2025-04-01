
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

interface RoleBasedComponentProps {
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
  requireVerified?: boolean;
  children: React.ReactNode;
}

const RoleBasedComponent: React.FC<RoleBasedComponentProps> = ({
  allowedRoles,
  fallback = null,
  requireVerified = false,
  children,
}) => {
  const { role, isVerified } = useAuth();

  const hasAccess = allowedRoles.includes(role);
  const passesVerification = !requireVerified || isVerified;

  if (hasAccess && passesVerification) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};

export default RoleBasedComponent;
