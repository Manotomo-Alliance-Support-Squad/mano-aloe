import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface ErrorResponse {
    status: number,
}

interface UseGetRequestProps {
    url: string,
}

export function useGetRequest<T>(props: UseGetRequestProps) {
    const [error, setError] = useState(false);
    const [data, setData] = useState<T>();
    const { url } = props;
    useEffect(() => {
        axios.get<T>(url).then((response) => setData(response.data)).catch((e) => {console.log(e);setError(true)})
    }, [setData]);
    return {
        data,
        error,
        fetching: data === undefined && error === undefined,
    };
}