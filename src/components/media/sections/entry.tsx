import { MotiView } from 'moti';
import { ActivityIndicator, IconButton, Portal, Text, useTheme } from 'react-native-paper';
import {
    AniMediaQuery,
    MediaListStatus,
    MediaType,
    SaveMediaListItemMutationVariables,
    ScoreFormat,
} from '@/store/services/anilist/generated-anilist';
import { useListEntry } from '@/hooks/media/mutations';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { memo, useCallback, useState } from 'react';
import { ListEntryEditDialog, RemoveListItemDialog } from '@/components/media/dialogs';
import { View } from 'react-native';

const FAV_ICONS = ['heart-outline', 'heart'];
const LIST_ICONS = ['plus', 'playlist-edit'];

type ListEntryViewProps = {
    id: number;
    type: MediaType;
    data: AniMediaQuery['Media']['mediaListEntry'];
    scoreFormat?: ScoreFormat;
    isFav: boolean;
};

const ListEntryView = ({ id, type, data, scoreFormat, isFav }: ListEntryViewProps) => {
    const {
        deleteListItem,
        saveListItem,
        toggleFav,
        deletedListItemLoading,
        favLoading,
        savedMediaLoading,
    } = useListEntry();

    const { userID } = useSelector((state: RootState) => state.persistedAniLogin);
    const { colors } = useTheme();

    const [showRemListDlg, setShowRemListDlg] = useState(false);
    const [showListEntryDlg, setShowListEntryDlg] = useState(false);
    const [listStatus, setListStatus] = useState<MediaListStatus | string>(data?.status ?? '');
    const [listProgress, setListProgress] = useState<number | null>(data?.progress ?? null);
    const [isOnList, setIsOnList] = useState(data ? true : false);

    const updateListEntry = useCallback(
        (variables?: SaveMediaListItemMutationVariables) => {
            saveListItem({ mediaId: id, status: MediaListStatus.Planning, ...variables }).then(
                (res) => {
                    if (res) {
                        setListStatus(res?.data?.SaveMediaListEntry?.status ?? null);
                        setIsOnList(true);
                    }
                },
            );
        },
        [id],
    );

    const iconStates = {
        list: {
            icon: isOnList ? LIST_ICONS[1] : LIST_ICONS[0],
            isLoading: savedMediaLoading || deletedListItemLoading,
            color: isOnList ? 'green' : null,
        },
        fav: {
            icon: isFav ? FAV_ICONS[1] : FAV_ICONS[0],
            isLoading: favLoading,
            color: isFav ? 'red' : null,
        },
        disabled: userID ? false : true,
    };

    return (
        <>
            <View>
                <MotiView
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginVertical: 15,
                    }}
                >
                    <View>
                        {iconStates.fav.isLoading ? (
                            <ActivityIndicator
                                animating
                                size={'small'}
                                style={{ transform: [{ scale: 0.9 }] }}
                            />
                        ) : (
                            <IconButton
                                icon={isFav ? FAV_ICONS[1] : FAV_ICONS[0]}
                                iconColor={isFav ? 'red' : null}
                                disabled={!iconStates.disabled ? false : true}
                                size={32}
                                onPress={() =>
                                    toggleFav(
                                        type === MediaType.Anime
                                            ? { animeId: id }
                                            : { mangaId: id },
                                    )
                                }
                            />
                        )}
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ alignItems: 'center' }}>
                            {iconStates.list.isLoading ? (
                                <ActivityIndicator animating size={32} />
                            ) : (
                                <IconButton
                                    disabled={!iconStates.disabled ? false : true}
                                    icon={isOnList ? LIST_ICONS[1] : LIST_ICONS[0]}
                                    iconColor={isOnList ? colors.primary : null}
                                    onPress={() =>
                                        isOnList ? setShowListEntryDlg(true) : updateListEntry()
                                    }
                                    onLongPress={() => (isOnList ? setShowRemListDlg(true) : null)}
                                    size={32}
                                />
                            )}
                            <Text
                                style={{
                                    textTransform: 'capitalize',
                                    color: colors.onSurfaceVariant,
                                }}
                                variant="labelMedium"
                            >
                                {listStatus ? listStatus?.replaceAll('_', ' ') : ''}
                                {listProgress ? ` · ${listProgress}` : ''}
                            </Text>
                        </View>
                    </View>
                </MotiView>
            </View>
            <Portal>
                <RemoveListItemDialog
                    visible={showRemListDlg}
                    onDismiss={() => setShowRemListDlg(false)}
                    onConfirm={() => {
                        deleteListItem({ id: data.id });
                        setIsOnList(false);
                        setListStatus('');
                        setListProgress(null);
                    }}
                />
                <ListEntryEditDialog
                    visible={showListEntryDlg}
                    entryData={data}
                    scoreFormat={scoreFormat}
                    status={listStatus}
                    updateEntry={updateListEntry}
                    onDismiss={() => setShowListEntryDlg(false)}
                />
            </Portal>
        </>
    );
};

export const ListEntryViewMem = memo(ListEntryView);
export default ListEntryView;
