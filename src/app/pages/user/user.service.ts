
import { Injectable } from '@angular/core';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable} from 'rxjs';
import { environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:Http) { }
  private URL: string = environment.API_HOST;
userList():Observable<{}>{
  let headers= new Headers();
  //headers.append('Content-Type', 'application/json');
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem("kiosk_access_token");
  headers.append('Authorization', `Bearer ${authToken}`);

  //headers.append('access_token', localStorage.getItem("kiosk_access_token"));
  let headeroptions = new RequestOptions({ headers: headers });
  let data = {subScreenId: 7};
  return this.http.post(this.URL+"/user/getAll", data, headeroptions );
}
search_list(list):Observable<{}>{
  let headers= new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem("kiosk_access_token");
  headers.append('Authorization', `Bearer ${authToken}`);

//  headers.append('access_token', localStorage.getItem("kiosk_access_token"));
  let headeroptions = new RequestOptions({ headers: headers });
  return this.http.post(this.URL+"/user/search", list, headeroptions);
}
deleteUserList(list):Observable<{}>{
  let headers= new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem("kiosk_access_token");
  headers.append('Authorization', `Bearer ${authToken}`);

 // headers.append('access_token', localStorage.getItem("kiosk_access_token"));
  let headeroptions = new RequestOptions({ headers: headers });
  let data = {deleteItem : list, accessToken : localStorage.getItem("kiosk_access_token")};
  return this.http.post(this.URL+"/user/delete", data, headeroptions);
}
}
