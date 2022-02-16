import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tache } from '../models/tache';
import { ToDoList } from '../models/to-do-list';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private toDoList: any;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getToDoListByTeamId(): Observable<any> {
    return this.http.get(`${this.apiUrl}/todolist/team/1`);
  }

  deleteTacheById(idTache: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/taches/delete/${idTache}`,{responseType:'text'});
  }

  addTache(newtache: Tache,idTodoList:number): Observable<any> {
    console.log(newtache);
    return this.http.post(`${this.apiUrl}/taches/add/${idTodoList}`, newtache);
  }
}
