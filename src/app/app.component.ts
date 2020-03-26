import { Component } from "@angular/core";
import { AppService } from "./app-service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";
  constructor(private readonly _appService: AppService) {}
  ngOnInit() {
    this._appService.subscribeEvents([
      "ADD_CUSTOMER_CLICK",
      "CANCEL_ADD_CUSTOMER_CLICK",
      "DELETE_CUSTOMER_CLICK"
    ]);
  }
}
