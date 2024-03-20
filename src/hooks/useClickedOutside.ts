import { useState, useEffect, useRef } from 'react';

export default function useClickedOutside<T extends HTMLElement>() {
    const [clickedOutside, setClickedOutside] = useState<boolean>(false);
    const ref = useRef<T>(null);

    function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (ref.current && !ref.current.contains(target)) {
            setClickedOutside(true);
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
    
        // Unbind the event listener on clean up
        return () => {
        document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return { ref, clickedOutside, setClickedOutside };
}