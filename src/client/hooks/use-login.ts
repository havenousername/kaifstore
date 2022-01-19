import { useState } from 'react';

const useLogin = (action: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const initiate = async (email: string, password: string) => {
    setLoading(true);
    const res = await fetch('/v1/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
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

export default useLogin;
