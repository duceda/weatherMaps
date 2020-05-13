import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-chart-temperature',
  templateUrl: './chart-temperature.component.html',
  styleUrls: [
    '../../pages/map3/map3.component.scss',
    './chart-temperature.component.scss'
  ]
})
export class ChartTemperatureComponent implements OnInit {
  public chart: any = null;
  query: string;

  constructor(private _mapSrv: MapService) {}

  ngOnInit(): void {}

  searchForecast() {
    this.chart = null;
    this._mapSrv
      .getForeCast5DaysByCity(this.query.trim())
      .subscribe((data: any) => {
        console.log(data);

        let maxTemp = data.list.map(data => data.main.temp_max);
        let minTemp = data.list.map(data => data.main.temp_min);
        let feelLike = data.list.map(data => data.main.feels_like);
        let allDates = data.list.map(data => data.dt);

        let weatherDates = [];

        allDates.forEach(res => {
          let jsDate = new Date(res * 1000);
          weatherDates.push(
            jsDate.toLocaleTimeString('en', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          );
        });

        console.log(weatherDates);

        let ctx = document.querySelector('#myChart');

        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                label: 'Temperature Max ºC',
                data: maxTemp,
                borderColor: '#eb1313',
                fill: false
              },
              {
                label: 'Temperature Min ºC',
                data: minTemp,
                borderColor: '#425fed',
                fill: false
              },
              {
                label: 'Feel Like ºC',
                data: feelLike,
                borderColor: '#32a852',
                fill: false
              }
            ]
          },
          options: {
            legend: {
              display: true
            },
            scales: {
              yAxes: [
                {
                  display: true
                }
              ],
              xAxes: [
                {
                  display: true
                }
              ]
            }
          }
        });
      });
  }
}
