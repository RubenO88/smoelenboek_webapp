import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ContactServiceProvider } from '../../providers/contact-service/contact-service';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  departmentContacts: object;
  isLoading: boolean;

  constructor(public modalCtrl: ModalController, public contactServiceProvider: ContactServiceProvider) {
    this.departmentContacts = contactServiceProvider.getContacts();
    this.isLoading = contactServiceProvider.getIsLoading();
  }

  getHeaderData(record, recordIndex, records): object {
    if (record.showHeader === true) {
      return record.departmentId;
    }
    else {
      return null;
    }
  }

  showDetailsModal(event, departmentId, index) {
    console.log("contact from department %s with %s clicked", departmentId, index);
    event.stopPropagation();
    let detailsModal = this.modalCtrl.create(ContactPage, {departmentId: departmentId, index: index});
    detailsModal.present();
  }

  sendMail(event, mailAddress) {
    event.stopPropagation();
    window.open("mailto:" + mailAddress);
  }
}

