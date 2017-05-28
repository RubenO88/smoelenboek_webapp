import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage} from '@ionic/storage';
import 'rxjs/add/operator/toPromise';

const storageKey: string = "departmentContacts";
const apiEndPoint: string = "http://assessments.wearetriple.com";
/*
  Generated class for the ContactServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContactServiceProvider {
  departmentContacts: object[];

  constructor(public http: Http, public storage: Storage) {}

  public getContacts(): Promise<any> {
    return this._getContacts();
  }

  private _getContacts(): Promise<any> {
    return this._checkStorageValue(storageKey)
      .catch((error) => {
        console.log("Storage error:", error);
        console.log("Try api to get data...");
        return this.http.get(apiEndPoint + "/api.php")
          .toPromise()
            .then(this._processData.bind(this))
            .catch(this._processError.bind(this));
      })
      .then((data) => {
        //Store data in provider and resolve promise again
        this.departmentContacts = data;
        return Promise.resolve(this.departmentContacts);
      })
  }

  private _checkStorageValue(key): Promise<any> {
    return this._isStorageReady()
      .then((storageInfo) => {
        return this.storage.get(key)
          .then((value) => {
            console.log("fetched data from storage");
            if (value !== null) {
              return JSON.parse(value);
            }
            else {
              return Promise.reject("Value for key \"" + key + "\" not available or null");
            }
          })
      });
  }

  private _processData(data): Promise<any> {
    //Should check statuscode etc, but skipped that for now.
    let jsonToObject = data.json();
    //Possible checking if jsonToObject.json() worked ok, skipped for now.
    return this._save(jsonToObject);
  }

  private _processError(error): Promise<string> {
    console.log("Error:", error);
    return Promise.reject("De data kon niet geladen worden.");
  }

  private _save(data): Promise<any> {
    let stringData = JSON.stringify(data);
    return this._isStorageReady()
      .then(() => {
        return this.storage.set(storageKey, stringData).then((value) => {
          return data;
        })
        .catch((error) => {
          console.log("saving data error:", error);
        });
      });
  }

  private _isStorageReady(): Promise<any> {
    return this.storage.ready()
      .then((storageInfo) => {
          console.log("Storage info:", storageInfo);
          });
  }

  public getContactDetails(deptId, index): object {
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
