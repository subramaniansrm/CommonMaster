import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  
  constructor(
    private router: Router,
    public headerService: HeaderService,
    private dialog: MatDialog) {
   
  }
  ngOnChanges() {
  }
  ngOnInit() {
    let acc = localStorage.getItem('access_token');
    if (acc !== null) {
      let today = new Date();
      console.log(today);
    }    
  }
  
  
  
  logout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
      width: 'auto',
      data: {
        title: 'Confirmation',
        message: 'logout',
        btnYes: 'Yes',
        btnNo: 'No'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        window.localStorage.removeItem("kiosk_access_token");
        sessionStorage.removeItem("kiosk_access_token");
        window.localStorage.clear();
        this.router.navigateByUrl('/');
      }
    });
  }

}
