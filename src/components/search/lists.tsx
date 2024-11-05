import { FlashList, FlashListProps } from '@shopify/flash-list';
import { FlatList, View, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { ReactNode, useCallback, useRef } from 'react';
import { CharacterCard, MediaCard, MediaCardRow, StudioCard, UserCard } from '../cards';
import Animated from 'react-native-reanimated';
import { router } from 'expo-router';
import { useSearchStore } from '@/store/search/searchStore';
import useDebounce from '@/hooks/useDebounce';
import {
	CharacterSearchQuery,
	MediaSearchQuery,
	MediaType,
	StaffSearchQuery,
	StudioSearchQuery,
	useInfiniteCharacterSearchQuery,
	useInfiniteMediaSearchQuery,
	useInfiniteStaffSearchQuery,
	useInfiniteStudioSearchQuery,
	useInfiniteUserSearchQuery,
	UserSearchQuery,
	useSearchAllQuery,
} from '@/api/anilist/__genereated__/gql';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { GorakuActivityIndicator } from '../loading';
import { useAppTheme } from '@/store/theme/themes';
import { useScrollHandler } from '@/hooks/animations/useScrollHandler';
import { ScrollToTopButton } from '../buttons';
import { useColumns } from '@/hooks/useColumns';
import { useDisplayStore } from '@/store/displayStore';
import { SheetManager } from 'react-native-actions-sheet';
import { LongScrollView } from '../list';
import { useShallow } from 'zustand/react/shallow';

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

export const MediaRenderItem = (props: MediaSearchQuery['Page']['media'][0]) => {
	return (
		<View
			style={{
				// flex: 1,
				alignItems: 'center',
				justifyContent: 'flex-start',
				marginVertical: 10,
				marginHorizontal: 5,
			}}
		>
			<MediaCard {...props} fitToParent />
		</View>
	);
};

export const MediaRowRenderItem = (props: MediaSearchQuery['Page']['media'][0]) => {
	return <MediaCardRow {...props} />;
};

type SearchAllTypes = 'anime' | 'manga' | 'characters' | 'staff' | 'studios' | 'users';

const SearchAllRenderItem = ({
	item,
	type,
	itemWidth,
}: {
	item: any;
	type: SearchAllTypes;
	itemWidth?: number;
}) => {
	const { width } = useWindowDimensions();
	const displayMode = useDisplayStore(useShallow((state) => state.search.mode));
	switch (type) {
		case 'anime':
		case 'manga':
			return (
				<View
					style={{
						width: displayMode === 'COMPACT' ? (itemWidth ?? `${100 / 3}%`) : width,
					}}
				>
					{displayMode === 'COMPACT' ? (
						<MediaRenderItem {...item} />
					) : (
						<MediaRowRenderItem {...item} />
					)}
				</View>
			);
		case 'characters':
		case 'staff':
			return (
				<View
					style={{
						alignItems: 'center',
						marginVertical: 15,
						// marginHorizontal: 4,
						width: itemWidth,
					}}
				>
					<CharacterCard {...item} isStaff={type === 'staff'} />
				</View>
			);
		case 'studios':
			return (
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						marginHorizontal: 10,
						marginVertical: 4,
					}}
				>
					<StudioCard
						onPress={() => router.push(`/studio/${item.id}`)}
						onLongPress={() =>
							SheetManager.show('QuickActionStudioSheet', { payload: item })
						}
						{...item}
					/>
				</View>
			);
		case 'users':
			return (
				<View
					style={{
						alignItems: 'center',
						marginVertical: 15,
						// marginHorizontal: 4,
						width: itemWidth,
					}}
				>
					<UserCard {...item} />
				</View>
			);
	}
};

const SearchAllSection = ({
	type,
	data,
}: {
	type: SearchAllTypes;
	data: any[];
	isFetching?: boolean;
}) => {
	const { width } = useWindowDimensions();
	const { columns, itemWidth } = useColumns('search');
	if (data && data?.length < 1) return;
	return (
		<View style={{ width: width }}>
			{/* {data?.map((content, idx) => (
					<SearchAllRenderItem key={idx} item={content} type={type} />
				))} */}
			<FlatList
				key={type === 'studios' ? 1 : columns}
				data={data}
				keyExtractor={(item, idx) => idx.toString()}
				numColumns={type === 'studios' ? 1 : columns}
				scrollEnabled={false}
				nestedScrollEnabled
				centerContent
				renderItem={({ item }) => (
					<SearchAllRenderItem item={item} type={type} itemWidth={itemWidth} />
				)}
			/>
		</View>
	);
};

