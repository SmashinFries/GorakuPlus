import { useState, useEffect, useMemo } from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';

export const useColumns = (itemWidth: number) => {
	const { width } = useWindowDimensions();
	const [listKey, setListKey] = useState(1);

	const columns = useMemo(() => Math.floor(width / itemWidth), [itemWidth, width]);

	useEffect(() => {
		setListKey((prev) => prev + 1);
	}, [width]);

	return { columns, listKey };
};

const gcd = (a: number, b: number) => {
	return b == 0 ? a : gcd(b, a % b);
};

export const getAspectRatio = (width: number, height: number) => {
	const ratio = gcd(width, height);
	return `${width / ratio}:${height / ratio}`;
};

export const getAR = (value: number, limit = 50) => {
	let lower = [0, 1];
	let upper = [1, 0];

	while (true) {
		const mediant = [lower[0] + upper[0], lower[1] + upper[1]];

		if (value * mediant[1] > mediant[0]) {
			if (limit < mediant[1]) {
				return upper;
			}
			lower = mediant;
		} else if (value * mediant[1] == mediant[0]) {
			if (limit >= mediant[1]) {
				return mediant;
			}
			if (lower[1] < upper[1]) {
				return lower;
			}
			return upper;
		} else {
			if (limit < mediant[1]) {
				return lower;
			}
			upper = mediant;
		}
	}
};
