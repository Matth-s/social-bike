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
  members: memberInterface[] | [];
  chat: string[] | [];
  rides: rideInterface[] | [];
  city: string;
  type: 'ouvert' | 'invitation' | 'ferme';
  description: string;
  sport: string;
  createdAt: number;
  waitingList: waitingListInterface[] | [];
}

interface waitingListInterface {
  id: string;
  username: string;
}

interface memberInterface {
  id: string;
  username: string;
}
