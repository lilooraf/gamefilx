import { GamesSection } from '@/components/game/section';

export default function GamesPage() {
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
      <GamesSection
        gameList={{
          title: 'PC',
          RequestType: 'platforms',
          platforms: ['pc'],
        }}
        id={4}
      />
    </div>
  );
}
