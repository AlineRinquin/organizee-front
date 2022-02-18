import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';



@Component({
  selector: 'app-page-to-do-list',
  templateUrl: './page-to-do-list.component.html',
  styleUrls: ['./page-to-do-list.component.scss']
})
export class PageToDoListComponent implements OnInit {
  public result : any;

  constructor(private TodoService : TodoService) { }

  ngOnInit(): void {
    this.TodoService.getToDoListByTeamId().subscribe((data :any)=>{

      this.result = data;
      console.log(data);
    });


  }

}
