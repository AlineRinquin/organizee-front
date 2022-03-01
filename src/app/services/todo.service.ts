import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tache } from '../models/tache';
import { ToDoList } from '../models/to-do-list';
import { TodoList } from '../todo-list';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private toDoList: any;
  private apiUrl: string;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.apiUrl = environment.apiUrl;
  }

  getToDoListByTeamId(): Observable<any> | void {
    const teamId = this.tokenService.getCurrentTeamId();
    return this.http.get(`${this.apiUrl}/todolist/team/${teamId}`);
  }

  deleteTacheById(idTache: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/taches/delete/${idTache}`, {
      responseType: 'text',
    });
  }

  addTache(newtache: Tache, idTodoList: number): Observable<any> {
    // console.log(newtache);
    return this.http.post(`${this.apiUrl}/taches/add/${idTodoList}`, newtache);
  }

  updateTache(tache: Tache): Observable<any> {
    console.log(tache);
    return this.http.put(`${this.apiUrl}/taches/update/1`, tache);
  }
  addTodoByTeamId(newtodoList: TodoList): Observable<any> {
    const teamId = this.tokenService.getCurrentTeamId();
    console.log(newtodoList + 'newtodoList');
    return this.http.post(`${this.apiUrl}/todolist/add/${teamId}`, newtodoList);
  }

  deleteTodoById(idTodo: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/todolist/delete/${idTodo}`, {
      responseType: 'text',
    });
  }
  updateTodo(todoList: TodoList): Observable<any> {
    console.log(todoList);
    return this.http.put(`${this.apiUrl}/todolist/update/666`, todoList);
  }
}
