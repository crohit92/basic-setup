import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { ROUTES } from './app/app-routes';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { interceptAccessToken } from './app/services/interceptors/access-token.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES),
    provideHttpClient(withInterceptors([interceptAccessToken])),
  ],
}).catch((err) => console.error(err));
