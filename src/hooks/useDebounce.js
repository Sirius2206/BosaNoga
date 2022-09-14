import { useState } from 'react';

export default function useDebounce() {
  const [funcTimeout, setFuncTimeout] = useState('');

  return function debounce(func, wait = 600) {
    clearTimeout(funcTimeout);
    const timeout = setTimeout(() => func(), wait);
    setFuncTimeout(timeout);
  };
}
