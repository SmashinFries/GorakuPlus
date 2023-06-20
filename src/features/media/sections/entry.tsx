import { MotiView } from 'moti';
import { ActivityIndicator, Button, IconButton } from 'react-native-paper';
import {
    AniMediaQuery,
    MediaType,
    useSaveMediaListItemMutation,
    useToggleFavMutation,
} from '../../../app/services/anilist/generated-anilist';
import { MotiPressable } from 'moti/interactions';
import { useListEntry } from '../hooks/mutations';
import { Selectable } from '../../../components/moti';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { TransYUpView } from '../../../components/animations';

const FAV_ICONS = ['heart-outline', 'heart'];
const LIST_ICONS = ['plus', 'playlist-check'];

type ListEntryViewProps = {
    id: number;
    type: MediaType;
    data: AniMediaQuery['Media']['mediaListEntry'];
    isFav: boolean;
};

const ListEntryView = ({ id, type, data, isFav }: ListEntryViewProps) => {
    const {
        deleteListItem,
        saveListItem,
        toggleFav,
        deletedListItemLoading,
        favLoading,
        savedMediaLoading,
    } = useListEntry();

    const { userID } = useSelector((state: RootState) => state.persistedAniLogin);

    const iconStates = {
        list: {
            icon: data ? LIST_ICONS[1] : LIST_ICONS[0],
            isLoading: savedMediaLoading || deletedListItemLoading,
            color: data ? 'green' : null,
        },
        fav: {
            icon: isFav ? FAV_ICONS[1] : FAV_ICONS[0],
            isLoading: favLoading,
            color: isFav ? 'red' : null,
        },
        disabled: userID ? false : true,
    };

    return (
        <TransYUpView>
            <MotiView
                style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 15 }}
            >
                <Selectable
                    onPress={() =>
                        toggleFav(type === MediaType.Anime ? { animeId: id } : { mangaId: id })
                    }
                    disabled={iconStates.disabled}
                >
                    {iconStates.fav.isLoading ? (
                        <ActivityIndicator
                            animating
                            size={'small'}
                            style={{ transform: [{ scale: 0.9 }] }}
                        />
                    ) : (
                        <IconButton
                            icon={iconStates.fav.icon}
                            iconColor={iconStates.fav.color}
                            disabled={iconStates.disabled}
                            size={32}
                        />
                    )}
                </Selectable>
                <Selectable
                    onPress={() =>
                        data ? deleteListItem({ id: data.id }) : saveListItem({ mediaId: id })
                    }
                    disabled={iconStates.disabled}
                >
                    {iconStates.list.isLoading ? (
                        <ActivityIndicator
                            animating
                            size={'small'}
                            style={{ transform: [{ scale: 0.9 }] }}
                        />
                    ) : (
                        <IconButton
                            disabled={iconStates.disabled}
                            icon={iconStates.list.icon}
                            iconColor={iconStates.list.color}
                            size={32}
                        />
                    )}
                </Selectable>
            </MotiView>
        </TransYUpView>
    );
};

export default ListEntryView;
