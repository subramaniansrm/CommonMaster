import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable, throwError, BehaviorSubject} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  approvallist: any = [];
  appcount: any = 0;
  notificationcount: any = 0;
 // mailDetails: any = [];
  mailDetails1: any = [];

  private messageSource = new BehaviorSubject<string>("default message");
  currentMessage = this.messageSource.asObservable();
  constructor(private http: Http) { }

  private URL: string = environment.API_HOST;
  homeUrl : string =  this.URL.substring(0, this.URL.length - 3);

  // logOut():Observable<{}>{

  //   let headers = new Headers();

  //   headers.append('Content-Type', 'application/json');
  //   headers.append('access_token', localStorage.getItem("kiosk_access_token"));

  //   let headeroptions = new RequestOptions({ headers: headers });

  //   return this.http.get(this.URL+"/logout", headeroptions );

  // }

  headerDetails():Observable<{}>{
    let headers= new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('access_token', localStorage.getItem("access_token"));
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    return this.http.post(this.URL+"/name/dropdown",{id:Number(localStorage.getItem("userId"))}, headeroptions );

  }
  mailDetails(): Observable<{}> {
    let headers= new Headers();
      headers.append('Content-Type', 'application/json');
      //headers.append('access_token', localStorage.getItem("access_token"));
      let authToken = localStorage.getItem("kiosk_access_token");
      headers.append('Authorization', `Bearer ${authToken}`);
      let headeroptions = new RequestOptions({ headers: headers });
    return this.http.post(this.URL+"/notificationList",{}, headeroptions );

  }
  deletenotification(id): Observable<{}> {
    let heade = new Headers();
    let data = { mailParameterId: id};
    heade.append('Content-Type', 'application/json');
    heade.append('access_token', localStorage.getItem("kiosk_access_token"));
    let headeroptions = new RequestOptions({ headers: heade });
    return this.http.post(this.URL+"/deleteNotification", data, headeroptions );

  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  kiosk_access_tokenCheck():Observable<{}>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('access_token', localStorage.getItem("kiosk_access_token"));
    let headeroptions = new RequestOptions({ headers: headers });
    return this.http.post(this.URL+"/profile/name",{}, headeroptions ).pipe(
      map( response=> response),
      catchError(this.handleError)
    );
    // return this.http.post(this.URL+"/profile/name",{}, headeroptions );
  }
  postlogin():Observable<{}>{
    return this.http.get(this.URL+"/login").pipe(
      map( response=> response),
      catchError(this.handleError)
    );
  }
  homepostlogin():Observable<{}>{
    return this.http.get("http://kioskuat:8091/kiosk/home").pipe(
      map( response=> response),
      catchError(this.handleError)
    );
  }
  private handleError(error: Response | any) {    
    return throwError(error);
  }
  sessionTimeOutCheck():Observable<{}>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('access_token', localStorage.getItem("kiosk_access_token"));
    let headeroptions = new RequestOptions({ headers: headers });
    return this.http.post(this.URL+"/profile/name", {}, headeroptions).pipe(
      map( response=> response),
      catchError(this.handleError)
    );
  }
}
