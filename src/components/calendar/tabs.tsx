import * as React from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { MediaCard, MediaCardRow } from '../cards';
// import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import Animated, {
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from 'react-native-reanimated';
import { Text } from 'react-native-paper';
import { WeeklyAnimeQuery } from '@/api/anilist/__genereated__/gql';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useDisplayStore } from '@/store/displayStore';
import { useColumns } from '@/hooks/useColumns';
import { useShallow } from 'zustand/react/shallow';

const RenderEmpty = ({ message }: { message: string }) => {
	const rotate = useSharedValue(0);

	React.useEffect(() => {
		rotate.value = withRepeat(
			withSequence(withTiming(-30, { duration: 1500 }), withTiming(0, { duration: 1500 })),
			-1,
		);
	}, []);

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Animated.View style={[{ flexDirection: 'row' }]}>
				<Text variant="titleLarge">{message} </Text>
				<Animated.View>
					<Text variant="titleLarge">🥲</Text>
				</Animated.View>
			</Animated.View>
		</View>
	);
};

type DayTabProps = {
	data: NonNullable<WeeklyAnimeQuery['Page']>['airingSchedules'];
};
export const DayTab = ({ data }: DayTabProps) => {
	const showNSFW = useSettingsStore(useShallow((state) => state.showNSFW));
	const calendar = useDisplayStore(useShallow((state) => state.calendar));
	const { columns, itemWidth, displayMode } = useColumns('calendar');

	// const { dismissAll: dismissAllModals } = useBottomSheetModal();

	const RenderItem = React.useCallback(
		({
			item,
		}: {
			item: NonNullable<NonNullable<WeeklyAnimeQuery['Page']>['airingSchedules']>[0];
		}) => {
			if (!showNSFW && item?.media?.isAdult) return null;
			return item?.media?.id ? (
				displayMode === 'COMPACT' ? (
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'flex-start',
							marginVertical: 10,
							marginHorizontal: 5,
							width: itemWidth,
						}}
					>
						<MediaCard
							{...item?.media}
							nextAiringEpisode={item?.media?.nextAiringEpisode}
							fitToParent
						/>
						{/* <MediaProgressBar
						progress={item.media.mediaListEntry?.progress}
						mediaListEntry={item.media.mediaListEntry as MediaList}
						mediaStatus={item.media.status}
						total={item.media.episodes ?? 0}
					/> */}
					</View>
				) : (
					<MediaCardRow
						{...item.media}
						nextAiringEpisode={{ ...item, mediaId: item.media?.id }}
					/>
				)
			) : null;
		},
		[data, itemWidth, showNSFW],
	);

	return (
		<View style={{ width: '100%', height: '100%' }}>
			<FlashList
				key={columns}
				data={data?.filter((ep) => (calendar.list_only ? ep?.media?.mediaListEntry : true))}
				renderItem={RenderItem}
				keyExtractor={(item, idx) => idx.toString()}
				numColumns={displayMode === 'COMPACT' ? columns : 1}
				estimatedItemSize={211}
				centerContent
				contentContainerStyle={{ paddingVertical: 10 }}
				ListEmptyComponent={() => (
					<View style={{ paddingVertical: 50 }}>
						<RenderEmpty message={'Nothing to watch'} />
					</View>
				)}
			/>
		</View>
	);
};
