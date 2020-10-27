import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesModifyService {


  constructor(private http: Http) { }
  private URL: string = environment.API_HOST;

  // Modify Sales
  modifySales(finalval):Observable<any>{

    let headers= new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('access_token', localStorage.getItem("access_token"));
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    return this.http.post(this.URL+"/so/update", finalval, headeroptions );
 


  }
  

}
