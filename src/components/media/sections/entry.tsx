import { MotiView } from 'moti';
import {
    ActivityIndicator,
    IconButton,
    List,
    Portal,
    Text,
    TextInput,
    useTheme,
} from 'react-native-paper';
import {
    AniMediaQuery,
    FuzzyDate,
    MediaList,
    MediaListStatus,
    MediaStatus,
    MediaType,
    SaveMediaListItemMutation,
    SaveMediaListItemMutationVariables,
    ScoreFormat,
} from '@/store/services/anilist/generated-anilist';
import { useListEntry } from '@/hooks/media/useMutations';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RemoveListItemDialog } from '@/components/media/dialogs';
import { Pressable, StyleProp, View, ViewStyle, useWindowDimensions } from 'react-native';
import { NumberPickDialog } from '@/components/dialogs';
import useFilterSheet from '@/hooks/search/useSheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import {
    BottomSheetModal,
    BottomSheetScrollView,
    BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { DatePopup, StatusDropDown } from '../entryActions';
import { NumberPickerMode } from '@/components/picker';

const FAV_ICONS = ['heart-outline', 'heart'];
const LIST_ICONS = ['plus', 'playlist-edit'];

const ICON_SIZE = 24;

type ListEntryViewProps = {
    id: number;
    type: MediaType;
    status: MediaStatus;
    releaseMessage?: string;
    data: AniMediaQuery['Media']['mediaListEntry'];
    scoreFormat?: ScoreFormat;
    isFav: boolean;
    onShowReleases: () => void;
    refreshData: () => void;
};

type ActionIconProps = {
    children: React.ReactNode;
    icon?: string;
    onPress: () => void;
    onLongPress?: () => void;
};
const ActionIcon = ({ children, icon, onPress, onLongPress }: ActionIconProps) => {
    const { colors } = useTheme();
    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            android_ripple={{
                borderless: false,
                foreground: true,
                color: colors.primary,
            }}
            style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 12,
                overflow: 'hidden',
                alignItems: 'center',
            }}
        >
            {icon && <IconButton icon={icon} size={ICON_SIZE} />}
            {children}
        </Pressable>
    );
};

