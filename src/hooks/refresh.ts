import { useState } from 'react';

export const useRefresh = (action: () => any) => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const onRefresh = () => {
        setIsRefreshing(true);
        action();
        setIsRefreshing(false);
    };

    return { isRefreshing, onRefresh };
};
