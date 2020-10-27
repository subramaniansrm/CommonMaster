
import { Component, OnInit, ViewChild, Output, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, VERSION, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';

import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentLoaderService } from '../../../shared/component-loader.service';
import { UpdateService } from '../update/update.service';
import { ViewUserSalesService } from './view-user-sales.service';
@Component({
  selector: 'app-view-user-sales',
  templateUrl: './view-user-sales.component.html',
  styleUrls: ['./view-user-sales.component.css']
})
export class ViewUserSalesComponent implements OnInit {


  modify_selectGetData: any;
  plantCombo: any = [];
  //subscreenList : any;
  activeFlag: false;
  screenId: any;
  userMappingSalesOrgVOList: any = [];
  userPlantMappingVOList: any = [];
  subscreenList: any = [];
  saveForm: FormGroup;
  screenFieldList: any = [];

  userCombo: any;
  darkScrollbarOptions = {
    axis: "y",
    theme: "dark",
    scrollButtons: { enable: true }
  };
  salesCombo: any;
  screenCombo: any;
  roleId: any;
  name: String;
  screenFunction: any[];
  screenFucntionList: any = [];
  userRoleMappingVOList: any = [];
  salesOrgId: any;
  constructor(
    private componentLoaderService: ComponentLoaderService,
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private updateService: UpdateService,
    private viewUserSalesService: ViewUserSalesService,
  ) {

  }

  ngOnInit() {
    this.componentLoaderService.display(true);
    this.loadData();
  }

  loadData() {


    let user = this.updateService.loadUser().subscribe(data => {
      let division_selectGetData = JSON.parse(data['_body']);
      this.userCombo = division_selectGetData.succesObject;
      console.log("user drop : ", this.userCombo)
      for (let i = 0; i < this.userCombo.length; i++) {
        if (this.userCombo[i].activeFlag === true) {
          this.selectRoleManual(this.userCombo[i].roleId)
        }
      }
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });


    let sales = this.updateService.loadSales().subscribe(data => {
      let division_selectGetData = JSON.parse(data['_body']);
      this.salesCombo = division_selectGetData.succesObject;
      console.log("user drop : ", this.salesCombo)
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });



    let screen = this.updateService.loadScreen().subscribe(data => {
      let division_selectGetData = JSON.parse(data['_body']);
      this.screenCombo = division_selectGetData.succesObject;
      this.name = division_selectGetData.userName;
      console.log("Screen : ", this.screenCombo)
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });









    // let departmentmodifyData = this.viewUserSalesService.viewMappingData().subscribe(data => {
    //   this.modify_selectGetData = JSON.parse(data['_body']);
    //   console.log("View Value : ", this.modify_selectGetData);
    //   // this.userCombo = this.modify_selectGetData.succesObject.userRoleMappingVOList;

    //   this.componentLoaderService.display(false);
    // }, error => {
    //   if (error.status === 401) {
    //     alert("Error");
    //   }
    // });


    this.componentLoaderService.display(false);

  }
  // onSubmit() {
  //   //if (this.newScrFn.length > 0) {
  //     const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //       disableClose: false,
  //       width: 'auto',
  //       data: {
  //         title: 'Confirmation',
  //         message: "submit",
  //         btnPrjYes: 'Yes',
  //         btnPrjNo: 'No',
  //       }
  //     });
  //     dialogRef.afterClosed().subscribe(result => {
  //       if (result) {
  //         let finalValue = {};
  //         // finalValue['roleId'] = Number(localStorage.getItem('roleId'));
  //         console.log(this.newScrFn);
  //         finalValue['userMappingSalesOrgVOList'] = this.salesFn;
  //         finalValue['userRoleMappingVOList'] = this.roleList;
  //         finalValue['userScreenMappingVOList'] = this.newScrFn;
  //         finalValue['userId'] = localStorage.getItem("authId");

  //         let loadSubScreenFields = this.updateService.modifyAuth(
  //           finalValue
  //         ).subscribe(
  //           data => {
  //             let ScreenGetData = JSON.parse(data["_body"]);
  //             if (ScreenGetData.responseCode === "200") {
  //               const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //                 disableClose: false,
  //                 panelClass: "btnCenter",
  //                 width: "auto",
  //                 data: {
  //                   title: 'Info',
  //                   server: 'servermessage',
  //                   message: ScreenGetData.responseMessage,
  //                   btnYes: "OK"
  //                 }
  //               });
  //               dialogRef.afterClosed().subscribe(data => {
  //                 this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(
  //                   ['/auth']));
  //               });
  //             } else {
  //               const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //                 disableClose: false,
  //                 panelClass: "btnCenter",
  //                 width: "auto",
  //                 data: {
  //                   title: 'Alert',
  //                   server: 'servermessage',
  //                   message: ScreenGetData.responseMessage,
  //                   btnYes: "OK"
  //                 }
  //               });
  //             }
  //           },
  //           error => {
  //             alert("error");
  //           }
  //         );
  //       }
  //     });
  //   // } else {
  //   //   //console.log(this.newScreenForm.value);
  //   //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //   //     disableClose: false,
  //   //     panelClass: "btnCenter",
  //   //     width: "auto",
  //   //     data: {
  //   //       title: 'Alert',
  //   //       message: "mandatory",
  //   //       btnYes: "OK"
  //   //     }
  //   //   });
  //   // }


