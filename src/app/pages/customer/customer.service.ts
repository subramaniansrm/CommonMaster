import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


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
    return this.http.post(this.URL + "/cus/search", finalSearchData, headeroptions);

  }



  //Delete
  delete(id) :Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let bodyoptions = {"deleteItem": id , "accessToken" : localStorage.getItem("kiosk_access_token")  }  ; 
        return this.http.post(this.URL + "/cus/delete", bodyoptions, headeroptions);

  }


  //To load Search Data
  search1():Observable<any>  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let data = { accessToken : localStorage.getItem("kiosk_access_token") };
    return this.http.post(this.URL + "/cus/search", data, headeroptions);


  }


  // To load all list details
  customerGetAll():Observable<any>  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let data = {subScreenId:11 };
    return this.http.post(this.URL + "/cus/getAll", data, headeroptions);
  }


  //Add Customer
  addCustomer(finalval):Observable<any>{
    let headers= new Headers();
      headers.append('Content-Type', 'application/json');
      //headers.append('access_token', localStorage.getItem("access_token"));
      let authToken = localStorage.getItem("kiosk_access_token");
      headers.append('Authorization', `Bearer ${authToken}`);
      let headeroptions = new RequestOptions({ headers: headers });
      return this.http.post(this.URL+"/cus/create", finalval, headeroptions );
  }


  //
  loadAuthCustomer():Observable<any>{
    let headers= new Headers();
      headers.append('Content-Type', 'application/json');
      //headers.append('access_token', localStorage.getItem("access_token"));
      let authToken = localStorage.getItem("kiosk_access_token");
      headers.append('Authorization', `Bearer ${authToken}`);
      let headeroptions = new RequestOptions({ headers: headers });
      let data = { subScreenId :12 };
      return this.http.post(this.URL+"/cus/add",data , headeroptions );
  }
    // Modify customer
    modifyCustomer(finalval):Observable<any>{

      let headers= new Headers();
      headers.append('Content-Type', 'application/json');
      //headers.append('access_token', localStorage.getItem("access_token"));
      let authToken = localStorage.getItem("kiosk_access_token");
      headers.append('Authorization', `Bearer ${authToken}`);
      let headeroptions = new RequestOptions({ headers: headers });
      return this.http.post(this.URL+"/cus/update", finalval, headeroptions );
  
    }


    
  //View Customer
  viewCustomer() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('access_token', localStorage.getItem("kiosk_access_token"));
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    let data = {
      id: Number(localStorage.getItem('id')),
      subScreenId : 12
    
    }; /** code */

    return this.http.post(this.URL+"/cus/load", data, headeroptions);

  }



  loadPlant(val) : Observable<{}>  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    return this.http.post(this.URL+"/plant/dropdown", {id :val}, headeroptions);
  
    
  }


  
  loadSales() : Observable<{}>  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    return this.http.post(this.URL+"/salesOrgMapping/dropdown", {userId : Number(localStorage.getItem("userId"))}, headeroptions);
  
    
  }


  
  loadChannel() : Observable<{}>  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    return this.http.post(this.URL+"/dc/dropdown", {}, headeroptions);
  
    
  }


  loadCity(): Observable<{}> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem("kiosk_access_token");
    headers.append('Authorization', `Bearer ${authToken}`);
//headers.append('Authorization', `Bearer ${authToken}`);
    let headeroptions = new RequestOptions({ headers: headers });
    return this.http.post(this.URL + "/city/dropdown", {}, headeroptions);
  }








  
}
