import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../interfaces/todo';

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

  addTache(todo:Todo): Observable<any> {
    console.log(todo);
    return this.http.post(`${this.apiUrl}/taches/add`, todo);
  }
}
