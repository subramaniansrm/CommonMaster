
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable,throwError} from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SublocationAddService {
  constructor(private http:Http) { }
  private URL: string = environment.API_HOST;
  addProjectList(data):Observable<{}>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
   // headers.append('access_token', localStorage.getItem("kiosk_access_token"));
    let headeroptions =new RequestOptions({ headers: headers});
    let bodycontent=JSON.stringify(data);
    return this.http.post(this.URL+"/sub/create",bodycontent, headeroptions);
  }
  load_selectBoxData():Observable<{}>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
   // headers.append('access_token', localStorage.getItem("kiosk_access_token"));
   let authToken = localStorage.getItem("kiosk_access_token");
   headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions =new RequestOptions({ headers: headers});
    return this.http.post(this.URL+"/location/dropdown", headeroptions);
  }
  sublocationaddscreen(): Observable<{}> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
   // headers.append('access_token', localStorage.getItem("kiosk_access_token"));
   let authToken = localStorage.getItem("kiosk_access_token");
   headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers});
    let data = {subScreenId: 6};
    return this.http.post(this.URL+"/sub/add", data,  headeroptions);
  }



}
