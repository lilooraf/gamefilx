'use client';

import { useRef, useState } from 'react';
import { Icons } from '@/components/icons';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Modal } from './modal';
import { UserPlatformsForm } from './user-platforms-form';
import useOutsideCloser from '@/hooks/use-outside-closer';

interface UserAccountNavProps {
  user?: {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef(null);

  useOutsideCloser(ref, () => setShowMenu(false));

  return (
    <>
      <div className='relative'>
        <Button
          className='rounded-full p-0 w-10 h-10'
          onClick={() => setShowMenu(!showMenu)}
        >
          <Image
            src={user?.image || ''}
            alt={user?.name || ''}
            className='w-10 h-10 rounded-full'
            width={40}
            height={40}
          />
        </Button>
        {showMenu && (
          <div
            ref={ref}
            className='absolute z-40 top-12 right-0 p-2 flex flex-col gap-1 w-44 rounded-md dark:bg-slate-800 bg-slate-50 drop-shadow-md'
          >
            <div className='flex flex-col pb-1 border-b border-slate-300 dark:border-gray-500'>
              <span className='text-sm font-semibold'>
                {user?.name}
              </span>
              <span className='text-xs opacity-50'>{user?.email}</span>
            </div>
            <Button
              onClick={() => {
                setShowModal(true);
                setShowMenu(false);
              }}
              variant={'default'}
              className='flex items-center justify-between'
            >
              Platforms
              <Icons.app />
            </Button>
            <Button
              onClick={() => {
                signOut({
                  callbackUrl: `${window.location.origin}/`,
                });
              }}
              variant={'destructive'}
              className='flex items-center justify-between'
            >
              Logout
              <Icons.logout />
            </Button>
          </div>
        )}
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        className='bg-slate-400 dark:bg-slate-800'
      >
        <div className='flex flex-col gap-8 justify-center items-center'>
          <p className='text-xl font-bold'>Select your platforms</p>
          <UserPlatformsForm />
        </div>
      </Modal>
    </>
  );
}
