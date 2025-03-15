'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { ArrowLeft, Eye, EyeOff, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { AuthLayout } from '@/layouts/auth/AuthLayout';
import { useRouter } from 'next/router';

const passwordSchema = z
  .string()
  .min(8, 'Minimum 8 characters')
  .regex(/[A-Z]/, 'Use at least 1 capital letter')
  .regex(/[0-9]/, 'Use at least 1 number');

const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { email } = router.query;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  const passwordRequirements = [
    { test: /.{8,}/, message: 'Minimum 8 characters' },
    { test: /[A-Z]/, message: 'Use at least 1 capital letter' },
    { test: /[0-9]/, message: 'Use at least 1 number' },
  ];

  const onSubmit = async (data: ResetPasswordValues) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_ADDRESS + '/users/reset-password',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password: data.password }),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Reset password successfully:', result);
      toast({
        title: 'Success',
        description: 'Password updated successfully.',
      });

      router.push('/auth/sign-in');
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        variant: 'destructive',
        title: 'Error Occured',
        description: 'Reset password failed. Please try again later',
      });
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <Link
          href="/auth/sign-in"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sign In
        </Link>

        <div className="space-y-2">
          <h1 className="font-manrope text-[32px] font-bold leading-[43.71px]">
            Set a New Password
          </h1>
          <p className="text-base text-muted-foreground">
            Create a new password. Ensure it differs from previous ones for
            security
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <div>
              <div className="relative">
                <Input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
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
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              {passwordRequirements.map(({ test, message }) => {
                const isValid = test.test(password);
                return (
                  <div
                    key={message}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Check
                      className={`h-4 w-4 ${isValid ? 'text-green-500' : 'text-gray-300'}`}
                    />
                    <span
                      className={isValid ? 'text-green-500' : 'text-gray-500'}
                    >
                      {message}
                    </span>
                  </div>
                );
              })}
            </div>

            <div>
              <div className="relative">
                <Input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
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
              </div>
              {password && confirmPassword && (
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <Check
                    className={`h-4 w-4 ${!errors.confirmPassword ? 'text-green-500' : 'text-gray-300'}`}
                  />
                  <span
                    className={
                      !errors.confirmPassword
                        ? 'text-green-500'
                        : 'text-gray-500'
                    }
                  >
                    The passwords match
                  </span>
                </div>
              )}
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#C41E3A] hover:bg-[#a01830]"
          >
            Update Password
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
