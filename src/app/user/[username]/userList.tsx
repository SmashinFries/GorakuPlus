import { MediaType } from '@/api/anilist/__genereated__/gql';
import { ListHeader } from '@/components/headers';
import { ListTabs } from '@/components/list/screens';
import { GorakuActivityIndicator } from '@/components/loading';
import { GorakuTabBar } from '@/components/tab';
import { useList } from '@/hooks/list/useList';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-paper';
import { TabView } from 'react-native-tab-view';

const ListPage = () => {
	const layout = useWindowDimensions();
	const { userId, username } = useLocalSearchParams<{ userId: string; username: string }>();
	const [index, setIndex] = useState(0);

	const {
		animeList,
		mangaList,
		rootRoutes,
		animeRoutes,
		mangaRoutes,
		loading,
		isRefreshing,
		refreshAnimeList,
		refreshMangaList,
	} = useList(parseInt(userId), false);

	const [routes, setRoutes] = useState(rootRoutes);

	// const renderTabBar = (props) => (
	//     <TabBar
	//         {...props}
	//         tabStyle={{ paddingTop: 10 }}
	//         indicatorStyle={{ backgroundColor: colors.primary }}
	//         style={{ backgroundColor: colors.surface }}
	//         labelStyle={{ textTransform: 'capitalize', color: colors.onSurface }}
	//         scrollEnabled={false}
	//         android_ripple={{ color: colors.primary, borderless: true }}
	//     />
	// );

	const renderScene = ({ route }) => {
		switch (route.key) {
			case 'anime':
				return (
					<ListTabs
						isViewer={false}
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
						isViewer={false}
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
				title={username ? `User List` : undefined}
				isViewer={false}
				// openFilter={() => SheetManager.show('ListFilterSheet')}
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
			{/* <ListFilterSheet
				ref={filterSheetRef}
				mediaType={index === 0 ? MediaType.Anime : MediaType.Manga}
				// tags={tags}
				// genres={genres}
				// sortList={sortLists}
			/> */}
		</>
	);
};

export default ListPage;
