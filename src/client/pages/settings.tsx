import React, { ReactElement, useContext, useEffect } from 'react';
import AppLayout from '../components/functional/app-layout';
import { NextPageWithLayout } from '../interfaces/pages-layout';
import { Box, Typography } from '@mui/material';
import SettingsForm from '../components/settings-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Gender } from '../interfaces/gender';
import useRegisterSchema from '../hooks/use-register-schema';
import { EditableUser } from '../interfaces/settings-user';
import { useTranslation } from 'react-i18next';
import { AuthenticationContext } from '../context/authenticated.context';
import { SUPER_USER_ROLE } from '../../backend/app/contstants';

const Settings: NextPageWithLayout = () => {
  const { t } = useTranslation();
  const schema = useRegisterSchema(t);
  const { user } = useContext(AuthenticationContext);
  const { control, setValue, getValues } = useForm<EditableUser>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      gender: Gender.MALE,
      birthDate: new Date(),
    },
  });

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

  if (!user) {
    return <></>;
  }

  const onUserSave = async () => {
    const editedUser = getValues();

    await fetch(`/v1/users/${user.id}`, {
      method: 'PUT',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedUser),
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
        {t('Settings.Settings')}
      </Typography>
      <SettingsForm
        getValues={getValues}
        control={control}
        image={user.photo}
        role={user.role}
        isAdmin={user.role.name === SUPER_USER_ROLE.name}
        userSave={onUserSave}
      />
    </Box>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Settings;
