import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DayPilot, DayPilotCalendarComponent, DayPilotNavigatorComponent } from "@daypilot/daypilot-lite-angular";
import { EvenementService } from 'src/app/services/evenement.service';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-page-agenda',
  templateUrl: './page-agenda.component.html',
  styleUrls: ['./page-agenda.component.scss']
})
export class PageAgendaComponent implements AfterViewInit {

  userId : any;
  teamId : any;
  alert:any;

  @ViewChild("navigator") navigator!: DayPilotNavigatorComponent;
  @ViewChild("calendar") calendar!: DayPilotCalendarComponent;

  constructor(private evenementService:EvenementService) {
    this.alert = "";
  }

  get date(): DayPilot.Date {
    return this.config.startDate as DayPilot.Date;
  }

  set date(value: DayPilot.Date) {
    this.config.startDate = value;
  }

  navigatorConfig: DayPilot.NavigatorConfig = {
    showMonths: 2,
    skipMonths: 2,
    locale: "fr-fr",
    selectMode: "Week",
    cellWidth: 30,
    cellHeight: 30,
    dayHeaderHeight: 30,
    titleHeight: 30
  };

  events: DayPilot.EventData[] = [];

  closeAlert(value:any){
    //console.log('fermeture'+value);
    this.alert="";
  }

  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    const token = localStorage.getItem(environment.tokenKey);
    if(token) {
      const decodedToken = jwt_decode<any>(token);
      this.userId = decodedToken.userId;
      this.teamId = decodedToken.teamId;
    }else{
      //
    }
  }
  
  config: DayPilot.CalendarConfig = {
    startDate: DayPilot.Date.today(),
    locale: "fr-fr",
    viewType: "Week",
    //heightSpec: "Parent100Pct",
    cellHeight: 30,
    headerHeight: 30,
    hourWidth: 60,
    onEventMoved: args => {
      console.log("Event moved:"+args.e.id()+" - "+args.e.text()+" - "+args.e.end()+" - "+args.e.start());
      let event = {
        start: args.e.start(),
        end: args.e.end(),
        id: args.e.id(),
        barColor: "#555555",
        text: args.e.text(),
        membre: {id:this.userId},
        team: {id:this.teamId}
      }      
      this.evenementService.updateEvenements(event).subscribe(
        {
          next: result => {
            this.viewChange();
            this.alert={"type":"success", "content":"L'évènement à bien été modifié"};
          },
          error: err => {
            this.viewChange();
            this.alert={"type":"danger", "content":"Problème lors de la modification de l'évenment"};
          },
          complete: () => console.log('DONE!')
        }
      );
    },
    onTimeRangeSelected: async (args) => {
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Nouveau RDV");
      const dp = args.control;
      dp.clearSelection();
      if (!modal.result) { return; }
      let event = {
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        barColor: "#555555",
        text: modal.result
      }
      dp.events.add(event);
      Object.assign(event, {id: ""});
      Object.assign(event, {membre: {id:this.userId}});
      Object.assign(event, {team: {id:this.teamId}});
      console.log("Event added: " + event);
      // let data = dp.events;
      // Object.keys(data).map(function(key, index) {
      //   data[key] = {
      //     barColor:data[key].membre.couleur,
      //     //backColor:data[key].membre.couleur,
      //     "id": data[key].id,
      //     "start": data[key].start,
      //     "end": data[key].end,
      //     "text": data[key].text
      //   };
      // });
      this.evenementService.addEvenements(event).subscribe({
        next: result => {
          this.viewChange();
          this.alert={"type":"success", "content":"L'évènement à correctement été  ajouté au calendrier"};
        },
        error: err => {
          this.viewChange();
          this.alert={"type":"danger", "content":"Problème lors de l'ajout de l'évenment"};
        },
        complete: () => console.log('DONE!')
      });
    },
    eventDeleteHandling: "Update",
    onEventDeleted: (args) => {
      console.log("Event deleted: " + args.e.id());
      this.evenementService.deleteEvenements(Number(args.e.id())).subscribe({
        next: result => {
          this.viewChange();
          this.alert={"type":"success", "content":"L'évènement à correctement été supprimé du calendrier"};
        },
        error: err => {
          this.viewChange();
          this.alert={"type":"danger", "content":"Problème lors de la suppression de l'évenment"};
        },
        complete: () => console.log('DONE!')
      })
    },
    eventResizeHandling: "Update",
    onEventResized: (args) => {
      console.log("Event resized: " + args.e.id());
      let event = {
        start: args.e.start(),
        end: args.e.end(),
        id: args.e.id(),
        barColor: "#555555",
        text: args.e.text(),
        membre: {id:this.userId},
        team: {id:this.teamId}
      }      
      this.evenementService.updateEvenements(event).subscribe(
        {
          next: result => {
            this.viewChange();
            this.alert={"type":"success", "content":"L'évènement à bien été modifié"};
          },
          error: err => {
            this.viewChange();
            this.alert={"type":"danger", "content":"Problème lors de la modification de l'évenment"};
          },
          complete: () => console.log('DONE!')
        }
      );
    }
  }

  adjust(color:string, amount:number) {
    return '#' + color.replace(/^#/, '').replace(/../g, color =>
      ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  viewChange(): void {
    var from = this.calendar.control.visibleStart();
    var to = this.calendar.control.visibleEnd();

    console.log("viewChange(): " + from + " " + to);

    // this.ds.getEvents(from, to).subscribe(result => {
       //this.events = this.evenements;
       this.evenementService.getEvenementsByIdTeam(this.teamId).subscribe((data: any) => {
        // this.events = [{
        //       "id": data[0].id,
        //       "start": data[0].eventDebut,
        //       "end": data[0].eventFin,
        //       "text": data[0].libelle,
        //       barColor: data[0].membre.couleur,
        //       //cssClass: "toto"
        //     }];
        Object.keys(data).map((key, index) => {
          data[key] = {
            barColor:data[key].membre.couleur,
            backColor: this.adjust(data[key].membre.couleur, 90),
            "id": data[key].id,
            "start": data[key].start,
            "end": data[key].end,
            "text": data[key].text
          };
        });
        this.events = data;
        console.log(data);
        console.log(this.events);
      });
    // });
  }

  navigatePrevious(event: MouseEvent): void {
    event.preventDefault();
    this.config.startDate = (this.config.startDate as DayPilot.Date).addDays(-7);
  }

  navigateNext(event: MouseEvent): void {
    event.preventDefault();
    this.config.startDate = (this.config.startDate as DayPilot.Date).addDays(7);
  }

  navigateToday(event: MouseEvent): void {
    event.preventDefault();
    this.config.startDate = DayPilot.Date.today();
  }
}
