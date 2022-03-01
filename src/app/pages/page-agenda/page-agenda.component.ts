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
  debug: boolean;
  userId : any;
  teamId : any;
  role:any;
  isShow: boolean;
  alert:any;

  @ViewChild("navigator") navigator!: DayPilotNavigatorComponent;
  @ViewChild("calendar") calendar!: DayPilotCalendarComponent;

  constructor(private evenementService:EvenementService) {
    this.isShow = false;
    this.alert = "";
    this.debug = environment.debug;
  }

  get date(): DayPilot.Date {
    return this.config.startDate as DayPilot.Date;
  }

  set date(value: DayPilot.Date) {
    this.config.startDate = value;
  }

  navigatorConfig: DayPilot.NavigatorConfig = {
    showMonths: 1,
    skipMonths: 1,
    locale: "fr-fr",
    selectMode: "Week",
    cellWidth: 30,
    cellHeight: 30,
    dayHeaderHeight: 30,
    titleHeight: 30
  };

  events: DayPilot.EventData[] = [];

  onClickCloseAlert(){
    console.log('fermeture');
    this.isShow = ! this.isShow;
  }

  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    const token = localStorage.getItem(environment.tokenKey);
    if(token) {
      const decodedToken = jwt_decode<any>(token);
      this.userId = decodedToken.userId;
      this.teamId = decodedToken.teamId;
      this.role = decodedToken.auth[0].authority;
    }else{
      //
    }
  }

  // petite triche pour eviter la repetition du nom dans le RDV
  rdvSplit(rdv:any){
    let titleRDV = rdv.split('\r');
    console.log(titleRDV[0]);
    return titleRDV[0];
  }

  config: DayPilot.CalendarConfig = {
    startDate: DayPilot.Date.today(),
    locale: "fr-fr",
    viewType: "Week",
    //heightSpec: "Parent100Pct",
    cellHeight: 30,
    headerHeight: 30,
    hourWidth: 60,
    onEventMoved: (args) => {
      console.log("Event moved:"+args.e.id()+" - "+args.e.text()+" - "+args.e.end()+" - "+args.e.start()+' - '+args.e.data.tags.membre);
      let event = {
        start: args.e.start(),
        end: args.e.end(),
        id: args.e.id(),
        barColor: "#555555",
        text: this.rdvSplit(args.e.text()),
        membre: {id:args.e.data.tags.membre},
        team: {id:this.teamId}
      }
      if( (args.e.data.tags.membre == this.userId) || (this.role == 'ROLE_PARENT')){ // mettre role parent en variable
        this.evenementService.updateEvenements(event).subscribe(
          {
            next: result => {
              this.viewChange();
              this.alert={"type":"success", "content":"L'évènement à bien été modifié"};
              this.isShow = true;
            },
            error: err => {
              this.viewChange();
              this.alert={"type":"danger", "content":"Problème lors de la modification de l'évenment"};
              this.isShow = true;
            },
            complete: () => console.log('DONE!')
          }
        );  
      }else{
        this.viewChange();
        this.alert={"type":"danger", "content":"Vous ne pouvez pas modifié cet évènement !"};
        this.isShow = true;  
      }

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
          this.alert={"type":"success", "content":"L'évènement à été correctement ajouté au calendrier"};
          this.isShow = true;
        },
        error: err => {
          this.viewChange();
          this.alert={"type":"danger", "content":"Problème lors de l'ajout de l'évenment"};
          this.isShow = true;
        },
        complete: () => console.log('DONE!')
      });
    },
    eventDeleteHandling: "Update",
    onEventDeleted: (args) => {
      console.log("Event deleted: " + args.e.id());
      if( (args.e.data.tags.membre == this.userId) || (this.role == 'ROLE_PARENT')){ // mettre role parent en variable
        this.evenementService.deleteEvenements(Number(args.e.id())).subscribe({
          next: result => {
            this.viewChange();
            this.alert={"type":"success", "content":"L'évènement à été correctement supprimé du calendrier"};
            this.isShow = true;
          },
          error: err => {
            this.viewChange();
            this.alert={"type":"danger", "content":"Problème lors de la suppression de l'évenment"};
            this.isShow = true;
          },
          complete: () => console.log('DONE!')
        })
      }else{
        this.viewChange();
        this.alert={"type":"danger", "content":"Vous ne pouvez pas suprimé cet évènement !"};
        this.isShow = true;  
      }
    },
    eventResizeHandling: "Update",
    onEventResized: (args) => {
      console.log("Event resized: " + args.e.id());
      let event = {
        start: args.e.start(),
        end: args.e.end(),
        id: args.e.id(),
        barColor: "#555555",
        text: this.rdvSplit(args.e.text()),
        membre: {id:args.e.data.tags.membre},
        team: {id:this.teamId}
      }
      if( (args.e.data.tags.membre == this.userId) || (this.role == 'ROLE_PARENT')){ // mettre role parent en variable
        this.evenementService.updateEvenements(event).subscribe(
          {
            next: result => {
              this.viewChange();
              this.alert={"type":"success", "content":"L'évènement à bien été déplacé"};
              this.isShow = true;
            },
            error: err => {
              this.viewChange();
              this.alert={"type":"danger", "content":"Problème lors de la modification de l'évenement"};
              this.isShow = true;
            },
            complete: () => console.log('DONE!')
          }
        );
      }else{
        this.viewChange();
        this.alert={"type":"danger", "content":"Vous ne pouvez pas déplacé cet évènement !"};
        this.isShow = true;  
      }
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
