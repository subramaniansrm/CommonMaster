
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable,throwError} from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SublocationModifyService {

  constructor(private http:Http) { }

  private URL: string = environment.API_HOST;

  load_modify_project(data): Observable<{}> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
   // headers.append('access_token', localStorage.getItem("kiosk_access_token"));
   let authToken = localStorage.getItem("kiosk_access_token");
   headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions =new RequestOptions({ headers: headers});
    // let bodycontent ={"sublocationId": data,}
    let dataj = {subScreenId: 6,
    id : data };
    return this.http.post(this.URL+"/sub/load", dataj, headeroptions);
  }

  update_modify_project(data): Observable<{}> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
  //  headers.append('access_token', localStorage.getItem("kiosk_access_token"));
  let authToken = localStorage.getItem("kiosk_access_token");
  headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions =new RequestOptions({ headers: headers});
    let bodycontent = Object.assign(data, {"sublocationId" : Number(localStorage.getItem('sublocationId'))});
    return this.http.post(this.URL+"/sub/update",bodycontent, headeroptions);
  }

  load_selectBoxData():Observable<{}>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
  //  headers.append('access_token', localStorage.getItem("kiosk_access_token"));
  let authToken = localStorage.getItem("kiosk_access_token");
  headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions =new RequestOptions({ headers: headers});
    return this.http.post(this.URL+"/location/dropdown", headeroptions);
  }




}
