'use client';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/use-user';
import { observer } from '@legendapp/state/react';

const getPlatforms = async () => {
  const res = await fetch('/api/platforms');
  const platforms = await res.json();
  return platforms;
};

const submitPlatforms = async (
  platforms: {
    name: string;
    longName: string;
  }[]
) => {
  fetch('/api/user/platform', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ platforms: platforms.map((p) => p.name) }),
  });
};

type Platform = { name: string; longName: string };

interface UserPlatformsFormProps {
  withLink?: boolean;
}

export const UserPlatformsForm = observer(
  ({ withLink = false }: UserPlatformsFormProps) => {
    const user = useUser();
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [ownerPlatforms, setOwnerPlatforms] = useState<Platform[]>(
      user?.platforms.get() ?? []
    );

    useEffect(() => {
      getPlatforms().then((platforms) => {
        setPlatforms(platforms);
      });
    }, []);

    const handleAddRemovePlatform = (platform: {
      name: string;
      longName: string;
    }) => {
      let platforms_tmp: Platform[] = [];

      if (ownerPlatforms.some((e) => e.name == platform.name)) {
        platforms_tmp = ownerPlatforms.filter((p) => p.name !== platform.name);
      } else {
        platforms_tmp = [...ownerPlatforms, platform];
      }

      submitPlatforms(platforms_tmp).then(() => {
        setOwnerPlatforms(platforms_tmp);
        user?.platforms.set(platforms_tmp);
      });
    };

    return (
      <div className='flex flex-col justify-center items-center gap-4'>
        <div className='flex flex-col gap-4'>
          <ul className='flex flex-wrap justify-center items-center gap-2 max-w-xl'>
            {platforms?.map((platform) => (
              <li key={platform.name}>
                <button
                  type='button'
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    ownerPlatforms.find((e) => e.name == platform.name) &&
                      'bg-orange-400 dark:bg-orange-500 hover:bg-orange-500 dark:hover:bg-orange-700'
                  )}
                  onClick={() => handleAddRemovePlatform(platform)}
                >
                  {ownerPlatforms.some((e) => e.name == platform.name) && '✓ '}
                  {platform.longName}
                </button>
              </li>
            ))}
            {platforms.length === 0 &&
              Array.from(Array(12).keys()).map((i) => (
                <li key={i}>
                  <div
                    style={{
                      animationDelay: `${i * 0.1}s`,
                    }}
                    className='w-32 h-10 bg-slate-200/20 animate-pulse rounded-md'
                  ></div>
                </li>
              ))}
          </ul>
        </div>

        {withLink && ownerPlatforms.length > 0 && (
          <Link
            type='button'
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'bg-indigo-600'
            )}
            href={{
              pathname: '/games',
            }}
          >
            Continue
          </Link>
        )}
        {withLink && !ownerPlatforms.length && (
          <Link
            type='button'
            className={cn(buttonVariants({ variant: 'link' }))}
            href={{
              pathname: '/games',
            }}
          >
            Skip
          </Link>
        )}
      </div>
    );
  }
);
