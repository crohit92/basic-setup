import { Routes } from '@angular/router';
import { environment } from 'src/environment/environment.dev';
import { LandingComponent } from './landing/landing.component';
import { LoginSuccessComponent } from './login-success/login-success.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: environment.AUTH_SERVER_REDIRECT_ROUTE_PATH,
    component: LoginSuccessComponent,
  },
  {
    path: '**',
    component: LandingComponent,
  },
];
