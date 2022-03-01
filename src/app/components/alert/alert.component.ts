import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() alert:any;
  @Output() eventClose = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  
  onClickCloseAlert(){
    //console.log('fermeture from component');
    this.eventClose.emit('true');
  }
}
