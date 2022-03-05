import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DayPilot, DayPilotCalendarComponent, DayPilotNavigatorComponent } from "@daypilot/daypilot-lite-angular";
import { EvenementService } from 'src/app/services/evenement.service';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/services/token.service';

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

  constructor(private evenementService:EvenementService, private tokenService: TokenService) {
    this.isShow = false;
    this.alert = "";
    this.debug = environment.debug; // Pour afficher ou pas les infos du token
  }

  get date(): DayPilot.Date {
    return this.config.startDate as DayPilot.Date;
  }

  set date(value: DayPilot.Date) {
    this.config.startDate = value;
  }

  // config pour les option d'affichage du mini calendrier de navigation
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

  // intialisation de events, pour accueillir les evenements
  events: DayPilot.EventData[] = [];

  // methode pour fermer l'alert de message
  onClickCloseAlert(){
    this.isShow = ! this.isShow;
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.userId = this.tokenService.getCurrentMembreId();
    this.teamId = this.tokenService.getCurrentTeamId();
    this.role = this.tokenService.getRole();
  }

  // petite triche pour eviter la repetition du nom dans le RDV
  // on split sur un retour chariot pour ne conserver que la premiere partie
  // qui est le titre de l'evenement
  rdvSplit(rdv:any){
    let titleRDV = rdv.split('\r');
    console.log(titleRDV[0]);
    return titleRDV[0];
  }

  // config des options du calendrier
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
              this.alert={"type":"success", "content":"L'évènement a bien été modifié"};
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
        this.alert={"type":"danger", "content":"Vous ne pouvez pas modifier cet évènement !"};
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
      //console.log("Event added: " + event);
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

  // petite fonction pour eclaircir la couleur du membre a l'affichage de son evenement
  adjust(color:string, amount:number) {
    return '#' + color.replace(/^#/, '').replace(/../g, color =>
      ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  viewChange(): void {
    var from = this.calendar.control.visibleStart();
    var to = this.calendar.control.visibleEnd();

    // Récuperation des evenements d'une team
    this.evenementService.getEvenementsByIdTeam(this.teamId).subscribe((data: any) => {
      Object.keys(data).map((key, index) => {
        data[key] = {
          barColor:data[key].membre.couleur,
          backColor: this.adjust(data[key].membre.couleur, 90),
          id: data[key].id,
          start: data[key].start,
          end: data[key].end,
          text: data[key].text.toUpperCase()+'\r('+data[key].membre.prenom+')',
          tags : {membre: data[key].membre.id}
        };
      });
      this.events = data;
      console.log(data);
      console.log(this.events);
    });
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
