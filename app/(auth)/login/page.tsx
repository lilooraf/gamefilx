"use client"
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';


export default function Login() {
  const searchParams = useSearchParams()

  return (
    <div>
      <button onClick={() => signIn('github', {
        callbackUrl: searchParams?.get("from") || "/games",
      })}>Sign in</button>
    </div>
  );
}
