import { Membre } from './membre';
import { Team } from './team';

export interface Menu {
  libelle: string;
  dateMenu: Date;
  membre: Membre;
  team: Team;
}
