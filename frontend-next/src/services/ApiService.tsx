import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface UseGetRequestProps {
  url: string;
}

interface ErrorResponse {
  message: string;
  code?: string;
}

export function useGetRequest<T>(props: UseGetRequestProps) {
  const [error, setError] = useState<ErrorResponse>();
  const [data, setData] = useState<T>();
  const { url } = props;
  useEffect(() => {
    axios
      .get<T>(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((e: unknown) => {
        if (axios.isAxiosError(e)) {
          setError({
            message: e.message,
            code: e.code,
          });
        } else if (e instanceof Error) {
          setError({
            message: e.message,
          });
        } else {
          setError({
            message: "An unknown error occurred",
          });
        }
        console.error(e);
      });
  }, [setData]);
  return {
    data,
    error,
    fetching: data === undefined && error === undefined,
  };
}
