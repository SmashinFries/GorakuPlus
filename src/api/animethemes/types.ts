export type AnimeSongsParams = {
	aniId: string | number;
};

export interface MainMusic {
	anime: AnimeDetails[];
	links: Links;
	meta: Meta;
}

export interface AnimeDetails {
	id: number;
	name: string;
	slug: string;
	year: number;
	season: string;
	synopsis: string;
	created_at: Date;
	updated_at: Date;
	deleted_at: null;
	animethemes: Animetheme[];
}

export interface Animetheme {
	id: number;
	type: string;
	sequence: number | null;
	group: null;
	slug: string;
	created_at: Date;
	updated_at: Date;
	deleted_at: null;
	song: Song;
	animethemeentries: Animethemeentry[];
}

export interface Animethemeentry {
	id: number;
	version: null;
	episodes: string;
	nsfw: boolean;
	spoiler: boolean;
	notes: null;
	created_at: Date;
	updated_at: Date;
	deleted_at: null;
	videos: Video[];
}

export interface Video {
	id: number;
	basename: string;
	filename: string;
	path: string;
	size: number;
	mimetype: string;
	resolution: number;
	nc: boolean;
	subbed: boolean;
	lyrics: boolean;
	uncen: boolean;
	source: string;
	overlap: string;
	created_at: Date;
	updated_at: Date;
	deleted_at: null;
	tags: string;
	link: string;
	audio: Audio;
}

export interface Audio {
	id: number;
	basename: string;
	size: number;
	link: string;
}

export interface Song {
	id: number;
	title: string;
	created_at: Date;
	updated_at: Date;
	deleted_at: null;
	artists: Artist[];
}

export interface Artist {
	id: number;
	name: string;
	slug: string;
	as: null;
	created_at: Date;
	updated_at: Date;
	deleted_at: null;
}

export interface Links {
	first: string;
	last: null;
	prev: null;
	next: null;
}

export interface Meta {
	current_page: number;
	from: number;
	path: string;
	per_page: number;
	to: number;
}
