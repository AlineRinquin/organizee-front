export interface Membre {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  dateNaissance: Date;
  couleur: string;
  passwordConfirm: string;
  roleList: string[];
}
