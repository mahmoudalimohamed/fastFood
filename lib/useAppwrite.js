import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = ({ fn, params = {}, skip = false }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (fetchParams) => {
      setLoading(true);
      setError(null);

      try {
        // Call the provided async function with parameters
        const result = await fn({ ...fetchParams });
        setData(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  // Run fetch on mount unless skip is true
  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, []);

  // Function to manually refetch with new parameters
  const refetch = async (newParams) => await fetchData(newParams);

  // Return state and refetch function for use in components
  return { data, loading, error, refetch };
};

export default useAppwrite;
