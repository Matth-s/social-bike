import { messageInterface } from '.';
import { rideInterface } from '.';

export interface groupParamsInterface {
  name: string;
  limit: number;
  filtre: 'groupe' | 'ville';
}

export interface groupRideInterface {
  id: string;
  name: string;
  owner: string;
  ownerId: string;
  members: string[] | [];
  chat: messageInterface[] | [];
  rides: rideInterface[] | [];
  city: string;
  type: 'ouvert' | 'invation' | 'ferme';
  description: string;
  sport: string[];
  createdAt: number;
}
