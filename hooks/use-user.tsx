'use client';

import { observable, Observable } from '@legendapp/state';
import { Status } from '@prisma/client';
import { createContext, useContext } from 'react';

export const UserContext = createContext<{
  id: Observable<string>;
  name: Observable<string | null>;
  email: Observable<string | null>;
  image: Observable<string | null>;
  platforms: Observable<
    | {
        name: string;
        longName: string;
      }[]
    | undefined
  >;
  games: Observable<{
    id: Observable<number>;
    rating: Observable<number | null>;
    review: Observable<string | null>;
    status: Observable<Status>;
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
      platforms: observable(
        initialUser.platforms?.map((platform) => ({
          name: platform.name,
          longName: platform.longName,
        }))
      ),
      games: observable(initialUser.games.map((game) => ({
        id: observable(game.id),
        rating: observable(game.rating),
        review: observable(game.review),
        status: observable(game.status),
      }))),
    }}
  >
    {children}
  </UserContext.Provider>
);
