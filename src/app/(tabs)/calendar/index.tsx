import { DayTab } from '@/components/calendar/tabs';
import { GorakuActivityIndicator } from '@/components/loading';
import { GorakuTabBar } from '@/components/tab';
import { useCalendar } from '@/hooks/calendar/useCalendar';
import { useAuthStore } from '@/store/authStore';
import { useDisplayStore } from '@/store/displayStore';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { Appbar } from 'react-native-paper';
import { TabView, SceneRendererProps } from 'react-native-tab-view';
import { useShallow } from 'zustand/react/shallow';

type WeekDay = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
const Days: WeekDay[] = [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
];

type CalendarRenderSceneProps = SceneRendererProps & {
	route: { key: WeekDay; title: WeekDay | string };
};

const CalendarPage = () => {
	const dayOfWeek = new Date().getDay();
	const layout = useWindowDimensions();

	const { showNSFW } = useSettingsStore();
	const { userID } = useAuthStore().anilist;
	const { listOnly } = useDisplayStore(
		useShallow((state) => ({
			listOnly: state.calendar.list_only,
		})),
	);

	const { data, loading } = useCalendar();

	const [index, setIndex] = useState(dayOfWeek);

	const [routes, setRoutes] = useState<{ key: string; title: string }[]>(
		Days.map((day) => {
			return { key: day, title: day };
		}),
	);

	const updateAllTitles = (listOnly = false) => {
		const newRouteTitles = [];
		if (listOnly) {
			for (const day of Days) {
				newRouteTitles.push({
					key: day,
					title: `${day} (${data[day].filter((media) => showNSFW || !media.media.isAdult).filter((ep) => ep.media?.mediaListEntry).length})`,
				});
			}
		} else {
			for (const day of Days) {
				newRouteTitles.push({
					key: day,
					title: `${day} (${data[day].filter((media) => showNSFW || !media.media.isAdult).length})`,
				});
			}
		}
		setRoutes(newRouteTitles);
	};

	const renderScene = ({ route }: CalendarRenderSceneProps) => {
		switch (route.key) {
			case 'sunday':
				return (
					<DayTab
						data={data.sunday.filter((media) => showNSFW || !media.media.isAdult)}
					/>
				);
			case 'monday':
				return (
					<DayTab
						data={data.monday.filter((media) => showNSFW || !media.media.isAdult)}
					/>
				);
			case 'tuesday':
				return (
					<DayTab
						data={data.tuesday.filter((media) => showNSFW || !media.media.isAdult)}
					/>
				);
			case 'wednesday':
				return (
					<DayTab
						data={data.wednesday.filter((media) => showNSFW || !media.media.isAdult)}
					/>
				);
			case 'thursday':
				return (
					<DayTab
						data={data.thursday.filter((media) => showNSFW || !media.media.isAdult)}
					/>
				);
			case 'friday':
				return (
					<DayTab
						data={data.friday.filter((media) => showNSFW || !media.media.isAdult)}
					/>
				);
			case 'saturday':
				return (
					<DayTab
						data={data.saturday.filter((media) => showNSFW || !media.media.isAdult)}
					/>
				);
			default:
				return null;
		}
	};

	const renderTabBar = (props) => {
		return <GorakuTabBar {...props} enableChip />;
	};

	// const Tabs = useCallback(() => {
	//     return (
	//         <TabView
	//             navigationState={{ index, routes }}
	//             renderScene={renderScene}
	//             onIndexChange={setIndex}
	//             initialLayout={{ width: layout.width }}
	//             renderTabBar={RenderTabBar}
	//             swipeEnabled={true}
	//         />
	//     );
	// }, [colors, data]);

	useEffect(() => {
		if (data) {
			updateAllTitles(listOnly);
		}
	}, [data, showNSFW]);

	return (
		<>
			<Appbar.Header>
				<Appbar.Content title="This Week" />
				<Appbar.Action
					icon={'view-module'}
					onPress={() => {
						SheetManager.show('DisplayConfigSheet', {
							payload: {
								type: 'calendar',
							},
						});
					}}
				/>
				{userID && (
					<Appbar.Action
						icon="filter-outline"
						onPress={() =>
							SheetManager.show('CalendarFilterSheet', {
								payload: {
									updateAllTitles(onList) {
										updateAllTitles(onList);
									},
								},
							})
						}
					/>
				)}
			</Appbar.Header>
			{!loading ? (
				<TabView
					navigationState={{ index, routes }}
					renderScene={renderScene}
					onIndexChange={setIndex}
					initialLayout={{ width: layout.width }}
					renderTabBar={renderTabBar}
					swipeEnabled={true}
					lazy
				/>
			) : (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					{/* <ActivityIndicator size={'small'} /> */}
					<GorakuActivityIndicator size="large" />
				</View>
			)}
		</>
	);
};

export default CalendarPage;
