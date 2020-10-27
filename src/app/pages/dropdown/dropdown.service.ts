import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  
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
    return this.http.post(this.URL + "/cdm/search", finalSearchData, headeroptions);

  }



  //Delete
  delete(id) :Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let bodyoptions = {"deleteItem": id , "accessToken" : localStorage.getItem("kiosk_access_token")  }  ; 
        return this.http.post(this.URL + "/cdm/delete", bodyoptions, headeroptions);

  }


  //To load Search Data
  search1():Observable<any>  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let data = { accessToken : localStorage.getItem("kiosk_access_token") };
    return this.http.post(this.URL + "/cdm/search", data, headeroptions);


  }


  // To load all list details
  dropDownGetAll():Observable<any>  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let data = {subScreenId  : 15 };
    return this.http.post(this.URL + "/cdm/getAll", data, headeroptions);
  }


  //Add Customer
  addDropDown(finalval):Observable<any>{
    let headers= new Headers();
      headers.append('Content-Type', 'application/json');
      //headers.append('access_token', localStorage.getItem("access_token"));
      let authToken = localStorage.getItem("kiosk_access_token");
      headers.append('Authorization', `Bearer ${authToken}`);
      let headeroptions = new RequestOptions({ headers: headers });
      return this.http.post(this.URL+"/cdm/create", finalval, headeroptions );
  }

    // Modify customer
    modifyDropDown(finalval):Observable<any>{

      let headers= new Headers();
      headers.append('Content-Type', 'application/json');
      //headers.append('access_token', localStorage.getItem("access_token"));
      let authToken = localStorage.getItem("kiosk_access_token");
      headers.append('Authorization', `Bearer ${authToken}`);
      let headeroptions = new RequestOptions({ headers: headers });
      return this.http.post(this.URL+"/cdm/update", finalval, headeroptions );
  
    }


    
  //View Customer
  viewDropDown() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('access_token', localStorage.getItem("kiosk_access_token"));
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let data = {
      id: Number(localStorage.getItem('id')),
      subScreenId : 16
    }; /** code */

    return this.http.post(this.URL+"/cdm/load", data, headeroptions);

  }

  
  authCommonDrop() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('access_token', localStorage.getItem("kiosk_access_token"));
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let data = {
      id: Number(localStorage.getItem('id')),
      subScreenId : 16
    };

    return this.http.post(this.URL+"/cdm/add", data, headeroptions);

  }


  loadSales(): Observable<{}> {
    let headers = new Headers();
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    
    return this.http.post(this.URL + "/salesOrgMapping/dropdown", {userId: localStorage.getItem("userId")}, headeroptions);
  }


  loadField(): Observable<{}> {
    let headers = new Headers();
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    
    return this.http.post(this.URL + "/sf/dropdown", {}, headeroptions);
  }



}
