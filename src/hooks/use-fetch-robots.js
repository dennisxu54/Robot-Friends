import { useState, useEffect } from "react";

export function useFetchRobots() {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRobots = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const result = await res.json();
        setList(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRobots();
  }, []);

  return { isLoading, error, list };
}