const ListEntryView = ({
    id,
    type,
    status,
    releaseMessage,
    data,
    scoreFormat,
    isFav,
    refreshData,
    onShowReleases,
}: ListEntryViewProps) => {
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

    const sheetRef = useRef<BottomSheetModalMethods>(null);
    const { isFilterOpen, openSheet } = useFilterSheet(sheetRef);

    const [showRemListDlg, setShowRemListDlg] = useState(false);
    const [listStatus, setListStatus] = useState<MediaListStatus | string>(data?.status ?? '');
    const [listProgress, setListProgress] = useState<number | null>(data?.progress ?? null);
    const [isOnList, setIsOnList] = useState(data ? true : false);

    const { width } = useWindowDimensions();

    const containerWidth = width / 3;
    const splitReleaseMessage = releaseMessage?.includes('\n')
        ? releaseMessage?.split('\n')
        : [releaseMessage];

    const updateListEntry = useCallback(
        (variables?: SaveMediaListItemMutationVariables) => {
            saveListItem({ mediaId: id, status: MediaListStatus.Planning, ...variables }).then(
                (res) => {
                    if (res) {
                        setListStatus(
                            (res as { data: SaveMediaListItemMutation })?.data?.SaveMediaListEntry
                                ?.status ?? null,
                        );
                        setIsOnList(true);
                        refreshData();
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
                        marginTop: 15,
                        alignItems: 'flex-start',
                    }}
                >
                    <View
                        style={{
                            width: containerWidth,
                            borderRadius: 12,
                            alignItems: 'center',
                        }}
                    >
                        <ActionIcon
                            icon={
                                status === MediaStatus.Finished ? 'timer-sand-full' : 'timer-sand'
                            }
                            onPress={onShowReleases}
                        >
                            <Text
                                style={{
                                    textTransform: 'capitalize',
                                    color: colors.onSurfaceVariant,
                                    textAlign: 'center',
                                }}
                                variant="labelMedium"
                            >
                                {splitReleaseMessage[0]?.length > 0 ? splitReleaseMessage[0] : 'Unknown'}
                            </Text>
                            {splitReleaseMessage?.length > 1 ? (
                                <Text
                                    style={{
                                        color: colors.onSurfaceVariant,
                                        textAlign: 'center',
                                    }}
                                    variant="labelSmall"
                                >
                                    {splitReleaseMessage.at(-1)}
                                </Text>
                            ) : null}
                        </ActionIcon>
                    </View>

                    <View style={{ width: containerWidth, borderRadius: 12, alignItems: 'center' }}>
                        {iconStates.fav.isLoading ? (
                            <ActivityIndicator
                                animating
                                size={'small'}
                                style={{ transform: [{ scale: 0.9 }] }}
                            />
                        ) : (
                            <ActionIcon
                                onPress={() =>
                                    toggleFav(
                                        type === MediaType.Anime
                                            ? { animeId: id }
                                            : { mangaId: id },
                                    )
                                }
                            >
                                <IconButton
                                    icon={isFav ? FAV_ICONS[1] : FAV_ICONS[0]}
                                    iconColor={isFav ? colors.primary : null}
                                    disabled={!iconStates.disabled ? false : true}
                                    size={ICON_SIZE}
                                />
                                <Text
                                    style={{
                                        textTransform: 'capitalize',
                                        color: isFav ? colors.primary : colors.onSurfaceVariant,
                                    }}
                                    variant="labelMedium"
                                >
                                    {isFav ? 'Favorited' : 'Favorite'}
                                </Text>
                            </ActionIcon>
                        )}
                    </View>
                    <View
                        style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: containerWidth,
                        }}
                    >
                        <ActionIcon
                            onPress={() => (isOnList ? openSheet() : updateListEntry())}
                            onLongPress={() => (isOnList ? setShowRemListDlg(true) : null)}
                        >
                            {iconStates.list.isLoading ? (
                                <ActivityIndicator animating size={ICON_SIZE} />
                            ) : (
                                <IconButton
                                    disabled={!iconStates.disabled ? false : true}
                                    icon={isOnList ? LIST_ICONS[1] : LIST_ICONS[0]}
                                    iconColor={isOnList ? colors.primary : null}
                                    size={ICON_SIZE}
                                />
                            )}
                            <Text
                                style={{
                                    textTransform: 'capitalize',
                                    color: isOnList ? colors.primary : colors.onSurfaceVariant,
                                }}
                                variant="labelMedium"
                            >
                                {listStatus ? listStatus?.replaceAll('_', ' ') : 'Add to List'}
                                {listProgress ? ` · ${listProgress}` : ''}
                            </Text>
                        </ActionIcon>
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
                {/* <ListEntryEditDialog
                    visible={showListEntryDlg}
                    entryData={data}
                    scoreFormat={scoreFormat}
                    status={listStatus}
                    updateEntry={updateListEntry}
                    onDismiss={() => setShowListEntryDlg(false)}
                /> */}
            </Portal>
            {data && (
                <ListEntrySheet
                    ref={sheetRef}
                    entryData={data}
                    scoreFormat={scoreFormat}
                    status={listStatus}
                    updateEntry={updateListEntry}
                />
            )}
        </>
    );
};

type EntryNumInputProps = {
    value: any | null | undefined;
    title: string;
    inputType: 'number' | 'date' | 'string';
    onChange: (value: any) => void;
    style?: StyleProp<ViewStyle>;
};

