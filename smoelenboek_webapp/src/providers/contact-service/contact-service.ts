import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the ContactServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContactServiceProvider {

  constructor(public http: Http, public storage: Storage) {
    this._getContacts();
  }

  getContacts(): object {
    return this.departmentContacts;
  }

  getIsLoading(): boolean {
    return this.isLoading;
  }

  private _getContacts() {
    //return this.storage.get('departmentContacts');
    this.isLoading = true;
    this.http.get('http://assessments.wearetriple.com/api.php')
      .map(res => res.json())
      .subscribe(
        data => {
            console.log('contact data', data);
            this.save(data);
        },
        err => {
          console.log('could not fetch data', err);
        }
      )
  }

  private save(data): void {
    let stringData = JSON.stringify(data);
    this.storage.set('departmentContacts', stringData);
  }

  isLoading: boolean = false;
  departmentContacts = {
                        "ios": [{
                            "firstname": "stef",
                            "lastname": "kampen",
                            "emailaddress": "s.kampen@triple-it.nl",
                            "photourl": "stefkampen.png"
                        }, {
                            "firstname": "roland",
                            "lastname": "keesom",
                            "emailaddress": "r.keesom@triple-it.nl",
                            "photourl": null
                        }, {
                            "firstname": "rik",
                            "lastname": "lemmers",
                            "emailaddress": "r.lemmers@triple-it.nl",
                            "photourl": "riklemmers.png"
                        }, {
                            "firstname": "roland",
                            "lastname": "blom",
                            "emailaddress": "r.blom@triple-it.nl",
                            "photourl": "rolandblom.png"
                        }, {
                            "firstname": "tim",
                            "lastname": "bakker",
                            "emailaddress": "t.bakker@triple-it.nl",
                            "photourl": "timbakker.png"
                        }, {
                            "firstname": "antoine",
                            "lastname": "van der lee",
                            "emailaddress": "a.vanderlee@triple-it.nl",
                            "photourl": null
                        }],
                        "android": [{
                            "firstname": "hans",
                            "lastname": "van der gragt",
                            "emailaddress": "h.vandergragt@triple-it.nl",
                            "photourl": "hansvandergragt.png"
                        }, {
                            "firstname": "gerard",
                            "lastname": "krombeen",
                            "emailaddress": "g.krombeen@triple-it.nl",
                            "photourl": "gerardkrombeen.png"
                        }, {
                            "firstname": "bas",
                            "lastname": "palmer",
                            "emailaddress": "b.palmer@triple-it.nl",
                            "photourl": "baspalmer.png"
                        }, {
                            "firstname": "dennis",
                            "lastname": "koster",
                            "emailaddress": "d.koster@triple-it.nl",
                            "photourl": null
                        }, {
                            "firstname": "mirko",
                            "lastname": "volkers",
                            "emailaddress": "m.volkers@triple-it.nl",
                            "photourl": null
                        }, {
                            "firstname": "tamara",
                            "lastname": "roep",
                            "emailaddress": "t.roep@triple-it.nl",
                            "photourl": null
                        }],
                        "windows": [{
                            "firstname": "hans",
                            "lastname": "zaadnoordijk",
                            "emailaddress": "h.zaadnoordijk@triple-it.nl",
                            "photourl": "hanszaadnoordijk.png"
                        }, {
                            "firstname": "frank",
                            "lastname": "lippes",
                            "emailaddress": "f.lippes@triple-it.nl",
                            "photourl": "franklippes.png"
                        }, {
                            "firstname": "mark",
                            "lastname": "hijdra",
                            "emailaddress": "m.hijdra@triple-it.nl",
                            "photourl": null
                        }, {
                            "firstname": "jesse",
                            "lastname": "sander",
                            "emailaddress": "j.sander@triple-it.nl",
                            "photourl": null
                        }]
                    };


}
