import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-member',
  templateUrl: './card-member.component.html',
  styleUrls: ['./card-member.component.scss']
})
export class CardMemberComponent implements OnInit {
  @Input() membre: any;

  constructor() { }

  ngOnInit(): void {
  }


}
