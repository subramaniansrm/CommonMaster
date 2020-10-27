import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UpdateService {
 
  constructor(private http: Http) { }
  private URL: string = environment.API_HOST;

loadUser():Observable<any>{
  let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    //let data = { accessToken : localStorage.getItem("kiosk_access_token") };
    return this.http.post(this.URL + "/role/mmdropdown", {userId : Number(localStorage.getItem("authId"))}, headeroptions);

  }



loadSales():Observable<any>{
  let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    //let data = { accessToken : localStorage.getItem("kiosk_access_token") };
    return this.http.post(this.URL + "/saleMapping/mmdropdown", {userId : Number(localStorage.getItem("authId"))}, headeroptions);

  }
  
  modifyAuth(finalval) : Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    //let data = { accessToken : localStorage.getItem("kiosk_access_token") };
    return this.http.post(this.URL + "/auth/update", finalval, headeroptions);
  }



  loadScreen() {
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    //let data = { accessToken : localStorage.getItem("kiosk_access_token") };
    //return this.http.post("http://172.16.1.72:8181/kevamdg/sr/screen/dropdown", {userId : Number(localStorage.getItem("authId"))}, headeroptions);
    return this.http.post(this.URL+"/screen/view", {}, headeroptions);
 
  }
 


  getSubScreen(data) :Observable<any>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    //let data = { accessToken : localStorage.getItem("kiosk_access_token") };
   //return this.http.post( "http://172.16.1.72:8181/kevamdg/sr/subScreen/dropdown", {id : data,userId : Number(localStorage.getItem("authId"))}, headeroptions);
   return this.http.post( this.URL+"/subScreen/view", {id : data,userId : Number(localStorage.getItem("authId"))}, headeroptions);

  }


  loadSubScreenFields(data: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    //let data = { accessToken : localStorage.getItem("kiosk_access_token") };
   //return this.http.post( "http://172.16.1.72:8181/kevamdg/sr/screenField/dropdown", {id : data,userId : Number(localStorage.getItem("authId"))}, headeroptions);
  return this.http.post( this.URL+"/screenField/view", {id : data,userId : Number(localStorage.getItem("authId"))}, headeroptions);

  }


  loadScreenFunction(data: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    //let data = { accessToken : localStorage.getItem("kiosk_access_token") };
    //return this.http.post( "http://172.16.1.72:8181/kevamdg/sr/screenFunction/dropdown", {id : data,userId : Number(localStorage.getItem("authId"))}, headeroptions);
    return this.http.post(this.URL+"/screenFunction/view", {id : data,userId : Number(localStorage.getItem("authId"))}, headeroptions);

  }



  loadPlant(data):Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    //let data = { accessToken : localStorage.getItem("kiosk_access_token") };
    return this.http.post( this.URL+"/plantMapping/mmdropdown", {id : data,userId : Number(localStorage.getItem("authId"))}, headeroptions);
 
 
  }

  

}
 

