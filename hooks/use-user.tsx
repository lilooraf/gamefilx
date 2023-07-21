'use client';

import { GameInfo } from '@/types';
import { observable, Observable } from '@legendapp/state';
import { Status } from '@prisma/client';
import { createContext, useContext } from 'react';

export const UserContext = createContext<{
  id: Observable<string>;
  name: Observable<string | null>;
  email: Observable<string | null>;
  image: Observable<string | null>;
  library_filter: Observable<Status>;
  platforms: Observable<
    | {
        name: string;
        longName: string;
      }[]
    | undefined
  >;
  games: Observable<{
    id: number;
    rating: number | null;
    review: string | null;
    status: Status;
    game: GameInfo;
  }[]>;
} | null>(null);

export const useUser = () => useContext(UserContext)!;

interface UserProviderProps {
  initialUser: {
    id: string | undefined;
    name: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
    platforms:
      | {
          name: string;
          longName: string;
        }[]
      | undefined;
    games: {
      id: number;
      rating: number | null;
      review: string | null;
      status: Status;
      game: GameInfo;
    }[];
  };
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({
  initialUser,
  children,
}) => (
  <UserContext.Provider
    value={{
      id: observable(initialUser.id),
      name: observable(initialUser.name),
      email: observable(initialUser.email),
      image: observable(initialUser.image),
      library_filter: observable('WISH_LIST'),
      platforms: observable(
        initialUser.platforms?.map((platform) => ({
          name: platform.name,
          longName: platform.longName,
        }))
      ),
      games: observable(initialUser.games.map((game) => ({
        id: game.id,
        rating: game.rating,
        review: game.review,
        status: game.status,
        game: game.game,
      }))),
    }}
  >
    {children}
  </UserContext.Provider>
);
