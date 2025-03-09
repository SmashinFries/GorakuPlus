import { MediaSeason } from '@/api/anilist/__genereated__/gql';

export const getSeason = (date = new Date(), next = false) => {
	const SEASONS = {
		WINTER: [1, 2, 3],
		SPRING: [4, 5, 6],
		SUMMER: [7, 8, 9],
		FALL: [10, 11, 12],
	};
	const currMonth = date.getMonth() + 1;
	const month = next ? currMonth + 3 : currMonth;
	let year = date.getFullYear();
	let current_season: MediaSeason | null = null;
	let same_year;
	for (const season in SEASONS) {
		if (SEASONS[season as keyof typeof SEASONS]?.includes(month)) {
			// @ts-ignore
			current_season = season;
			same_year = true;
			break;
		} else if (month > 12) {
			current_season = MediaSeason.Winter;
			year += 1;
			same_year = false;
			break;
		}
	}

	return { current_season, year, same_year };
};
