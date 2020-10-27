import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserSalesMappingService {

  constructor(private http: Http) { }
  private URL: string = environment.API_HOST;


  //GetAll

  getAll(): Observable<{}> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    //let data = { accessToken : localStorage.getItem("kiosk_access_token") };
    return this.http.post(this.URL + "/auth/getAll", {}, headeroptions);

  }
}
