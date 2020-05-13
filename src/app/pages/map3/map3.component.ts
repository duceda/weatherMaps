import { AfterViewInit, Component } from '@angular/core';
import { MapConstants } from 'src/app/constants/mapConstants';
import { IMapCoordinates } from 'src/app/interfaces/map.interfaces';
import { MapService } from 'src/app/services/map.service';
import { ENDPOINTS } from 'src/assets/config/endpoints';

declare let L;
declare let mapboxgl: any;
declare let carto: any;

@Component({
  selector: 'app-map3',
  templateUrl: './map3.component.html',
  styleUrls: ['./map3.component.scss']
})
export class Map3Component implements AfterViewInit {
  mapa3: any;
  query: string;
  currentWeather: any;
  iconUrl: string;
  weatherDescription: string;
  currentTemperature: string;
  defaultCoordinates: IMapCoordinates = MapConstants.DEFAULT_CENTER_COORDINATES;
  markers = [];
  tiles: any;

  constructor(private _mapSrv: MapService) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    this.mapa3 = new mapboxgl.Map({
      container: 'map3',
      style: carto.basemaps.voyager,
      center: [0, 30],
      zoom: 2
    });

    const nav = new mapboxgl.NavigationControl();
    this.mapa3.addControl(nav, 'top-left');
    this.mapa3.addControl(new mapboxgl.FullscreenControl(), 'top-left');
  }

  searchCurrentWeather() {
    if (this.query && this.query !== '') {
      this._mapSrv
        .getCurrentWeatherByCity(this.query.trim())
        .subscribe((data: any) => {
          this.currentWeather = data;

          if (data.weather.length > 0) {
            this.iconUrl = `${ENDPOINTS.API_WEATHER.icons_base_url}${data.weather[0].icon}${ENDPOINTS.API_WEATHER.icons_prefix_url}`;
            this.weatherDescription = `${data.weather[0].main} - ${data.weather[0].description}`;
          }

          this.currentTemperature = this.currentWeather.main.temp;

          let coordinates = [
            this.currentWeather.coord.lon,
            this.currentWeather.coord.lat
          ];

          this.mapa3.flyTo({ center: this.currentWeather.coord, zoom: 8 });
          this.setMarker(coordinates);
        });
    }
  }
  setMarker(coord): void {
    this.removeMarkers();

    let el = document.createElement('div');
    el.className = 'marker';
    let marker = new mapboxgl.Marker(el).setLngLat(coord);
    marker.addTo(this.mapa3);
  }

  removeMarkers() {
    let elements = document.getElementsByClassName('marker');

    if (elements.length > 0) {
      for (let i = 0; i < elements.length; ++i) {
        elements[i].remove();
      }
    }
  }
}
