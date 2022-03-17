import useApiMethod from './useApiMethod';

const useGroupFetchRemove = () => {
  return useApiMethod<{ num: number }, { id: number }>(
    ({ id }) => `v1/product-groups/${id}`,
    (d: any) => ({ num: d }),
    { method: 'DELETE' },
  );
};

export default useGroupFetchRemove;
