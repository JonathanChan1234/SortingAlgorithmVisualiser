import { useState, useEffect, useRef } from 'react';

function useThrottleEffect<T>(throttleValue: T, initThrottleItem: T, delay: number) {
    const [throttleItem, setThrottleItem] = useState<T>(initThrottleItem);
    const savedArguments = useRef<T | null>(null);
    const throttle = useRef(false);

    useEffect(() => {
        if (throttle) {
            savedArguments.current = throttleValue;
        }
        if (throttle.current === false) {
            throttle.current = true;
            setThrottleItem(throttleValue);
            setTimeout(() => {
                if (savedArguments.current) setThrottleItem(savedArguments.current);
                savedArguments.current = null;
                throttle.current = false;
            }, delay);
        }
    }, [throttleValue, delay]);
    return throttleItem;
}

export default useThrottleEffect;