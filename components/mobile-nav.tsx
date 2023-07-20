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
    <div className='sticky top-0 z-40 flex items-center justify-center  bg-gradient-to-b from-black via-black to-transparent'>
      <div className='relative w-full lg:hidden'>
        <nav className='mx-5 py-4 justify-between  flex gap-6 '>
          <Button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className='p-0 w-8 h-8'
            variant={'ghost'}
          >
            <Icons.menu className='w-8 h-8 text-indigo-500' />
          </Button>

          <Link href='/'>
            <Icons.app className='w-8 h-8 text-indigo-500' />
          </Link>

          <UserAccountNav user={user} />
        </nav>
        {isMenuOpen && (
          <div className='absolute top-16 w-full z-50 flex justify-center'>
            <div ref={ref} className='bg-slate-800 px-8 py-2 rounded-md'>
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
