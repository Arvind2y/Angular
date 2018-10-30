import { NgModule } from "@angular/core";
import { EventsComponent } from "./events/events.component";
import { Routes, RouterModule } from '@angular/router';
import { SpecialEventsComponent } from "./special-events/special-events.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from "./auth.guard";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
    // { path: '', redirectTo: '/events', pathMatch: 'prefix' }, // 
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: 'events', component: EventsComponent },
    { path: 'special', component: SpecialEventsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: "**", component : PageNotFoundComponent}, // if requested page is not valid one

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }