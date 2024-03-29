import { ScoreFormat } from '@/store/services/anilist/generated-anilist';

export const scoreValues = {
	[ScoreFormat.Point_100]: [
		'0',
		...Array.from({ length: 100 }, (_, i) => 100 - i)
			.sort((a, b) => b - a)
			.map((i) => `${i}`),
	],
	[ScoreFormat.Point_10]: Array.from(Array(11).keys())
		.sort((a, b) => b - a)
		.map((i) => `${i}`),
	[ScoreFormat.Point_10Decimal]: Array.from(
		{ length: Math.floor((10 - 1) / 0.1) + 1 },
		(_, i) => 1 + i * 0.1,
	)
		.sort((a, b) => b - a)
		.map((i) => `${i.toFixed(1)}`),
	[ScoreFormat.Point_5]: ['❌', '⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'],
	[ScoreFormat.Point_3]: ['❌', '☹️', '😐', '😊'],
};

export const scoreToIndex = (score: number, format: ScoreFormat) => {
	let index = 0;
	switch (format) {
		case ScoreFormat.Point_100:
			index = scoreValues[ScoreFormat.Point_100].findIndex((val) => val === `${score}`);
			return index > -1 ? index : 0;
		case ScoreFormat.Point_10:
			index = scoreValues[ScoreFormat.Point_10].findIndex((val) => val === `${score}`);
			return index > -1 ? index : 0;
		case ScoreFormat.Point_10Decimal:
			index = scoreValues[ScoreFormat.Point_10Decimal].findIndex((val) => val === `${score}`);
			return index > -1 ? index : 0;
		case ScoreFormat.Point_5:
			return score; // can be used as index already
		case ScoreFormat.Point_3:
			return score; // can be used as index already
	}
};

export const scoreStringToNumber = (score: string, format: ScoreFormat) => {
	if (format === ScoreFormat.Point_5) {
		return scoreValues[ScoreFormat.Point_5].indexOf(`${score}`);
	} else if (format === ScoreFormat.Point_3) {
		return scoreValues[ScoreFormat.Point_3].indexOf(`${score}`);
	} else {
		return parseInt(score);
	}
};
