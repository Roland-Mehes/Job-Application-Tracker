'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

import { useState } from 'react';
import { Eye, EyeOff, Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth/auth-client';

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmpassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await signUp.email({
        name,
        email,
        password,
      });

      if (error) setError(error.message || 'Sign Up failed');
      if (data) router.push('/dashboard');
      router.refresh();
    } catch (err) {
      if (err instanceof Error) setError(err.message || 'Sign Up failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md  shadow-lg border border-border">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-card-foreground">
            Sign Up
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Create an account to start tracking your job applications
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                name="name"
                autoFocus
                required
                disabled={isLoading}
                className="focus-visible:ring-ring"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                name="email"
                required
                disabled={isLoading}
                className="focus-visible:ring-ring"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </Label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />

            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-foreground"
            >
              Confirm Password
            </Label>
            <PasswordInput
              id="confirmPassword"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
            {/* Display Error Message */}
            {error && (
              <p
                className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md"
                aria-live="polite"
              >
                {error}
              </p>
            )}
          </CardContent>

          {/* Card Footer */}
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isLoading ? 'Please wait' : 'Sign Up'}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?&nbsp;
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

function PasswordInput({ id, value, onChange, disabled }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={visible ? 'text' : 'password'}
        value={value}
        minLength={8}
        onChange={onChange}
        disabled={disabled}
        placeholder="********"
        className="focus-visible:ring-ring"
      />
      {visible ? (
        <EyeOff
          role="button"
          tabIndex={0}
          aria-label="Hide password"
          className="absolute right-3 top-2.5 h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setVisible((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setVisible((v) => !v);
          }}
        />
      ) : (
        <Eye
          role="button"
          tabIndex={0}
          aria-label="Show password"
          className="absolute right-3 top-2.5 h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setVisible((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setVisible((v) => !v);
          }}
        />
      )}
    </div>
  );
}
