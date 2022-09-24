import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, RendererStyleFlags2, ViewChild } from '@angular/core';
import { ApplepayService } from 'src/applepay.service';

@Component({
  selector: 'app-apple-pay',
  templateUrl: './apple-pay.component.html',
  styleUrls: ['./apple-pay.component.scss']
})
export class ApplePayComponent implements AfterViewInit {

  @ViewChild('applePay', { static: false })
  but!: ElementRef<any>;  
  applePaySessionObj: any;
  applePayVersion: any;
  constructor(private renderer: Renderer2,
    private applepayservice: ApplepayService
    
    ) {
  }

  ngAfterViewInit() {
    // if ((window as any).ApplePaySession) {
    //   const button = this.renderer.createElement('apple-pay-button');
    //   this.renderer.setAttribute(this.but.nativeElement, 'buttonstyle', 'black');
    //   this.renderer.setAttribute(this.but.nativeElement, 'type', 'buy');
    //   this.renderer.setAttribute(this.but.nativeElement, 'locale', 'el-GR');
    //   this.renderer.setStyle(this.but.nativeElement, 'display', 'inline-bloc', RendererStyleFlags2.Important);
    //   this.renderer.appendChild(this.but.nativeElement, button);
    // }
    // this.applepayservice.asyncAction();
    // this.applepayservice.generateAurusSessionId();
  }

  ngOnInit(){
   
  }

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

  // onApplePayClick() {
  //   console.log('On Apple Pay Clicked');
  //   // Define ApplePayPaymentRequest
  //   const request = {
  //       "countryCode": "US",
  //       "currencyCode": "USD",
  //       "merchantCapabilities": [
  //           "supports3DS"
  //       ],
  //       "supportedNetworks": [
  //           "visa",
  //           "masterCard",
  //           "amex",
  //           "discover"
  //       ],
  //       "total": {
  //           "label": "Demo (Card is not charged)",
  //           "type": "final",
  //           "amount": "1.99"
  //       }
  //   };
    
  //   // Create ApplePaySession
  //   const session = new (window as any).ApplePaySession(3, request);
    
  //   session.onvalidatemerchant = async (event: any) => {
  //       // Call your own server to request a new merchant session.
  //       console.log('Inside On Validate Merhant')
  //       const merchantSession = await this.validateMerchant();
  //       console.log('merchantsession', merchantSession);
  //       session.completeMerchantValidation(merchantSession);
  //   };
    
  //   session.onpaymentmethodselected = (event: any) => {
  //       // Define ApplePayPaymentMethodUpdate based on the selected payment method.
  //       // No updates or errors are needed, pass an empty object.
  //       const update = {};
  //       session.completePaymentMethodSelection(update);
  //   };
    
  //   session.onshippingmethodselected = (event: any) => {
  //       // Define ApplePayShippingMethodUpdate based on the selected shipping method.
  //       // No updates or errors are needed, pass an empty object. 
  //       const update = {};
  //       session.completeShippingMethodSelection(update);
  //   };
    
  //   session.onshippingcontactselected = (event: any) => {
  //       // Define ApplePayShippingContactUpdate based on the selected shipping contact.
  //       const update = {
  //         status: 'STATUS_SUCCESS',
  //         newShippingMethods: {    
  //           "label": "Free Shipping",
  //           "detail": "Arrives in 5 to 7 days",
  //           "amount": "0.00",
  //           "identifier": "FreeShip"
  //         },
  //         newTotal: {
  //           "label": "Free Shipping",
  //           "amount": "50.00",
  //           "type": "final"
  //         },
  //         newLineItems: [{
  //           "label": "Free Shipping",
  //           "amount": "50.00",
  //           "type": "final"
  //         }]
  //       };
  //       session.completeShippingContactSelection(update);
  //   };
    
  //   session.onpaymentauthorized = (event: any) => {
  //       // Define ApplePayPaymentAuthorizationResult
  //       const result = {
  //           "status": (window as any).ApplePaySession.STATUS_SUCCESS
  //       };
  //       session.completePayment(result);
  //   };
    
  //   session.oncancel = (event: any) => {
  //       // Payment cancelled by WebKit
  //   };
    
  //   session.begin();

  // }


  /* cechkout js */

  initApplePayFeature(){
    let win = window && (window as any);
    // this.applepayservice.performMerchantValidation("url");
    this.applepayservice.getApplePayLineItems();
    

    const paymentRequestObj: any = {
      countryCode: "US",
      currencyCode: "USD",
      merchantCapabilities: ["supports3DS"],
      supportedNetworks: ["visa", "masterCard", "amex", "discover"],
      requiredBillingContactFields: ["postalAddress", "name", "phone"],
      
    };

    if (win.ApplePaySession){
      this.applePaySessionObj = new win.ApplePaySession(
        this.applePayVersion,
        paymentRequestObj
      );
      this.beginApplePaySession();
    }
  
  }

 

  beginApplePaySession() {
    let _this = this;
    this.applePaySessionObj.onvalidatemerchant = function(event: any) {
      console.debug("Start Merchant Validation");
      _this.performValidation(event.validationURL);
    };
    // this.applePayShippingContactChanged();
    // this.applePayShippingMethodChanged();
    // this.applePayPaymentAuthorization();
    // this.applePayCouponCodeChanged();
    this.applePaySessionObj.begin();
   
  }

  performValidation(validationURL: any) {
    let _this = this;
    console.debug("Performing Validationwith validation URL", validationURL);

    // this.applepayservice.getApplePayLineItems(validationURL)
    //   .then(function(response: any) {
    //     console.debug("HTTP Status 200", response);
    //     _this.completeValidation(response.response.validationResponse);
    //   });
  }
  

}
