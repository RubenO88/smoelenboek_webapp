import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ContactServiceProvider } from '../../providers/contact-service/contact-service';

/**
 * Generated class for the ContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  contactInfo: object;
  department: string;

  constructor(public viewCtrl: ViewController,
    public navParams: NavParams,
    public contactServiceProvider: ContactServiceProvider,
    public alertCtrl: AlertController) {

    //should add some checks to be sure data is available
    this.department = navParams.get("departmentId");
    let index: number = navParams.get("index");

    this.contactInfo = contactServiceProvider.getContactDetails(this.department, index);
  }

  closeModal(): void {
    this.viewCtrl.dismiss();
  }

  call(): void {
    let alert = this.alertCtrl.create({
      title: "Actie niet mogelijk",
      subTitle: "Er is geen telefoonnummer van dit contact bekend.",
      buttons: ["OK"]
    });
    alert.present();
  }

  sendMail(event, mailAddress) {
    event.stopPropagation();
    window.open("mailto:" + mailAddress);
  }

  stopPropagation(event) {
    event.stopPropagation();
  }
}
