'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/lib/auth/auth-client';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await signIn.email({ email, password });
      if (error) setError(error.message || 'Login failed');
      if (data) router.push('/dashboard');
      router.refresh();
    } catch (err) {
      if (err instanceof Error) setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border border-border">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-card-foreground">
            Login
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                Email
              </Label>
              <Input
                disabled={isLoading}
                id="email"
                type="email"
                placeholder="you@example.com"
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-visible:ring-ring"
              />
            </div>

            <div className="space-y-2 relative">
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-foreground"
              >
                Password
              </Label>
              <Input
                disabled={isLoading}
                id="password"
                type={isVisible ? 'text' : 'password'}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="focus-visible:ring-ring"
              />
              {!isVisible ? (
                <Eye
                  role="button"
                  tabIndex={0}
                  aria-label="Show password"
                  className="absolute right-3 top-9 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => setIsVisible((v) => !v)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || ' ') setIsVisible(!isVisible);
                  }}
                />
              ) : (
                <EyeOff
                  role="button"
                  tabIndex={0}
                  aria-label="Hide password"
                  className="absolute right-3 top-9 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => setIsVisible((v) => !v)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ')
                      setIsVisible((v) => !v);
                  }}
                />
              )}
            </div>

            {error && (
              <p
                className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md"
                aria-live="polite"
              >
                {error}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && (
                <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Signing in...' : 'Login'}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?&nbsp;
              <Link
                href="/signup"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
