import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tache} from 'src/app/models/tache';
import { ToDoList} from 'src/app/models/to-do-list';
import { TodoService } from 'src/app/services/todo.service';
import { TodoList } from 'src/app/todo-list';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  @Input() todo!: ToDoList;
  public beforeEditCache: string;
  //public todos: ToDoList[];
  public todoTitle: string;
  public idTodo: number;
  public filter : string;
  public casesRestantes : boolean;
  public masterSelected: boolean;
  public result : any;
  public tache : Tache [];

  constructor(private TodoService : TodoService, private router: Router ) {
    this.beforeEditCache = '';
    //this.todos = [];
    this.todoTitle = '';
    this.idTodo = 0;
    this.filter ='';
    this.casesRestantes=true;
    this.masterSelected= false;
    this.tache = [];
  }

  ngOnInit(): void {
    //this.refreshTodo();
    this.beforeEditCache = '';
    this.casesRestantes=true;
    this.filter='tous';
    this.idTodo = 4;
    this.todoTitle = '';
   /*  this.todos = [
      {
        id: 1,
        texte: 'Finish Angular Screencast',
        etat: false,
        editing: false,
      },
      {
        id: 2,
        texte: 'Take over world',
        etat: false,
        editing: false,
      },
      {
        id: 3,
        texte: 'One more thing',
        etat: false,
        editing: false,
      },
    ]; */
  }
  //ajouter tache

  addTache(idTodoList : number) {//idTodoList id que la todoList que l'on récupère
console.log(idTodoList);
    const tache: Tache = {
      id : 0,
      texte: this.todoTitle,
      etat : false,
      editing : false,

    }
    console.log(this.tache);
    this.TodoService.addTache(tache,idTodoList).subscribe((resp)=>{
      window.location.reload();
    })
    /* if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todos.push({
      id: this.idTodo,
      title: this.todoTitle,
      completed: false,
      editing: false,
    });
    this.todoTitle = '';
    this.idTodo++; */
  }
 /*  if (contact.nom !== '') {
    this.repertoireService.addContact(contact).subscribe((resp) => {
      this.router.navigate(['repertoire/']);
    }); */


  //modifier la tâche
  modifier(tache: Tache): void {
    this.beforeEditCache = tache.texte;
    tache.editing = true;
  }

  // modifier l'apparence focus
  doneEdit(tache: Tache): void {
    if (tache.texte.trim().length === 0) {
      tache.texte = this.beforeEditCache;
    }
    this.casesRestantes= this.casesQuiRestes();
    tache.editing = false;
  }

  // annuler la modification
  cancelEdit(tache: Tache): void {
    tache.texte = this.beforeEditCache;
    tache.editing = false;
  }

  //supprimer la tache
  deleteTodo(id: number) {
    this.TodoService.deleteTacheById(id).subscribe(
      resp =>{
      window.location.reload();
    }
    );}



  //nombre de tâches restantes
  toDoRest(): number{
    return this.todo.taches.filter((tache: Tache)=> !tache.etat).length;
  }

  //Cocher toutes les tâches de la liste
  listComplete(): boolean {
    return this.todo.taches.filter((tache: Tache)=> tache).length>0;
  }

  //Effacer la to do list

  effacerList(): void {
    //this.todo = [];
  }

  //cocher toutes les cases de la todoList
  cocherAllTodoList(): void {
    for (var i = 0; i < this.todo.taches.length; i++) {
      this.todo.taches[i].etat = this.masterSelected;
    }
    this.cocherAllTodoList();
  }

  casesQuiRestes(): boolean {
    return this.toDoRest() !== 0;
  }

  //barre de filtre des tâches
 /*  todosFilter(): ToDoList[] {
    if(this.filter === 'tous'){
      return this.todo.taches
    }else if (this.filter === 'active'){
      return this.todo.taches.filter((tache: Tache)=> !tache.etat)
    }else if (this.filter === 'complete'){
      return this.todo.taches.filter((tache: Tache)=>tache.etat)
    }
    return this.todo
    } */
  }


