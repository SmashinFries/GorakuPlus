export type NekosRating = 'safe' | 'suggestive' | 'borderline' | 'explicit';

export type NekosRandomImagesQueryParams = {
	limit?: number;
	offset?: number;
	rating?: NekosRating[];
	is_original?: boolean;
	is_flagged?: boolean;
	artist?: number;
	character?: number[];
	tag?: number[];
};

export type NekosRandomImagesQueryResponse = {
	items: NekosRandomImageItem[];
	count: number;
};

export type NekosCharacterItem = {
	id: number;
	id_v2: string;
	name: string;
	aliases: string[];
	description: string;
	ages: number[];
	height: number | null;
	weight: number | null;
	gender: string;
	species: string;
	birthday: string | null;
	nationality: string;
	occupations: string[];
};

export type NekosTagItem = {
	id: number;
	id_v2: string;
	name: string;
	description: string;
	sub: string;
	is_nsfw: boolean;
};

export type NekosRandomImageItem = {
	id: number;
	id_v2: string;
	image_url: string;
	sample_url: string;
	image_size: number;
	image_width: number;
	image_height: number;
	sample_size: number;
	sample_width: number;
	sample_height: number;
	source: string | null;
	source_id: number | null;
	rating: NekosRating;
	verification: string;
	hash_md5: string;
	hash_perceptual: string;
	color_dominant: [number, number, number];
	color_palette: [number, number, number][];
	duration: number | null;
	is_original: boolean;
	is_screenshot: boolean;
	is_flagged: boolean;
	is_animated: boolean;
	artist: number | null;
	characters: NekosCharacterItem[];
	tags: NekosTagItem[];
	created_at: number;
	updated_at: number;
};
