import { Injectable } from '@angular/core';
import { Customer } from "../core/models/customere-model";
import { Observable, } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppService {
    customereDetails = new BehaviorSubject<Customer>(null);
    listOfCustomer: Customer[];

    setListOfCustomere(customer: Customer) {
        if (!this.listOfCustomer) {
            this.listOfCustomer = [];
        }
        this.listOfCustomer.push(customer);
    }

    getListOfCustomere(){
        return this.listOfCustomer;
    }
    setCustomereDetails(customerDetails: Customer){
        this.customereDetails.next(customerDetails);
    }

    getCustomereDetails(): Observable<Customer>{
        return this.customereDetails;
    }
}