type ListEntrySheetProps = {
    entryData: AniMediaQuery['Media']['mediaListEntry'];
    status: MediaListStatus | string;
    scoreFormat: ScoreFormat;
    updateEntry: (variables: SaveMediaListItemMutationVariables) => void;
};
export const ListEntrySheet = React.forwardRef<BottomSheetModalMethods, ListEntrySheetProps>(
    (props, ref) => {
        const { height } = useWindowDimensions();
        const { colors } = useTheme();
        const [mainEntryHeight, setMainEntryHeight] = useState(0);
        const snapPoints = useMemo(
            () => [
                `${(
                    (mainEntryHeight / height > 0 ? (mainEntryHeight + 20) / height : 0.3) * 100
                ).toFixed(4)}%`,
                '50%',
                '100%',
            ],
            [mainEntryHeight, height],
        );

        const [tempParams, setTempParams] = useState({
            status: props.status,
            score: props.entryData?.score,
            progress: props.entryData?.progress,
            start: props.entryData?.startedAt,
            end: props.entryData?.completedAt,
            repeat: props.entryData?.repeat,
            notes: props.entryData?.notes,
        });

        const submitNewEntry = () => {
            if (
                tempParams.status === props.status &&
                tempParams.progress === props.entryData?.progress &&
                tempParams.score === props.entryData?.score &&
                tempParams.start === props.entryData?.startedAt &&
                tempParams.end === props.entryData?.completedAt &&
                tempParams.repeat === props.entryData?.repeat &&
                tempParams.notes === props.entryData?.notes
            )
                return;
            props.updateEntry({
                status: tempParams.status as MediaListStatus,
                progress: tempParams.progress,
                score: tempParams.score,
                startedAt: tempParams.start,
                completedAt: tempParams.end,
                repeat: tempParams.repeat,
                notes: tempParams.notes,
            });
        };

        const updateParams = (
            key: 'status' | 'score' | 'progress' | 'start' | 'end' | 'repeat' | 'notes',
            value: MediaListStatus | number | FuzzyDate | string,
        ) => {
            setTempParams((prev) => ({ ...prev, [key]: value }));
        };

        const EntryNumInput = ({
            title,
            style,
            value,
            inputType,
            onChange,
        }: EntryNumInputProps) => {
            const [showNumPick, setShowNumPick] = useState(false);
            const [containerHeight, setContainerHeight] = useState(0);
            const totalProgress =
                props.entryData.media?.episodes ??
                props.entryData.media?.chapters ??
                props.entryData.media?.volumes;
            const mode: NumberPickerMode =
                title === 'Progress'
                    ? props.entryData.media?.episodes ||
                      props.entryData.media?.chapters ||
                      props.entryData.media?.volumes
                        ? null
                        : 'unknown_chapters'
                    : 'scores';

            if (props.entryData.media?.status === MediaStatus.NotYetReleased) return null;
            return (
                <>
                    <Pressable
                        onLayout={({ nativeEvent }) =>
                            setContainerHeight(Math.floor(nativeEvent.layout.height - 10))
                        }
                        android_ripple={{
                            color: colors.primary,
                            borderless: true,
                            foreground: true,
                            radius: containerHeight ?? 40,
                        }}
                        onPress={() => {
                            inputType !== 'date' && setShowNumPick(true);
                        }}
                        style={[style]}
                    >
                        {inputType === 'number' || inputType === 'string' ? (
                            <>
                                <List.Subheader style={{ textAlign: 'center' }}>
                                    {title}
                                </List.Subheader>
                                <Text style={{ textAlign: 'center', textTransform: 'capitalize' }}>
                                    {value}
                                </Text>
                            </>
                        ) : null}
                        {inputType === 'date' && (
                            <DatePopup
                                value={value}
                                title={title}
                                containerHeight={containerHeight}
                                onSelect={(item) =>
                                    updateParams(title.includes('Start') ? 'start' : 'end', item)
                                }
                            />
                        )}
                    </Pressable>
                    <Portal>
                        <NumberPickDialog
                            title={'Set ' + title}
                            mode={mode}
                            onChange={onChange}
                            visible={showNumPick}
                            onDismiss={() => setShowNumPick(false)}
                            defaultValue={value}
                            options={
                                totalProgress && title === 'Progress'
                                    ? Array.from(Array(totalProgress + 1).keys()).map((i) => `${i}`)
                                    : null
                            }
                        />
                    </Portal>
                </>
            );
        };

        return (
            <>
                <BottomSheetModal
                    ref={ref}
                    index={0}
                    snapPoints={snapPoints}
                    backgroundStyle={{ backgroundColor: colors.elevation.level5 }}
                    onDismiss={() => submitNewEntry()}
                    // onChange={handleSheetChange}
                >
                    <BottomSheetScrollView style={{ flex: 1 }} nestedScrollEnabled>
                        <View
                            onLayout={({ nativeEvent }) =>
                                setMainEntryHeight(nativeEvent.layout.height)
                            }
                        >
                            <View
                                style={{
                                    justifyContent: 'space-evenly',
                                    paddingVertical: 10,
                                    marginHorizontal: 20,
                                }}
                            >
                                <StatusDropDown
                                    value={tempParams.status}
                                    isUnreleased={
                                        props.entryData.media?.status === MediaStatus.NotYetReleased
                                    }
                                    onSelect={(item) => updateParams('status', item)}
                                />
                            </View>
                            {props.entryData.media?.status !== MediaStatus.NotYetReleased && (
                                <>
                                    <View
                                        style={{
                                            height: 0.5,
                                            width: '90%',
                                            alignSelf: 'center',
                                            backgroundColor: '#000',
                                        }}
                                    />
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                            paddingVertical: 10,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <EntryNumInput
                                            title="Progress"
                                            inputType="number"
                                            value={tempParams.progress}
                                            onChange={(val) => updateParams('progress', val)}
                                        />
                                        <View
                                            style={{
                                                height: '100%',
                                                width: 0.5,
                                                backgroundColor: '#000',
                                            }}
                                        />
                                        <EntryNumInput
                                            title="Score"
                                            inputType="number"
                                            value={tempParams.score}
                                            onChange={(val) => updateParams('score', val)}
                                        />
                                        <View
                                            style={{
                                                height: '100%',
                                                width: 0.5,
                                                backgroundColor: '#000',
                                            }}
                                        />
                                        <EntryNumInput
                                            title="Repeats"
                                            inputType="number"
                                            value={tempParams.repeat}
                                            onChange={(val) => updateParams('repeat', val)}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            height: 0.5,
                                            width: '90%',
                                            alignSelf: 'center',
                                            backgroundColor: '#000',
                                        }}
                                    />
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                            paddingVertical: 10,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <EntryNumInput
                                            title="Start Date"
                                            inputType="date"
                                            value={tempParams.start}
                                            onChange={(val) => null}
                                        />
                                        <View
                                            style={{
                                                height: '100%',
                                                width: 0.5,
                                                backgroundColor: '#000',
                                            }}
                                        />
                                        <EntryNumInput
                                            title="End Date "
                                            inputType="date"
                                            value={tempParams.end}
                                            onChange={(val) => null}
                                        />
                                    </View>
                                </>
                            )}
                        </View>
                        <List.Section title="Notes">
                            <BottomSheetTextInput
                                multiline
                                value={tempParams.notes}
                                clearButtonMode="while-editing"
                                onChangeText={(text) => updateParams('notes', text)}
                                style={{
                                    alignSelf: 'stretch',
                                    marginHorizontal: 12,
                                    marginBottom: 12,
                                    padding: 12,
                                    borderRadius: 12,
                                    backgroundColor: colors.elevation.level1,
                                    color: colors.onSurface,
                                    fontSize: 14,
                                }}
                            />
                        </List.Section>
                    </BottomSheetScrollView>
                </BottomSheetModal>
            </>
        );
    },
);

export const ListEntryViewMem = memo(ListEntryView);
export default ListEntryView;
