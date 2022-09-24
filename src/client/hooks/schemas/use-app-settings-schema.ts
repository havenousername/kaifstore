import { TFunction } from 'react-i18next';
import * as yup from 'yup';

const useAppSettingsSchema = (t: TFunction) => {
  return yup.object({
    language: yup
      .string()
      .required(() =>
        t('Validation.Required', { field: t('Settings.AppLanguage') }),
      ),
    moyskladIntegration: yup.boolean().required(() =>
      t('Validation.Required', {
        field: t('Settings.AppMoyskladIntegration'),
      }),
    ),
    moyskladEmail: yup.string(),
    moyskladPassword: yup.string(),
  });
};

export default useAppSettingsSchema;
