import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
} from 'class-validator';
import { Gender } from '../users/interfaces/gender';

@ValidatorConstraint({ name: 'isValidGender', async: false })
export class IsValidGenderConstraint implements ValidatorConstraintInterface {
  validate(text: string): Promise<boolean> | boolean {
    return Object.values(Gender)
      .map((i) => i.toString())
      .includes(text);
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid gender value. ${args.value} field should be male or female`;
  }
}

export function IsValidGender(validationOptions?: ValidatorOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidGenderConstraint,
    });
  };
}
