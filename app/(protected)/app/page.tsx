'use client';
import { useState } from 'react';
import { GamesSection } from '@/components/game/section';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';
import { PlatformType } from '@/types';
import { Modal } from '@/components/modal';
import { UserPlatformsForm } from '@/components/user-platforms-form';
import { observer } from '@legendapp/state/react';

const GamesPage = observer(() => {
  const user = useUser();
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <GamesSection
        gameList={{
          title: 'Popular',
          RequestType: 'popular',
        }}
        id={1}
      />
      <GamesSection
        gameList={{
          title: 'Hall of Fame',
          RequestType: 'hall-of-fame',
        }}
        id={2}
      />
      <GamesSection
        gameList={{
          title: 'Upcoming',
          RequestType: 'upcoming',
        }}
        id={3}
      />
      {user.platforms.get()?.length ? (
        <div className='pl-8 p-2 mx-4 border-b-2 border-slate-200/20'>
          <p className='text-2xl font-bold'>For your platforms 👾</p>
        </div>
      ) : (
        <div className='flex justify-center items-center pb-2'>
          <Button
            variant='ghost'
            className=' font-bold'
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add your platforms
          </Button>
        </div>
      )}
      {user.platforms.get()?.map((platform, index) => (
        <GamesSection
          key={platform.name}
          gameList={{
            title: platform.longName,
            RequestType: 'platforms',
            platforms: [platform.name as PlatformType],
          }}
          id={index + 4}
        />
      ))}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        className='bg-slate-200 dark:bg-slate-800'
      >
        <div className='flex flex-col gap-8 justify-center items-center'>
          <p className='text-xl font-bold'>Select your platforms</p>
          <UserPlatformsForm />
        </div>
      </Modal>
    </div>
  );
});

export default GamesPage;
