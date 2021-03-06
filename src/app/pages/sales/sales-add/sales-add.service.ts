import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SalesAddService {

  constructor(private http: Http) { }
  private URL: string = environment.API_HOST;

  //Add Sales
  addSales(finalval):Observable<any>{
  let headers= new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('access_token', localStorage.getItem("access_token"));
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    return this.http.post(this.URL+"/so/create", finalval, headeroptions );
}

loadAuthSales():Observable<any>  {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem("kiosk_access_token");
  headers.append('Authorization', `Bearer ${authToken}`);
  let headeroptions = new RequestOptions({ headers: headers });
  let data = {subScreenId: 14};
  return this.http.post(this.URL + "/so/add", data, headeroptions);
}



 
}
