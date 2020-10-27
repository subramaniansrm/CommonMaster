import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ViewUserSalesService {
  
  constructor(private http: Http) { }
  private URL: string = environment.API_HOST;


  viewMappingData():Observable<any>{
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let authToken = localStorage.getItem("kiosk_access_token");
      headers.append('Authorization', `Bearer ${authToken}`);
      let headeroptions = new RequestOptions({ headers: headers });
      //let data = { accessToken : localStorage.getItem("kiosk_access_token") };
      return this.http.post(this.URL + "/auth/view", {id :localStorage.getItem("id")}, headeroptions);
  
    }
}
