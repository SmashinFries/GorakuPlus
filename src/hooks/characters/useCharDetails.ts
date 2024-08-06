import { useCharacterDetailsQuery, useToggleFavMutation } from '@/api/anilist/__genereated__/gql';
import { usePostsSearch, useTagsSearchQuery } from '@/api/danbooru/danbooru';
import { useMatchStore } from '@/store/matchStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useEffect, useState } from 'react';

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
	const { booru } = useMatchStore();
	const { showNSFW } = useSettingsStore();
	const [isLoading, setIsLoading] = useState(true);
	const [currentArtTag, setCurrentArtTag] = useState<string>(booru[id] ?? '');

	const { mutateAsync } = useToggleFavMutation();
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
	const art = usePostsSearch(
		{
			limit: 24,
			tags: currentArtTag
				? showNSFW
					? `${currentArtTag} solo`
					: `${currentArtTag} solo rating:g`
				: '',
			page: 1,
		},
		{ skip: !currentArtTag, refetchOnMountOrArgChange: true },
	);

	const onTagChange = (tag: string) => {
		setCurrentArtTag(tag);
	};

	useEffect(() => {
		if (tagOptions.data && !charArtDB.data[id]) {
			setCurrentArtTag(tagOptions?.data[0]?.value);
			dispatch(updateCharArtDB({ aniId: id, booruTag: tagOptions?.data[0]?.value }));
		}
	}, [tagOptions.data, charArtDB]);

	useEffect(() => {
		if (!charData.isFetching && !tagOptions.isFetching && !art.isFetching) {
			setIsLoading(false);
		}
	}, [charData.isFetching, tagOptions.isFetching, art.isFetching]);

	return {
		charData,
		art,
		tagOptions,
		currentArtTag,
		isLoading,
		onTagChange,
		toggleFav,
	};
};
