import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ArticoliComponent } from './articoli/articoli.component';
import { ErrorComponent } from './error/error.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './services/route-guard.service';
import { NewartComponent } from './newart/newart.component';
import { ruoli } from 'src/models/ruoli';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RegisterComponent } from './register/register.component';
import { IssignedinguardService } from './services/issignedinguard.service';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path : '', component : LoginComponent}, //resta vuoto se non specifico nessun url, utilizza il login component
  {path : 'index', component : LoginComponent, canActivate:[IssignedinguardService]},
  {path : 'login', component : LoginComponent, canActivate:[IssignedinguardService]},
  {path : 'dashboard/:username', component : DashboardComponent, canActivate:[RouteGuardService]},
  {path : 'register', component : RegisterComponent},
  {path : 'welcome/:username', component : WelcomeComponent, canActivate:[RouteGuardService], data : {roles : [ruoli.utente] }},
  {path : 'articoli', component : ArticoliComponent, canActivate:[RouteGuardService], data : {roles : [ruoli.utente] }},
  {path : 'articoli/:filter', component : ArticoliComponent, canActivate:[RouteGuardService], data : {roles : [ruoli.utente] }},
  {path : 'newart/:codArt', component : NewartComponent, canActivate:[RouteGuardService], data : {roles : [ruoli.amministratore] }},
  {path : 'logout', component : LogoutComponent},
  {path : 'forbidden', component : ForbiddenComponent},
  {path : '**', component : ErrorComponent} //con i doppi asterischi si specifica il path laddove non esiste nessun componente
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
