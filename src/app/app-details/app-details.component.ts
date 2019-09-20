import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Customer } from "../../core/models/customere-model";
import { AppService } from "../app-service";
import { Router } from "@angular/router";
import { Constants } from "../../core/utils/constant";

@Component({
  selector: 'app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.scss']
})
export class AppDetailsComponent implements OnInit {
  customerLabels = Constants.customerLabels;
  addNewCustomereForm: FormGroup;
  newCustomereDetails: Customer;
  @Input() customerToEdit: Customer;
  @Output() closeEdit = new EventEmitter();
  constructor(private readonly _appService: AppService,
    private readonly router: Router) { }

  ngOnInit() {
    this.createForm();
    if (this.customerToEdit) {
      this.addNewCustomereForm.patchValue({
        customerId: this.customerToEdit.customerId,
        firstName: this.customerToEdit.firstName,
        lastName: this.customerToEdit.lastName,
        countOfPurchase: this.customerToEdit.countOfPurchase,
        amountOfItems: this.customerToEdit.amountOfItems
      })
    }

  }

  createForm() {
    this.addNewCustomereForm = new FormGroup({
      customerId: new FormControl(""),
      firstName: new FormControl("", [Validators.required,Validators.pattern(Constants.patterns.onlyTextWithoutSpace)]),
      lastName: new FormControl(""),
      countOfPurchase: new FormControl("", [Validators.required,Validators.pattern(Constants.patterns.numberValidator)]),
      amountOfItems: new FormControl("", [Validators.required,Validators.pattern(Constants.patterns.numberValidator)]),
    });
  }

  addCustomereDetails() {
    if (this.customerToEdit) {
      const filteredEditedData = this._appService.listOfCustomer.
      filter(cust => cust.customerId === this.addNewCustomereForm.controls['customerId'].value)
        .map(tranCust => {
          return tranCust = this.addNewCustomereForm.value;
        });
      const index = this._appService.listOfCustomer.indexOf(this._appService.listOfCustomer
        .filter(cust => cust.customerId === this.addNewCustomereForm.controls['customerId'].value)[0]);
      this._appService.listOfCustomer[index] = filteredEditedData[0];

      this.closeEdit.emit(true);
    } else {
      this.newCustomereDetails = this.addNewCustomereForm.value;
      this._appService.setCustomereDetails(this.newCustomereDetails);
      this.router.navigate(['']);
    }
  }

  cancel() {
    if (this.customerToEdit) {
      this.closeEdit.emit(true);
    } else {
      this.router.navigate(['']);
    }
  }

}
