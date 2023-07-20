import type { Metadata } from 'next';
import NavBar from '@/components/nav-bar';
import { appNav } from '@/config/app-nav';
import { getCurrentUser } from '@/lib/session';
import { db } from '@/lib/db';
import { User } from 'next-auth';
import { UserProvider } from '@/hooks/use-user';

export const metadata: Metadata = {
  title: 'GameFlix',
  description: "Today's recommendations",
};

export const dynamic = 'force-dynamic';

const getUserPlatforms = (
  user?: User & {
    id: string;
  }
) => {
  return db.user
    .findUnique({
      where: {
        id: user?.id,
      },
      include: {
        userPlatforms: {
          select: {
            platform: true,
          },
        },
      },
    })
    .then((user) => {
      const userPlatforms = user?.userPlatforms.map((userPlatform) => {
        return userPlatform.platform;
      });
      return userPlatforms;
    });
};

const getUserGames = (
  user?: User & {
    id: string;
  }
) => {
  return db.user
    .findUnique({
      where: {
        id: user?.id,
      },
      include: {
        userGames: {
          select: {
            gameId: true,
            review: true,
            status: true,
            rating: true,
          },
        },
      },
    })
    .then((user) => {
      const userGames =
        user?.userGames.map((userGame) => {
          return {
            id: userGame.gameId,
            review: userGame.review,
            status: userGame.status,
            rating: userGame.rating,
          };
        }) || [];
      return userGames;
    });
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const platforms = await getUserPlatforms(user);
  const games = await getUserGames(user);

  return (
    <>
      <UserProvider
        initialUser={{
          id: user?.id,
          name: user?.name,
          email: user?.email,
          image: user?.image,
          platforms: platforms?.map((platform) => ({
            name: platform?.name,
            longName: platform?.longName,
          })),
          games: games.map((game) => ({
            id: game.id,
            rating: game?.rating,
            review: game?.review,
            status: game.status,
          })),
        }}
      >
        <NavBar items={appNav} />
        {children}
      </UserProvider>
    </>
  );
}
