import { UserManagerService } from './user-manager.service';
import { AbstractControl } from '@angular/forms';


interface ValidationResult {
    [key: string]: boolean;
}

export class UsernameValidator {

    constructor(userManagerService: UserManagerService) { }

    static startsWithNumber(control: AbstractControl) {

        if (control.value != "" && !isNaN(control.value.charAt(0))) {
            return { "startsWithNumber": true };
        }

        return null;
    }

    static usernameTaken(control: AbstractControl): Promise<any> {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === "David") {
                    resolve({ "usernameTaken": true })
                } else {
                    resolve(null);
                };

            }, 1000);
        });

    }


}