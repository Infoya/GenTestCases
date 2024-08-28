// utils/detectEnterKey.ts
import { useEffect } from 'react';

const useDetectEnterKey = (onEnterPress: () => void) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onEnterPress();  // Call the passed function when Enter is pressed
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onEnterPress]);  // Dependency on the callback function
};

export default useDetectEnterKey;