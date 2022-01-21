export interface Membre {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  dateNaissance: Date;
  profil: boolean;
  roleList: string[];

  passwordConfirm: string;
  roleList: string[];
}
