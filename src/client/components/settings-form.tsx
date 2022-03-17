import { Control, UseFormGetValues } from 'react-hook-form/dist/types';
import { EditableUser } from '../interfaces/settings-user';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, FormControl, FormGroup, Typography } from '@mui/material';
import useGetHttpUrl from '../hooks/use-get-http-url';
import FormInput from './input/validation/form-input';
import FormSelect from './input/validation/form-select';
import { Gender } from '../interfaces/gender';
import FormDatePicker from './input/validation/form-date-picker';
import AppIcon from './common/app-icon';
import { ReactComponent as DontShowEyeIcon } from '../assets/icons/dont-show-eye.svg';
import { ReactComponent as ShowEyeIcon } from '../assets/icons/show-eye.svg';

const SettingsForm = ({
  image,
  control,
  getValues,
  isAdmin,
}: {
  image: string;
  control: Control<EditableUser>;
  getValues: UseFormGetValues<EditableUser>;
  setImage?: Dispatch<SetStateAction<string>>;
  isAdmin: boolean;
}) => {
  const { t, i18n } = useTranslation();
  const getHttpUrl = useGetHttpUrl();

  const [showPassword, setShowPassword] = useState(false);
  const onPasswordShowChange = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const helperProps = {
    sx: {
      fontSize: '0.75rem',
      lineHeight: '1.2',
    },
  };

  const fullName = useMemo(
    () => getValues('firstName') + ' ' + getValues('lastName'),
    [getValues],
  );

  const initials = useMemo(
    () =>
      getValues('lastName').toString().slice(0, 1) +
      getValues('firstName').toString().slice(0, 1),
    [getValues],
  );

  return (
    <FormControl component={'form'} sx={{ width: '100%', marginTop: '3rem' }}>
      <Box marginBottom={'2rem'}>
        <Avatar
          alt={fullName}
          src={getHttpUrl(image)}
          sx={{
            width: 156,
            height: 156,
            bgcolor: isAdmin ? 'error.light' : 'grey.600',
            color: 'common.white',
            fontSize: '2.5rem',
            letterSpacing: '3px',
            fontWeight: 700,
          }}
        >
          {initials}
        </Avatar>
      </Box>
      <Box
        display={'grid'}
        gridTemplateColumns={'repeat(12, 1fr)'}
        gridTemplateRows={'repeat(1, 1fr)'}
        gap={3}
      >
        <FormGroup sx={{ gridColumn: 'span 6' }}>
          <Typography variant={'h5'} component={'h5'} fontWeight={600}>
            {'Name'}*
          </Typography>
          <FormInput<EditableUser>
            name={'firstName'}
            control={control}
            inputProps={{
              placeholder: t('Products.ProductName'),
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
            {'Gender'}*
          </Typography>
          <FormSelect<EditableUser>
            name={'gender'}
            control={control}
            selectProps={{
              values: [Gender.MALE, Gender.FEMALE].map((i) => ({
                value: i,
                content: i,
              })),
            }}
            helperProps={helperProps}
          />
        </FormGroup>
        <FormGroup sx={{ gridColumn: 'span 6' }}>
          <Typography variant={'h5'} component={'h5'} fontWeight={600}>
            {'Family Name'}*
          </Typography>
          <FormInput<EditableUser>
            name={'lastName'}
            control={control}
            inputProps={{
              placeholder: t('Products.ProductName'),
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
            {'Birth Date'}*
          </Typography>
          <FormDatePicker
            name={'birthDate'}
            control={control}
            dateProps={{
              locale: i18n.language as 'fr' | 'en' | 'ru' | 'de',
            }}
            helperProps={helperProps}
          />
        </FormGroup>
        <FormGroup sx={{ gridColumn: 'span 6' }}>
          <Typography variant={'h5'} component={'h5'} fontWeight={600}>
            {'Password'}*
          </Typography>
          <FormInput<EditableUser>
            name={'password'}
            control={control}
            inputProps={{
              type: showPassword ? 'text' : 'password',
              startAdornment: (
                <AppIcon
                  width={20}
                  height={20}
                  htmlColor={'white'}
                  onClick={onPasswordShowChange}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  {showPassword ? <DontShowEyeIcon /> : <ShowEyeIcon />}
                </AppIcon>
              ),
              placeholder: t('Placeholder.Password'),
              sx: {
                fontSize: '0.8rem',
              },
            }}
            sx={{
              flexBasis: '48%',
            }}
            helperProps={helperProps}
          />
        </FormGroup>
        <FormGroup sx={{ gridColumn: 'span 6' }}>
          <Typography variant={'h5'} component={'h5'} fontWeight={600}>
            {'Confirm Password'}*
          </Typography>
          <FormInput<EditableUser>
            name={'confirmPassword'}
            control={control}
            sx={{
              flexBasis: '48%',
            }}
            inputProps={{
              type: showPassword ? 'text' : 'password',
              startAdornment: (
                <AppIcon
                  width={20}
                  height={20}
                  htmlColor={'white'}
                  onClick={onPasswordShowChange}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  {showPassword ? <DontShowEyeIcon /> : <ShowEyeIcon />}
                </AppIcon>
              ),
              placeholder: t('Placeholder.ConfirmPassword'),
            }}
            helperProps={helperProps}
          />
        </FormGroup>
      </Box>
    </FormControl>
  );
};

export default SettingsForm;
