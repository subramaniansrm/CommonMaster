
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable,throwError} from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserModifyService {
  constructor(private http:Http) { }
  private URL: string = environment.API_HOST;
  load_RoleselectBoxData():Observable<{}>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
   // headers.append('access_token', localStorage.getItem("kiosk_access_token"));
    let headeroptions =new RequestOptions({ headers: headers});
    return this.http.post(this.URL+"/role/dropdown",{}, headeroptions);
  }
  load_DeptselectBoxData():Observable<{}>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
   // headers.append('access_token', localStorage.getItem("kiosk_access_token"));
    let headeroptions =new RequestOptions({ headers: headers});
    return this.http.post(this.URL+"/department/dropdown",{}, headeroptions);
  }
  load_LocationselectBoxData():Observable<{}>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
   // headers.append('access_token', localStorage.getItem("kiosk_access_token"));
    let headeroptions =new RequestOptions({ headers: headers});
    return this.http.post(this.URL+"/location/dropdown",{}, headeroptions);
  }
  load_DivisionselectBoxData():Observable<{}>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
   // headers.append('access_token', localStorage.getItem("kiosk_access_token"));
    let headeroptions =new RequestOptions({ headers: headers});
    return this.http.post(this.URL+"/user/divisionsLoad",{}, headeroptions);
  }
  load_levelselectBoxData():Observable<{}>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
 //  headers.append('access_token', localStorage.getItem("kiosk_access_token"));
 let authToken = localStorage.getItem("kiosk_access_token");
 headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions =new RequestOptions({ headers: headers});
    return this.http.post(this.URL+"/userlevel/dropdown",{}, headeroptions);
  }
  modifygetData():Observable<{}>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //headers.append('access_token', localStorage.getItem("kiosk_access_token"));
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions =new RequestOptions({ headers: headers});
  //  let data = { id : localStorage.getItem('userId')}
    let data1 = { subScreenId: 8,
    id: localStorage.getItem('usercurid') , accessToken : localStorage.getItem("kiosk_access_token")};
    return this.http.post(this.URL+"/user/view", data1 ,  headeroptions);
  }
  load_selectBox_subLocationData(val): Observable<{}> {
    let head = new Headers();
    head.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    head.append('Authorization', `Bearer ${authToken}`);
 //   head.append('access_token', localStorage.getItem('kiosk_access_token'));
    let headeroptions = new RequestOptions({ headers: head});
    // return this.http.post(this.URL + '/sub/dropdown', {userLocation: locationTypeId}, headeroptions);
    return this.http.post(this.URL + '/depart/dropdown', val, headeroptions);
  }
  load_userRoleelectBoxData(data): Observable<{}> {
    let heade = new Headers();
    heade.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    heade.append('Authorization', `Bearer ${authToken}`);
    //heade.append('access_token', localStorage.getItem('kiosk_access_token'));
    let headeroptions = new RequestOptions({ headers: heade});
    return this.http.post(this.URL + '/role/dropdown', data,  headeroptions);
  }
  modifyUser(data):Observable<{}>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    //headers.append('access_token', localStorage.getItem("kiosk_access_token"));
    let headeroptions =new RequestOptions({ headers: headers});
    return this.http.post(this.URL+"/user/update", data,  headeroptions);
  }
  load_subLocationData(locationTypeId):Observable<{}>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
   // headers.append('access_token', localStorage.getItem("kiosk_access_token"));
    let headeroptions =new RequestOptions({ headers: headers});
    return this.http.post(this.URL+"/sub/dropdown", {"id": locationTypeId}, headeroptions);
  }
}
