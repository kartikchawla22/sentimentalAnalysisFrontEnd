import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
_baseUrl = 'http://localhost:8080/api/v1/'
  constructor(
    private _http: HttpClient
  ) { }
  getGraph(lat, lng, query): Observable<any> {
    return this._http.get(this._baseUrl + 'createGraph?lat=' + lat + '&lng=' + lng + '&query=' + query)
  }
}
