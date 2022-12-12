import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
      path: 'register',
      component: RegisterComponent 
  },
  {
      path: 'login',
      component: LoginComponent
  },
  // {
  //     path: 'profile',
  //     // canActivate: [AuthGuard],
  //     component: ProfileComponent
  // }
];

export const AuthRoutingModule = RouterModule.forChild(routes);