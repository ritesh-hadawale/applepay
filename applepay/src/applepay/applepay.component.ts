import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { ApplepayService } from '../applepay.service';

@Component({
  selector: 'app-applepay',
  templateUrl: './applepay.component.html',
  styleUrls: ['./applepay.component.scss']
})
export class ApplepayComponent implements OnInit {
  clickedApplePayButton: any;
  applePayLineItems: any;
  orderType: string = "";
  bopusAddressList: any;
  safariVersion: number = 0;
  applePaySessionObj: any;
  applePayVersion: number = 10;
  aurusApplePaySessionId: any;
  myTimer: any;
  subject: any;
  httpClient: any;
  posts = new Array<ApplepayComponent>();
  body: any;
  id: any;
  title: any;
  userId: any;
  updatedLineItems: any = {};

  constructor(
    private applepayservice: ApplepayService,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
   
  }

  /* On Click Of apple pay button this function gets call*/

  displayPaysheet(event: any) {
    console.log('On Apple Pay Clicked');
    this.clickedApplePayButton = event.currentTarget;

    /* invokes payment sheet for apple pay */
    const paymentRequestObj: any = {
      countryCode: "US",
      currencyCode: "USD",
      merchantCapabilities: ["supports3DS"],
      supportedNetworks: ["visa", "masterCard", "amex", "discover"],
      total: {
        "label": "Demo (Card is not charged)",
        "type": "final",
        "amount": "1.99"
      },
    };


   // Create ApplePaySession
    this.applePaySessionObj = new (window as any).ApplePaySession(
      this.applePayVersion,
      paymentRequestObj
    );

    this.applePaySessionObj = async (event: any) => {
       // Call your own server to request a new merchant session.
      console.log('Inside On Validate Merhant');
      const merchantSession = await this.applepayservice.validateMerchant();
      console.log('merchantsession', merchantSession);
      this.applePaySessionObj.completeMerchantValidation(merchantSession);
    }

    this.applePaySessionObj.onpaymentmethodselected = (event: any) =>{
      const update = {};
      this.applePaySessionObj.completePaymentMethodSelection(update);
    }

    this.applePaySessionObj.onshippingmethodselected = (event: any) => {
       // Define ApplePayShippingMethodUpdate based on the selected shipping method.
      // No updates or errors are needed, pass an empty object. 
      const update = {};
      this.applePaySessionObj.completeShippingMethodSelection(update);
    }

    this.applePaySessionObj.onshippingcontactselected = (event: any) => {
      // Define ApplePayShippingContactUpdate based on the selected shipping contact.
      const update = {
        status: 'STATUS_SUCCESS',
        newShippingMethods: {    
          "label": "Free Shipping",
          "detail": "Arrives in 5 to 7 days",
          "amount": "0.00",
          "identifier": "FreeShip"
        },
        newTotal: {
          "label": "Free Shipping",
          "amount": "50.00",
          "type": "final"
        },
        newLineItems: [{
          "label": "Free Shipping",
          "amount": "50.00",
          "type": "final"
        }]
      };
      this.applePaySessionObj.completeShippingContactSelection(update);
  };

  this.applePaySessionObj.onpaymentauthorized = (event: any) => {
     // Define ApplePayPaymentAuthorizationResult
    const result = {
      "status": (window as any).ApplePaySession.STATUS_SUCCESS
    };
    this.applePaySessionObj.completePayment(result);
  }

  this.applePaySessionObj.oncancel = (event: any) => {
    // Payment cancelled by WebKit
  };

  this.applePaySessionObj.begin();

  }

  // onshippingcontactselected(){
  //   const update = {
  //     status: 'STATUS_SUCCESS',
  //     newShippingMethods: {    
  //       "label": "Free Shipping",
  //       "detail": "Arrives in 5 to 7 days",
  //       "amount": "0.00",
  //       "identifier": "FreeShip"
  //     },
  //     newTotal: {
  //       "label": "Free Shipping",
  //       "amount": "50.00",
  //       "type": "final"
  //     },
  //     newLineItems: [{
  //       "label": "Free Shipping",
  //       "amount": "50.00",
  //       "type": "final"
  //     }]
  //   };
  //   this.applePaySessionObj.completeShippingContactSelection(update);
  //   onpaymentauthorized();

  // };



  

  

  


