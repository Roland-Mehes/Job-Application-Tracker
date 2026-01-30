'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth/auth-client';
import { useState } from 'react';
import { Loader2Icon } from 'lucide-react';

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn.email({ email, password });
      if (result.error) setError(result.error.message || 'Login Failed');
      if (result.data) router.push('/dashboard'); //redirect if login is successful
      router.refresh();
    } catch (error) {
      if (error instanceof Error) setError(error.message || 'Login Failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
        <div className="p-8 rounded-lg shadow-md shadow-muted w-full max-w-md bg-card text-card-foreground">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                autoComplete="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                autoComplete="current-password"
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="mt-1 block w-full px-3 py-2 border border-gray-3"
                placeholder="Enter your password"
              />
            </div>

            {isLoading ? (
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2"
                disabled
              >
                <Loader2Icon className="animate-spin" /> Loading...
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Login
              </Button>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <p className="text-sm text-center text-gray-600 mt-4">
              Don&apos;t have an account?&nbsp;
              <Link
                href="/signup"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
