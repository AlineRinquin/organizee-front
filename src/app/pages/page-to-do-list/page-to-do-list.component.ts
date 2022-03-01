import { Component, OnInit } from '@angular/core';
import { ToDoList } from 'src/app/models/to-do-list';
import { TodoService } from 'src/app/services/todo.service';
import { Team } from 'src/app/models/team';

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
    this.TodoService.getToDoListByTeamId()?.subscribe((listTodos: any) => {
      console.log(listTodos);
      this.listTodos = listTodos;
      this.todoListTitle = '';
      this.idTodo = 0;
    });
  }
  //Ajouter une todo List
  addTodoByTeamId() {
    const todoList: ToDoList = {
      nom: this.todoListTitle,
      taches: [],
      id: 0,
    };
    this.TodoService.addTodoByTeamId(todoList)?.subscribe((resp) => {
      console.log(todoList);
      window.location.reload();
    });
  }

  deleteTodo(id: number): void {
    window.alert('La to-do-List a bien été supprimé!');
    this.TodoService.deleteTodoById(id).subscribe((resp) => {
      window.location.reload();
    });
  }
}
