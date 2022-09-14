import { useState, useEffect, useRef } from 'react';

export default function useJsonFetch(url, opts) {
  const [data, setData] = useState(opts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const timestampRef = useRef();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const timestamp = Date.now();
      timestampRef.current = timestamp;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        if (timestampRef.current === timestamp) {
          const responseData = await response.json();
          setData(responseData);
        }
        setError(null);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    return () => setData(null);
  }, [url]);

  return [data, loading, error];
}
