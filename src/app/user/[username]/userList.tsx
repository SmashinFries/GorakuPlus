import { MediaType } from '@/api/anilist/__genereated__/gql';
import { ListHeader } from '@/components/headers/list';
import { AnimeTab, MangaTab } from '@/components/list/screens';
import { ListFilterSheet } from '@/components/sheets/listsheets';
import { GorakuTabBar } from '@/components/tab';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { SceneRendererProps, TabView } from 'react-native-tab-view';

const ListPage = () => {
	const layout = useWindowDimensions();
	const { userId } = useLocalSearchParams<{ userId: string; username: string }>();
	const id = Number(userId);
	const filterSheetRef = useRef<TrueSheet>(null);
	const [index, setIndex] = useState(0);

	const [routes, setRoutes] = useState([
		{ key: 'anime', title: 'Anime' },
		{ key: 'manga', title: 'Manga' },
	]);

	const updateTitleCount = (key: string, total?: number) => {
		setRoutes((prevRoutes) => {
			const newRoutes = prevRoutes.map((route) => {
				if (route.key === key) {
					const baseTitle = route.title.replace(/\s*\(\d+\)$/, '');
					const newRoute = { ...route, title: `${baseTitle} (${total ?? 0})` };
					return newRoute;
				}
				return route;
			});
			return newRoutes;
		});
	};

	const renderScene = ({
		route,
	}: SceneRendererProps & {
		route: {
			key: string;
			title: string;
		};
	}) => {
		switch (route.key) {
			case 'anime':
				return <AnimeTab userId={id} updateMainTitleCount={updateTitleCount} />;
			case 'manga':
				return <MangaTab userId={id} updateMainTitleCount={updateTitleCount} />;
			default:
				return null;
		}
	};

	return (
		<>
			<ListHeader
				openFilter={() => filterSheetRef.current?.present()}
				currentType={routes[index]?.key === 'anime' ? MediaType.Anime : MediaType.Manga}
				isViewer={false}
			/>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				renderTabBar={(props) => <GorakuTabBar {...props} enableChip />}
				swipeEnabled={false}
			/>
			<ListFilterSheet
				sheetRef={filterSheetRef}
				selectedType={routes[index]?.key === 'anime' ? MediaType.Anime : MediaType.Manga}
			/>
		</>
	);
};

export default ListPage;
