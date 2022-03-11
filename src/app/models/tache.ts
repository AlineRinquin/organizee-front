
import { ToDoList } from './to-do-list';


export interface Tache {
  id : number,
  texte: string,
  etat : boolean,
  editing : boolean// editing n'existe pas dans la BDD,
  //c'est juste un état dont on a besoin dans le front pour pouvoir transformer les tâches et
  // le titre des todo en input
}
