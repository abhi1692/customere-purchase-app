import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { AppService } from "../app-service";
import { Customer } from "../../core/models/customere-model";
import { Observable } from 'rxjs'
import { of } from 'rxjs/observable/of'
import { AppDetailsComponent } from "./app-details.component";
import { inject } from "@angular/core/testing";


const listOfCustomerMock: Customer[] = [{
  customerId: 1,
  firstName: 'Abhinav',
  lastName: 'Singh',
  countOfPurchase: 9,
  amountOfItems: 500
}]

const appServicestub = {
  setCustomereDetails: jasmine.createSpy("setCustomereDetails"),
  getListOfCustomere: jasmine.createSpy("getListOfCustomere").and.returnValue(listOfCustomerMock),
  getCustomereDetails: jasmine.createSpy("getCustomereDetails").and.returnValue(Observable.of(listOfCustomerMock[0]))
}

describe('AppDetailsComponent', () => {
  let component: AppDetailsComponent;
  let fixture: ComponentFixture<AppDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDetailsComponent ],
      imports: [BrowserDynamicTestingModule, HttpClientModule, RouterTestingModule],
      providers: [{ provide: AppService, useValue: appServicestub }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update customer', inject([AppService], (service: AppService) => {
    spyOn(component.closeEdit, "emit");
    service.listOfCustomer = listOfCustomerMock;
    component.customerToEdit = listOfCustomerMock[0];
    component.addCustomereDetails();
    expect(component.closeEdit.emit).toHaveBeenCalledWith(true);
  }));

  it('should add customer', inject([AppService], (service: AppService) => {
    component.addNewCustomereForm.patchValue({
      customerId: 7,
      firstName: 'Rahul',
      lastName: 'Singh',
      countOfPurchase: 9,
      amountOfItems: 90
    })
    component.customerToEdit = null;
    component.newCustomereDetails = component.addNewCustomereForm.value;
    component.addCustomereDetails();
    expect(component.newCustomereDetails.firstName).toBe('Rahul');
  }));

  it('should cancel', () => {
    spyOn(component.closeEdit, "emit");
    component.customerToEdit = listOfCustomerMock[0];
    component.cancel();
    expect(component.closeEdit.emit).toHaveBeenCalledWith(true);
  });
});
