export interface Membre {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  dateNaissance: Date;
  couleur: string;
  passwordConfirm: string;
 // smiley: string;
  roleList: string[];
}
