import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DepartmentSplitPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
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
                            index: contactIndex
                            };
          //if first in group, than show the header of that department
          //for..in get's string indices
          if (contactIndex === "0") {
            contactObj.showHeader = true;
          }
          keys.push(contactObj);
        }
      }
      console.log("pipe result:", keys);
      return keys;
  }
}
