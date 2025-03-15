'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthLayout } from '@/layouts/auth/AuthLayout';
import { useRouter } from 'next/router';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const router = useRouter();

  const onSubmit = (data: ForgotPasswordValues) => {
    console.log(data);
    router.push({
      pathname: '/auth/confirm-email',
      query: { email: data.email, redirect_url: '/auth/reset-password' }, // Pass the email
    });
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
            Forgot password
          </h1>
          <p className="text-base text-muted-foreground">
            Please enter your email to reset the password
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register('email')}
              type="email"
              placeholder="Enter email"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#C41E3A] hover:bg-[#a01830]"
          >
            Reset Password
          </Button>
        </form>

        <div className="text-center text-sm">
          {"Don't have an account? "}
          <Link href="/auth/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
