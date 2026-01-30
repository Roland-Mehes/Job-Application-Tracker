'use server';
import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signUpWithEmailAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });
  redirect('/dashboard');
}

export async function signInWithEmailAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });
  redirect('/dashboard');
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect('/login');
}
