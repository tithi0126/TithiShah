import { useState, useEffect } from 'react';

// Helper function to safely parse localStorage values
const parseStorageValue = (value) => {
  if (value === null || value === undefined) {
    return null;
  }
  try {
    // Attempt to parse as JSON. This will handle '"light"' -> 'light'
    return JSON.parse(value);
  } catch (error) {
    // If parsing fails, assume it's a plain string like 'light' or 'dark'
    // and return it as is.
    return value;
  }
};

export const useLocalStorage = (key, initialValue) => {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      const parsedValue = parseStorageValue(item);
      return parsedValue !== null ? parsedValue : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes to localStorage from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        const parsedValue = parseStorageValue(e.newValue);
        if (parsedValue !== null) {
          setStoredValue(parsedValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  // Function to clear storage value (useful for error recovery)
  const clearValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, clearValue];
};
