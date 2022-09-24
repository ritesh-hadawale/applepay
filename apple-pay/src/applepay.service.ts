import { Injectable, EventEmitter  } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { firstValueFrom, lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApplepayService {
  baseURL: any;
  ggg: any;
  createorder: any;
  teams: any;

  constructor(
    private http: HttpClient,
  ) { }
  public updateNumberOfProducts = new EventEmitter<any>();
  private httpHeader = new HttpHeaders().set(
    "authentication-key",
    "g9nWYgWnHWv7AqbumsQeoGhN7k43sGRwD4js83FD"
  );

  

  public performMerchantValidation(validationURL: string) {
    this.baseURL = '/rest/model/vitaminshoppe/apple/payment/actor/ApplePayActor/validateMerchant';
   

    return this.ggg = firstValueFrom (this.http.get<any>(`${this.baseURL},"applePayURL="`  + validationURL,))
    .then(ggg =>{
      console.log (this.ggg)
      return  ggg;
    });

    
  }

  validateMerchant() {
    return fetch("https://qa1.vitaminshoppe.com/rest/model/vitaminshoppe/apple/payment/actor/ApplePayActor/createApplePayOrder", {
      
      // Adding method type
      method: "POST",
        
      // Adding body or contents to send
      body: JSON.stringify({}),

    
      // Adding headers to the request
      // headers: {
      //     // "Content-type": "application/json; charset=UTF-8"
      //     this.httpHeader
          
      // }
    });
  }

  public getApplePayLineItems() {
     this.http
      .post(
        "https://qa1.vitaminshoppe.com/rest/model/vitaminshoppe/apple/payment/actor/ApplePayActor/createApplePayOrder",
        {},
        {
          headers: this.httpHeader
        }
      )
      .subscribe(response => {
        this.teams= response;
        console.log(this.teams)
      });
  }

}
