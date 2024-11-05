import { useCharacterDetailsQuery, useToggleFavMutation } from '@/api/anilist/__genereated__/gql';
import { usePostsSearch, useTagsSearchQuery } from '@/api/danbooru/danbooru';
import { useMatchStore } from '@/store/matchStore';
import { useEffect, useState } from 'react';
import useDebounce from '../useDebounce';
import { useShallow } from 'zustand/react/shallow';

const cleanName = (query: string) => {
	if (!query) return null;

	const splitName = query?.split(' ') ?? null;
	if (splitName?.length === 1) {
		return splitName[0].toLowerCase();
	} else if (splitName?.length > 2) {
		return `${splitName[0].toLowerCase()} ${splitName.at(-1).toLowerCase()}`;
	} else {
		return query.toLowerCase();
	}
};

export const useCharDetail = (id: number) => {
	const [isReady, setIsReady] = useState(false);
	const { isBooruEnabled, booruDB, addBooruTag } = useMatchStore(
		useShallow((state) => ({
			isBooruEnabled: state.isBooruEnabled,
			booruDB: state.booru,
			addBooruTag: state.addBooruTag,
		})),
	);
	const [currentArtTag, setCurrentArtTag] = useState<string>(booruDB[id] ?? '');
	const artTagDebounced = useDebounce(currentArtTag, 1000) as string;

	const { mutateAsync: toggleFav } = useToggleFavMutation();

	const charData = useCharacterDetailsQuery({ id: id }, { enabled: !!id });
	const tagOptions = useTagsSearchQuery(
		{
			'search[query]': charData.data?.Character?.name?.full
				? cleanName(charData.data?.Character?.name?.full)
				: null,
			'search[type]': 'tag',
			limit: 1,
		},
		!!charData.data?.Character?.name?.full,
	);
	const art = usePostsSearch({
		limit: 20,
		tags: isBooruEnabled ? (artTagDebounced ? `${artTagDebounced}` : '') : undefined,
		page: 1,
	});

	const onTagChange = (tag: string) => {
		setCurrentArtTag(tag);
	};

	useEffect(() => {
		if (tagOptions.data && !booruDB[id]) {
			setCurrentArtTag(tagOptions?.data[0]?.value);
		}
	}, [tagOptions.data, booruDB, id]);

	useEffect(() => {
		if (charData?.isFetched && charData?.data) {
			if (isBooruEnabled) {
				if (booruDB && booruDB[id]) {
					if (isBooruEnabled) {
						art.isFetched && setIsReady(true);
					}
				} else if (tagOptions?.isFetched) {
					if (tagOptions?.data?.length > 0) {
						addBooruTag(id, tagOptions?.data[0]?.value);
						setIsReady(true);
					} else {
						setIsReady(true);
					}
				}
			} else {
				setIsReady(true);
			}
		}
	}, [
		booruDB,
		charData?.isFetched,
		tagOptions?.isFetched,
		art.isFetched,
		charData?.data,
		isBooruEnabled,
		id,
		tagOptions?.data,
		addBooruTag,
	]);

	return {
		charData,
		art,
		tagOptions,
		currentArtTag,
		isReady,
		onTagChange,
		toggleFav,
	};
};
