type AniTrendzCreatedAt = {
	_nanoseconds: 186000000;
	_seconds: 1721715421;
};
type AniTrendzHidden = {
	createdAt: AniTrendzCreatedAt;
	uid: string;
	total: number;
	previously: number;
	weeksAtTopTen: number;
	name: string;
	peak: number;
	position: number;
	tag: string;
	nameAlt: string;
	subText: string;
	updatedAt: AniTrendzCreatedAt;
};

type AniTrendzImage = {
	small: string;
	large: string;
	medium: string;
	full: string;
};
export type AniTrendzCharChoice = {
	images: AniTrendzImage;
	images2?: AniTrendzImage;
	peak: number;
	subText: string;
	createdAt: AniTrendzCreatedAt;
	uid: string;
	total: number;
	previously: number;
	weeksAtTopTen: number;
	name: string;
	position: number;
	tag: string;
	nameAlt: string;
	updatedAt: AniTrendzCreatedAt;
	stagnation?: string;
};
export type AniTrendsCharacterResponse = [
	{
		date: string;
		week: string;
		name: string;
		season: string;
		votes: number;
		slug: string;
		uid: string;
		hidden: AniTrendzHidden[];
		choices: AniTrendzCharChoice[];
		unpublished: boolean;
		id: string;
	},
];

export type AniTrendzChartTypes = 'anime' | 'female' | 'male' | 'couple';

export enum AniTrendzChartPathEnum {
	'anime' = 'top-anime',
	'female' = 'female-characters',
	'male' = 'male-characters',
	'couple' = 'couple-ship',
}
