import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ModalCreateNewParams } from '../../interfaces';

/**
 * Generated class for the SignatureCapturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signature-capture',
  templateUrl: 'signature-capture.html',
})
export class SignatureCapturePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.params = navParams.get('params');

  }

  params: ModalCreateNewParams<string>;
 
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
 
   signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 2,
    'canvasWidth': 500,
    'canvasHeight': 300,
    backgroundColor: 'rgba(255, 255, 255, 1)',
     penColor: 'rgb(0, 0, 0)'
  };
 
 
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
 

  save(){
    const base64 = this.signaturePad.toDataURL('image/jpeg', 50);
    this.params.callback(base64,true);
  }

}
