import { FormGroup } from '@angular/forms';

/**
 * @function matchingPasswords
 * @description check two password are identical
 * @param- passwordKey
 * @param- passwordConfirmationKey
 */
export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        const password = group.controls[passwordKey];
        const passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({mismatchedPasswords: true});
        }
    };
}