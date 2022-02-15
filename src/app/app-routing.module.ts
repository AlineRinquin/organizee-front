import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAccountComponent } from './pages/page-account/page-account.component';
import { PageAccueilComponent } from './pages/page-accueil/page-accueil.component';
import { PageAddMemberComponent } from './pages/page-add-member/page-add-member.component';
import { PageAgendaComponent } from './pages/page-agenda/page-agenda.component';
import { PageAjoutContactComponent } from './pages/page-ajout-contact/page-ajout-contact.component';
import { PageCreationTeamComponent } from './pages/page-creation-team/page-creation-team.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageDeleteMemberComponent } from './pages/page-delete-member/page-delete-member.component';
import { PageForgotPasswordComponent } from './pages/page-forgot-password/page-forgot-password.component';
import { PageMenuSemaineComponent } from './pages/page-menu-semaine/page-menu-semaine.component';
import { PageModifierContactComponent } from './pages/page-modifier-contact/page-modifier-contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageHumeurComponent} from './pages/page-humeur/page-humeur.component';
import { PageRepertoireComponent } from './pages/page-repertoire/page-repertoire.component';
import { PageResetPasswordComponent } from './pages/page-reset-password/page-reset-password.component';
import { PageSignupComponent } from './pages/page-signup/page-signup.component';
import { PageToDoListComponent } from './pages/page-to-do-list/page-to-do-list.component';
import { PageUpdateMemberComponent } from './pages/page-update-member/page-update-member.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'modifier-contact/:id', component: PageModifierContactComponent },
  { path: 'compte', component: PageAccountComponent },
  { path: 'accueil', component: PageAccueilComponent },
  { path: 'ajout-membre', component: PageAddMemberComponent },
  { path: 'agenda', component: PageAgendaComponent },
  { path: 'tableau-de-bord', component: PageDashboardComponent },
  { path: 'supprimer-membre', component: PageDeleteMemberComponent },
  { path: 'password-oublie', component: PageForgotPasswordComponent },
  { path: 'menu', component: PageMenuSemaineComponent },
  { path: 'repertoire', component: PageRepertoireComponent },
  { path: 'reinitialisation-password', component: PageResetPasswordComponent },
  { path: 'creation-compte', component: PageSignupComponent },
  { path: 'to-do-list', component: PageToDoListComponent },
  { path: 'modifier-membre', component: PageUpdateMemberComponent },
  { path: 'ajouter-contact', component: PageAjoutContactComponent },
  { path: 'creation-team', component: PageCreationTeamComponent },
  { path: 'humeur', component: PageHumeurComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
