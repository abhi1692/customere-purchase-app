import { Customer } from "../models/customere-model";

export class Constants {

    public static customerLabels = {
        name: "Name",
        numberOfItems: "# Of Items",
        amount: "Amount",
        action: "Action",
        editButton: "EDIT",
        deleteButton: "DELETE",
        addCustomere: "Add Customer",
        firstName: "First Name",
        lastName: "last Name",
        itemsPurchase: "Items Purchased",
        totalAmount: "Total Amount",
        cancel: "Cancel",
        customerDeatils: "Customer Deatils",
        errorMsgFirstName: "First Name can be character only.",
        errorMsgCountOfPurchasedItem: " Item Purchased item can be number only.",
        errorMsgAmount: "Amount of Items can be number only."
    }

    public static mockCustomerData: Customer[] = [
        { customerId: 1, firstName: 'Abhinav', lastName: 'Singh', countOfPurchase: 3, amountOfItems: 1000 },
        { customerId: 2, firstName: 'Abhay', lastName: 'Singh', countOfPurchase: 5, amountOfItems: 2000 },
        { customerId: 3, firstName: 'Rahul', lastName: 'Singh', countOfPurchase: 8, amountOfItems: 3000 }
    ];

    public static patterns = {
        numberValidator: /^[0-9]*$/,
        onlyTextWithoutSpace: /[a-zA-Z]+([\s][a-zA-Z]+)*/,
      };
}
