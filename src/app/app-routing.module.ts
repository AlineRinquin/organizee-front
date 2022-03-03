import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAccountComponent } from './pages/page-account/page-account.component';
import { PageAccueilComponent } from './pages/page-accueil/page-accueil.component';
import { PageAddMemberComponent } from './pages/page-add-member/page-add-member.component';
import { PageAgendaComponent } from './pages/page-agenda/page-agenda.component';
import { PageAjoutContactComponent } from './pages/page-ajout-contact/page-ajout-contact.component';
import { PageCreationTeamComponent } from './pages/page-creation-team/page-creation-team.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageDeleteAccountComponent } from './pages/page-delete-account/page-delete-account.component';
import { PageDeleteMemberComponent } from './pages/page-delete-member/page-delete-member.component';
import { PageForgotPasswordComponent } from './pages/page-forgot-password/page-forgot-password.component';
import { PageMenuSemaineComponent } from './pages/page-menu-semaine/page-menu-semaine.component';
import { PageModifierContactComponent } from './pages/page-modifier-contact/page-modifier-contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageRepertoireComponent } from './pages/page-repertoire/page-repertoire.component';
import { PageResetPasswordComponent } from './pages/page-reset-password/page-reset-password.component';
import { PageSignupComponent } from './pages/page-signup/page-signup.component';
import { PageToDoListComponent } from './pages/page-to-do-list/page-to-do-list.component';
import { PageUpdateAccountComponent } from './pages/page-update-account/page-update-account.component';
import { PageUpdateMemberComponent } from './pages/page-update-member/page-update-member.component';
import { PageSupportComponent } from './pages/page-support/page-support.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'modifier-contact/:id', canActivate: [AuthGuard], component: PageModifierContactComponent },
  { path: 'compte', canActivate: [AuthGuard], component: PageAccountComponent },
  { path: 'accueil', component: PageAccueilComponent },
  { path: 'ajout-membre', canActivate: [AuthGuard], component: PageAddMemberComponent },
  { path: 'agenda', canActivate: [AuthGuard], component: PageAgendaComponent },
  { path: 'tableau-de-bord', canActivate: [AuthGuard], component: PageDashboardComponent },
  { path: 'supprimer-membre', canActivate: [AuthGuard], component: PageDeleteMemberComponent },
  { path: 'supprimer-compte', canActivate: [AuthGuard], component: PageDeleteAccountComponent },
  { path: 'password-oublie', component: PageForgotPasswordComponent },
  { path: 'menu', canActivate: [AuthGuard], component: PageMenuSemaineComponent },
  { path: 'repertoire', canActivate: [AuthGuard], component: PageRepertoireComponent },
  { path: 'reinitialisation-password/:uuid', component: PageResetPasswordComponent },
  { path: 'creation-compte', component: PageSignupComponent },
  { path: 'page-support', component: PageSupportComponent},
  { path: 'to-do-list', canActivate: [AuthGuard], component: PageToDoListComponent },
  { path: 'modifier-membre/:id', canActivate: [AuthGuard], component: PageUpdateMemberComponent },
  { path: 'modifier-compte', canActivate: [AuthGuard], component: PageUpdateAccountComponent },
  { path: 'ajouter-contact', canActivate: [AuthGuard], component: PageAjoutContactComponent },
  { path: 'creation-team', canActivate: [AuthGuard], component: PageCreationTeamComponent },
  { path: 'footer', component: FooterComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