const SearchList = ({
	data,
	headerHeight,
	numColumns = 3,
	...props
}: FlashListProps<any> & { headerHeight?: number }) => {
	const listRef = useRef<FlashList<any>>(null);
	const { width } = useWindowDimensions();
	const { shouldShowScrollToTop, scrollHandler } = useScrollHandler(
		headerHeight ?? undefined,
		150,
	);
	const keyExtract = useCallback((item, index) => item.id.toString() + index.toString(), []);

	return (
		<View style={{ width: width, height: '100%' }}>
			<AnimatedFlashList
				ref={listRef}
				data={data}
				keyExtractor={keyExtract}
				numColumns={numColumns}
				centerContent
				onScroll={scrollHandler}
				{...props}
			/>
			{shouldShowScrollToTop && (
				<ScrollToTopButton
					onPress={() => listRef.current?.scrollToIndex({ index: 0, animated: true })}
					// top={110}
				/>
			)}
		</View>
	);
};

const SearchAllTitle = ({ children }: { children: ReactNode }) => {
	const { colors } = useAppTheme();
	return (
		<View style={{ backgroundColor: colors.background, padding: 6, paddingLeft: 10 }}>
			<Text variant="headlineMedium">{children}</Text>
		</View>
	);
};

export const SearchAllList = () => {
	const { width } = useWindowDimensions();

	const query = useSearchStore(useShallow((state) => state.query));
	const showNSFW = useSettingsStore(useShallow((state) => state.showNSFW));
	const debouncedSearch = useDebounce(query, 1000) as string;

	const { data, isFetching } = useSearchAllQuery(
		{ search: debouncedSearch, perPage: 6, isAdult: showNSFW ? undefined : false },
		{ enabled: debouncedSearch?.length > 0 },
	);

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			{isFetching && (
				<View
					style={{
						width: '100%',
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</View>
			)}
			{data && (
				<LongScrollView stickyHeaderIndices={[0, 2, 4, 6, 8, 10]} scrollToTopIconTop={5}>
					{data?.Anime?.media?.length > 0 && <SearchAllTitle>Anime</SearchAllTitle>}
					{data?.Anime?.media?.length > 0 && (
						<SearchAllSection data={data?.Anime?.media} type="anime" />
					)}
					{data?.Manga?.media?.length > 0 && <SearchAllTitle>Manga</SearchAllTitle>}
					{data?.Manga?.media?.length > 0 && (
						<SearchAllSection data={data?.Manga?.media} type="manga" />
					)}
					{data?.Characters?.characters?.length > 0 && (
						<SearchAllTitle>Characters</SearchAllTitle>
					)}
					{data?.Characters?.characters?.length > 0 && (
						<SearchAllSection data={data?.Characters?.characters} type="characters" />
					)}
					{data?.Staff?.staff?.length > 0 && <SearchAllTitle>Staff</SearchAllTitle>}
					{data?.Staff?.staff?.length > 0 && (
						<SearchAllSection data={data?.Staff?.staff} type="staff" />
					)}
					{data?.Studios?.studios?.length > 0 && <SearchAllTitle>Studios</SearchAllTitle>}
					{data?.Studios?.studios?.length > 0 && (
						<SearchAllSection data={data?.Studios?.studios} type="studios" />
					)}
					{data?.Users?.users?.length > 0 && <SearchAllTitle>Users</SearchAllTitle>}
					{data?.Users?.users?.length > 0 && (
						<SearchAllSection data={data?.Users?.users} type="users" />
					)}
				</LongScrollView>
			)}
			{/* {shouldShowScrollToTop && <ScrollToTopButton listRef={listRef} top={80} />} */}
		</View>
	);
};

export const AnimeSearchList = () => {
	const { width } = useWindowDimensions();
	const { query, mediaFilter } = useSearchStore(
		useShallow((state) => ({
			query: state.query,
			mediaFilter: state.mediaFilter,
		})),
	);

	const { columns, itemWidth, displayMode } = useColumns('search');
	const debouncedSearch = useDebounce(query, 1000) as string;
	const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useInfiniteMediaSearchQuery(
			{
				type: MediaType.Anime,
				...mediaFilter,
				search: debouncedSearch.length > 0 ? debouncedSearch : undefined,
			},
			{
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage.Page?.pageInfo?.hasNextPage) {
						return {
							page: lastPage.Page?.pageInfo.currentPage + 1,
						};
					}
				},
			},
		);

	const mergedResults = data?.pages?.flatMap((val) => val.Page?.media);

	return (
		<View style={{ height: '100%', width }}>
			{isFetching && !isFetchingNextPage && (
				<View
					style={{
						width: '100%',
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</View>
			)}
			<SearchList
				key={columns}
				data={mergedResults}
				numColumns={columns}
				nestedScrollEnabled
				renderItem={({ item }: { item: MediaSearchQuery['Page']['media'][0] }) =>
					displayMode === 'COMPACT' ? (
						<View style={{ width: itemWidth }}>
							<MediaRenderItem {...item} />
						</View>
					) : (
						<MediaRowRenderItem {...item} />
					)
				}
				keyboardShouldPersistTaps="never"
				keyboardDismissMode="interactive"
				estimatedItemSize={240}
				removeClippedSubviews
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					hasNextPage && fetchNextPage();
				}}
			/>
		</View>
	);
};

