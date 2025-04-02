
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isVerified: boolean;
  isLoading: boolean;
  login: (licenseId: string, password: string) => Promise<void>;
  signup: (name: string, email: string, licenseId: string) => Promise<void>;
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
      const savedUser = localStorage.getItem('user');
      setTimeout(() => {
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
      }, 1000);
    };

    loadUser();
  }, []);

  const login = async (licenseId: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, this would verify against a backend
    // For demo purposes, we'll always succeed if licenseId matches mock
    if (licenseId === mockUser.licenseId) {
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };
  
  const signup = async (name: string, email: string, licenseId: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, this would create a user in the backend
    // For demo purposes, we'll just create a mock user
    const newUser: User = {
      id: `doc-${Date.now()}`,
      name,
      email,
      role: 'doctor',
      isVerified: true,
      licenseId,
      verificationStatus: 'verified',
    };
    
    // Not setting the user here as they would need to log in
    setIsLoading(false);
    return;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
        signup,
        logout,
        checkAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
