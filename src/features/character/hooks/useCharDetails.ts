import { useEffect, useState } from 'react';
import {
    useCharacterDetailsQuery,
    useToggleFavMutation,
} from '../../../app/services/anilist/enhanced';
import {
    useSearchPostsQuery,
    useSearchTagsQuery,
} from '../../../app/services/danbooru/danbooruApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateCharArtDB } from '../charArtSlice';

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
    const charArtDB = useAppSelector((state) => state.persistedCharArtDB);
    const { showNSFW } = useAppSelector((state) => state.persistedSettings);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();
    const [currentArtTag, setCurrentArtTag] = useState<string>(charArtDB.data[id] ?? '');

    const [toggleFav, toggleFavResults] = useToggleFavMutation();
    const charData = useCharacterDetailsQuery({ id: id }, { skip: id === undefined });
    const tagOptions = useSearchTagsQuery(
        {
            'search[query]': charData.data?.Character?.name?.full
                ? cleanName(charData.data?.Character?.name?.full)
                : null,
            'search[type]': 'tag',
            limit: 1,
        },
        { skip: !charData.data?.Character?.name?.full },
    );
    const art = useSearchPostsQuery(
        {
            limit: 24,
            tags: currentArtTag
                ? showNSFW
                    ? `${currentArtTag} solo`
                    : `${currentArtTag} solo rating:g,s`
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
