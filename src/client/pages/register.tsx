import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useState,
} from 'react';
import background from '../assets/background-register.png';
import { Box, FormControl, Link, Typography } from '@mui/material';
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
import useRegister from '../hooks/use-register';
import { AuthenticationContext } from '../context/authenticated.context';
import { useRouter } from 'next/router';

const Register: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  const schema = useRegisterSchema(t);
  const router = useRouter();
  const { checkAuthentication } = useContext(AuthenticationContext);

  const { handleSubmit, control } = useForm<RegisterUser>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
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

  const goToPrivateRoute = async () => {
    await checkAuthentication();
    await router.push('/');
  };

  const [register] = useRegister(goToPrivateRoute);

  const onSubmit = (data: RegisterUser) => register(data);

  return (
    <BoxedContainer
      background={background.src}
      title={t('KaifStore')}
      sxBox={{
        width: '100%',
        maxWidth: 650,
        maxHeight: 600,
        height: '100%',
        overflowY: 'scroll',
      }}
      footer={
        <>
          <Typography
            variant={'h5'}
            component={'h6'}
            color={'grey.100'}
            maxWidth={'38ch'}
            marginTop={'5rem'}
            display={'flex'}
            minWidth={'280px'}
            justifyContent={'space-between'}
            height={'auto'}
          >
            <span>{t('Register.HaveAccount')}</span>
            <Link color={'secondary'} fontWeight={'600'} href={'/login'}>
              {t('Register.Login')}
            </Link>
          </Typography>
        </>
      }
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
      <FormControl component={'form'} onSubmit={handleSubmit(onSubmit)}>
        <FormInput<RegisterUser>
          name={'email'}
          control={control}
          inputProps={{
            placeholder: t('Placeholder.Email'),
            sx: {
              fontSize: '0.8rem',
            },
          }}
          helperProps={helperProps}
        />
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
                { value: Gender.MALE, content: t('Placeholder.Male') },
                { value: Gender.FEMALE, content: t('Placeholder.Female') },
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
                label: t('LoginPage.RememberMe').toString(),
              },
            }}
          />
        </Box>
        <Box display={'flex'} justifyContent={'center'} marginTop={'2rem'}>
          <AppBaseButton variant={'contained'} type={'submit'}>
            {t('Register.Register')}
          </AppBaseButton>
        </Box>
      </FormControl>
    </BoxedContainer>
  );
};

export default Register;