export const MangaSearchList = () => {
	const { query, mediaFilter } = useSearchStore(
		useShallow((state) => ({
			query: state.query,
			mediaFilter: state.mediaFilter,
		})),
	);
	const { columns, itemWidth, displayMode } = useColumns('search');
	const debouncedSearch = useDebounce(query, 1000) as string;
	const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useInfiniteMediaSearchQuery(
			{
				type: MediaType.Manga,
				...mediaFilter,
				search: debouncedSearch.length > 1 ? debouncedSearch : undefined,
			},
			{
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage.Page?.pageInfo?.hasNextPage) {
						return {
							page: lastPage.Page?.pageInfo.currentPage + 1,
						};
					}
				},
			},
		);
	const { width } = useWindowDimensions();

	const allResults = data?.pages?.flatMap((val) => val.Page.media);

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			{isFetching && !isFetchingNextPage && (
				<View
					style={{
						width: '100%',
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</View>
			)}
			<SearchList
				key={columns}
				data={allResults}
				numColumns={columns}
				nestedScrollEnabled
				renderItem={(props) =>
					displayMode === 'COMPACT' ? (
						<View style={{ width: itemWidth }}>
							<MediaRenderItem {...props.item} />
						</View>
					) : (
						<MediaRowRenderItem {...props.item} />
					)
				}
				keyboardShouldPersistTaps="never"
				keyboardDismissMode="interactive"
				estimatedItemSize={240}
				removeClippedSubviews
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					hasNextPage && fetchNextPage();
				}}
			/>
		</View>
	);
};

export const CharacterSearchList = () => {
	const { query, characterFilter } = useSearchStore(
		useShallow((state) => ({
			query: state.query,
			characterFilter: state.characterFilter,
		})),
	);
	const debouncedSearch = useDebounce(query, 1000) as string;
	const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useInfiniteCharacterSearchQuery(
			{
				...characterFilter,
				isBirthday: debouncedSearch?.length > 0 ? undefined : characterFilter.isBirthday,
				search: debouncedSearch.length > 1 ? debouncedSearch : undefined,
			},
			{
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage.Page?.pageInfo?.hasNextPage) {
						return {
							page: lastPage.Page?.pageInfo.currentPage + 1,
						};
					}
				},
			},
		);
	const { width } = useWindowDimensions();

	const allResults: CharacterSearchQuery['Page']['characters'] = data?.pages?.flatMap(
		(val) => val.Page.characters,
	);

	const { columns, itemWidth } = useColumns('search');

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			{isFetching && !isFetchingNextPage && (
				<View
					style={{
						width: '100%',
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</View>
			)}
			<SearchList
				key={columns}
				numColumns={columns}
				data={allResults}
				nestedScrollEnabled
				renderItem={({ item }) => (
					<View
						style={{
							alignItems: 'center',
							marginVertical: 15,
							marginHorizontal: 4,
							width: itemWidth,
						}}
					>
						<CharacterCard {...item} />
					</View>
				)}
				keyboardShouldPersistTaps="never"
				keyboardDismissMode="interactive"
				estimatedItemSize={240}
				removeClippedSubviews
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					hasNextPage && fetchNextPage();
				}}
			/>
		</View>
	);
};

