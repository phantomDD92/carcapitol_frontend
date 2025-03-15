'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AuthLayout } from '@/layouts/auth/AuthLayout';
import { useRouter } from 'next/router';

export default function VerifyEmail() {
  const [code, setCode] = useState(['', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = Array.from({ length: 5 }, () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRef<HTMLInputElement>(null),
  );
  const { toast } = useToast();
  const router = useRouter();
  const { email, redirect_url } = router.query;

  useEffect(() => {
    sendVerificationEmail().then((result) => console.log(result));
  }, []);

  const sendVerificationEmail = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_ADDRESS +
          '/users/send-verification-code',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to send verification email');
      }

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error sending verification email:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not send verification code. Please try again.',
      });
    }
  };

  const handleInput = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    if (value.match(/^[0-9]$/)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (index < 4 && value !== '') {
        inputRefs[index + 1].current?.focus();
      }
    } else if (value === '') {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 5);
    const digits = pastedData
      .replace(/[^0-9]/g, '')
      .split('')
      .slice(0, 5);
    const newCode = [...code];
    digits.forEach((digit, index) => {
      if (index < 5) {
        newCode[index] = digit;
      }
    });
    setCode(newCode);
    if (digits.length > 0 && digits.length < 5) {
      inputRefs[digits.length].current?.focus();
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      const codeString = code.join('');

      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_ADDRESS + '/users/verify-email',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, code: codeString }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to verify email');
        setIsLoading(false);
      }

      const result = await response.json();
      setIsLoading(false);
      toast({
        title: 'Success',
        description: result.message,
      });

      router.push({
        pathname: redirect_url as string,
        query: {
          ...(redirect_url === '/auth/reset-password' ? { email: email } : {}),
        },
      });
    } catch (error) {
      console.error('Error verifying email:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not verify the email. Please try again.',
      });
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setResendDisabled(true);
    setCountdown(30); // Set the countdown to 30 seconds
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await sendVerificationEmail();
      // Start the countdown
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval); // Clear interval when countdown reaches 0
            setResendDisabled(false); // Enable the resend button
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to resend code. Please try again.',
      });
      setResendDisabled(false);
      setCountdown(0);
    }
  };

  const back_url =
    redirect_url === 'auth/sign-in' ? '/auth/sign-in' : '/auth/forgot-password';

  return (
    <AuthLayout>
      <div className="space-y-6">
        <Link
          href={back_url}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {`Back to ${back_url === '/auth/sign-in' ? 'Sign In' : 'Forgot Password'}`}
        </Link>

        <div className="space-y-2">
          <h1 className="font-manrope text-[32px] font-bold leading-[43.71px]">
            Check your email
          </h1>
          <p className="text-base text-muted-foreground">
            We sent a reset link to {email}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInput(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="h-12 w-12 rounded-md border border-input bg-background px-3 py-2 text-center text-lg font-medium focus:border-2 focus:border-red-500 focus:outline-none"
              />
            ))}
          </div>

          <Button
            onClick={handleVerify}
            disabled={code.some((digit) => digit === '') || isLoading}
            className="w-full bg-[#C41E3A] hover:bg-[#a01830]"
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Haven&#39;t got the email yet?{' '}
              <button
                onClick={handleResend}
                disabled={resendDisabled}
                className="text-primary hover:underline disabled:opacity-50 disabled:hover:no-underline"
              >
                Resend email
                {countdown > 0 && ` (${countdown}s)`}
              </button>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
