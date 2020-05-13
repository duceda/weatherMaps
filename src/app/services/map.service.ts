import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from 'src/assets/config/endpoints';
import { environment } from 'src/environments/environment';
import { IMapCoordinates } from '../interfaces/map.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private _http: HttpClient) {}

  getDataWeatherUrlByCity(city: string, latlng: IMapCoordinates) {
    return `${ENDPOINTS.API_WEATHER.forecast_base_url}?lat=${latlng.lat}&lon=${latlng.lang}&appid=${environment.apiKey}`;
  }

  getCurrentWeatherByCity(query: string) {
    return this._http.get(
      `${ENDPOINTS.API_WEATHER.weather_base_url}?q=${query}&units=metric&appid=${environment.apiKey}`
    );
  }

  getForeCast5DaysByCity(query: string) {
    return this._http.get(
      `${ENDPOINTS.API_WEATHER.forecast_base_url}?q=${query}&units=metric&appid=${environment.apiKey}`
    );
  }
}
