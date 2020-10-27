import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators, NgForm, Form } from '@angular/forms';
import { ChangepasswordService } from './changepassword.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  hide1;
  hide2;
  hide3;
  userId: string;
  oldpassword: string;
  newpassword: string;
  confirmpassword: string;
  successMessage: string;
  changedmessage: string;
  constructor(private router: Router,
    private dialog: MatDialog,
    private changepasswordService: ChangepasswordService) { }
  ngOnInit() {
    console.log(localStorage.getItem('userId'));
    if (localStorage.getItem('userId') !== null) {
      this.userId = localStorage.getItem('userId');
    }
  }

  changenewpassword(ev): void {

    console.log("change pssword event", ev);


    if (ev.srcElement[0].value == "" || ev.srcElement[1].value == "" || ev.srcElement[2].value == "") {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        disableClose: false,
        width: 'auto',
        data: {
          title: 'Alert',
          message: 'password',
          btnYes: 'OK'

        }
      });
    } else if (ev.srcElement[1].value !== ev.srcElement[2].value) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        disableClose: false,
        width: 'auto',
        data: {
          title: 'Alert',
          message: 'confirmpassword',
          btnYes: 'OK'

        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          //this.newpassword = "";
          this.confirmpassword = "";
        }
      });
    } else if (ev.srcElement[0].value === ev.srcElement[1].value) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        disableClose: false,
        width: 'auto',
        data: {
          title: 'Alert',
          message: 'passwordcheck',
          btnYes: 'OK'

        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.newpassword = "";
          this.confirmpassword = "";
        }
      });
    } else {
      this.changepasswordService.changenew_password(
        this.userId, this.oldpassword, this.newpassword, this.confirmpassword).subscribe(data => {
          let changeNewPasswordRes = JSON.parse(data['_body']);
          this.successMessage = changeNewPasswordRes.responseMessage;
          if (changeNewPasswordRes.responseCode == 200) {
            //  this.changedmessage = 'password changed successfully';
            this.successMessage = changeNewPasswordRes.responseMessage;
            setTimeout(() => {
              window.localStorage.removeItem('kiosk_access_token');
              window.localStorage.clear();
              this.router.navigateByUrl('/');
            }, 2000);


          }
        }, error => {
          if (error.status === 401) {
            alert('Password not matching');
          }
        });
    }
  }
}

