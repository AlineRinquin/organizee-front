import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageAccueilComponent } from './pages/page-accueil/page-accueil.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageAgendaComponent } from './pages/page-agenda/page-agenda.component';
import { PageToDoListComponent } from './pages/page-to-do-list/page-to-do-list.component';
import { PageRepertoireComponent } from './pages/page-repertoire/page-repertoire.component';
import { PageMenuSemaineComponent } from './pages/page-menu-semaine/page-menu-semaine.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { PageAccountComponent } from './pages/page-account/page-account.component';
import { PageSignupComponent } from './pages/page-signup/page-signup.component';
import { PageForgotPasswordComponent } from './pages/page-forgot-password/page-forgot-password.component';
import { PageResetPasswordComponent } from './pages/page-reset-password/page-reset-password.component';
import { PageAddMemberComponent } from './pages/page-add-member/page-add-member.component';
import { PageDeleteMemberComponent } from './pages/page-delete-member/page-delete-member.component';
import { PageUpdateMemberComponent } from './pages/page-update-member/page-update-member.component';
import { SigninComponent } from './components/signin/signin.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { MeteoComponent } from './components/meteo/meteo.component';
import { CalendrierComponent } from './components/calendrier/calendrier.component';
import { CardMemberComponent } from './components/card-member/card-member.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { TacheComponent } from './components/tache/tache.component';
import { CardMenuComponent } from './components/card-menu/card-menu.component';
import { FicheContactComponent } from './components/fiche-contact/fiche-contact.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CreneauComponent } from './components/creneau/creneau.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageAjoutContactComponent } from './pages/page-ajout-contact/page-ajout-contact.component';
import { PageModifierContactComponent } from './pages/page-modifier-contact/page-modifier-contact.component';
import { PageCreationTeamComponent } from './pages/page-creation-team/page-creation-team.component';
import { AutofocusFixModule  } from 'ngx-autofocus-fix';
import { PageHumeurComponent } from './pages/page-humeur/page-humeur.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageDeleteAccountComponent } from './pages/page-delete-account/page-delete-account.component';
import { PageUpdateAccountComponent } from './pages/page-update-account/page-update-account.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    PageAccueilComponent,
    PageNotFoundComponent,
    PageAgendaComponent,
    PageMenuSemaineComponent,
    PageToDoListComponent,
    PageRepertoireComponent,
    PageAccountComponent,
    PageSignupComponent,
    PageForgotPasswordComponent,
    PageResetPasswordComponent,
    PageAddMemberComponent,
    PageDeleteMemberComponent,
    PageUpdateMemberComponent,
    SigninComponent,
    PageDashboardComponent,
    MeteoComponent,
    PageHumeurComponent,
    CalendrierComponent,
    CardMemberComponent,
    ToDoListComponent,
    TacheComponent,
    CardMenuComponent,
    FicheContactComponent,
    PaginationComponent,
    CreneauComponent,
    PageAjoutContactComponent,
    PageModifierContactComponent,
    PageCreationTeamComponent,
    PageHumeurComponent,
    FooterComponent,
    PageDeleteAccountComponent,
    PageUpdateAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AutofocusFixModule.forRoot(),
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