  // }

  cancel() {
    this.router.navigateByUrl("/authCommon");
  }
  roleList: any = [];

  getRoleValue(event, data,item,allRole) {

    console.log("DATA", data);
    console.log("EVENBT", event);


    // for (let i = 0; i < allRole.length; i++) {
    //   if (allRole[i].activeFlag === true) {
    //     this.roleList.push({roleId : allRole[i].roleId})
    //   }
    // }

    let obj = {
      roleId: data,   
    };

      
    // }


    

    if (event.checked === true) {
      this.roleList.push(obj);

    }





    else {
      console.log("false cond")
      let len = this.roleList.length;
      for (let i = 0; i <= len; i++) {
        let el = this.roleList.find(itm => itm.roleId === data);
        if (el) this.roleList.splice(this.roleList.indexOf(el), 1);
      }


      console.log(this.roleList)
    }

    console.log("List", this.roleList)





    // this.userRoleMappingVOList = data;
    // console.log ("usermapping :" ,  this.userRoleMappingVOList)



  }


  salesList: any = [];
  getSaleValue(event, data) {

    console.log("DATA", data);
    console.log("EVENBT", event);
    let obj = {
      salesOrgId: data,
      id: localStorage.getItem("id"),
      activeFlag: true
    };

    if (event.checked === true) {
      this.userMappingSalesOrgVOList.push(obj);


    }
    else {
      let len = this.userMappingSalesOrgVOList.length;
      for (let i = 0; i <= len; i++) {
        let el = this.userMappingSalesOrgVOList.find(itm => itm.salesOrgId === data);
        if (el) this.userMappingSalesOrgVOList.splice(this.userMappingSalesOrgVOList.indexOf(el), 1);
      }


      console.log(this.userMappingSalesOrgVOList)
    }

    console.log("List", this.userMappingSalesOrgVOList)


    console.log("call plant")

    let plant = this.updateService.loadPlant(data).subscribe(data => {
      let division_selectGetData = JSON.parse(data['_body']);
      this.plantCombo = division_selectGetData.succesObject;

      console.log("plant : ", this.plantCombo)
    }, error => {
      if (error.status === 401) {
        alert("Error");
      }
    });


  }






  salesFn: any = [];
  getSalePlantValue(ev, data) {
    let obj = {
      salesOrgId: data
    };
    if (ev.checked === true) {
      this.salesFn.push(obj);
      this.salesOrgId = data;
      //console.log(this.newScrFn, ev, this.screenId);
      let loadScreenAuthList = this.updateService.loadPlant(data).subscribe(
        data => {
          let ListGetData = JSON.parse(data["_body"]);
          console.log(ListGetData)
          this.plantCombo = ListGetData.succesObject;
          this.salesFn[this.salesFn.length - 1].userPlantMappingVOList = [];


        },
        error => {
          alert("error");
        }
      );
    } else {
      let len = this.salesFn.length;
      for (let i = 0; i <= len; i++) {
        let el = this.salesFn.find(itm => itm.salesOrgId === data);
        if (el) this.salesFn.splice(this.salesFn.indexOf(el), 1);
      }
      // this.userPlantMappingVOList = [];

    }
  }


  getPlantValue(eve, id, item) {

    console.log("call plant changed")
    console.log(this.salesFn, item);
    let len = this.salesFn.length - 1;
    let userPlantMappingVOList = this.salesFn[len].userPlantMappingVOList;
    if (eve.checked === true) {
      console.log("plant one id checked")
      // item.result = true;
      this.salesFn[len].userPlantMappingVOList.push({ plantId: id })
     // this.salesFn[len].push({ userId: Number(localStorage.getItem("authId")) })
    } else {
      // item.result = false;
      // item.baseFilter = false;
      // item.baseResult = false;
      let el = this.salesFn[len].userPlantMappingVOList.find(itm => itm.plantId === id);
      if (el) this.salesFn[len].userPlantMappingVOList.splice(this.newScrFn[len].userPlantMappingVOList.indexOf(el), 1);
    }
    console.log(this.salesFn, item);

  }

