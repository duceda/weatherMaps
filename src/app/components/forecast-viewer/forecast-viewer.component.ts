import { Component, Input, OnInit } from '@angular/core';
import { IForecast, IForecastCity } from 'src/app/interfaces/interfaces';
import { ForecastViewerService } from 'src/app/services/forecast-viewer.service';
import { ENDPOINTS } from 'src/assets/config/endpoints';

@Component({
  selector: 'app-forecast-viewer',
  templateUrl: './forecast-viewer.component.html',
  styleUrls: ['./forecast-viewer.component.scss']
})
export class ForecastViewerComponent implements OnInit {
  @Input() forecast: IForecast;
  forecastsByDay: Array<any>;
  city: IForecastCity;
  iconBaseUrl: string = `${ENDPOINTS.API_WEATHER.icons_base_url}`;
  iconPrefixUrl: string = `${ENDPOINTS.API_WEATHER.icons_prefix_url}`;

  constructor(private _forecastViewerSrv: ForecastViewerService) {}

  ngOnInit(): void {
    this.city = {
      id: 0,
      name: 'City not available',
      coord: { lat: 0, lang: 0 },
      country: '',
      population: 0,
      timezone: 0,
      sunrise: 0,
      sunset: 0
    };
    this.forecastsByDay = [];

    if (this.forecast) {
      if (this.forecast.city) {
        this.city = this.forecast.city;
      }

      if (this.forecast.list && this.forecast.list.length > 0) {
        this.forecastsByDay = this._forecastViewerSrv.prepareForecastList(
          this.forecast.list
        );
      }
    }
  }
}
