import { MediaType } from '@/api/anilist/__genereated__/gql';
import { ListHeader } from '@/components/headers';
import { ListTabs } from '@/components/list/screens';
import { GorakuActivityIndicator } from '@/components/loading';
import { GorakuTabBar } from '@/components/tab';
import { useList } from '@/hooks/list/useList';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { Text } from 'react-native-paper';
import { TabView } from 'react-native-tab-view';

const ListPage = () => {
	const layout = useWindowDimensions();
	const { userID } = useAuthStore().anilist;
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
	} = useList(userID);

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
				openFilter={() => SheetManager.show('')}
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
