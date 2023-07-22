'use client';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/use-user';
import { observer } from '@legendapp/state/react';
import { UserPlatformRequest, Platforms } from '@/types';
import axios from 'axios';
import { PlatformsResultSchema } from '@/lib/validations/platforms';

const getPlatforms = async () => {
  const data = await axios.get('/api/platforms').then((res) => res.data);

  const platforms = PlatformsResultSchema.parse(data);

  return platforms;
};

const submitPlatforms = async (
  platforms: {
    name: string;
    longName: string;
  }[]
) => {
  const payload: UserPlatformRequest = {
    platforms: platforms.map((p) => p.name),
  };

  return await axios.post('/api/user/platform', payload);
};

interface UserPlatformsFormProps {
  withLink?: boolean;
}

export const UserPlatformsForm = observer(
  ({ withLink = false }: UserPlatformsFormProps) => {
    const user = useUser();
    const [platforms, setPlatforms] = useState<Platforms>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [ownerPlatforms, setOwnerPlatforms] = useState<Platforms>(
      user?.platforms.get() ?? []
    );

    useEffect(() => {
      getPlatforms()
        .then((platforms: Platforms) => {
          setPlatforms(platforms);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }, []);

    const handleAddRemovePlatform = (platform: {
      name: string;
      longName: string;
    }) => {
      let platforms_tmp: Platforms = [];

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
      <div className='flex flex-col items-center justify-center gap-4'>
        <div className='flex flex-col gap-4'>
          <ul className='flex max-w-xl flex-wrap items-center justify-center gap-2'>
            {platforms?.map((platform) => (
              <li key={platform.name}>
                <button
                  type='button'
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    ownerPlatforms.find((e) => e.name == platform.name) &&
                      'bg-orange-400 hover:bg-orange-500 dark:bg-orange-500 dark:hover:bg-orange-700'
                  )}
                  onClick={() => handleAddRemovePlatform(platform)}
                >
                  {ownerPlatforms.some((e) => e.name == platform.name) && '✓ '}
                  {platform.longName}
                </button>
              </li>
            ))}
            {isLoading &&
              Array.from(Array(12).keys()).map((i) => (
                <li key={i}>
                  <div
                    style={{
                      animationDelay: `${i * 0.1}s`,
                    }}
                    className='h-10 w-32 animate-pulse rounded-md bg-slate-200/20'
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
              pathname: '/app',
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
              pathname: '/app',
            }}
          >
            Skip
          </Link>
        )}
      </div>
    );
  }
);
