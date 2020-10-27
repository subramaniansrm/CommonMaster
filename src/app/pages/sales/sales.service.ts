import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {


  constructor(private http: Http) { }
  private URL: string = environment.API_HOST;


  //Search 
  search(finalSearchData):Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    //let data = { accessToken : localStorage.getItem("kiosk_access_token") };
    return this.http.post(this.URL + "/so/search", finalSearchData, headeroptions);

  }



  //Delete
  delete(id) :Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let bodyoptions = {"deleteItem": id , "accessToken" : localStorage.getItem("kiosk_access_token")  }  ; 
        return this.http.post(this.URL + "/so/delete", bodyoptions, headeroptions);

  }


  //To load Search Data
  search1():Observable<any>  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let data = { accessToken : localStorage.getItem("kiosk_access_token") };
    return this.http.post(this.URL + "/so/search", data, headeroptions);


  }


  // To load all list details
  salesGetAll():Observable<any>  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let data = {subScreenId: 13};
    return this.http.post(this.URL + "/so/getAll", data, headeroptions);
  }

  
 
  
}