  newScrFn: any = [];
  getsubScreenValues(ev, data) {
    let obj = {
      screenId: data,
     // userId : Number(localStorage.getItem("authId"))
    };
    if (ev.checked === true) {
      this.newScrFn.push(obj);
      this.screenId = data;
      console.log(this.newScrFn, ev, this.screenId);
      let loadScreenAuthList = this.updateService.getSubScreen(data).subscribe(
        data => {
          let ListGetData = JSON.parse(data["_body"]);
          console.log(ListGetData)
          this.subscreenList = ListGetData.succesObject;
          this.screenFieldList = [];
          this.screenFucntionList = [];
        },
        error => {
          alert("error");
        }
      );
    } else {
      let len = this.newScrFn.length;
      for (let i = 0; i <= len; i++) {
        let el = this.newScrFn.find(itm => itm.screenId === data);
        if (el) this.newScrFn.splice(this.newScrFn.indexOf(el), 1);
      }
      this.subscreenList = [];
      this.screenFieldList = [];
      this.screenFucntionList = [];

      console.log(this.newScrFn)
    }
  }
  getfieldsValues(ev, data) {
    console.log(data, this.screenId);
    if (ev.checked === true) {
      this.screenFieldList = [];
      this.screenFucntionList = [];
      let screenId = this.screenId;
      // for (let i  = 0; i < this.newScrFn.length; i++){
      //   if(this.newScrFn[i].subScreenId == data){

      //   }else{
      //     this.newScrFn.push({subScreenId: data, screenId : this.newScrFn[i].subScreenId})
      //   }
      // }n 
      console.log(data, this.screenId);
      if (this.newScrFn.length >= 1) {
        if (this.newScrFn[this.newScrFn.length - 1].subScreenId && this.newScrFn[this.newScrFn.length - 1].subScreenId !== data) {
          if (this.newScrFn[this.newScrFn.length - 1].screenId == this.screenId) {
            this.newScrFn.push({ subScreenId: data, screenId: this.screenId })
          }
        }
        console.log(this.newScrFn);
      }
      if (this.newScrFn.length >= 1) {
        this.newScrFn[this.newScrFn.length - 1].subScreenId = data;
        this.newScrFn[this.newScrFn.length - 1].screenId = this.screenId;
      } else {
        this.newScrFn = [{}];
        this.newScrFn[0]['subScreenId'] = data;
        this.newScrFn[0]['screenId'] = this.screenId;
      }
      if (ev.checked === true) {
        let loadScreenAuthList = this.updateService.loadSubScreenFields(data).subscribe(
          data => {
            let ListGetData = JSON.parse(data["_body"]);
            this.screenFieldList = ListGetData.succesObject;
            this.newScrFn[this.newScrFn.length - 1].userScreenFieldMappingVOList = [];
            for (let i = 0; i < ListGetData.succesObject.length; i++) {
              if (ListGetData.succesObject[i].activeFlag === true) {
                this.selectFieldsMAnual(ListGetData.succesObject[i].screenFieldId, ListGetData.succesObject[i].baseFilter)
              }
            }
          },
          error => {
            alert("error");
          }
        );
        let loadScreenFnList = this.updateService.loadScreenFunction(data).subscribe(
          data => {
            let ListGetData = JSON.parse(data["_body"]);
            this.screenFucntionList = ListGetData.succesObject;
            this.newScrFn[this.newScrFn.length - 1].userScreenFunctionMappingVOList = [];
            this.newScrFn[this.newScrFn.length - 1].userScreenFunctionMappingVOList = [];
            for (let i = 0; i < ListGetData.succesObject.length; i++) {
              if (ListGetData.succesObject[i].activeFlag === true) {
                this.selectFunctionsMAnual(ListGetData.succesObject[i].screenFunctionId)
              }
            }
          },
          error => {
            alert("error");
          }
        );
      }
    } else {
      for (let i = 0; i < this.newScrFn.length; i++) {
        console.log(data, this.screenId);
        if (this.newScrFn[i].screenId === this.screenId && this.newScrFn[i].subScreenId === data) {
          this.newScrFn.splice(i, 1);
        }
      }

    }
    console.log(this.newScrFn);
  }
  baseFilterCheck(eve, id, item) {
    console.log(item)
    let len = this.newScrFn.length - 1;
    let userScreenFieldMappingVOList = this.newScrFn[len].userScreenFieldMappingVOList;
    if (eve.checked === true) {
      for (let i = 0; i < userScreenFieldMappingVOList.length; i++) {
        if (userScreenFieldMappingVOList[i]["screenFieldId"] === id) {
          userScreenFieldMappingVOList[i]["activeFlag"] = true;
        }
      }
    } else {
      for (let i = 0; i < userScreenFieldMappingVOList.length; i++) {
        if (userScreenFieldMappingVOList[i]["screenFieldId"] === id) {
          userScreenFieldMappingVOList[i]["baseFilter"] = false;
        }
      }
    }
  }
  fieldValueCheck: any = [];
  fieldCheck(ev, data) {
    let obj = {
      screenFunctionId: data
    };
    if (ev.checked === true) {
      this.fieldValueCheck.push(obj);
    } else {
      let el = this.fieldValueCheck.find(itm => itm.screenFunctionId === data);

      if (el) this.fieldValueCheck.splice(this.fieldValueCheck.indexOf(el), 1);
    }
    console.log(this.fieldValueCheck);
  }




