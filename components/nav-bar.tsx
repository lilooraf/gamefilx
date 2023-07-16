'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';

interface NavProps {
  items: NavItem[];
}

export default function NavBar({ items }: NavProps) {
  const path = usePathname();
  return (
    <nav className='flex mx-4 my-3 justify-between items-center align-middle'>
      <ul className='flex gap-5 text-xl font-light'>
        <li>
          <Link href='/'>
            <Icons.app className='text-indigo-600' />
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.target}>
            <Link
              href={item.target}
              className={cn(
                'flex items-center rounded-md group',
                path === item.target && 'font-bold'
              )}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className='flex gap-2'>
        <input
          type='text'
          placeholder='Search'
          className='border border-gray-300 rounded-md p-1'
        />
        <button className='border border-gray-300 rounded-md p-1'>
          Search
        </button>
      </div>
    </nav>
  );
}
