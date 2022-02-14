import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  @Input() todo : any;
  public beforeEditCache: string;
  public todos: Todo[];
  public todoTitle: string;
  public idTodo: number;
  public filter : string;
  public casesRestantes : boolean;
  public masterSelected: boolean;
  public result : any;

  constructor(private TodoService : TodoService, private router: Router ) {
    this.beforeEditCache = '';
    this.todos = [];
    this.todoTitle = '';
    this.idTodo = 0;
    this.filter ='';
    this.casesRestantes=true;
    this.masterSelected= false;

  }

  ngOnInit(): void {
    //this.refreshTodo();
    this.beforeEditCache = '';
    this.casesRestantes=true;
    this.filter='tous';
    this.idTodo = 4;
    this.todoTitle = '';
    this.todos = [
      {
        id: 1,
        title: 'Finish Angular Screencast',
        completed: false,
        editing: false,
      },
      {
        id: 2,
        title: 'Take over world',
        completed: false,
        editing: false,
      },
      {
        id: 3,
        title: 'One more thing',
        completed: false,
        editing: false,
      },
    ];
  }
  //ajouter tache
  addTache(): void {
    this.TodoService.addTache(todo).subscribe((resp)=>{
      this.router.navigate(['to-do-list'])
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
  modifier(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  // modifier l'apparence focus
  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }
    this.casesRestantes= this.casesQuiRestes();
    todo.editing = false;
  }

  // annuler la modification
  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
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
    return this.todos.filter(todo=> !todo.completed).length;
  }

  //Cocher toutes les tâches de la liste
  listComplete(): boolean {
    return this.todos.filter(todo=> todo.completed).length>0;
  }

  //Effacer la to do list

  effacerList(): void {
    this.todos = [];
  }

  //cocher toutes les cases de la todoList
  cocherAllTodoList(): void {
    for (var i = 0; i < this.todos.length; i++) {
      this.todos[i].completed = this.masterSelected;
    }
    this.cocherAllTodoList();
  }

  casesQuiRestes(): boolean {
    return this.toDoRest() !== 0;
  }

  //barre de filtre des tâches
  todosFilter(): Todo[] {
    if(this.filter === 'tous'){
      return this.todos
    }else if (this.filter === 'active'){
      return this.todos.filter(todo=> !todo.completed)
    }else if (this.filter === 'complete'){
      return this.todos.filter(todo=>todo.completed)
    }
    return this.todos
    }
  }


