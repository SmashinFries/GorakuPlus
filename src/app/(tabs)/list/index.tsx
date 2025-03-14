import { MediaType } from '@/api/anilist/__genereated__/gql';
import { ListHeader } from '@/components/headers';
import { ListTabs } from '@/components/list/screens';
import { GorakuActivityIndicator } from '@/components/loading';
import { ListFilterSheet } from '@/components/sheets/listsheets';
import { GorakuTabBar } from '@/components/tab';
import { useList } from '@/hooks/list/useList';
import { useAuthStore } from '@/store/authStore';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { SceneRendererProps, TabView } from 'react-native-tab-view';

const ListPage = () => {
	const layout = useWindowDimensions();
	const { userID } = useAuthStore().anilist;
	const [index, setIndex] = useState(0);
	const filterSheetRef = useRef<TrueSheet>(null);

	const {
		animeList,
		mangaList,
		rootRoutes,
		animeRoutes = [],
		mangaRoutes = [],
		loading,
		isRefreshing,
		refreshAnimeList,
		refreshMangaList,
	} = useList(userID as number);

	const [routes, setRoutes] = useState(rootRoutes);

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
				return (
					<ListTabs
						type={MediaType.Anime}
						data={animeList?.MediaListCollection}
						routes={animeRoutes}
						isRefreshing={isRefreshing}
						onRefresh={refreshAnimeList}
					/>
				);
			case 'manga':
				return (
					<ListTabs
						type={MediaType.Manga}
						data={mangaList?.MediaListCollection}
						routes={mangaRoutes}
						isRefreshing={isRefreshing}
						onRefresh={refreshAnimeList}
					/>
				);
			default:
				return null;
		}
	};

	useEffect(() => {
		if (rootRoutes.length > 0) {
			setRoutes(rootRoutes);
		}
	}, [rootRoutes]);

	return (
		<>
			<ListHeader
				openFilter={() => filterSheetRef.current?.present()}
				onRefresh={index === 0 ? refreshAnimeList : refreshMangaList}
			/>
			{!loading && !isRefreshing && routes.length > 0 ? (
				<TabView
					navigationState={{ index, routes }}
					renderScene={renderScene}
					onIndexChange={setIndex}
					initialLayout={{ width: layout.width }}
					renderTabBar={(props) => <GorakuTabBar {...props} enableChip />}
					swipeEnabled={false}
					lazy
				/>
			) : (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					{/* <ActivityIndicator animating={true} size={'large'} color={colors.primary} /> */}
					<GorakuActivityIndicator />
					<Text variant="labelMedium">Fetching lists</Text>
				</View>
			)}
			<ListFilterSheet sheetRef={filterSheetRef} />
		</>
	);
};

export default ListPage;
