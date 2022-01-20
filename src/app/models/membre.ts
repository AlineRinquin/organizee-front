export interface Membre {
  prenom : string;
  nom: string;
  email: string;
  password: string;
  dateNaissance: Date;
  passwordConfirm: string;
  roleList: string[];
}
