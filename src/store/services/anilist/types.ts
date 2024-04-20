import { GenreTagCollectionQuery, MediaTag } from './generated-anilist';

export type GenreTagCollectionQueryAlt = Omit<GenreTagCollectionQuery, 'MediaTagCollection'> & {
	MediaTagCollection: Array<{
		title: string;
		data: Array<MediaTag>;
	}>;
};
