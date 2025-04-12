import { MediaType } from '@/api/anilist/__genereated__/gql';
import { useAniTrendzCharts } from '@/api/anitrendz/anitrendz';
import {
	AniTrendzCharChoice,
	AniTrendzChartPathEnum,
	AniTrendzChartTypes,
} from '@/api/anitrendz/types';
import { AnimViewMem } from '@/components/animations';
import { PaperHeader } from '@/components/headers';
import { GorakuActivityIndicator } from '@/components/loading';
import {
	AniTrendzQuickActionProps,
	AniTrendzQuickActionSheet,
} from '@/components/sheets/bottomsheets';
import { GorakuTabBar } from '@/components/tab';
import { useAppTheme } from '@/store/theme/themes';
import { sendToast } from '@/utils/toast';
import { openWebBrowser } from '@/utils/webBrowser';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { Image } from 'expo-image';
import { router, Stack } from 'expo-router';
import React, { useRef } from 'react';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { Icon, Surface, Text } from 'react-native-paper';
import { SceneRendererProps, TabView } from 'react-native-tab-view';

const ChartIcon = ({
	value,
	icon,
	message,
}: {
	value: string | number;
	icon: string;
	message?: string;
}) => {
	return (
		<Pressable
			style={{ flexDirection: 'row', alignItems: 'center' }}
			onPress={() => message && sendToast(message)}
		>
			<Icon source={icon} size={24} />
			<Text>{value}</Text>
		</Pressable>
	);
};

const ChartItem = ({
	images,
	images2,
	position,
	previously,
	peak,
	weeksAtTopTen,
	stagnation,
	total,
	name,
	// nameAlt,
	subText,
	onLongPress,
	onPress,
}: AniTrendzCharChoice & { onLongPress: () => void; onPress: () => void }) => {
	const { colors } = useAppTheme();
	const posDif = previously - position;
	return (
		<AnimViewMem style={{ marginVertical: 8, borderRadius: 8, overflow: 'hidden' }}>
			<Surface
				mode="elevated"
				style={{ overflow: 'hidden', justifyContent: 'space-between' }}
			>
				<Pressable
					android_ripple={{ foreground: true, color: colors.primary }}
					unstable_pressDelay={50}
					onPress={onPress}
					onLongPress={onLongPress}
				>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							padding: 6,
						}}
					>
						<View
							style={{
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								paddingLeft: 8,
							}}
						>
							<View>
								<Text
									variant="headlineLarge"
									style={{ fontWeight: 'bold', textAlignVertical: 'top' }}
								>
									{position}
								</Text>
							</View>
							<View
								style={{
									paddingHorizontal: 4,
									flexDirection: 'row',
									alignItems: 'center',
								}}
							>
								<Text>
									{posDif === 0 ? stagnation : posDif > 0 ? '+' + posDif : posDif}
								</Text>
								<Icon
									source={
										position < previously
											? 'arrow-up'
											: position === previously
												? 'arrow-right'
												: 'arrow-down'
									}
									color={
										position < previously
											? 'green'
											: position === previously
												? 'yellow'
												: 'red'
									}
									size={24}
								/>
							</View>
						</View>
						<View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 8 }}>
							{images2 && (
								<View style={{ flexDirection: 'row', gap: 12 }}>
									<Image
										source={{ uri: images?.large }}
										style={{ width: 100, height: 100 }}
										contentFit="contain"
									/>
									<Image
										source={{ uri: images2?.large }}
										style={{ width: 100, height: 100 }}
										contentFit="contain"
									/>
								</View>
							)}
							<Text
								variant="titleMedium"
								style={{ textAlign: 'center', fontWeight: 'bold' }}
							>
								{name.replace(',', '')}
							</Text>
							<Text
								variant="labelMedium"
								style={{ textAlign: 'center', color: colors.onSurfaceVariant }}
							>
								{subText}
							</Text>
						</View>

						{!images2 && (
							<View>
								<Image
									source={{ uri: images?.large }}
									style={{ width: 100, height: 100 }}
									contentFit="contain"
								/>
							</View>
						)}
					</View>
				</Pressable>
				<View
					style={{
						flexDirection: 'row',
						width: '100%',
						backgroundColor: colors.surfaceVariant,
						padding: 6,
						justifyContent: 'space-evenly',
					}}
				>
					<ChartIcon value={peak} icon="chart-line" message="Peak rank" />
					<ChartIcon value={previously} icon="arrow-u-left-bottom" message="Last rank" />
					<ChartIcon value={weeksAtTopTen} icon="timetable" message="Weeks on Top 10" />
					<ChartIcon
						value={total.toLocaleString()}
						icon="vote-outline"
						message="Total Votes"
					/>
				</View>
			</Surface>
		</AnimViewMem>
	);
};

