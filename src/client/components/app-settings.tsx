import { useTranslation } from 'react-i18next';
import { FormControl, Box, FormGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Control, UseFormWatch } from 'react-hook-form/dist/types';
import FormInput from './input/validation/form-input';
import { EditableAppSettings } from '../interfaces/app-settings';
import FormInputSelect from './input/validation/form-inputselect';
import AppBaseButton from './common/app-base-button';
import InputSelect from './input/input-select';

const AppSettings = ({
  control,
  settingsSave,
  token,
  watch,
  synchronized,
  synchronize,
}: {
  control: Control<EditableAppSettings>;
  settingsSave: () => void;
  token?: string;
  watch: UseFormWatch<EditableAppSettings>;
  synchronized?: boolean;
  synchronize: () => void;
}) => {
  const { t } = useTranslation();
  const [changeToken, setChangeToken] = useState(false);

  const helperProps = {
    sx: {
      fontSize: '0.75rem',
      lineHeight: '1.2',
    },
  };

  return (
    <FormControl component={'form'} sx={{ width: '100%', marginTop: '3rem' }}>
      <Box
        display={'grid'}
        gridTemplateColumns={'repeat(12, 1fr)'}
        gridTemplateRows={'repeat(1, 1fr)'}
        gap={3}
      >
        <FormGroup sx={{ gridColumn: 'span 6' }}>
          <Typography variant={'h5'} component={'h5'} fontWeight={600}>
            {t('Placeholder.AppLanguage')}*
          </Typography>
          <FormInput<EditableAppSettings>
            name={'language'}
            control={control}
            inputProps={{
              placeholder: t('Placeholder.AppLanguage'),
              sx: {
                fontSize: '0.8rem',
              },
              required: true,
            }}
            helperProps={helperProps}
          />
        </FormGroup>
        <FormGroup sx={{ gridColumn: 'span 6' }}>
          <Typography variant={'h5'} component={'h5'} fontWeight={600}>
            {t('Placeholder.AppMoyskladIntegration')}
          </Typography>
          <FormInputSelect<EditableAppSettings, boolean>
            name={'moyskladIntegration'}
            control={control}
            options={[
              { content: t('Choices.No'), value: false },
              { content: t('Choices.Yes'), value: true },
            ]}
            helperProps={helperProps}
          />
        </FormGroup>
        {token && (
          <>
            <Box sx={{ gridColumn: 'span 6' }}>
              <Typography variant={'h5'} component={'h5'} fontWeight={600}>
                {t('Settings.Token')}
              </Typography>
            </Box>
            <Box sx={{ gridColumn: 'span 6' }}>
              <Typography variant={'h5'} component={'h5'} fontWeight={600}>
                {token}
              </Typography>
            </Box>
            <Box sx={{ gridColumn: 'span 6' }}>
              <Typography variant={'h5'} component={'h5'} fontWeight={600}>
                {t('Settings.ChangeToken')}
              </Typography>
            </Box>
            <Box sx={{ gridColumn: 'span 6' }}>
              <FormControl sx={{ fontSize: '0.8rem' }}>
                <InputSelect
                  selected={changeToken}
                  onChange={(v) => setChangeToken(v)}
                  options={[
                    { content: t('Choices.No'), value: false },
                    { content: t('Choices.Yes'), value: true },
                  ]}
                />
              </FormControl>
            </Box>
          </>
        )}
        {watch('moyskladIntegration') && !token && (
          <Box sx={{ gridColumn: 'span 12' }}>
            <Typography variant={'h5'} component={'h5'} fontWeight={600}>
              {t('Settings.AddToken')}
            </Typography>
          </Box>
        )}
        {((watch('moyskladIntegration') && !token) || changeToken) && (
          <>
            <FormGroup sx={{ gridColumn: 'span 6' }}>
              <Typography variant={'h5'} component={'h5'} fontWeight={600}>
                {t('Placeholder.AppMoyskladIntegrationTokenEmail')}
              </Typography>
              <FormInput<EditableAppSettings>
                name={'moyskladEmail'}
                control={control}
                inputProps={{
                  placeholder: t(
                    'Placeholder.AppMoyskladIntegrationTokenEmail',
                  ),
                  sx: {
                    fontSize: '0.8rem',
                  },
                  required: true,
                }}
                helperProps={helperProps}
              />
            </FormGroup>
            <FormGroup sx={{ gridColumn: 'span 6' }}>
              <Typography variant={'h5'} component={'h5'} fontWeight={600}>
                {t('Placeholder.AppMoyskladIntegrationTokenPassword')}
              </Typography>
              <FormInput<EditableAppSettings>
                name={'moyskladPassword'}
                control={control}
                inputProps={{
                  placeholder: t(
                    'Placeholder.AppMoyskladIntegrationTokenPassword',
                  ),
                  sx: {
                    fontSize: '0.8rem',
                  },
                  required: true,
                }}
              />
            </FormGroup>
          </>
        )}
        {token && (
          <>
            <Box sx={{ gridColumn: 'span 6' }}>
              <Typography variant={'h5'} component={'h5'} fontWeight={600}>
                {t('Settings.Synchronized')}
              </Typography>
            </Box>
            <Box sx={{ gridColumn: 'span 6' }}>
              <FormControl sx={{ fontSize: '0.8rem' }}>
                <InputSelect
                  selected={synchronized}
                  onChange={() => synchronize()}
                  options={[
                    { content: t('Choices.No'), value: false },
                    { content: t('Choices.Yes'), value: true },
                  ]}
                />
              </FormControl>
            </Box>
          </>
        )}
        <FormGroup sx={{ gridColumn: 'span 12' }}>
          <AppBaseButton
            variant={'contained'}
            color={'primary'}
            type={'button'}
            onClick={() => settingsSave()}
          >
            {t('Settings.Save')}
          </AppBaseButton>
        </FormGroup>
      </Box>
    </FormControl>
  );
};

export default AppSettings;
