import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes,RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';



const routes: Routes = [
  { path: 'login', component: LoginComponent ,canActivate: [AuthGuard]},
  { path: ':register', component: RegisterComponent, canActivate: [AuthGuard] }

]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
})
export class AuthModule { }
