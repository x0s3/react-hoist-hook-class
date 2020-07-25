import { useState } from 'react';

interface CounterProps {
  counter: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export function useCounter(
  defaultValue: number = 0,
  boostNumber: number = 1
): CounterProps {
  const [counter, setCounter] = useState<number>(defaultValue);

  return {
    counter,
    increment: () => setCounter((c) => c + boostNumber),
    decrement: () => setCounter((c) => c - boostNumber),
    reset: () => setCounter(0)
  };
}
