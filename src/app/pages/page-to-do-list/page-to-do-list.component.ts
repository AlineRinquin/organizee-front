import { Component, OnInit } from '@angular/core';
import { ToDoList } from 'src/app/models/to-do-list';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-page-to-do-list',
  templateUrl: './page-to-do-list.component.html',
  styleUrls: ['./page-to-do-list.component.scss'],
})
export class PageToDoListComponent implements OnInit {
  public result: any;
  public listTodos: any[];
  public todoListTitle: string;
  public idTodo: number;

  constructor(private TodoService: TodoService) {
    this.listTodos = [];
    this.todoListTitle = '';
    this.idTodo = 0;
  }

  ngOnInit(): void {
    //récupère les todoLists existantes en fonctoin de l'id de la team en utilisant le service
    this.TodoService.getToDoListByTeamId()?.subscribe((listTodos: any) => {
      console.log(listTodos);
      this.listTodos = listTodos;
      this.todoListTitle = '';
      this.idTodo = 0;
    });
  }

  //Ajouter une todo List si l'input contient un texte
  addTodoByTeamId() {
    const todoList: ToDoList = {
      nom: this.todoListTitle,
      taches: [],
      id: 0,
    };
    if (this.todoListTitle != '') {
      this.TodoService.addTodoByTeamId(todoList)?.subscribe((resp) => {
        console.log(todoList);
        window.location.reload(); //rafraîchit l'aperçu
      });
    } else {
      window.alert('Il faut saisir du texte'); // sinon msg d'erreur
    }
  }
}
