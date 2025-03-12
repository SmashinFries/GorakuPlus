import { MediaListStatus, MediaStatus } from '@/api/anilist/__genereated__/gql';
import { useSettingsStore } from '@/store/settings/settingsStore';

const RED = '#FF0000';
const YELLOW = '#FFA500';
const GREEN = '#00d400';

const between = (score: number, min: number, max: number): boolean => {
	return score >= min && score <= max;
};

const getMalColor = (
	score: number,
	colors: {
		red: number;
		yellow: number;
	},
) => {
	const maxRed = colors.red * 0.1;
	const maxYellow = colors.yellow * 0.1;
	if (between(score, 0, maxRed)) {
		return RED;
	} else if (between(score, maxRed, maxYellow)) {
		return YELLOW;
	} else if (between(score, maxYellow, 10)) {
		return GREEN;
	}
};

export const getScoreColor = (score: number, isMal = false) => {
	const scoreColors = useSettingsStore.getState().scoreColors;

	if (isMal && scoreColors) {
		return getMalColor(score, scoreColors);
	}

	if (scoreColors && between(score, 0, scoreColors.red)) {
		return RED;
	} else if (scoreColors && between(score, scoreColors.red + 1, scoreColors.yellow)) {
		return YELLOW;
	} else if (scoreColors && between(score, scoreColors.yellow + 1, 100)) {
		return GREEN;
	}
};

export const ListColors = {
	[MediaListStatus.Completed]: '#00FF00',
	[MediaListStatus.Planning]: '#FFA500',
	[MediaListStatus.Dropped]: '#FF0000',
	[MediaListStatus.Paused]: '#FF0000',
	[MediaListStatus.Current]: '#3AADE9',
	[MediaListStatus.Repeating]: '#3AADE9',
};
export const listColor = (status: MediaListStatus) => {
	switch (status) {
		case MediaListStatus.Completed:
			return '#00FF00';
		case MediaListStatus.Planning:
			return '#FFA500';
		case MediaListStatus.Dropped:
		case MediaListStatus.Paused:
			return '#FF0000';
		case MediaListStatus.Current:
		case MediaListStatus.Repeating:
			return '#3AADE9';
		default:
			return undefined;
	}
};

export const rgbToRgba = (rgb: string, alpha: number) => {
	if (rgb.includes('rgba')) {
		return rgb.replace(/(\d+)\)/g, `${alpha})`);
	} else {
		return rgb.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
	}
};

export const rgbToHex = (rgb: number[]) => {
	let hexColor = '#';
	rgb.forEach((value) => {
		let hex = value.toString(16);
		hexColor += hex.length === 1 ? '0' + hex : hex;
	});

	return hexColor;
};

export const getPieChartColor = (index: number, primaryColor: string) => {
	switch (index) {
		case 0:
			return primaryColor;
		case 1:
			return 'grey';
		case 2:
			return 'red';
		case 3:
			return 'orange';
		case 4:
			return 'purple';
		case 5:
			return 'pink';
		case 6:
			return 'blue';
		default:
			break;
	}
};
