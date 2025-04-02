
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle, UserPlus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const signupSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  licenseId: z.string().min(5, {
    message: "License ID must be at least 5 characters long",
  }),
  verificationCode: z
    .string()
    .length(6, {
      message: "Verification code must be 6 digits",
    })
    .optional(),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      licenseId: "",
      verificationCode: "",
    },
  });

  const sendVerificationCode = async () => {
    const licenseId = form.getValues("licenseId");
    const email = form.getValues("email");
    
    if (!licenseId || !email) {
      toast({
        title: "Missing information",
        description: "Please enter your license ID and email first",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    // Simulate sending verification code
    await new Promise(resolve => setTimeout(resolve, 1500));
    setVerificationSent(true);
    setIsLoading(false);
    
    toast({
      title: "Verification code sent",
      description: "A verification code has been sent to your phone",
    });
  };

  const verifyCode = async () => {
    setIsLoading(true);
    // Simulate verifying code
    await new Promise(resolve => setTimeout(resolve, 1500));
    setVerificationComplete(true);
    setIsLoading(false);
    
    toast({
      title: "License verified",
      description: "Your medical license has been verified successfully",
    });
  };

  const onSubmit = async (data: SignupFormValues) => {
    if (!verificationComplete) {
      toast({
        title: "Verification required",
        description: "Please verify your license before proceeding",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, we would register the user
      // For now, just simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Dr. Jane Smith" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="doctor@hospital.com" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="licenseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medical License ID</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your license ID"
                    {...field}
                    disabled={isLoading || verificationSent}
                  />
                  {!verificationSent ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={sendVerificationCode}
                      disabled={isLoading}
                      className="whitespace-nowrap"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Verify License"
                      )}
                    </Button>
                  ) : verificationComplete ? (
                    <Button variant="outline" disabled className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Verified
                    </Button>
                  ) : null}
                </div>
              </FormControl>
              <FormDescription>
                Enter your medical license ID for verification
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {verificationSent && !verificationComplete && (
          <>
            <Separator className="my-4" />
            
            <div className="text-center text-sm text-muted-foreground mb-4">
              Enter the verification code sent to your registered phone number
            </div>
            
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormControl>
                    <div className="flex flex-col items-center space-y-2">
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isLoading}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      
                      <Button
                        type="button"
                        onClick={verifyCode}
                        disabled={isLoading || form.getValues("verificationCode")?.length !== 6}
                        variant="outline"
                        className="mt-4"
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          "Verify Code"
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !verificationComplete}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-4 w-4" />
              Create Account
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
