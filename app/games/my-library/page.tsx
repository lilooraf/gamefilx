import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

export default async function GamesPage() {

  const user = await getCurrentUser();

  if (user) {
    const games = await db.userGame.findMany({
      where: {
        userId: user.id
      }
    });

    return (
      <>
        {games.map((game) => (
          <div key={game.id}>
            {game.id}
          </div>
        ))}
      </>
    )
  }

  return (
      <></>
  );
}
