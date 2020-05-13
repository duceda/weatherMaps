import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { IForecast, IForecastCity } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-map4',
  templateUrl: './map4.component.html',
  styleUrls: ['../map3/map3.component.scss', './map4.component.scss']
})
export class Map4Component implements OnInit {
  query: string;
  weatherForecast: IForecast;

  constructor(private _mapSrv: MapService) {}

  ngOnInit(): void {}

  searchForecast() {
    this.weatherForecast = undefined;
    if (this.query && this.query !== '') {
      this._mapSrv
        .getForeCast5DaysByCity(this.query.trim())
        .subscribe((data: IForecast) => {
          this.weatherForecast = data;
        });
    }
  }
}
