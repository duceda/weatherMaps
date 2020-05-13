import { IMapCoordinates } from './map.interfaces';

export interface ITabMaps {
  path: string;
  label: string;
}

export interface IRouteValue {
  key: string;
  path: string;
}

export interface IForecast {
  cod: string;
  message: number;
  cnt: number;
  list: [];
  city: IForecastCity;
}

export interface IForecastCity {
  id: number;
  name: string;
  coord: IMapCoordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ICountry {
  name: string;
  alphaCode: string;
  countrCode: string;
}
