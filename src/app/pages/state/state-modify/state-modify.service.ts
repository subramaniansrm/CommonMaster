import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable,throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment} from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StateModifyService {
  constructor(private http:Http) { }
  private URL: string = environment.API_HOST;

  modifyState(data):Observable<{}> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions =new RequestOptions({ headers: headers});
    return this.http.post(this.URL+"/state/update", data,  headeroptions);
  
    
  }

 
}
