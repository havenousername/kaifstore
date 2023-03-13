import * as yup from 'yup';
import { TFunction } from 'react-i18next';
import { subYears } from 'date-fns';

const useRegisterSchema = (t: TFunction) => {
  return yup
    .object({
      email: yup.string().email(() => t('Validation.Email')),
      firstName: yup
        .string()
        .required(() => t('Validation.Required', { field: t('Register.Name') }))
        .min(2, () =>
          t('Validation.MinLength', { length: 2, field: t('Register.Name') }),
        ),
      lastName: yup
        .string()
        .required(() =>
          t('Validation.Required', { field: t('Register.FamilyName') }),
        ),
      password: yup
        .string()
        .required(() =>
          t('Validation.Required', { field: t('Register.Password') }),
        )
        .min(8, () =>
          t('Validation.MinLength', {
            length: 8,
            field: t('Register.Password'),
          }),
        )
        .max(16, () =>
          t('Validation.MaxLength', {
            length: 16,
            field: t('Register.Password'),
          }),
        )
        .test(
          'validPassword',
          () => t('Validation.Password'),
          (value) => {
            if (!value) return false;
            const hasUpperCase = /[A-Z]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const hasSymbol = /[!@#%&]/.test(value);
            let validConditions = 0;
            const numberOfMustBeValidConditions = 3;
            const conditions = [
              hasLowerCase,
              hasUpperCase,
              hasNumber,
              hasSymbol,
            ];
            conditions.forEach((condition) =>
              condition ? validConditions++ : null,
            );
            return validConditions >= numberOfMustBeValidConditions;
          },
        ),
      confirmPassword: yup
        .string()
        .required(
          t('Validation.Required', { field: t('Register.ConfirmPassword') }),
        )
        .when('password', {
          is: (val) => val && val.length > 0,
          then: yup
            .string()
            .oneOf([yup.ref('password')], t('Register.ConfirmPassword')),
        }),
      birthDate: yup
        .date()
        .required(() =>
          t('Validation.Required', { field: t('Register.DateOfBirth') }),
        )
        .max(subYears(new Date(), 18), t('Validation.DateOfBirth')),
      agree: yup.boolean().test(
        'validCheckbox',
        () => t('Validation.AgreeCondition'),
        (value) => {
          return !!value;
        },
      ),
    })
    .required();
};

export default useRegisterSchema;
