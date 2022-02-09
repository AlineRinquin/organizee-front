import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  private toDoList: any;
  private apiUrl: string;


  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  //consulter toDoList
  getToDoList(){
    this.toDoList = this.http.get(`${this.apiUrl}/todolist/team/{team_id}`);
    return this.toDoList;
    console.log(this.toDoList)
}

//ajouter une tache
  addTitle(title:string){
    this.toDoList.push({
      title:title,
      isChecked: false
    });
  }
// cocher et décocher la checkbox
  checkOrUnCheckTitle($key: string,flag: boolean){
    this.toDoList.update($key,{isChecked:flag});
  }

//supprimer la tache
removeTitle($key : string){
  this.toDoList.remove($key);
}



}
