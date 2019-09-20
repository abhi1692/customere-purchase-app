import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppCustomerListComponent } from './app-customer-list.component';
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { AppService } from "../app-service";
import { Customer } from "../../core/models/customere-model";
import { Observable } from 'rxjs'
import { of } from 'rxjs/observable/of'


const listOfCustomerMock: Customer[] = [{
  customerId: 1,
  firstName: 'Abhinav',
  lastName: 'Singh',
  countOfPurchase: 9,
  amountOfItems: 500
}]

const appServicestub = {
  setListOfCustomere: jasmine.createSpy("setListOfCustomere"),
  getListOfCustomere: jasmine.createSpy("getListOfCustomere").and.returnValue(listOfCustomerMock),
  getCustomereDetails: jasmine.createSpy("getCustomereDetails").and.returnValue(Observable.of(listOfCustomerMock[0]))
}

describe('AppCustomerListComponent', () => {
  let component: AppCustomerListComponent;
  let fixture: ComponentFixture<AppCustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCustomerListComponent ],
      imports: [BrowserDynamicTestingModule, HttpClientModule, RouterTestingModule],
      providers: [{ provide: AppService, useValue: appServicestub }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit customer details', () => {
    component.editCustomerDetails(listOfCustomerMock[0]);
    expect(component.isEditCustomer).toBeTruthy();
  });

  it('should show customer details', () => {
    component.showCustomerDetails(listOfCustomerMock[0]);
    expect(component.isShowCustomerDetails).toBeTruthy();
  });
  
  it('should delete customer details', () => {
    component.confirmCustomerDelete(listOfCustomerMock[0]);
    expect(component.isToDelete).toBeTruthy();
  });
  
  it('should cancel delete and close pop up', () => {
    component.cancelDelete();
    expect(component.isToDelete ).toBeFalsy();
  });

  it('should close edit', () => {
    component.closeEdit(true);
    expect(component.isEditCustomer).toBeFalsy();
  });

  it('should close edit', () => {
    component.customerTobeDeleted = listOfCustomerMock[0];
    component.deleteCustomerDetails();
    expect(component.isToDelete).toBeFalsy();
  });
  
  
  
});
