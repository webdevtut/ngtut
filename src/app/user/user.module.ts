import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Routes,RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/shared/auth.guard';


import { UserComponent } from './user.component';
import { UserService } from './shared/user.service';
import { UserDetailComponent } from './user-detail/user-detail.component';


const routes: Routes = [
  { path: 'users',
  component: UserComponent,
  children: [
    { path: 'profile', canActivate: [AuthGuard], component: UserDetailComponent }

  ]
 }
]

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)

  ],
  declarations:[
    UserComponent,
    UserDetailComponent
  ],
  providers:[
    UserService
  ]
})

export class UserModule {}
