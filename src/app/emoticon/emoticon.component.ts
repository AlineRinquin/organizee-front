import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emoticon',
  templateUrl: './emoticon.component.html',
  styleUrls: ['./emoticon.component.scss']
})
export class EmoticonComponent implements OnInit {

     //declaration du tableau
     tabHumeur= [
      { title : "Je pleure", lien : "../../../assets/images/emoticon-pleurer.png"},
      { title : "Je suis en colère", lien : "../../../assets/images/emoticon-insulter.png"},
      { title : "Je suis malade", lien : "../../../assets/images/emoticon-vomir.png"}
    ]


  constructor() { }

  ngOnInit(): void {


console.log("tab humeurs ==>", this.tabHumeur)
  }

}
