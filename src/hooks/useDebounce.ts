import { useState, useEffect } from 'react';

export const useDebounce = ({ value, delay }: { value: string; delay: number }): { debouncedValue: string } => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return { debouncedValue };
};
