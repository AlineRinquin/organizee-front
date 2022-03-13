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

  //recupère les todolistexistantes en BDD par le tokenService en fonction de l'iD de la team
  getToDoListByTeamId(): Observable<any> | void {
    const teamId = this.tokenService.getCurrentTeamId();
    return this.http.get(`${this.apiUrl}/todolist/team/${teamId}`);
  }

  //supprime les taches par l'id dela tache dans la todoList
  deleteTacheById(idTache: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/taches/delete/${idTache}`, {
      responseType: 'text',
    });
  }

  //ajoute une tache avec auto-incrémentation de l'id dans la todolist
  addTache(newtache: Tache, idTodoList: number): Observable<any> {
    // console.log(newtache);
    return this.http.post(`${this.apiUrl}/taches/add/${idTodoList}`, newtache);
  }

  // modifie une tâche par son id
  updateTache(tache: Tache): Observable<any> {
    // console.log(tache);
    return this.http.put(`${this.apiUrl}/taches/update/1`, tache);
  }

  //ajoute une todoList sur une team (par son id) via le token
  addTodoByTeamId(newtodoList: TodoList): Observable<any> {
    const teamId = this.tokenService.getCurrentTeamId();
    console.log(newtodoList);
    return this.http.post(`${this.apiUrl}/ad/todolistd/${teamId}`, newtodoList);
  }

  //suprime une todoList en fonction de son id
  deleteTodoById(idTodo: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/todolist/delete/${idTodo}`, {
      responseType: 'text',
    });
  }

  //modfie une todoList par son id
  updateTodo(todoList: TodoList): Observable<any> {
    console.log(todoList);
    return this.http.put(`${this.apiUrl}/todolist/update/666`, todoList);
  }
}
