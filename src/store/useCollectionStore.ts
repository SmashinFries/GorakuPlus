import { MMKV } from 'react-native-mmkv';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getZustandStorage } from './helpers/mmkv-storage';
import { LinkSourceCollectionQuery, TagCollectionQuery } from '@/api/anilist/__genereated__/gql';
import { create } from 'zustand';

const storage = new MMKV({
	id: 'collection-storage',
});
const CollectionStorage = getZustandStorage(storage);

export type Collections = {
	genres: string[];
	tags: {
		title: string;
		tags: TagCollectionQuery['MediaTagCollection'];
		subCategories: Collections['tags'];
	}[];
	animeLinks: LinkSourceCollectionQuery['AnimeExternalLinkSourceCollection'];
	mangaLinks: LinkSourceCollectionQuery['MangaExternalLinkSourceCollection'];
};

export type CollectionState = Collections & {
	refreshAt: number; // the time to refresh with new data
	refreshMode: 'manual' | 'weekly' | 'biweekly' | 'monthly';
};

type CollectionActions = {
	updateCollection: (type: keyof Collections, collectionData: any[]) => void;
	updateRefreshMode: (mode: CollectionState['refreshMode']) => void;
	resetRefreshAt: () => void;
	reset: (mode: keyof CollectionState | 'all') => void;
};

const getNextDate = (mode: CollectionState['refreshMode']) => {
	const today = Date.now();
	const week = 6.048e8;
	switch (mode) {
		case 'weekly':
			return today + week;
		case 'biweekly':
			return today + week * 2;
		case 'monthly':
			return today + week * 4;
		case 'manual':
			return -1;
		default:
			break;
	}
};

const initialData: CollectionState = {
	genres: [
		'Action',
		'Adventure',
		'Comedy',
		'Drama',
		'Ecchi',
		'Fantasy',
		'Hentai',
		'Horror',
		'Mahou Shoujo',
		'Mecha',
		'Music',
		'Mystery',
		'Psychological',
		'Romance',
		'Sci-Fi',
		'Slice of Life',
		'Sports',
		'Supernatural',
		'Thriller',
	],
	tags: [],
	animeLinks: [],
	mangaLinks: [],
	refreshAt: Date.now(),
	refreshMode: 'biweekly',
};

/**
 * Store for genres, tags, and source link data
 */
export const useCollectionStore = create<CollectionState & CollectionActions>()(
	persist(
		(set, _get) => ({
			...initialData,
			updateCollection(type, collectionData: TagCollectionQuery['MediaTagCollection']) {
				if (type === 'tags') {
					const categories = [
						...new Set(collectionData.map((item) => item.category.split('-')[0])),
					];
					const subCategories = [
						...new Set(
							collectionData.map(
								(item) => item.category.includes('-') && item.category,
							),
						),
					].filter((val) => !!val !== false);
					const tags = categories.map((cat) => {
						const item = {
							title: cat,
							tags: null,
							subCategories: null,
						};
						if (subCategories.some((val) => val.includes(cat + '-'))) {
							item['subCategories'] = subCategories
								.filter((subCat) => subCat.includes(cat + '-'))
								.map((subCat) => ({
									title: subCat.split('-')[1],
									tags: collectionData.filter((tag) => subCat === tag.category),
									subCategories: null,
								}));
						} else {
							item['tags'] = collectionData.filter((tag) => cat === tag.category);
						}

						return item;
					});
					set(() => ({ tags }));
				} else {
					set(() => ({ [type]: collectionData }));
				}
			},
			resetRefreshAt() {
				set((state) => ({ refreshAt: getNextDate(state.refreshMode) }));
			},
			updateRefreshMode(mode) {
				set(() => ({ refreshMode: mode }));
			},
			reset(type) {
				if (type === 'all') {
					set(() => initialData);
				} else {
					set(() => ({ [type]: type === 'genres' ? initialData.genres : [] }));
				}
			},
		}),
		{
			name: 'collection-storage',
			storage: createJSONStorage(() => CollectionStorage),
		},
	),
);
