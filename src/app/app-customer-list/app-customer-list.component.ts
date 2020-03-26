import { Component, OnInit, OnDestroy } from "@angular/core";
import { Customer } from "../../core/models/customere-model";
import { Router } from "@angular/router";
import { AppService } from "../app-service";
import { Constants } from "../../core/utils/constant";
import { Subscription } from "rxjs/Subscription";
// import { ebsService } from "exro-ebs";

@Component({
  selector: "app-app-customer-list",
  templateUrl: "./app-customer-list.component.html",
  styleUrls: ["./app-customer-list.component.scss"]
})
export class AppCustomerListComponent implements OnInit, OnDestroy {
  customerDetailSubscription: Subscription;
  customerLabels = Constants.customerLabels;
  customerToBeEdit: Customer;
  isEditCustomer: boolean;
  isShowCustomerDetails: boolean;
  customerDetails: Customer[];
  viewCustomerDetails: Customer;
  isToDelete = false;
  customerTobeDeleted: Customer;
  constructor(
    private readonly router: Router,
    private readonly _appService: AppService
  ) {}

  ngOnInit() {
    this.isEditCustomer = false;
    this.isShowCustomerDetails = false;
    this._appService.listOfCustomer = Constants.mockCustomerData;
    this.customerDetails = this._appService.getListOfCustomere();
    this.addUpdatedCustomere();
  }

  addCustomere() {
    this._appService.publishEvents("ADD_CUSTOMER_CLICK", {
      EVENT: "ADD_CUSTOMER_CLICK",
      CLICKED: true,
      CURRENT_URL: this.router.url,
      NEXT_URL: "./add-customer"
    });
    this.router.navigate(["./add-customer"]);
  }

  addUpdatedCustomere() {
    this.customerDetailSubscription = this._appService
      .getCustomereDetails()
      .subscribe((custDetails: Customer) => {
        if (custDetails) {
          const filteredCustomere = this.customerDetails.filter(
            customer => customer.customerId === custDetails.customerId
          );
          if (filteredCustomere && filteredCustomere.length) {
          } else {
            custDetails.customerId = Math.random();
            this._appService.setListOfCustomere(custDetails);
            this.customerDetails = this._appService.getListOfCustomere();
          }
        }
      });
  }

  editCustomerDetails(customer: Customer) {
    this.isEditCustomer = true;
    this.isShowCustomerDetails = false;
    this.customerToBeEdit = customer;
  }

  showCustomerDetails(customer: Customer) {
    if (customer) {
      this.viewCustomerDetails = customer;
      this.isShowCustomerDetails = true;
    }
  }

  confirmCustomerDelete(customer: Customer) {
    this._appService.publishEvents("DELETE_CUSTOMER_CLICK_INITIATED", {
      EVENT: "DELETE_CUSTOMER_CLICK_INITIATED",
      CLICKED: true,
      CURRENT_URL: this.router.url
    });
    this.isToDelete = true;
    this.customerTobeDeleted = customer;
  }
  deleteCustomerDetails() {
    this.customerDetails = this._appService
      .getListOfCustomere()
      .filter(
        customer => customer.customerId !== this.customerTobeDeleted.customerId
      );
    this._appService.listOfCustomer = this.customerDetails;
    this.cancelDelete();
  }

  cancelDelete() {
    this.isToDelete = false;
    this.isShowCustomerDetails = false;
  }

  closeEdit(isClose: boolean) {
    this.isEditCustomer = !isClose;
    this.isShowCustomerDetails = !isClose;
    this.customerDetails = this._appService.getListOfCustomere();
  }

  ngOnDestroy() {
    this.customerDetailSubscription.unsubscribe();
  }
}
