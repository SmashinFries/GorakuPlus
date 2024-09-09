import { MediaType } from '@/api/anilist/__genereated__/gql';

export type AniCardTypes = 'media' | 'character' | 'staff';
export type AniCardPageParams = {
	cardType?: AniCardTypes;
	mediaType?: MediaType;
	idMal?: string;
	id: string;
};
