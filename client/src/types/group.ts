import { messageInterface } from '.';
import { rideInterface } from '.';

export interface groupRideInterface {
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
}
