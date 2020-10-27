import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: Http) { }
  private URL: string = environment.API_HOST;
  fullurl = environment.API_HOST;
  private FGURL: string = this.fullurl.substring(0, this.fullurl.length - 3);

  //login
  postlogin(username, password): Observable<{}> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth', 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA=');
    // headers.append('access_token', localStorage.getItem("access_token"));
    // headers.append('Authorization', 'Basic '+btoa(username + ":" +password));
    let headeroptions = new RequestOptions({ headers: headers });
    //let bodycontent = {  "username": username,"password":btoa(password)}
    let bodycontent = {
      "username": username, "password": btoa(password), "grantType": "password"


    }

 //return this.http.post("http://172.16.1.72:8181/kevamdg/core/oauth/token", bodycontent, headeroptions);


 return this.http.post("http://172.16.9.103:8081/kevamdg/core/oauth/token", bodycontent, headeroptions);

  }




  postforgotpw(username): Observable<{}> {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('access_token', localStorage.getItem("kiosk_access_token"));
    let headeroptions = new RequestOptions({ headers: headers });
    let bodycontent = {
      "userLoginId": username,
    }
    return this.http.post(this.FGURL + "/common/forgotPassword", bodycontent, headeroptions);
  }






}

