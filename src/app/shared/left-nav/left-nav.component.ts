import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderService } from '../../shared/layout/app-layout/header/header.service';
import { environment } from '../../../environments/environment';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
// import { ChatTriggerService } from 'src/app/chat-trigger.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {

  fullurl = environment.API_HOST;
  url: string = this.fullurl.substring(0, this.fullurl.length - 3);
  // loginstatus:boolean;
  userDetails: any;
  mailDetails: any;
  appcount: any;
  notificationcount: any;
  approvallist: any = [];
  masterlist: any = [];
  configlist: any = [];
  transactionlist: any = [];
  userName: any;
  screenList: any;


  constructor(private router: Router,
    private dialog: MatDialog,
    private headerService: HeaderService,) {
  }




  IsHidden = true;
  IsIsHidden = true;
  IsIsIsHidden = true;

  onSelect1() {
    this.IsHidden = !this.IsHidden;
  }

  onSelect2() {
    this.IsIsHidden = !this.IsIsHidden;
  }

  onSelect3() {
    this.IsIsIsHidden = !this.IsIsIsHidden;
  }

  sidenavWidth = 50;
  // increase() {
  //   this.sidenavWidth = 213;
  // }
  // decrease() {
  //   this.sidenavWidth = 50;
  // }  
  isActive: boolean = true;

  increase(): void {
    if (this.isActive) {
      this.sidenavWidth = 213;
      this.isActive = !this.isActive
    }
    else {
      this.sidenavWidth = 50;
      this.isActive = !this.isActive
    }
  }

  ngOnInit() {
    let acc = localStorage.getItem('kiosk_access_token');
    let url = window.location.href;
    console.log("Windows url", url);
    this.href = url.split('/commonmaster/')[0];

    this.userProfileDetails();

    // this.masterlist = [
    //   { screenName: "Location", screenUrl: "/location", screenIcon: "location_on" },
    //   { screenName: "Department", screenUrl: "/department", screenIcon: "games" },
    //   { screenName: "Sublocation", screenUrl: "/sublocation", screenIcon: "dns" },
    //   { screenName: "User", screenUrl: "/user", screenIcon: "account_box" },
    //   { screenName: "UserRole", screenUrl: "/userrole", screenIcon: "library_books" },

    //   { screenName: "Customer", screenUrl: "/customer", screenIcon: "games" },
    // ]
  }


  userProfileDetails() {
    let userDetails = this.headerService.headerDetails().subscribe(
      data => {
        let resp = JSON.parse(data['_body']);
        this.userName = resp.succesObject.name;
        this.userDetails = resp.succesObject.name;
        this.screenList = resp.cmSuccesObject;
       
        this.masterlist = this.screenList.screenCMVoList.filter(s => s.screenTypeFlag.includes('M'));
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


  logout() {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
      panelClass: 'btnCenter',
      width: 'auto',
      data: {
        title: 'Confirmation',
        message: 'logout',
        btnYes: 'Yes',
        btnNo: 'No'
      }

    });
    dialogRef.afterClosed().subscribe(data => {
      if (data == true) {

        //before kdesk
        // window.open(this.href+'/common/',"_self","", true)


        window.open(this.href + '/kiosk/', "_self", "", true)


      }
    });
  }

  routerUrlCofig(path) {
    this.router.navigate([path]);
  }

  windowurl: string;
  href: string;
  dashboard() {
    this.windowurl = window.location.host;
    this.href = this.windowurl.split('/commonmaster/')[0];


    // before Kdesk
    // console.log('path',this.href+'/common');
    // window.open('/common',"_self");

    console.log('path', this.href + '/kiosk');
    window.open('/kiosk', "_self");

  }



  //before kdesk
  // tray(path){
  //   alert(this.href+'/common')
  //   this.router.navigateByUrl(this.href+'/common')
  // }


  tray(path) {
    alert(this.href + '/kiosk')
    this.router.navigateByUrl(this.href + '/kiosk')
  }

}
