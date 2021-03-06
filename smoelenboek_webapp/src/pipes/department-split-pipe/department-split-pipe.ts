import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DepartmentSplitPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
const imagePath: string = "./assets/profile-pics/profile";
const imageExt: string = ".jpg";
const imageCount: number = 6;

@Pipe({
  name: 'departmentSplitPipe',
})
export class DepartmentSplitPipe implements PipeTransform {
  /**
   * Takes a object and turns it in an array of departments.
   */
  transform(departments, args: any) : any {
      let keys: object[] = [];
      for (let departmentId in departments) {
        let contactsOfDepartment = departments[departmentId];
        for (let contactIndex in contactsOfDepartment) {
          let contactObj = {
                            departmentId: departmentId,
                            showHeader: false,
                            data: contactsOfDepartment[contactIndex],
                            index: +contactIndex
                            };
          //if first in group, than show the header of that department
          //for..in get's string indices. so + parses it to an number
          if (+contactIndex === 0) {
            contactObj.showHeader = true;
          }
          //add the 6 available pictures to the photoUrl
          contactObj.data.photoUrl = imagePath + (+contactIndex % imageCount) + imageExt;

          keys.push(contactObj);
        }
      }
      // console.log("pipe result:", keys);
      return keys;
  }
}