  // validateMerchant() {
  //   return fetch("https://apple-pay-gateway.apple.com/paymentservices/paymentSession", {
      
  //     // Adding method type
  //     method: "POST",
        
  //     // Adding body or contents to send
  //     body: JSON.stringify({
  //       merchantIdentifier: "merchant.com.codemind.apple-pay",
  //       displayName: "Apple Pay Test",
  //       initiative: "web",
  //       initiativeContext: "makemecode.com"
  //     }),
        
  //     // Adding headers to the request
  //     headers: {
  //         "Content-type": "application/json; charset=UTF-8"
  //     }
  //   });
  // }

  // fetchApplePayLineItems(){
  //   let _this = this;
  //   this.applepayservice.getApplePayLineItems()
  //   .then((data) => {
  //     console.log(JSON.stringify(data));
  //     _this.generateAurusSessionId();
  //     _this._cdr.detectChanges();

  //     /* below we can write any logic if required  to push objects to line items
  //       for promotions, healthyawards, taxcalcluations, giftcards etc. */ 


  //   })
  //   .catch((error) => {
  //     console.error("Promise rejected with " + JSON.stringify(error));
  //   });

  // }
  
  // generateAurusSessionId() {
  //   let _this = this;
  //   this.applepayservice.generateAurusSessionId().subscribe(response => {
  //     this.posts = response.map(item => 
  //       {
  //         return new ApplepayComponent( 
  //             item.body,
  //             item.id,
  //         );
  //       });
  //   });
  // }

  // beginApplePaySession(){
  //   let _this = this;
  //   this.applePaySessionObj.onvalidatemerchant = function(event: any) {
  //     console.debug("Start Merchant Validation");
  //     _this.performValidation(event.validationURL);
  //   };
  //   this.applePayShippingContactChanged();
  //   // this.applePayShippingMethodChanged();
  //   // this.applePayPaymentAuthorization();
  //   // this.applePayCouponCodeChanged();
  //   // this.applePaySessionObj.begin();
  // }

  // performValidation(validationURL: any) {
  //   let _this = this;
  //   console.debug("Performing Validationwith validation URL", validationURL);

  //   this.applepayservice.performMerchantValidation(validationURL)
  //   .subscribe({
  //     next: (response) => {
  //       console.log(response);
  //       _this.completeValidation(response.response.validationResponse);
  //     }
  //     ,
  //     error: (error) => {
  //       console.log('error' + error)
  //     }
  //   })
    
  // }

  // completeValidation(response: any){
  //   let _this = this;
  //   console.debug("Complete Validation with response : ", response);
  //   try {
  //     var promise = new Promise(function(resolve, reject) {
  //       resolve(response);
  //       reject(response);
  //     });
  //     promise
  //       .then(
  //         function(res: any) {
  //           console.debug(" reponse merchantSessionIdentifier : ", res);
  //           _this.applePaySessionObj.completeMerchantValidation(res);
  //         },
  //         function(error) {
  //           console.error("completeMerchantValidation failed.");
  //           console.error(error.message);
  //         }
  //       )
  //       .catch(error => console.error("Merchant validation :", error));
  //   } catch (e) {
  //     console.error("Error Message : " + e);
  //   }
  // }

  

  applePayShippingContactChanged() {
    let _this = this;

    _this.applePaySessionObj.onshippingcontactselected = function(event: any) {
      console.debug("Shipping Contact Address changed", event);
      _this.updatePaymentDetailsOnShippingContactChange(event.shippingContact);
    };
  }

  updatePaymentDetailsOnShippingContactChange(shippingContact: any) {
    let _this = this;
    if (shippingContact.addressLines) {
      shippingContact.addressLine1 = shippingContact.addressLines[0];
      if (shippingContact.addressLines[1]) {
        shippingContact.addressLine2 = shippingContact.addressLines[1];
      }
    }
    this.applepayservice.validateShippingAddress(shippingContact)
    .subscribe({
      next: (response) => {
        console.log(response);
        _this.updateApplePayLineItems(response);
        _this.applePaySessionObj.completeShippingContactSelection(
          _this.updatedLineItems
        );
      }
      ,
      error: (error) => {
        console.log('error' + error)
      }
    })

  }

  updateApplePayLineItems(response: any){
    let _this = this;
    /* update line items here */
  }

}


