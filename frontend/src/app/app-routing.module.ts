import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphsComponent } from './graphs/graphs.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { HomeComponent } from './home/home.component';
import { SuccessfullyComponent } from './successfully/successfully.component';
import { AuthGuard } from './auth.guard';
import { UserslistComponent } from './userslist/userslist.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'upload',
    component: UploadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'graphs',
    component: GraphsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'successfully',
    component: SuccessfullyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userslist',
    component: UserslistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
