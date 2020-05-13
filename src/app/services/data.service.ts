import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getWeatherDataFromFile(): Observable<any[]> {
    return this.http.get<any[]>(environment.weatherDataFile);
  }

  public filterWeatherByCountry(countryCode, weatherData): any[] {
    return weatherData.filter((data: any) => {
      return (data.city.country === countryCode);
    });
  }
}
