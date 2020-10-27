import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-sample',
  templateUrl: './master-sample.component.html',
  styleUrls: ['./master-sample.component.css']
})
export class MasterSampleComponent implements OnInit {
  href;
  url;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    // this.url = window.location.href;
    // console.log("Windows url",this.url);
    // this.href = this.url.split('/commonmaster/')[0];
  }

  page(){
    this.router.navigate(['/master-sample2']);
    // window.open(this.url+'/master-sample2',"_self");

  }

}
