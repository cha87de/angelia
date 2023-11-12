import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { autheliaGuard } from './authelia.guard';

const routes: Routes = [{
    path: 'login',
    component: LoginComponent,
    canActivate: []
  },
  {
    path: '', pathMatch: 'full',
    component: ProfileComponent,
    canActivate: [autheliaGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
