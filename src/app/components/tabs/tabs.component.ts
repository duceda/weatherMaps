import { Component, OnInit } from '@angular/core';
import { ITabMaps } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';
import { TabsService } from 'src/app/services/tabs.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  tabs: Array<ITabMaps>;

  constructor(private _tabsSrv: TabsService) { }

  ngOnInit(): void {
    this._tabsSrv.getTabs().subscribe((dataTabs: Array<ITabMaps>) => {
      if (dataTabs.length > 0) {
        this.tabs = dataTabs;
      } else {
        this.tabs = [];
      }
    });
  }

}
