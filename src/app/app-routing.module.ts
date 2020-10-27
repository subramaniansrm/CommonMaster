import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [




  //coment for build - Rathika

  
  {
    path: "login",
    loadChildren: "./pages/auth/login/login.module#LoginModule",
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: "dashboard",
    loadChildren: "./pages/dashboard/dashboard.module#DashboardModule",
  },
  {
    path: "master-sample",
    loadChildren: "./pages/master-sample/master-sample.module#MasterSampleModule",
  },
  // {
  //   path: "master-sample2",
  //   loadChildren: "./pages/master-sample2/master-sample2.module#MasterSample2Module",
  // },

  
  {
    path: "location",
    loadChildren: './pages/location/location.module#LocationModule'
  },
  {
    path: "userrole",
    loadChildren: './pages/user-role/user-role.module#UserRoleModule'
  },
  {
    path: "user",
    loadChildren: './pages/user/user.module#UserModule'
  },
  {
    path: "department",
    loadChildren: './pages/department/department.module#DepartmentModule'
  },
  {
    path: "sublocation",
    loadChildren: "./pages/sublocation/sublocation.module#SublocationModule"
  },
  {
    path: "sales",
    loadChildren: "./pages/sales/sales.module#SalesModule"
  },

  {
    path: "customer",
    loadChildren: "./pages/customer/customer.module#CustomerModule"
  },

  {
    path: "dropdown",
    loadChildren: './pages/dropdown/dropdown.module#DropdownModule'
  },
  {
    path: "authCommon",
    loadChildren: './pages/user-sales-mapping/user-sales-mapping.module#UserSalesMappingModule'
  },
  {
    path: "packType",
    loadChildren: './pages/packtype/packtype.module#PacktypeModule'
  },



  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
