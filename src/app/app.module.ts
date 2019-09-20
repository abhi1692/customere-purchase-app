import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppCustomerListComponent } from './app-customer-list/app-customer-list.component';
import { AppDetailsComponent } from './app-details/app-details.component';
import { AppRoutingModule } from "./app-routing.module";
import { AppService } from "./app-service";

@NgModule({
   declarations: [
      AppComponent,
      AppCustomerListComponent,
      AppDetailsComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [AppService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
