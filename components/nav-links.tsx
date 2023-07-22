'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { buttonVariants } from '@/components/ui/button';

interface NavLinksProps {
  items: NavItem[];
  onClickLink?: () => void;
}

export function NavLinks({ items, onClickLink }: NavLinksProps) {
  const path = usePathname();

  return (
    <ul className='flex flex-col items-center gap-5 align-middle text-xl font-light md:flex-row'>
      {items.map((item) => (
        <li key={item.target}>
          <Link
            href={item.target}
            onClick={onClickLink}
            className={cn(
              buttonVariants({ variant: 'link' }),
              'p-0 text-xl font-bold text-black/60 dark:text-white/60',
              path == item.target && 'text-black dark:text-white'
            )}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
