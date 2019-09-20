import { NgModule, } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { AppCustomerListComponent } from "./app-customer-list/app-customer-list.component";
import { AppDetailsComponent } from "./app-details/app-details.component";

const routes: Routes = [
    { path: '', component: AppCustomerListComponent },
    { path: 'add-customer', component: AppDetailsComponent },
    { path: 'view-customer-details', component: AppDetailsComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
