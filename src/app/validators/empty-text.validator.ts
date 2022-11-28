import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createEmptyTextValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const isEmpty = value.trim().length === 0;

    return isEmpty ? { emptyText: true } : null;
  };
}
