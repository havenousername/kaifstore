import { useState } from 'react';
import { RegisterUser } from '../interfaces/registration';
import { HttpStatus } from '@nestjs/common';

const useRegister = (
  action: () => void,
): [
  (r: RegisterUser) => Promise<void>,
  boolean,
  string | { message: string; statusCode: HttpStatus } | undefined,
] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<
    string | { message: string; statusCode: HttpStatus }
  >();
  const initiate = async ({
    email,
    firstName,
    lastName,
    password,
    birthDate,
    gender,
  }: RegisterUser) => {
    setLoading(true);
    const res = await fetch('/v1/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        password,
        birthDate,
        gender,
      }),
    });
    setLoading(false);

    if (res.status !== 201) {
      const error = await res.json();
      setError(error);
      return;
    }

    action();
  };

  return [initiate, loading, error];
};

export default useRegister;
