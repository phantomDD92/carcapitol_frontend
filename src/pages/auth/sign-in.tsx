'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthLayout } from '@/layouts/auth/AuthLayout';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/router';
import {
  getEmailFromToken,
  getVerifiedFromToken,
} from '@/utils/func/jwt-payload';
import useLocalStorage, { ACCESS_TOKEN_KEY } from '@/hooks/useLocalStorage';
import { useUser } from '@/contexts/auth/UserContext';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import React, { useCallback } from 'react';

// Validation schema for sign-in
const signInSchema = z.object({
  email: z.string().email('Email is not complete or incorrect'),
  password: z.string().min(8, 'Minimum 8 characters'),
  rememberMe: z.boolean().optional(),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignIn() {
  const { toast } = useToast();
  const router = useRouter();
  const { handleGetUserDataFromToken, handleSetData } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [accessToken, setAccessToken] = useLocalStorage<string>(
    ACCESS_TOKEN_KEY,
    '',
  );

  const onSubmit = async (data: SignInValues) => {
    const { email, password } = data;

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_ADDRESS + '/auth/sign-in',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const result = await response.json();

      setAccessToken(result.data.accessToken);
      handleSetData('accessToken', result.data.accessToken);
      handleGetUserDataFromToken();

      if (!getVerifiedFromToken(result.data.accessToken)) {
        router.push({
          pathname: '/auth/confirm-email',
          query: { email: getEmailFromToken(result.data.accessToken) }, // Pass the email
        });
      } else {
        toast({
          title: 'Sign In Successful',
          description: 'Welcome back!',
        });
        router.push('/dashboard');
      }
      // Redirect after successful sign-in
    } catch (error) {
      console.error('Error signing in:', error);
      toast({
        variant: 'destructive',
        title: 'Sign In Failed',
        description: 'Please check your credentials and try again.',
      });
    }
  };

  const handleSignInGoogle = useCallback(async (token?: string) => {
    if (!token)
      return toast({
        variant: 'destructive',
        title: 'Sign In Failed',
        description: 'Please check your credentials and try again.',
      });

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_ADDRESS + '/auth/sign-in-google',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const result = await response.json();

      setAccessToken(result.data.accessToken);
      handleSetData('accessToken', result.data.accessToken);
      handleGetUserDataFromToken(result.data.accessToken);

      toast({
        title: 'Sign In Successful',
        description: 'Welcome back!',
      });
      router.push('/dashboard');
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="font-manrope text-[32px] font-bold leading-[43.71px]">
            Sign In
          </h1>
          <p className="text-base text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <GoogleOAuthProvider
          clientId={
            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
            '353774879213-v0rj73iglopi99dta2bi3rjh4ej2qum0.apps.googleusercontent.com'
          }
        >
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              handleSignInGoogle(credentialResponse.credential);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register('email')}
              type="email"
              placeholder="Email"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              {...register('password')}
              type="password"
              placeholder="Password"
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                {...register('rememberMe')}
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#C41E3A] hover:bg-[#a01830]"
          >
            Sign In
          </Button>
        </form>

        <div className="text-center text-sm">
          Don&#39;t have an account?{' '}
          <Link href="/auth/sign-up" className="text-primary hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
