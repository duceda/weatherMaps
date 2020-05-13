import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ITabMaps } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  private tabsUrl = '';

  constructor(private http: HttpClient) { }

  public getTabs(): Observable<ITabMaps[]> {
    return this.getTabsJSON();
  }

  private getTabsJSON(): Observable<ITabMaps[]> {
    return this.http.get<ITabMaps[]>(environment.urlFileTabs);
  }
}
