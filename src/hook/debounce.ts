import { useState, useEffect } from 'react';

function useDebounceEffect<T>(debounceValue: T, initDebounceItem: T, delay: number) {
    const [debounceItem, setDebounceItem] = useState<T>(initDebounceItem);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceItem(debounceValue);
        }, delay);
        return () => clearTimeout(timeout);
    }, [debounceValue, delay]);
    return debounceItem;
}

export default useDebounceEffect;