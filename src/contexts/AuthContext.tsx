
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isVerified: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAccess: (requiredRoles: UserRole[]) => boolean;
}

// Mock user data for demo
const mockUser: User = {
  id: 'doc-123',
  name: 'Dr. Jane Smith',
  email: 'jane.smith@hospital.com',
  role: 'doctor',
  isVerified: true,
  licenseId: 'MD-12345',
  verificationStatus: 'verified',
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user from storage or API
    const loadUser = () => {
      // In a real implementation, we would check localStorage or make an API call
      setTimeout(() => {
        setUser(mockUser);
        setIsLoading(false);
      }, 1000);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(mockUser);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  const checkAccess = (requiredRoles: UserRole[]) => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'unauthorized',
        isVerified: user?.isVerified || false,
        isLoading,
        login,
        logout,
        checkAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
