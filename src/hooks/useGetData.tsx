import useSWR from 'swr';

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const useGetData = <T,>(url: string) => {
  const { data, ...meta } = useSWR<{ data: T }>(`/api/${url}`, fetcher);
  return [data?.data, meta] as const;
};

export default useGetData;
