import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactServiceProvider } from '../../providers/contact-service/contact-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  departmentContacts: object;
  isLoading: boolean;

  constructor(public navCtrl: NavController, private contactServiceProvider: ContactServiceProvider) {
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
}

