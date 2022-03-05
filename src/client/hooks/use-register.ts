import { useState } from 'react';
import { RegisterUser } from '../interfaces/registration';

const useRegister = (
  action: () => void,
): [(r: RegisterUser) => Promise<void>, boolean, string] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
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
      setError(res.json());
      return;
    }

    action();
  };

  return [initiate, loading, error];
};

export default useRegister;
