import { useCalendarData } from '@/hooks/calendar/useCalendarData';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useMemo, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, Appbar, Text } from 'react-native-paper';
import { toDateId } from '@marceloterreiro/flash-calendar';
import React from 'react';
import { useAppTheme } from '@/store/theme/themes';
import { MediaCard, MediaCardRow } from '@/components/cards';
import { GorakuCalendar } from '@/components/calendar/calendar';
import { getCalendarDisplayDate, rgbToRgba } from '@/utils';
import { GorakuRefreshControl } from '@/components/explore/lists';
import { useColumns } from '@/hooks/useColumns';
import { AiringRangeQuery_Page_Page_airingSchedules_AiringSchedule } from '@/api/anilist/__genereated__/gql';
import { CalendarFilterSheet } from '@/components/sheets/bottomsheets';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { router } from 'expo-router';
import { DatePickerModal } from 'react-native-paper-dates';
import { SingleChange } from 'react-native-paper-dates/lib/typescript/Date/Calendar';

const CalendarPage = () => {
	const { colors } = useAppTheme();

	const { showNSFW } = useSettingsStore();
	const { userID } = useAuthStore().anilist;

	const { columns, itemWidth, displayMode } = useColumns('calendar');
	const sheetRef = useRef<TrueSheet>(null);

	const {
		seasonQuery,
		airingQuery,
		selectedDate,
		selectedMonth,
		listOnly,
		selectedMonthAnimeDates,
		selectedSeason,
		onDateChange,
		onMonthChange,
	} = useCalendarData();

	const [isDateSelectOpen, setIsDateSelectOpen] = useState(false);

	const activityColors = useMemo(
		() => [rgbToRgba(colors.primary, 0.2), rgbToRgba(colors.primary, 0.5), colors.primary],
		[],
	);

	const onDismissSingle = React.useCallback(() => {
		setIsDateSelectOpen(false);
	}, [setIsDateSelectOpen]);

	const onConfirmSingle: SingleChange = React.useCallback(
		(params) => {
			setIsDateSelectOpen(false);
			onDateChange(toDateId(params.date as Date));
		},
		[setIsDateSelectOpen],
	);

	const renderItem = ({
		item,
	}: {
		item: AiringRangeQuery_Page_Page_airingSchedules_AiringSchedule;
	}) => {
		if (!showNSFW && item?.media?.isAdult) return null;
		if (!item?.media?.id) return null;
		return displayMode === 'COMPACT' ? (
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'flex-start',
					marginVertical: 10,
					marginHorizontal: 5,
					width: itemWidth - 10,
				}}
			>
				<MediaCard
					{...item?.media}
					nextAiringEpisode={item?.media?.nextAiringEpisode ?? undefined}
					customEPText={
						item.timeUntilAiring <= 0 ? `EP ${item.episode} aired` : undefined
					}
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
				{...item?.media}
				nextAiringEpisode={{ ...item, mediaId: item.media?.id }}
				customEPText={item.timeUntilAiring <= 0 ? `EP ${item.episode}` : undefined}
			/>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<Appbar.Header>
				<Appbar.Content title="Calendar" />
				<Appbar.Action
					icon={'view-module'}
					onPress={() => {
						router.push({
							pathname: '/(sheets)/displayConfig',
							params: { type: 'calendar' },
						});
					}}
				/>
				{userID && (
					<Appbar.Action
						icon="filter-outline"
						onPress={() => sheetRef.current?.present()}
					/>
				)}
			</Appbar.Header>
			<FlatList
				key={columns}
				numColumns={columns}
				data={
					airingQuery?.data?.Page?.airingSchedules?.filter(
						(as): as is AiringRangeQuery_Page_Page_airingSchedules_AiringSchedule =>
							as !== null && (listOnly ? !!as?.media?.mediaListEntry : true),
					) ?? []
				}
				renderItem={renderItem}
				ListEmptyComponent={
					airingQuery?.isFetching && !airingQuery?.isRefetching ? (
						<View
							style={{
								width: '100%',
								height: '100%',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<ActivityIndicator />
						</View>
					) : undefined
				}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item, idx) => idx.toString()}
				ListHeaderComponent={
					<View>
						<GorakuCalendar
							season={selectedSeason}
							animeDates={selectedMonthAnimeDates}
							calendarActiveDateRanges={[
								{
									startId: selectedDate.id,
									endId: selectedDate.id,
								},
							]}
							calendarMonthId={toDateId(selectedMonth?.start)}
							onCalendarDayPress={onDateChange}
							onPreviousMonthPress={() => onMonthChange('prev')}
							onNextMonthPress={() => onMonthChange('next')}
							calendarDayHeight={50}
							theme={{
								itemDay: {
									active: () => ({
										container: { backgroundColor: colors.primaryContainer },
										content: { color: colors.onPrimaryContainer },
									}),
									idle: ({ isDifferentMonth }) => ({
										content: {
											color: isDifferentMonth
												? colors.surfaceDisabled
												: colors.onBackground,
										},
									}),
									today: () => ({
										container: {
											borderColor: colors.outline,
										},
									}),
									base: ({ isPressed, isHovered }) => ({
										container: {
											borderTopRightRadius: 25,
											borderBottomRightRadius: 25,
											borderTopLeftRadius: 25,
											borderBottomLeftRadius: 25,
											backgroundColor:
												isPressed || isHovered
													? colors.elevation.level3
													: 'transparent',
										},
										content: {
											color: colors.onBackground,
										},
									}),
								},
								itemWeekName: {
									content: {
										color: colors.onBackground,
									},
								},
								rowMonth: {
									content: {
										color: colors.onBackground,
										justifyContent: 'center',
										alignItems: 'center',
									},
									container: {
										alignItems: 'center',
										justifyContent: 'center',
									},
								},
							}}
							activityColors={activityColors}
							openDateSelect={() => setIsDateSelectOpen(true)}
						/>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								gap: 6,
								padding: 12,
								alignItems: 'center',
							}}
						>
							<Text style={{ color: colors.onSurfaceVariant }}>
								{getCalendarDisplayDate(selectedDate.date)}
							</Text>
							<View
								style={{
									justifyContent: 'center',
								}}
							>
								<View
									style={{
										backgroundColor: colors.primaryContainer,
										padding: 2,
										paddingHorizontal: 5,
										borderRadius: 16,
									}}
								>
									<Text
										variant="labelSmall"
										style={{ color: colors.onPrimaryContainer }}
									>
										{airingQuery?.data?.Page?.airingSchedules?.filter((as) =>
											listOnly ? !!as?.media?.mediaListEntry : true,
										)?.length ?? 0}
									</Text>
								</View>
							</View>
						</View>
					</View>
				}
				refreshControl={
					<GorakuRefreshControl
						refreshing={seasonQuery?.isRefetching}
						onRefresh={() => {
							seasonQuery?.refetch();
							airingQuery?.refetch();
						}}
					/>
				}
			/>
			<CalendarFilterSheet sheetRef={sheetRef} />
			<DatePickerModal
				locale="en"
				mode="single"
				visible={isDateSelectOpen}
				onDismiss={onDismissSingle}
				date={selectedDate?.date}
				onConfirm={onConfirmSingle}
			/>
		</View>
	);
};

export default CalendarPage;
