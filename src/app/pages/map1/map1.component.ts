import { AfterViewInit, Component } from '@angular/core';
import '@carto/carto-vl';
import L from '@carto/carto-vl';
import { MapConstants } from 'src/app/constants/mapConstants';
import { IMapCoordinates } from 'src/app/interfaces/map.interfaces';

declare let L;
declare let mapboxgl: any;
declare let carto: any;
declare let cartodb: any;

@Component({
  selector: 'app-map1',
  templateUrl: './map1.component.html',
  styleUrls: ['./map1.component.scss']
})
export class Map1Component implements AfterViewInit {
  mapa: any;

  defaultCoordinates: IMapCoordinates = MapConstants.DEFAULT_CENTER_COORDINATES;
  mapJson: Array<any>;

  tiles: any;

  mapa1: any;

  latlng;

  popup;

  markers = [];
  filteredCampaignsData = [];
  initialDate: string;
  currentDate: string;
  eventHandler: any;

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.latlng = L.latLng(
      this.defaultCoordinates.lat,
      this.defaultCoordinates.lang
    );

    this.mapa1 = new mapboxgl.Map({
      container: 'map1',
      style: carto.basemaps.voyager,
      center: [0, 30],
      zoom: 2
    });
    this.mapa1.addControl(new mapboxgl.FullscreenControl(), 'top-left');

    cartodb
      .createVis(
        'map1',
        'https://documentation.cartodb.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json',
        {
          shareable: false,
          title: false,
          description: true,
          search: false,
          tiles_loader: true,
          center_lat: 0,
          center_lon: 0,
          zoom: 2
        }
      )
      .done(function(vis, layers) {
        layers[1].setInteraction(true);
        var map = vis.getNativeMap();
      })
      .error(function(err) {
        console.log(err);
      });
  }
}
