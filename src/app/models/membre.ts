import { Team } from "./team";

export interface Membre {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  dateNaissance: Date;
  couleur: string;
  passwordConfirm: string;
  roleList: string[];
  team?: Team[];
}
