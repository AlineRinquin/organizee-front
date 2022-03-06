import { Tache } from './tache';
import { Team } from './team';

export interface ToDoList {
  nom: string;
  taches: Tache[];
  id: number;
  team? : Team;
}
