import { NavItem } from '@/types';
import { getCurrentUser } from '@/lib/session';
import { UserAccountNav } from './user-account-nav';
import { NavLinks } from './nav-links';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import MobileNav from './mobile-nav';

interface NavProps {
  items: NavItem[];
}

export default async function NavBar({ items }: NavProps) {
  const user = await getCurrentUser();

  return (
    <>
      <nav className='sticky top-0 z-40 hidden justify-between gap-6 bg-gradient-to-b from-white via-white to-transparent px-5 py-4 dark:from-black dark:via-black lg:flex'>
        <div className='flex items-center gap-3 pr-3'>
          <Link href='/'>
            <Icons.app className='h-8 w-8 text-indigo-500' />
          </Link>
          <NavLinks items={items} />
        </div>
        <UserAccountNav user={user} />
      </nav>
      <MobileNav items={items} user={user} />
    </>
  );
}
