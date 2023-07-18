import Link from 'next/link';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { getCurrentUser } from '@/lib/session';
import { UserAccountNav } from './user-account-nav';

interface NavProps {
  items: NavItem[];
}

export default async function NavBar({ items }: NavProps) {
  const user = await getCurrentUser();

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
              className={cn('flex items-center rounded-md group')}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      <UserAccountNav user={user} />
    </nav>
  );
}
