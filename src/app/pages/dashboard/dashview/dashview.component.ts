import { Component, OnInit } from '@angular/core';
import { ComponentLoaderService } from 'src/app/shared/component-loader.service';
import { DOCUMENT } from '@angular/common';
import { Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/shared/layout/app-layout/header/header.service';
@Component({
  selector: 'app-dashview',
  templateUrl: './dashview.component.html',
  styleUrls: ['./dashview.component.css']
})
export class DashviewComponent implements OnInit {

  countList:any[];
  href: string;
  userName: any;
  userDetails: any;
  screenList: any;
  masterlist: any;

  

  constructor( @Inject(DOCUMENT) private document: Document,
  private componentLoaderService: ComponentLoaderService,
  private headerService :HeaderService,
  private router : Router) { }

  ngOnInit() {
    /** local login code pls dont commit */
    
    

    this.userProfileDetails();

    //comment for build -Rathka
    
  //   if(localStorage.getItem('kiosk_access_token') == null ){
  //     this.router.navigate(['/login']);
  // } 
  
  
  
  /** local login code ends **/
  //   // this.document.body.classList.remove('loginonly');
    
    // this.countList = [
    //   {moduleName : "User", modulePath: "/user"},
    //   {moduleName : "Location", modulePath: "/location"},
    //   {moduleName : "Sub-Location", modulePath: "/sublocation"},
    //   {moduleName : "Department", modulePath: "/department"},
    //   {moduleName : "User-Role", modulePath: "/userrole"},
    //   {moduleName : "Customer", modulePath: "/customer"},
    //   {moduleName : "Sales", modulePath: "/sales"},
    //   {moduleName : "Common Dropdown", modulePath: "/dropdown"},
    //   {moduleName : "Authentication", modulePath: "/authCommon"}, 
    // ];
  }

  route(path){
    console.log(path)
    this.router.navigate([path]);
    // window.open(this.href+path,"_self");

  }

  userProfileDetails() {
    let userDetails = this.headerService.headerDetails().subscribe(
      data => {
        let resp = JSON.parse(data['_body']);
        this.userName = resp.succesObject.name;
        this.userDetails = resp.succesObject.name;
        this.screenList = resp.cmSuccesObject;
       
        this.countList = this.screenList.screenCMVoList.filter(s => s.screenTypeFlag.includes('M'));
        console.log("printing countlist",this.countList)
        localStorage.setItem('userName', resp.succesObject.name);
        console.log('userName', resp.succesObject.name)
      },
      error => {
        if (error.status === 401) {
          alert('Error');
        }
      }
    );
  }

  routerUrlCofig(path) {
    this.router.navigate([path]);
  }



}

