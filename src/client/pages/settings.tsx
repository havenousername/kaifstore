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
import { SUPER_USER_ROLE } from '../../backend/app/constants';
import useSWR from 'swr';
import { AppSettings as AppSettingsModel } from '../../backend/model/app-settings.model';
import standardFetcher from '../api/standard-fetcher';
import { EditableAppSettings } from '../interfaces/app-settings';
import useAppSettingsSchema from '../hooks/schemas/use-app-settings-schema';
import useApiMethod from '../hooks/useApiMethod';
import { SnackbarContext } from '../context/snackbar.context';
import AppDialog from '../components/common/app-dialog';

const Settings: NextPageWithLayout = () => {
  const { t } = useTranslation();
  const registerSchema = useRegisterSchema(t);
  const appSettingsSchema = useAppSettingsSchema(t);
  const { user } = useContext(AuthenticationContext);
  const {
    data: appSettings,
    error: appSettingsError,
    mutate: appSettingsMutate,
  } = useSWR<AppSettingsModel>('/v1/app-settings', standardFetcher);
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
    () => 'v1/app-settings',
    (d: any) => d,
    { method: 'PUT' },
  );

  const {
    initialize: syncMoysklad,
    data: updatedSyncMoysklad,
    error: updatedSyncMoyskladError,
  } = useApiMethod<undefined, undefined>(
    () => 'v1/app-settings/sync',
    (d) => d,
    { method: 'POST' },
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
  const [hasAccessToken, setHasAccessToken] = useState<boolean>(false);
  const [sync, setSync] = useState(false);
  const [openSyncWarning, setOpenSyncWarning] = useState(false);

  const changeSynchronization = () => syncMoysklad(undefined);

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
      setHasAccessToken(appSettings.moyskladIntegration);
      setSync(!!appSettings.moyskladSync);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appSettings, appSettingsError]);

  useEffect(() => {
    if (!!updatedSyncMoysklad) {
      appSettingsMutate();
      setSync(!sync);
      snackbar.changeIsOpen(true);
      snackbar.changeSeverity('success');
      snackbar.changeMessage(t('Alert.AppMoyskladSyncUpdated'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedSyncMoysklad]);

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
      appSettingsMutate();
      snackbar.changeIsOpen(true);
      snackbar.changeSeverity('success');
      snackbar.changeMessage(t('Alert.AppSettingsUpdated'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedAppSettings]);

  useEffect(() => {
    if (
      !!updateSettingsError ||
      !!updateAppSettingsError ||
      !!updatedSyncMoyskladError
    ) {
      console.log(updatedSyncMoyskladError);
      const error = updateSettingsError
        ? updateSettingsError
        : updateAppSettingsError;
      snackbar.changeIsOpen(true);
      snackbar.changeSeverity('error');
      snackbar.changeMessage(t('Alert.BackendError', { error }));
      console.error('An error occured', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSettingsError, updateAppSettingsError, updatedSyncMoyskladError]);

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
    <>
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
          hasToken={hasAccessToken}
          settingsSave={onAppSettingsSave}
          synchronized={sync}
          synchronize={(sync) =>
            sync ? changeSynchronization() : setOpenSyncWarning(true)
          }
        />
      </Box>
      <AppDialog
        open={openSyncWarning}
        title={t('Settings.SyncWarningTitle')}
        content={t('Settings.SyncWarningText')}
        onAgree={() => {
          setOpenSyncWarning(false);
          changeSynchronization();
        }}
        handleClose={() => setOpenSyncWarning(false)}
        agreeText={t('Dialog.Agree')}
        cancelText={t('Dialog.Disagree')}
      />
    </>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Settings;
