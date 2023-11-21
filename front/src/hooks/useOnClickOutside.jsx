'use client'

import { useEffect } from 'react'

export default function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handler(event)
            }
        }
        document.addEventListener('click', listener, false)
        return () => document.removeEventListener('click', listener, false)
    }, [ref, handler])
}
