import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateViewService {
  constructor(private http: Http) { }
  private URL: string = environment.API_HOST;
  viewData(): Observable<{}> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('access_token', localStorage.getItem("kiosk_access_token"));
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let data = {
      id: Number(localStorage.getItem('stateId')),
      accessToken: localStorage.getItem("kiosk_access_token")
    }; /** code */

    return this.http.post(this.URL + "/state/load", data, headeroptions);
  }

}
