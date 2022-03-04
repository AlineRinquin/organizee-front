import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MembreService } from 'src/app/services/membre.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-page-delete-member',
  templateUrl: './page-delete-member.component.html',
  styleUrls: ['./page-delete-member.component.scss']
})
export class PageDeleteMemberComponent implements OnInit {
  @Output() clickDelete = new EventEmitter();
  parent: boolean;

  constructor(private tokenService: TokenService, private membreService: MembreService) {
    this.parent = false;
  }

  ngOnInit(): void {
  }


}
