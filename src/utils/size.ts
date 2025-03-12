export const getAR = (value: number, limit = 50) => {
	let lower = [0, 1];
	let upper = [1, 0];

	while (true) {
		const mediant = [lower[0] + upper[0], lower[1] + upper[1]];
		const comparison = compareMediant(value, mediant);

		if (mediant[1] > limit) {
			return comparison > 0 ? upper : lower;
		}

		if (comparison === 0) {
			return chooseFinalRatio(mediant, lower, upper, limit);
		}

		if (comparison > 0) {
			lower = mediant;
		} else {
			upper = mediant;
		}
	}
};

const compareMediant = (value: number, mediant: number[]) => {
	const comparison = value * mediant[1] - mediant[0];
	return Math.sign(comparison);
};

const chooseFinalRatio = (mediant: number[], lower: number[], upper: number[], limit: number) => {
	if (limit >= mediant[1]) {
		return mediant;
	}
	return lower[1] < upper[1] ? lower : upper;
};
