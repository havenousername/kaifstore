import React, { ReactElement, useContext, useEffect, useState } from 'react';
import AppLayout from '../components/functional/app-layout';
import { NextPageWithLayout } from '../interfaces/pages-layout';
import { Box, Typography } from '@mui/material';
import SettingsForm from '../components/settings-form';
import AppSettings from '../components/app-settings';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Gender } from '../interfaces/gender';
import useRegisterSchema from '../hooks/schemas/use-register-schema';
import { EditableUser } from '../interfaces/settings-user';
import { useTranslation } from 'react-i18next';
import { AuthenticationContext } from '../context/authenticated.context';
import { SUPER_USER_ROLE } from '../../backend/app/contstants';
import useSWR from 'swr';
import { AppSettings as AppSettingsModel } from '../../backend/model/app-settings.model';
import standardFetcher from '../api/standard-fetcher';
import { EditableAppSettings } from '../interfaces/app-settings';
import useAppSettingsSchema from '../hooks/schemas/use-app-settings-schema';
import useApiMethod from '../hooks/useApiMethod';
import { SnackbarContext } from '../context/snackbar.context';

const Settings: NextPageWithLayout = () => {
  const { t } = useTranslation();
  const registerSchema = useRegisterSchema(t);
  const appSettingsSchema = useAppSettingsSchema(t);
  const { user } = useContext(AuthenticationContext);
  const { data: appSettings, error: appSettingsError } =
    useSWR<AppSettingsModel>('/v1/app-settings', standardFetcher);
  const snackbar = useContext(SnackbarContext);

  const {
    initialize: updateUserSettings,
    data: updatedUserSettings,
    error: updateSettingsError,
  } = useApiMethod<EditableUser, { id: number }>(
    ({ id }) => `v1/users/${id}`,
    (d: any) => d,
    { method: 'PUT' },
  );

  const {
    initialize: updateAppSettings,
    data: updatedAppSettings,
    error: updateAppSettingsError,
  } = useApiMethod<number[], undefined>(
    () => `v1/app-settings`,
    (d: any) => d,
    { method: 'PUT' },
  );

  const { control, setValue, getValues, watch } = useForm<EditableUser>({
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      gender: Gender.MALE,
      birthDate: new Date(),
    },
  });
  const {
    control: settingsControl,
    getValues: getSettingsValues,
    setValue: setSettingsValue,
    watch: settingsWatch,
  } = useForm<EditableAppSettings>({
    mode: 'onChange',
    resolver: yupResolver(appSettingsSchema),
    defaultValues: {
      language: '',
      moyskladIntegration: false,
      moyskladEmail: '',
      moyskladPassword: '',
    },
  });
  const [token, setToken] = useState('');

  const initials =
    watch('lastName').toString().slice(0, 1) +
    watch('firstName').toString().slice(0, 1);

  useEffect(() => {
    if (user) {
      setValue('firstName', user.firstName);
      setValue('lastName', user.lastName);
      setValue('gender', user.gender);
      setValue('birthDate', user.birthDate);
      setValue('gender', user.gender);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (appSettings && !appSettingsError) {
      setSettingsValue('language', appSettings.language);
      setSettingsValue('moyskladIntegration', appSettings.moyskladIntegration);
      console.log(appSettings.moyskladToken);
      setToken(appSettings.moyskladToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appSettings, appSettingsError]);

  useEffect(() => {
    if (!!updatedUserSettings) {
      snackbar.changeIsOpen(true);
      snackbar.changeSeverity('success');
      snackbar.changeMessage(t('Alert.UserUpdated'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedUserSettings]);

  useEffect(() => {
    if (!!updatedAppSettings) {
      snackbar.changeIsOpen(true);
      snackbar.changeSeverity('success');
      snackbar.changeMessage(t('Alert.AppSettingsUpdated'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedAppSettings]);

  useEffect(() => {
    if (!!updateSettingsError || !!updateAppSettingsError) {
      const error = updateSettingsError
        ? updateSettingsError
        : updateAppSettingsError;
      snackbar.changeIsOpen(true);
      snackbar.changeSeverity('error');
      snackbar.changeMessage(t('Alert.BackendError', { error }));
      console.error('An error occured', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSettingsError, updateAppSettingsError]);

  if (!user) {
    return <></>;
  }

  const onUserSave = () => {
    const editedUser = getValues();

    updateUserSettings(
      { id: user.id },
      {
        method: 'PUT',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      },
    );
  };

  const onAppSettingsSave = () => {
    const settings = getSettingsValues();
    updateAppSettings(undefined, {
      method: 'PUT',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
  };

  return (
    <Box
      sx={{
        padding: '2rem 8rem 4rem',
      }}
    >
      <Typography
        variant={'h4'}
        component={'h4'}
        padding={(theme) => theme.spacing(2, 3)}
        fontWeight={600}
      >
        {t('Settings.UserSettings')}
      </Typography>
      <SettingsForm
        getValues={getValues}
        control={control}
        image={user.photo}
        role={user.role}
        initials={initials}
        isAdmin={user.role.name === SUPER_USER_ROLE.name}
        userSave={onUserSave}
      />
      <Typography
        variant={'h4'}
        component={'h4'}
        padding={(theme) => theme.spacing(2, 3)}
        fontWeight={600}
      >
        {t('Settings.AppSettings')}
      </Typography>
      <AppSettings
        watch={settingsWatch}
        control={settingsControl}
        token={token}
        settingsSave={onAppSettingsSave}
      />
    </Box>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Settings;
