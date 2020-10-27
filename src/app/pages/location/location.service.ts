import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: Http) { }
  private URL: string = environment.API_HOST;
  load_sublocation(): Observable<{}> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let accessToken = localStorage.getItem("kiosk_access_token");
    let data = { subScreenId: 3  };
    return this.http.post(this.URL + "/loc/getAll", data, headeroptions);
  }
  search_list(list): Observable<{}> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });

    return this.http.post(this.URL + "/loc/search", list, headeroptions);
  }
  deleteProjectList(locationId): Observable<{}> {
    let headers = new Headers();
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let bodyoptions = {
      "deleteItem": locationId, accessToken : localStorage.getItem("kiosk_access_token")
    }
    return this.http.post(this.URL + "/loc/delete", bodyoptions, headeroptions);
  }
}
