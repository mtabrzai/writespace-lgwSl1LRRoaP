import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useDebounce } from './useDebounce';

export function useDebouncedLocalStorage(key, initialValue, delay = 500) {
  const [storedValue, setStoredValue] = useLocalStorage(key, initialValue);
  const [internalValue, setInternalValue] = useState(storedValue);
  const debouncedValue = useDebounce(internalValue, delay);

  useEffect(() => {
    setStoredValue(debouncedValue);
  }, [debouncedValue, setStoredValue]);

  const setValue = useCallback((value) => {
    setInternalValue(value);
  }, []);

  return [internalValue, setValue];
}