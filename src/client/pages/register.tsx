import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import background from '../assets/background-register.png';
import { Box, FormGroup, Typography } from '@mui/material';
import BoxedContainer from '../components/boxed-container';
import { useTranslation } from 'react-i18next';
import AppIcon from '../components/common/app-icon';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '../components/input/validation/form-input';
import { RegisterUser } from '../interfaces/registration';
import AppBaseButton from '../components/common/app-base-button';
import { ReactComponent as DontShowEyeIcon } from '../assets/icons/dont-show-eye.svg';
import { ReactComponent as ShowEyeIcon } from '../assets/icons/show-eye.svg';
import FormSelect from '../components/input/validation/form-select';
import { Gender } from '../interfaces/gender';
import FormDatePicker from '../components/input/validation/form-date-picker';
import FormCheckbox from '../components/input/validation/form-checkbox';
import useRegisterSchema from '../hooks/use-register-schema';
import { subYears } from 'date-fns';

const Register: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  const schema = useRegisterSchema(t);

  const { handleSubmit, control } = useForm<RegisterUser>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      gender: Gender.MALE,
      birthDate: new Date(),
      agree: false,
    },
  });
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (data) => console.log('successfully submitted');

  useEffect(() => {
    console.log(subYears(new Date(), 18));
  }, []);

  return (
    <BoxedContainer
      background={background.src}
      title={t('KaifStore')}
      sxBox={{ width: '100%', maxWidth: 650 }}
    >
      <Typography
        variant={'h4'}
        component={'h2'}
        fontWeight={'bold'}
        textAlign={'left'}
        marginBottom={'1rem'}
      >
        {t('Register.CreateAccount')}
      </Typography>
      <Typography
        variant={'h6'}
        component={'h6'}
        color={'grey.100'}
        maxWidth={'38ch'}
        marginBottom={'1rem'}
        fontWeight={700}
      >
        {t('Register.CreateAccountReason')}
      </Typography>
      <FormGroup onSubmit={handleSubmit(() => console.log('submit'))}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <FormInput<RegisterUser>
            name={'firstName'}
            control={control}
            inputProps={{
              placeholder: t('Placeholder.FirstName'),
              sx: {
                fontSize: '0.8rem',
              },
            }}
            sx={{
              flexBasis: '48%',
            }}
            helperProps={helperProps}
          />
          <FormInput<RegisterUser>
            name={'lastName'}
            control={control}
            inputProps={{
              placeholder: t('Placeholder.FamilyName'),
              sx: {
                fontSize: '0.8rem',
              },
            }}
            sx={{
              flexBasis: '48%',
            }}
            helperProps={helperProps}
          />
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <FormInput<RegisterUser>
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
          <FormInput<RegisterUser>
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
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <FormSelect
            name={'gender'}
            control={control}
            selectProps={{
              values: [
                { value: Gender.MALE, content: 'Male' },
                { value: Gender.FEMALE, content: 'Female' },
              ],
            }}
            sx={{
              flexBasis: '48%',
            }}
            helperProps={helperProps}
          />
          <FormDatePicker
            name={'birthDate'}
            control={control}
            dateProps={{
              locale: i18n.language as 'fr' | 'en' | 'ru' | 'de',
            }}
            sx={{
              flexBasis: '48%',
            }}
            helperProps={helperProps}
          />
        </Box>
        <Box>
          <FormCheckbox<RegisterUser>
            name={'agree'}
            control={control}
            checkboxProps={{
              labelProps: {
                label: t('LoginPage.RememberMe'),
              },
            }}
          />
        </Box>
        <Box display={'flex'} justifyContent={'center'} marginTop={'2rem'}>
          <AppBaseButton
            variant={'contained'}
            type={'button'}
            onClick={handleSubmit(
              () => console.log('submit'),
              () => console.log('invalid'),
            )}
          >
            {t('Register.Register')}
          </AppBaseButton>
        </Box>
      </FormGroup>
    </BoxedContainer>
  );
};

export default Register;
