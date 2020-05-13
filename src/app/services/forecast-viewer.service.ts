import { Injectable } from '@angular/core';
import { IForecast } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ForecastViewerService {
  constructor() {}

  public prepareForecastList(forecastList: Array<any>): Array<any> {
    let joinedForecastByDay: Array<any> = [];

    joinedForecastByDay = this.splitForecastsByDay(forecastList);
    joinedForecastByDay = this.joinForecastByDay(
      joinedForecastByDay,
      forecastList
    );

    return joinedForecastByDay;
  }

  private splitForecastsByDay(forecastList: Array<any>): Array<any> {
    let joinedForecastByDay: Array<any> = [];

    for (let i = 0; i < forecastList.length; i++) {
      let dateSplitted = forecastList[i].dt_txt.split(' ')[0];
      let joinedArr = joinedForecastByDay.filter(joinedFD => {
        return joinedFD.date === dateSplitted;
      });

      if (joinedArr.length === 0) {
        let emptyPos = { date: dateSplitted, forecasts: [] };
        joinedForecastByDay.push(emptyPos);
      }
    }

    return joinedForecastByDay;
  }

  private joinForecastByDay(
    forecastToBeReturned: Array<any>,
    forecastList: Array<any>
  ): Array<any> {
    for (let i = 0; i < forecastList.length; i++) {
      let dateSplitted = forecastList[i].dt_txt.split(' ')[0];

      let joinedArr = forecastList.filter(forecast => {
        if (forecast.dt_txt.split(' ')[0] === dateSplitted) {
          return forecast;
        }
      });

      if (joinedArr.length > 0) {
        this.setJoinedArrayByDate(
          forecastToBeReturned,
          joinedArr,
          dateSplitted
        );
      }
    }

    return forecastToBeReturned;
  }

  private setJoinedArrayByDate(
    forecastToBeReturned: Array<any>,
    forecastList: Array<any>,
    dateSplitted: string
  ) {
    forecastToBeReturned.forEach(forecast => {
      if (dateSplitted === forecast.date && forecast.forecasts.length === 0) {
        forecast.forecasts = forecastList;
      }
    });
  }
}
