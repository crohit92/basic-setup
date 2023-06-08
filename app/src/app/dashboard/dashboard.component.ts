import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment.dev';
import { Observable } from 'rxjs';
interface Forecast {
  date: string;
  summary: string;
  temperatureC: number;
  temperatureF: number;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  forecasts$?: Observable<Forecast[]>;
  httpClient = inject(HttpClient);
  loadForecasts() {
    this.forecasts$ = this.httpClient.get<Forecast[]>(
      environment.API_DOMAIN + 'weatherforecast'
    );
  }
}
