import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { InvalidAccessComponent } from './shared/invalid-access/invalid-access.component';
import { HomeComponent } from './home/home.component';
import { RoleName } from './shared/model/role';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'employees', 
    loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_LIST_ALL_EMPLOYEES, 
      RoleName.ROLE_REGISTER_NEW_EMPLOYEE, 
      RoleName.ROLE_VIEW_EMPLOYEE_DETAILS, 
      RoleName.ROLE_UPDATE_EMPLOYEE_DATA, 
      RoleName.ROLE_DELETE_EMPLOYEE
    ] }
  },
  {
    path: 'staffs', 
    loadChildren: () => import('./staffs/staffs.module').then(m => m.StaffsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_LIST_ALL_STAFFS, 
      RoleName.ROLE_REGISTER_NEW_STAFF, 
      RoleName.ROLE_VIEW_STAFF_DETAILS, 
      RoleName.ROLE_UPDATE_STAFF_DATA, 
      RoleName.ROLE_DELETE_STAFF
    ] }
  },
  {
    path: 'vacations', 
    loadChildren: () => import('./vacations/vacations.module').then(m => m.VacationsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { roles: [
      RoleName.ROLE_LIST_ALL_VACATIONS, 
      RoleName.ROLE_REGISTER_NEW_VACATION, 
      RoleName.ROLE_VIEW_VACATION_DETAILS, 
      RoleName.ROLE_UPDATE_VACATION_DATA, 
      RoleName.ROLE_DELETE_VACATION
    ] }
  },
  {
    path: 'invalid-access', 
    component: InvalidAccessComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
