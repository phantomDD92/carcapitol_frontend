'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthLayout } from '@/layouts/auth/AuthLayout';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/router';

const passwordSchema = z
  .string()
  .min(8, 'Minimum 8 characters')
  .regex(/[A-Z]/, 'Use at least 1 capital letter')
  .regex(/[0-9]/, 'Use at least 1 number');

const signUpSchema = z
  .object({
    firstName: z.string().min(1, 'This field is required'),
    lastName: z.string().min(1, 'This field is required'),
    email: z.string().email('Email is not complete or incorrect'),
    password: passwordSchema,
    confirmPassword: z.string(),
    terms: z
      .boolean()
      .refine((val) => val === true, 'You must accept the terms'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords don't match",
    path: ['confirmPassword'],
  });

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const password = watch('password', '');
  const passwordRequirements = [
    { test: /.{8,}/, message: 'Minimum 8 characters' },
    { test: /[A-Z]/, message: 'Use at least 1 capital letter' },
    { test: /[0-9]/, message: 'Use at least 1 number' },
  ];

  const onSubmit = async (data: SignUpValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, terms, ...submissionData } = data; // Destructure to exclude confirmPassword and terms
    console.log(submissionData);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_ADDRESS + '/users/sign-up',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('User created:', result);
      toast({
        title: 'Account Created',
        description:
          'Signed Up successfully. Please enter your verification code',
      });
      router.push({
        pathname: '/auth/confirm-email',
        query: { email: data.email, redirect_url: '/auth/sign-in' }, // Pass the email // Pass the email
      });
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        variant: 'destructive',
        title: 'Error Occured',
        description: 'SignUp failed. Please try again later',
      });
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="font-manrope text-[32px] font-bold leading-[43.71px]">
            Sign Up
          </h1>
          <p className="text-base text-muted-foreground">
            Create your account by filling in the form below
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Button variant="outline" type="button" className="w-full bg-white">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  {...register('firstName')}
                  placeholder="First name"
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register('lastName')}
                  placeholder="Last name"
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

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
              <div className="relative">
                <Input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="mt-2 space-y-1">
                {passwordRequirements.map(({ test, message }) => {
                  const isValid = test.test(password);
                  return (
                    <div
                      key={message}
                      className="flex items-center gap-2 text-sm"
                    >
                      {isValid ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={isValid ? 'text-green-500' : 'text-red-500'}
                      >
                        {message}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <Input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                className={
                  errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                {...register('terms')}
                type="checkbox"
                id="terms"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to all the{' '}
                <Link
                  href="/settings/privacy-settings"
                  className="text-primary hover:underline"
                >
                  Terms
                </Link>{' '}
                and{' '}
                <Link
                  href="/settings/privacy-settings"
                  className="text-primary hover:underline"
                >
                  Privacy policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-500">{errors.terms.message}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-[#C41E3A] hover:bg-[#a01830]"
            >
              Sign Up
            </Button>
          </div>
        </form>

        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/auth/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