  allNonTrades(event) {
    console.log(event);
    if (event.checked === true) {
      this.newScrFn[this.newScrFn.length - 1].userScreenFieldMappingVOList = [];
      for (let i = 0; i < this.screenFieldList.length; i++) {
        let eve = { checked: true };
        this.selectFields(eve, this.screenFieldList[i].screenFieldId, this.screenFieldList[i]);
      }
    } else {
      this.newScrFn[this.newScrFn.length - 1].userScreenFieldMappingVOList = [];
      for (let i = 0; i < this.screenFieldList.length; i++) {
        let eve = { checked: false };
        this.selectFields(eve, this.screenFieldList[i].screenFieldId, this.screenFieldList[i]);
      }
    }
    // const checked = event.checked;
    // this.comboList["loadSubScreenFields"].forEach(
    //   item => (item.selected = checked)
    // );
    // if (event.checked === true) {
    //   for (let i = 0; i < this.comboList["loadSubScreenFields"].length; i++) {
    //     this.newScrFn.push({
    //       fieldId: this.comboList["loadSubScreenFields"][i].id,
    //       baseFilter: false
    //     });
    //   }
    //   console.log(this.newScrFn);
    // }
  }


  selectFields(eve, id, item) {
    console.log(this.newScrFn, item);
    let len = this.newScrFn.length - 1;
    let userScreenFieldMappingVOList = this.newScrFn[len].userScreenFieldMappingVOList;
    if (eve.checked === true) {
      item.activeFlag = true;
      this.newScrFn[len].userScreenFieldMappingVOList.push({screenFieldId: id })
    } else {
       item.activeFlag = false;
      // item.baseFilter = false;
      // item.baseResult = false;
      let el = this.newScrFn[len].userScreenFieldMappingVOList.find(itm => itm.screenFieldId === id);
      if (el) this.newScrFn[len].userScreenFieldMappingVOList.splice(this.newScrFn[len].userScreenFieldMappingVOList.indexOf(el), 1);
    }
    console.log(this.newScrFn, item);
  }
  selectFieldsMAnual(id, baseFilter) {
    let len = this.newScrFn.length - 1;
    this.newScrFn[len].userScreenFieldMappingVOList.push({screenFieldId: id, baseFilter: baseFilter })
  }
  selectFunctions(eve, id, item) {
    let len = this.newScrFn.length - 1;
    let userScreenFunctionMappingVOList = this.newScrFn[len].userScreenFunctionMappingVOList;
    if (eve.checked === true) {
      item.activeFlag = true;
      this.newScrFn[len].userScreenFunctionMappingVOList.push({ screenFunctionId: id })
    } else {
      item.activeFlag = false;
      let el = this.newScrFn[len].userScreenFunctionMappingVOList.find(itm => itm.screenFunctionId === id);
      if (el) this.newScrFn[len].userScreenFunctionMappingVOList.splice(this.newScrFn[len].userScreenFunctionMappingVOList.indexOf(el), 1);
    }
    console.log(this.newScrFn, eve);
  }
  selectFunctionsMAnual(id) {
    let len = this.newScrFn.length - 1;
    this.newScrFn[len].userScreenFunctionMappingVOList.push({ screenFunctionId: id });

  }






  rolefn : any[ ];
  selectRole(eve, id, item,allRole) {


    
    for (let i = 0; i < allRole.length; i++) {
      if (allRole[i].activeFlag === true) {
        this.selectRoleManual(allRole[i].roleId)
      }
    }
    let len = this.rolefn;
    // userRoleMappingVOList = this.rolefn[len].userScreenFunctionMappingVOList;
    if (eve.checked === true) {
      item.activeFlag = true;
      this.rolefn.push({ roleId: id })
    } else {
      item.activeFlag = false;
      let el = this.rolefn.find(itm => itm.roleId === id);
      if (el) this.rolefn.splice(this.rolefn.indexOf(el), 1);
    }
    console.log(this.newScrFn, eve);




  }


  
  selectRoleManual(id) {
   let len = this.roleList.length - 1;
    this.roleList.push({roleId: id});

  }


 
}
