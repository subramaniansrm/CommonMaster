import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentLoaderService } from './shared/component-loader.service';
import { Router, NavigationEnd } from '@angular/router';
import { ChatAdapter, ParticipantResponse, ChatParticipantType, ChatParticipantStatus, IChatController } from 'ng-chat';
// import { SocketIOAdapter } from './socketio-adapter';
import { Socket } from 'ng-socket-io';
import { Http } from '@angular/http';
// import { ChatTriggerService } from './chat-trigger.service';
import { interval } from 'rxjs';
import { HeaderService } from './shared/layout/app-layout/header/header.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CommonMaster';
  loginstatus: boolean;
  userId: string;
  username: string;
  showLoader: boolean;
  // public adapter: ChatAdapter;
  currentUrl: string;
  // @ViewChild('ngChatInstance') protected ngChatInstance: IChatController;
  constructor(private router: Router, private HeaderService: HeaderService,  private http: Http,
    private componentloaderService: ComponentLoaderService, private route: Router) {
      
    // let kiosk_access_token = localStorage.getItem('kiosk_access_token');
    // if (kiosk_access_token === null) {
    //   this.HeaderService.postlogin().subscribe(data => {
    //     let loginRes = JSON.parse(data['_body']);
    //     if (loginRes.responseCode == '200') {
    //       localStorage.setItem('kiosk_access_token', loginRes.succesObject.access_token);
    //       this.router.navigateByUrl('/dashboard');
    //     } else if (loginRes.responseCode == '401') {
    //       this.router.navigateByUrl('/');
    //     }
    //   }, error => {
    //     this.router.navigateByUrl('/home');
    //     console.log(error)
    //     if (error.status === 401) {
    //     }
    //   });
    // }
  }
  doSomething() {
    let acc = localStorage.getItem('kiosk_access_token');
    let userDetails = this.HeaderService.kiosk_access_tokenCheck().subscribe(
      data => {
        let resp = JSON.parse(data['_body']);
      }, error => {
        if (error.status == '405') {
          window.localStorage.removeItem("kiosk_access_token");
          window.localStorage.clear();
          this.router.navigateByUrl('/');
        }
      })

  }
  ngOnInit() {
    this.componentloaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }
  // routeEvent(router: Router) {
  //   router.events.subscribe(e => {
  //     if (e instanceof NavigationEnd) {
  //       this.currentUrl = e.url;
  //     }
  //   });
  // }
  // public joinRoom(): void {
  //   this.socket.emit("join", this.username);
  // }

  // public InitializeSocketListerners(): void {
  //   this.socket.on("generatedUserId", (userId) => {
  //     this.adapter = new SocketIOAdapter(userId, this.socket, this.http);
  //     this.userId = userId;
  //   });
  // }
}
