import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SalesViewService {

  constructor(private http: Http) { }
  private URL: string = environment.API_HOST;


  //View Sales
  viewSales() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('access_token', localStorage.getItem("kiosk_access_token"));
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let data = {
      id: Number(localStorage.getItem('id')),
      subScreenId : 14
     
    }; 
    return this.http.post(this.URL+"/so/load", data, headeroptions);

  }

}
