import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ChangePasswordFormComponent,
  CreateAccountFormComponent,
  LoginFormComponent,
  ResetPasswordFormComponent
} from './shared/components';
import {AuthGuardService} from './shared/services';
import {HomeComponent} from './pages/home/home.component';
import {BookedInfoComponent} from './pages/booked-info/booked-info.component';
import {TasksComponent} from './pages/tasks/tasks.component';
import {DevExtremeModule} from 'devextreme-angular';
import {EmployeeComponent} from "./pages/employee/employee.component";
import {CommonModule} from "@angular/common";
import {EmployeeEditComponent} from "./pages/employee/edit/employee-edit.component";
import {MovieComponent} from "./pages/movie/movie.component";
import {ReservationComponent} from "./pages/reservation/reservation.component";
import {FlexLayoutModule} from "@angular/flex-layout";

const routes: Routes = [
  {
    path: 'movie',
    component: MovieComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reservation',
    component: ReservationComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reservation/:movieId',
    component: ReservationComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'bookedInfo',
    component: BookedInfoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), DevExtremeModule, CommonModule,
    FlexLayoutModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    BookedInfoComponent,
    TasksComponent,
    EmployeeComponent,
    EmployeeEditComponent,
    MovieComponent,
    ReservationComponent
  ]
})
export class AppRoutingModule { }
