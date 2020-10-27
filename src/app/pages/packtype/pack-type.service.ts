import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackTypeService {
  constructor(private http: Http) { }
  private URL: string = environment.API_HOST;
  loadData(): Observable<{}> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let accessToken = localStorage.getItem("kiosk_access_token");
    let data = { subScreenId: 18  };
    return this.http.post(this.URL + "/pt/getAll", data, headeroptions);
  }
  search(list): Observable<{}> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });

    return this.http.post(this.URL + "/pt/search", list, headeroptions);
  }
  deleteProjectList(locationId): Observable<{}> {
    let headers = new Headers();
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let bodyoptions = {
      "deleteItem": locationId
    }
    return this.http.post(this.URL + "/pt/delete", bodyoptions, headeroptions);
  }

  loadAuthAdd(): Observable<{}> {
    let headers = new Headers();
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let bodyoptions = {
      "subScreenId": 19
    }
    return this.http.post(this.URL + "/pt/add", bodyoptions, headeroptions);
  }

  addPackType(finalval): Observable<{}> {
    let headers = new Headers();
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    
    return this.http.post(this.URL + "/pt/create", finalval, headeroptions);
  }

  loadSales(): Observable<{}> {
    let headers = new Headers();
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    
    return this.http.post(this.URL + "/salesOrgMapping/dropdown", {userId: localStorage.getItem("userId")}, headeroptions);
  }

  loadPackSize(val): Observable<{}> {
    let headers = new Headers();
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    
    return this.http.post(this.URL + "/packSize/dropdown", {id:val}, headeroptions);
  }


  viewData(): Observable<{}> {
    let headers = new Headers();
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    
    return this.http.post(this.URL + "/pt/load", {id:localStorage.getItem("id"),subScreenId : 19}, headeroptions);
  }

  
  modifyPackType(finalval): Observable<{}> {
    let headers = new Headers();
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    
    return this.http.post(this.URL + "/pt/update", finalval, headeroptions);
  }
}
