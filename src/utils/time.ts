import { useEffect, useState } from 'react';

type TokenTimeProps = {
    death?: number;
};
export const useTokenTime = ({ death }: TokenTimeProps) => {
    const [aniTokenTime, setAniTokenTime] = useState<string>();

    useEffect(() => {
        if (death) {
            // const anilistTime = new Date(new Date().getTime() + anilistSeconds * 1000).getTime();
            const interval = setInterval(() => {
                const today = new Date().getTime();
                const futureDate = new Date(death * 1000).getTime();
                const diffTime = Math.abs(futureDate - today);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
                const diffMinutes = Math.floor((diffTime / (1000 * 60)) % 60);
                const diffSeconds = Math.floor((diffTime / 1000) % 60);
                setAniTokenTime(`${diffDays}d ${diffHours}h ${diffMinutes}m ${diffSeconds}s`);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, []);

    return { aniTokenTime };
};
