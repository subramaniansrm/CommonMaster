import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { ComponentLoaderService } from 'src/app/shared/component-loader.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HeaderService } from 'src/app/shared/layout/app-layout/header/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeservice: HomeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private componentLoaderService: ComponentLoaderService,
    private HeaderService : HeaderService) { }

  ngOnInit() {
    // this.login();
    this.componentLoaderService.display(true);
    let kiosk_access_token =   localStorage.getItem('kiosk_access_token');
    console.log(kiosk_access_token)
    let name = btoa("lokeshkumaran");
    let nameorg = atob(name);
    console.log(nameorg)
    if(kiosk_access_token === null && sessionStorage.getItem('kiosk_access_token') === null){
    this.HeaderService.homepostlogin().subscribe(data =>{
      let loginRes = JSON.parse(data['_body']);
      if (loginRes.responseCode == '200') {
        localStorage.setItem('kiosk_access_token', loginRes.succesObject.access_token);
        sessionStorage.setItem('kiosk_access_token', loginRes.succesObject.access_token);
      this.router.navigateByUrl('/dashboard');
      } else if (loginRes.responseCode == '401') {
        this.router.navigateByUrl('/');
      }
    },error=>{
      this.router.navigateByUrl('/');
      console.log(error)
      if(error.status === 401)
      {
      }
    });
  }
  this.componentLoaderService.display(false);
  }

  // login(){
  //   console.log("login method");
  //   this.homeservice.login().subscribe(
  //     data => {
  //       let resp = JSON.parse(data['_body']);
  //      console.log("response",resp);
  //     })
  // }
}
