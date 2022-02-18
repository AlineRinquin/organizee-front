import { Tache } from './tache';
import { Team } from './team';

export interface ToDoList {
  nom: string;
  team: Team;
  taches: Tache [];
  id:number;
}


