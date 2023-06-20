import { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';

export const useColumns = (itemWidth: number) => {
    const { width } = useWindowDimensions();
    const [listKey, setListKey] = useState(1);

    const columns = Math.floor(width / itemWidth);

    useEffect(() => {
        setListKey((prev) => prev + 1);
    }, [width]);

    return { columns, listKey };
};
