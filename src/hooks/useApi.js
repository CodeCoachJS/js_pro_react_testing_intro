import { useEffect, useState } from 'react';

/**
 * useApi returns json or an error object
 * @param {string} url
 * @param {object} config an object with fetch params to POST/GET/etc and pass headers
 * @returns {object} { isLoading, error, data }
 */
const useApi = ({ url, config = {} }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(url, { config });
                const json = await res.json();
                setData(json);
                setIsLoading(false);
            } catch (e) {
                setError(e);
                setIsLoading(false);
            }
        };
        fetchData(url);
    }, [url]);

    return { isLoading, error, data };
};

export default useApi;
