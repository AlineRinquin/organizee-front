import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-avatar',
  templateUrl: './card-avatar.component.html',
  styleUrls: ['./card-avatar.component.scss']
})
export class CardAvatarComponent implements OnInit {
  @Input() membre: any;

  constructor() { }

  ngOnInit(): void {
  }


}
