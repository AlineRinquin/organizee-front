import { Component, OnInit } from '@angular/core';
import { DayPilot } from "@daypilot/daypilot-lite-angular";
import { EvenementService } from 'src/app/services/evenement.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {

  constructor(private evenementService:EvenementService, private tokenService: TokenService) { }
  
  get date(): DayPilot.Date {
    return this.config.startDate as DayPilot.Date;
  }

  set date(value: DayPilot.Date) {
    this.config.startDate = value;
  }

  events: DayPilot.EventData[] = [];
  
  config: DayPilot.CalendarConfig = {
    viewType: "Day",
    timeRangeSelectedHandling: "Disabled",
    eventDeleteHandling: "Disabled",
    eventMoveHandling: "Disabled",
    eventResizeHandling: "Disabled",
    eventClickHandling: "Disabled"
  }

  ngOnInit(): void {
    const teamId = this.tokenService.getCurrentTeamId();
    this.evenementService.getEvenementsByIdTeam(teamId).subscribe((data: any) => {
      Object.keys(data).map((key, index) => {
        data[key] = {
          barColor:data[key].membre.couleur,
          backColor: data[key].membre.couleur,
          id: data[key].id,
          start: data[key].start,
          end: data[key].end,
          text: data[key].text.toUpperCase()+'\r('+data[key].membre.prenom+')',
          tags : {
            membre: data[key].membre.id
          }
        };
      });
      this.events = data;
      console.log(data);
      console.log(this.events);
    });

  }

}
