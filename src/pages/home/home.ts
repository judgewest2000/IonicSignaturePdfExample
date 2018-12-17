import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, Modal } from 'ionic-angular';

import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ModalCreateNewParams } from '../../interfaces';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private modalController: ModalController) {
  }

  async getSignature(){
    const signature = await this.modalCreate<string>('SignatureCapturePage');
    this.signature=signature;
    this.generatePdf();
  }

  signature='';

  generatePdf(){
    let docDefinition = {
      content: [
        'paragraph 1',
        'paragraph 2',
        {
	        image: this.signature
		    },
      ]
    };

    pdfMake.createPdf(docDefinition).download('optionalName.pdf');
  }


  private modalCreate<T>(modalName: string): Promise<T> {
    return new Promise((resolve, reject) => {
        let modal: Modal;

        const params: ModalCreateNewParams<T> = {
            callback: (entity, success) => {
                modal.dismiss();
                if (success) {
                    resolve(entity);
                }
            }
        }

        modal = this.modalController.create(modalName, { params: params });
        modal.present();
    });
}

}
