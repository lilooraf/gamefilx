'use client';

import { Icons } from '@/components/icons';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  if (!user) {
    return (
      <button
        onClick={() =>
          signIn('github', {
            callbackUrl: '/games',
          })
        }
      >
        Sign in
      </button>
    );
  }

  return (
    <>
      <div>
        <Image
          src={user.image || ''}
          alt={user.name || ''}
          className='w-10 h-10 rounded-full'
          width={40}
          height={40}
        />
        {/* <button
          onClick={() => {
            signOut({
              callbackUrl: `${window.location.origin}/games`,
            });
          }}
        >
          <Icons.logout className='text-indigo-600' />
        </button> */}
      </div>
    </>
  );
}
