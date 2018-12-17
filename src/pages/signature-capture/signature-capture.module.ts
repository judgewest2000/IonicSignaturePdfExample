import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignatureCapturePage } from './signature-capture';

import { SignaturePadModule } from 'angular2-signaturepad';
 

@NgModule({
  declarations: [
    SignatureCapturePage,
  ],
  imports: [
    IonicPageModule.forChild(SignatureCapturePage),
    SignaturePadModule
  ],
})
export class SignatureCapturePageModule {}
