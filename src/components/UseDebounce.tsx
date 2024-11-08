import { useEffect, useState } from "react";

function useDebounce(value: string, delay: number): string {
  // value and delay in ms (1000ms = 1s)
  // debounced values
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const t = setTimeout(():void => {
        setDebouncedValue(value);
      }, delay);

      // clean up the timeout after value changes
      return ():void => {
        clearTimeout(t);
      };
    },
    [value, delay], // re-run if value or delay changes
  );
  return debouncedValue;
}

export default useDebounce;
