import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, firstValueFrom, lastValueFrom, catchError } from 'rxjs';
import { ApplepayComponent } from './applepay/applepay.component';



@Injectable({
  providedIn: 'root'
})
export class ApplepayService {
  reponse: any;
  myObservable: Observable<string> = from(['John', 'Jane', 'James'])
 
constructor(
  private http: HttpClient,
  
) {
  
 }
private httpHeader = new HttpHeaders().set(
  "authentication-key",
  "g9nWYgWnHWv7AqbumsQeoGhN7k43sGRwD4js83FD"
  
);

public async getApplePayLineItems() {
  

  // console.log(response);
  // const reponse : Array<any> = await firstValueFrom(this.http.post<any>('asnd'))
  // return this.http
  //   .post(
  //     "https://qa1.vitaminshoppe.com/rest/model/vitaminshoppe/apple/payment/actor/ApplePayActor/createApplePayOrder",
  //     {},
  //     {
  //       headers: this.httpHeader
  //     }
  //   )
  //   // .subscribe(response => {
  //   //   return response;
  //   // });
  // }
}

  public generateAurusSessionId(): Observable<ApplepayComponent[]>{
    let url= 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get<ApplepayComponent[]>(url);
  }

  public performMerchantValidation(validationURL: string):Observable<any>{
    let baseUrl = "https://qa1.vitaminshoppe.com/rest/model/core/rest/navigation/actor/VSINavigationActor/getEnvConfiguration"
    const headers = new HttpHeaders().set(
      "Access-Control-Allow-Origin",
       "*"
    );
   
    return this.http.get(`${baseUrl}`, {headers})
      
  }

  public validateShippingAddress(shippingContact: any){
    let validateShippingUrl = '/rest/model/vitaminshoppe/apple/payment/actor/ApplePayActor/validateShippingAddress'
    return this.http.post(`${validateShippingUrl}`,
    { 
      shippingContact: shippingContact 
    }, 
    {
      headers: this.httpHeader
    })
  }

  validateMerchant() {
    return fetch("https://apple-pay-gateway.apple.com/paymentservices/paymentSession", {
      
      // Adding method type
      method: "POST",
        
      // Adding body or contents to send
      body: JSON.stringify({
        merchantIdentifier: "merchant.com.codemind.apple-pay",
        displayName: "Apple Pay Test",
        initiative: "web",
        initiativeContext: "makemecode.com"
      }),
        
      // Adding headers to the request
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    });
  }

 

  
}
