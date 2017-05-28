import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage} from '@ionic/storage';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ContactServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContactServiceProvider {
  departmentContacts: object[];

  constructor(public http: Http, public storage: Storage) {
    // this._checkStorageValue("notValid");
  }

  public getContacts() {
    return this._getContacts();
  }

  private _getContacts() {
    return this.http.get("api/api.php")
      .toPromise()
      .then(this._processData.bind(this))
      .catch(this._processError.bind(this));
  }

  private _checkStorageValue(key) {
    return this._isStorageReady()
      .then((storageInfo) => {
        return this.storage.get(key)
          .then((successData) => {
            console.log("fetched data from storage", successData);
            this.departmentContacts = successData;
            return successData;
          })
          .catch((error) => {
            console.log("Fetching data error:", error);
          });
      });
  }

  private _processData(data) {
    //Should check statuscode etc, but skipped that for now.

    let jsonToObject = data.json();
    //Possible checking if jsonToObject.json() worked ok, skipped for now.
    return this._save(jsonToObject);
  }

  private _processError(error): void {
    console.log("Error:", error);
  }

  private _save(data) {
    let stringData = JSON.stringify(data);
    return this._isStorageReady()
      .then(() => {
        return this.storage.set("departmentContacts", stringData).then((successData) => {
          this.departmentContacts = data;
          return data;
        })
        .catch((error) => {
          console.log("saving data error:", error);
        });
      });
  }

  private _isStorageReady(): Promise<void> {
    return this.storage.ready()
      .then((storageInfo) => {
          console.log("Storage info:", storageInfo);
          });
  }

  getContactDetails(deptId, index): object {
    //no check required if data exists because otherwise you can't get to the details page
    let department = this.departmentContacts[deptId];
    let returnObj: object = {};
    if (department !== null) {
      let contact: object = department[index];
      if (contact !== null) {
        returnObj = contact;
      }
    }
    else {
      console.log("Contact does not exists");
    }
    return returnObj;
  }
}
