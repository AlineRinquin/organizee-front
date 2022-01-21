export interface Membre {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  dateNaissance: Date;
  passwordConfirm: string;
  roleList: string[];
}
