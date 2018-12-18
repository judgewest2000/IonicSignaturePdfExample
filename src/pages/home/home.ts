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

  private async getSignature() {
    const signature = await this.modalCreate<string>('SignatureCapturePage');
    return signature;
  }

  async generatePdf() {
    const signature = await this.getSignature();

    let docDefinition = {
      content: [
        'paragraph 1',
        'paragraph 2',
        {
          image: signature
        },
      ]
    };


    const pdf = pdfMake.createPdf(docDefinition);

    const dataUrl = await this.GetDataUrl(pdf);

    alert(dataUrl);
  }

  private GetDataUrl(pdf) {
    return new Promise((resolve, reject) => {
      pdf.getDataUrl(dataUrl => {
        resolve(dataUrl);
      });
    });
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
