import { AfterViewInit, Component, OnInit } from '@angular/core';
import '@carto/carto-vl';
import { Observable } from 'rxjs';
import { ICountry } from 'src/app/interfaces/interfaces';
import { CountryService } from 'src/app/services/country.service';
import { DataService } from 'src/app/services/data.service';
import { ENDPOINTS } from 'src/assets/config/endpoints';

declare let mapboxgl: any;
declare let carto: any;

@Component({
  selector: 'app-map2',
  templateUrl: './map2.component.html',
  styleUrls: ['./map2.component.scss']
})
export class Map2Component implements AfterViewInit, OnInit {
  mapa2: any;
  query: string;
  dateSearched: any;
  countries: Observable<Array<ICountry>>;
  weatherData: Array<any>;
  locationsFiltered: Array<any>;
  selectedCountry: ICountry;
  interactivity: any;

  constructor(
    private _dataServ: DataService,
    private _countrySrv: CountryService
  ) {}

  ngOnInit() {
    this.getWeatherData();
    this.getCountries();
  }

  getWeatherData() {
    this._dataServ.getWeatherDataFromFile().subscribe((data: Array<any>) => {
      if (data && data.length > 0) {
        this.weatherData = data;
      } else {
        this.weatherData = [];
      }
    });
  }

  getCountries() {
    this.countries = this._countrySrv.getCountries();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  getWeatherByCountry() {
    if (this.mapa2.getLayer('LocFiltered')) {
      this.mapa2.removeLayer('LocFiltered');
    }

    let filteredData = this._dataServ.filterWeatherByCountry(
      this.selectedCountry.alphaCode,
      this.weatherData
    );

    console.log(filteredData);

    this.locationsFiltered = [];

    filteredData.forEach(location => {
      let loc = {
        type: 'Feature',
        symbol: `${ENDPOINTS.API_WEATHER.icons_base_url}${location.weather[0].icon}${ENDPOINTS.API_WEATHER.icons_prefix_url}`,
        geometry: {
          type: 'Point',
          coordinates: [location.city.coord.lon, location.city.coord.lat]
        },
        properties: {
          address: location.city.name,
          symbol: `${ENDPOINTS.API_WEATHER.icons_base_url}${location.weather[0].icon}${ENDPOINTS.API_WEATHER.icons_prefix_url}`,
          temp: location.main.temp,
          wind: location.wind.speed
        },
        variables: {
          address: location.city.name,
          symbol: `${ENDPOINTS.API_WEATHER.icons_base_url}${location.weather[0].icon}${ENDPOINTS.API_WEATHER.icons_prefix_url}`,
          temp: location.main.temp,
          wind: location.wind.speed
        }
      };

      this.locationsFiltered.push(loc);
    });

    this.initWeatherMap(this.locationsFiltered);
  }

  public initWeatherMap(locationsFiltered) {
    const LocFiltered = {
      type: 'FeatureCollection',
      features: locationsFiltered
    };

    const locFilteredSource = new carto.source.GeoJSON(LocFiltered);
    const s = carto.expressions;
    const locFilteredViz = new carto.Viz({
      variables: {
        address: s.prop('address'),
        symbol: s.prop('symbol'),
        wind: s.prop('wind'),
        temp: s.prop('temp')
      }
    });

    const locFilteredLayer = new carto.Layer(
      'LocFiltered',
      locFilteredSource,
      locFilteredViz
    );

    locFilteredLayer.addTo(this.mapa2);
    this.bindEvents(locFilteredLayer);
  }

  bindEvents(layer) {
    this.interactivity = undefined;
    this.interactivity = new carto.Interactivity(layer);

    this.interactivity.on('featureClick', featureEvent => {
      featureEvent.features.forEach(feature => {
        const symbol = feature.variables.symbol.value;
        const nameCity = feature.variables.address.value;
        const temp = feature.variables.temp.value;
        const wind = feature.variables.wind.value;

        const coords = featureEvent.coordinates;
        const html = `
            <div class='greyPopup'>
              <h1>${nameCity}</h1>
              <p>Weather: <img src='${symbol}'/></p>
              <p>Temp: ${temp}</p>
              <p>wind: ${wind}</p>
            </div>
        `;
        new mapboxgl.Popup()
          .setLngLat([coords.lng, coords.lat])
          .setHTML(html)
          .addTo(this.mapa2);
      });
    });

    this.interactivity.on('featureEnter', featureEvent => {});

    this.interactivity.on('featureLeave', featureEvent => {});
  }

  public initMap(): void {
    this.mapa2 = new mapboxgl.Map({
      container: 'map2',
      style: carto.basemaps.voyager,
      center: [0, 30],
      zoom: 2
    });

    const nav = new mapboxgl.NavigationControl();
    this.mapa2.addControl(nav, 'top-left');
    this.mapa2.addControl(new mapboxgl.FullscreenControl(), 'top-left');
  }
}
