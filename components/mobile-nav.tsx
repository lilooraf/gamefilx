'use client';

import { NavItem } from '@/types';
import { UserAccountNav } from './user-account-nav';
import { NavLinks } from './nav-links';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { Button } from './ui/button';
import { useRef, useState } from 'react';
import useOutsideCloser from '@/hooks/use-outside-closer';

interface NavProps {
  items: NavItem[];
  user?: {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
}

export default function MobileNav({ items, user }: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef(null);

  useOutsideCloser(ref, () => {
    setIsMenuOpen(false);
  });

  return (
    <div className='sticky top-0 z-40 flex items-center justify-center bg-gradient-to-b from-white via-white to-transparent dark:from-black dark:via-black'>
      <div className='relative w-full lg:hidden'>
        <nav className='mx-5 flex justify-between  gap-6 py-4 '>
          <Button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className='h-8 w-8 p-0'
            variant={'ghost'}
          >
            <Icons.menu className='h-8 w-8' />
          </Button>

          <Link href='/'>
            <Icons.app className='h-8 w-8 text-indigo-500' />
          </Link>

          <UserAccountNav user={user} />
        </nav>
        {isMenuOpen && (
          <div className='absolute top-16 z-50 flex w-full justify-center'>
            <div ref={ref} className='rounded-md bg-slate-200 px-8 py-2 dark:bg-slate-800'>
              <NavLinks
                items={items}
                onClickLink={() => setIsMenuOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
