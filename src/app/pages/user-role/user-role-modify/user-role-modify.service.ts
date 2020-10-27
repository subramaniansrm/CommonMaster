
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable,throwError} from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRoleModifyService {
  constructor(private http:Http) { }
  private URL: string = environment.API_HOST;
  load_LoactionselectBoxData():Observable<{}>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //headers.append('access_token', localStorage.getItem("kiosk_access_token"));
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions =new RequestOptions({ headers: headers});
    return this.http.post(this.URL+"/location/dropdown", headeroptions);
  }
  load_DepartmentselectBoxData():Observable<{}>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
   // headers.append('access_token', localStorage.getItem("kiosk_access_token"));
   let authToken = localStorage.getItem("kiosk_access_token");
   headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions =new RequestOptions({ headers: headers});
    return this.http.post(this.URL+"/depart/dropdown",  headeroptions);
  }
  modifyUserRole(data):Observable<{}>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
  //  headers.append('access_token', localStorage.getItem("kiosk_access_token"));
  let authToken = localStorage.getItem("kiosk_access_token");
  headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions =new RequestOptions({ headers: headers});
    return this.http.post(this.URL+"/userrole/update", data,  headeroptions);
  }
  getModifyData():Observable<{}>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
  //  headers.append('access_token', localStorage.getItem("kiosk_access_token"));
  let authToken = localStorage.getItem("kiosk_access_token");
  headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions =new RequestOptions({ headers: headers});
    let data = { subScreenId: 10,
      id : localStorage.getItem('userRoleId')};
    return this.http.post(this.URL+"/userrole/load", data,   headeroptions);
  }
  load_selectBox_subLocationData(locationTypeId): Observable<{}> {
    let head = new Headers();
    head.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    head.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: head});
    // return this.http.post(this.URL + '/sub/dropdown', {userLocation: locationTypeId}, headeroptions);
    return this.http.post(this.URL + '/depart/dropdown', {id: locationTypeId}, headeroptions);
  }

  load_subLocationselectBoxData(val):Observable<{}>{  
    let headers = new Headers();
    headers.append('Content-Type','application/json');
   // headers.append('access_token', localStorage.getItem("access_token"));
   let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions =new RequestOptions({ headers: headers});
    return this.http.post(this.URL+"/sub/dropdown",	{	id : val }, 
    headeroptions);
  }

}
