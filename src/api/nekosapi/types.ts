export type NekosApiImageSearchParams = {
	rating?: ('safe' | 'suggestive' | 'borderline' | 'explicit')[];
	artist?: string[];
	tags?: string[];
	without_tags?: string[];
	limit?: number;
	offset?: number;
}

export type NekosApiImageResponse = {
	id: number;
	url: string;
	rating: 'safe' | 'suggestive' | 'borderline' | 'explicit';
	color_dominant: [number, number, number];
	color_palette: [number, number, number][];
	artist_name: string | null;
	tags: string[];
	source_url: string;
}

export type NekosApiImageSearchResponse = {
	items: NekosApiImageResponse[];
	count: number;
}