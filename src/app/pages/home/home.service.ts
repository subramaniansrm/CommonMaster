
import { Injectable } from '@angular/core';
import { RequestOptions, Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http:Http) { }

}
