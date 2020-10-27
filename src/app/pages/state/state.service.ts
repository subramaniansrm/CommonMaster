import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  
  constructor(private http: Http) { }
  private URL: string = environment.API_HOST;
  getAll( ) : Observable<{}>  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let data = { accessToken : localStorage.getItem("kiosk_access_token") };
    return this.http.post(this.URL + "/state/getAll", data, headeroptions);
  }
  deleteState(stateId): Observable<{}> {
    let headers = new Headers();
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let bodyoptions = {
      "deleteItem": stateId, accessToken : localStorage.getItem("kiosk_access_token")
    }
    return this.http.post(this.URL + "/state/delete", bodyoptions, headeroptions);
  }
}
