import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() backgroundColor!: string;
  //@Input() backgroundColor = '#c3c3e7';

  constructor() {}


  ngOnInit(): void {
    
  }

}