const AniTrendzChart = ({
	type,
	onChoiceLongSelect,
	onSingleSelect,
}: {
	type: AniTrendzChartTypes;
	onChoiceLongSelect: (choice: AniTrendzCharChoice) => void;
	onSingleSelect: (search?: string) => void;
}) => {
	const { data, isFetching } = useAniTrendzCharts(type);

	return isFetching ? (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<GorakuActivityIndicator size="large" />
		</View>
	) : (
		<View style={{ width: '100%', height: '100%' }}>
			<ScrollView contentContainerStyle={{ padding: 10 }}>
				{data?.data[0]?.choices?.map((choice, idx) => (
					<ChartItem
						key={idx}
						{...choice}
						onPress={() =>
							onSingleSelect(
								type === 'couple' ? choice.name.split(' x ').at(-1) : choice.name,
							)
						}
						onLongPress={() => onChoiceLongSelect(choice)}
					/>
				))}
			</ScrollView>
		</View>
	);
};

type AniTrendzRoute = { key: AniTrendzChartTypes; title: string };
const AniTrendzPage = () => {
	const layout = useWindowDimensions();
	const sheetRef = useRef<TrueSheet>(null);
	const [actionSheetParams, setActionSheetParams] = useState<
		Omit<AniTrendzQuickActionProps, 'onAnimeSearch' | 'onCharacterSearch' | 'sheetRef'>
	>({
		link: '',
		names: [],
		anime: '',
	});
	// const filterSheetRef = useRef<BottomSheetModalMethods>(null);
	const [routes, _setRoutes] = useState<AniTrendzRoute[]>([
		{
			key: 'female',
			title: 'Waifus',
		},
		{
			key: 'male',
			title: 'Husbandos',
		},
		{
			key: 'couple',
			title: 'Couples',
		},
		{
			key: 'anime',
			title: 'Top Anime',
		},
	]);
	const [index, setIndex] = useState(0);

	const onChoiceSelect = (
		choice: AniTrendzCharChoice,
		link: string,
		isAnime: boolean = false,
	) => {
		const names = choice.name.split(' x ');
		// Haptics.selectionAsync();
		setActionSheetParams({
			link,
			names: isAnime ? [] : names,
			anime: isAnime ? choice.name : choice.subText,
		});
		sheetRef.current?.present();
	};

	const openMediaSearchSheet = (search: string) => {
		router.push({
			pathname: '/(sheets)/mediaSearchSheet',
			params: {
				search,
				type: MediaType.Anime,
			},
		});
	};

	const openCharacterSearchSheet = (name: string) => {
		router.push({
			pathname: '/(sheets)/characterSearchSheet',
			params: {
				name,
			},
		});
	};

	const renderScene = ({
		route,
	}: SceneRendererProps & {
		route: AniTrendzRoute;
	}) => (
		<AniTrendzChart
			type={route.key}
			onSingleSelect={
				(search?: string) => {
					if (search) {
						if (route.key === 'anime') {
							openMediaSearchSheet(search);
						} else {
							openCharacterSearchSheet(search);
						}
					}
				}

				// ? openMediaSearchSheet({ search, type: MediaType.Anime })
				// : openCharacterSearchSheet({ name: search })
			}
			onChoiceLongSelect={(choice) =>
				onChoiceSelect(
					choice,
					`https://www.anitrendz.com/charts/${AniTrendzChartPathEnum[route.key]}`,
					route.key === 'anime',
				)
			}
		/>
	);

	return (
		<>
			<Stack.Screen
				options={{
					title: 'AniTrendz',
					headerShown: true,
					header: (props) => (
						<PaperHeader
							{...props}
							actions={[
								{
									title: 'Open Website',
									icon: 'information-outline',
									onPress: () =>
										openWebBrowser(
											`https://www.anitrendz.com/charts/${AniTrendzChartPathEnum[routes[index].key]}`,
										),
								},
							]}
						/>
					),
				}}
			/>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				renderTabBar={GorakuTabBar}
				swipeEnabled={true}
				lazy
			/>
			<AniTrendzQuickActionSheet
				sheetRef={sheetRef}
				{...actionSheetParams}
				onAnimeSearch={(anime) => {
					openMediaSearchSheet(anime);
				}}
				onCharacterSearch={(name) => {
					openCharacterSearchSheet(name);
				}}
			/>
		</>
	);
};

// <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// 	<GorakuActivityIndicator size="large" />
// </View>

export default AniTrendzPage;
