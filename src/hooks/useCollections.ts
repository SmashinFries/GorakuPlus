import {
	useAllCollectionsQuery,
	useGenreCollectionQuery,
	useLinkSourceCollectionQuery,
	useTagCollectionQuery,
} from '@/api/anilist/__genereated__/gql';
import { Collections, useCollectionStore } from '@/store/useCollectionStore';
import { QueryClient } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

/**
 * a hook to rehydrate the stored collections
 * @returns fetch functions
 */
export const useCollectionUpdater = (queryClient: QueryClient) => {
	const { refreshAt, resetRefreshAt, updateCollection } = useCollectionStore(
		useShallow((state) => ({
			refreshAt: state.refreshAt,
			updateCollection: state.updateCollection,
			resetRefreshAt: state.resetRefreshAt,
		})),
	);

	/**
	 * fetch func for auto rehydration (or manually)
	 * @param forceRefresh ignores refresh date
	 */
	const fetchAllCollections = async (forceRefresh: boolean = false) => {
		const shouldRefresh = Date.now() >= refreshAt;
		if (shouldRefresh || forceRefresh) {
			const data = await queryClient.fetchQuery({
				queryKey: useAllCollectionsQuery.getKey(),
				queryFn: useAllCollectionsQuery.fetcher(),
			});
			data.GenreCollection && updateCollection('genres', data.GenreCollection);
			data.MediaTagCollection && updateCollection('tags', data.MediaTagCollection);
			data.AnimeExternalLinkSourceCollection &&
				updateCollection('animeLinks', data.AnimeExternalLinkSourceCollection);
			data.MangaExternalLinkSourceCollection &&
				updateCollection('mangaLinks', data.MangaExternalLinkSourceCollection);
			resetRefreshAt();
		}
	};

	/**
	 * fetch func for manual updates
	 * @param type a collection key from collectionStore
	 */
	const fetchCollection = async (type: keyof Collections) => {
		switch (type) {
			case 'genres':
				const genreData = await queryClient.fetchQuery({
					queryKey: useGenreCollectionQuery.getKey(),
					queryFn: useGenreCollectionQuery.fetcher(),
				});
				if (genreData.GenreCollection) {
					updateCollection('genres', genreData.GenreCollection);
				}
				break;
			case 'tags':
				const tagData = await queryClient.fetchQuery({
					queryKey: useTagCollectionQuery.getKey(),
					queryFn: useTagCollectionQuery.fetcher(),
				});
				if (tagData.MediaTagCollection) {
					updateCollection('tags', tagData.MediaTagCollection);
				}
				break;
			case 'animeLinks':
			case 'mangaLinks':
				const linkData = await queryClient.fetchQuery({
					queryKey: useLinkSourceCollectionQuery.getKey(),
					queryFn: useLinkSourceCollectionQuery.fetcher(),
				});
				if (linkData) {
					updateCollection(
						type,
						type === 'animeLinks'
							? (linkData.AnimeExternalLinkSourceCollection ?? [])
							: (linkData.MangaExternalLinkSourceCollection ?? []),
					);
				}
				break;
			default:
				break;
		}
	};

	return { fetchAllCollections, fetchCollection };
};