export const StaffSearchList = () => {
	const { query, staffFilter } = useSearchStore();
	const debouncedSearch = useDebounce(query, 1000) as string;
	const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useInfiniteStaffSearchQuery(
			{
				...staffFilter,
				search: debouncedSearch.length > 0 ? debouncedSearch : undefined,
			},
			{
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage.Page?.pageInfo?.hasNextPage) {
						return {
							page: lastPage.Page?.pageInfo.currentPage + 1,
						};
					}
				},
			},
		);
	const { width } = useWindowDimensions();

	const { columns, itemWidth } = useColumns('search');

	const allResults: StaffSearchQuery['Page']['staff'] = data?.pages?.flatMap(
		(val) => val.Page.staff,
	);

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			{isFetching && !isFetchingNextPage && (
				<View
					style={{
						width: '100%',
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</View>
			)}
			<SearchList
				key={columns}
				numColumns={columns}
				data={allResults}
				nestedScrollEnabled
				renderItem={({ item }) => (
					<View
						style={{
							alignItems: 'center',
							marginVertical: 15,
							marginHorizontal: 4,
							width: itemWidth,
						}}
					>
						<CharacterCard {...item} isStaff />
					</View>
				)}
				keyboardShouldPersistTaps="never"
				keyboardDismissMode="interactive"
				estimatedItemSize={240}
				removeClippedSubviews
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					hasNextPage && fetchNextPage();
				}}
			/>
		</View>
	);
};

export const StudioSearchList = () => {
	const { query, studioFilter } = useSearchStore();
	const debouncedSearch = useDebounce(query, 1000) as string;
	const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useInfiniteStudioSearchQuery(
			{
				...studioFilter,
				search: debouncedSearch.length > 0 ? debouncedSearch : undefined,
			},
			{
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage.Page?.pageInfo?.hasNextPage) {
						return {
							page: lastPage.Page?.pageInfo.currentPage + 1,
						};
					}
				},
			},
		);
	const { width } = useWindowDimensions();

	const allResults: StudioSearchQuery['Page']['studios'] = data?.pages?.flatMap(
		(val) => val.Page.studios,
	);

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			{isFetching && !isFetchingNextPage && (
				<View
					style={{
						width: '100%',
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</View>
			)}
			<SearchList
				data={allResults}
				numColumns={1}
				nestedScrollEnabled
				renderItem={({ item }: { item: StudioSearchQuery['Page']['studios'][0] }) => (
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							marginHorizontal: 10,
							marginVertical: 4,
						}}
					>
						<StudioCard
							{...item}
							onPress={() => router.push(`/studio/${item.id}`)}
							onLongPress={() =>
								SheetManager.show('QuickActionStudioSheet', { payload: item })
							}
						/>
					</View>
				)}
				keyboardShouldPersistTaps="never"
				keyboardDismissMode="interactive"
				estimatedItemSize={240}
				removeClippedSubviews
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					hasNextPage && fetchNextPage();
				}}
			/>
		</View>
	);
};

export const UserSearchList = () => {
	const { query, userFilter } = useSearchStore();
	const debouncedSearch = useDebounce(query, 600) as string;
	const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useInfiniteUserSearchQuery(
			{
				...userFilter,
				search: debouncedSearch.length > 0 ? debouncedSearch : undefined,
			},
			{
				initialPageParam: 1,
				getNextPageParam(lastPage) {
					if (lastPage.Page?.pageInfo?.hasNextPage) {
						return {
							page: lastPage.Page?.pageInfo.currentPage + 1,
						};
					}
				},
			},
		);
	const { width } = useWindowDimensions();

	const { columns, itemWidth } = useColumns('search');

	const allResults: UserSearchQuery['Page']['users'] = data?.pages?.flatMap(
		(val) => val.Page.users,
	);

	return (
		<View style={{ flex: 1, height: '100%', width }}>
			{isFetching && !isFetchingNextPage && (
				<View
					style={{
						width: '100%',
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</View>
			)}
			<SearchList
				key={columns}
				numColumns={columns}
				data={allResults}
				nestedScrollEnabled
				renderItem={({ item }: { item: UserSearchQuery['Page']['users'][0] }) => (
					<View
						style={{
							alignItems: 'center',
							marginVertical: 15,
							width: itemWidth,
						}}
					>
						<UserCard {...item} />
					</View>
				)}
				keyboardShouldPersistTaps="never"
				keyboardDismissMode="interactive"
				estimatedItemSize={240}
				removeClippedSubviews
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					hasNextPage && fetchNextPage();
				}}
			/>
		</View>
	);
};
