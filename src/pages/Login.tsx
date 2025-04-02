
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import LoginForm from '@/components/Auth/LoginForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Login = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
        <div className="w-full max-w-md">
          <Card className="border-2 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-medical-primary">Doctor Login</CardTitle>
              <CardDescription>
                Access the hospital prescription system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                Don't have an account?{' '}
                <Button variant="link" className="p-0" asChild>
                  <Link to="/signup">Sign up here</Link>
                </Button>
              </div>
              <Button variant="outline" asChild className="w-full">
                <Link to="/">Back to Dashboard</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Login;
