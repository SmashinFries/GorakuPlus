import { FlatList, View, useWindowDimensions } from 'react-native';
import { useCallback, useRef } from 'react';
import {
	CharacterCard,
	CharacterRowCard,
	MediaCard,
	MediaCardRow,
	StudioCard,
	UserCard,
	UserRowCard,
} from '../cards';
import { router } from 'expo-router';
import { useSearchStore } from '@/store/search/searchStore';
import useDebounce from '@/hooks/useDebounce';
import {
	CharacterSearchQuery_Page_Page_characters_Character,
	MediaSearchQuery_Page_Page_media_Media,
	MediaType,
	StaffSearchQuery,
	StaffSearchQuery_Page_Page_staff_Staff,
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
import { useColumns } from '@/hooks/useColumns';
import { useDisplayStore } from '@/store/displayStore';
import { FlashListAnim, LongScrollView } from '../list';
import { useShallow } from 'zustand/react/shallow';
import { GorakuRefreshControl } from '../explore/lists';
import { ListHeading } from '../text';
import { FlashList, FlashListProps } from '@shopify/flash-list';

export const MediaRenderItem = (props: MediaSearchQuery_Page_Page_media_Media) => {
	return (
		<View
			style={{
				// flex: 1,
				alignItems: 'center',
				justifyContent: 'flex-start',
				marginVertical: 0,
				marginHorizontal: 6,
			}}
		>
			<MediaCard {...props} fitToParent />
		</View>
	);
};

export const MediaRowRenderItem = (props: MediaSearchQuery_Page_Page_media_Media) => {
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
						marginVertical: displayMode === 'COMPACT' ? 15 : 0,
						// marginHorizontal: 4,
						width: itemWidth,
					}}
				>
					{displayMode === 'COMPACT' ? (
						<CharacterCard {...item} isStaff={type === 'staff'} />
					) : (
						<CharacterRowCard {...item} isStaff={type === 'staff'} />
					)}
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
						// onLongPress={() => router.push({
						// 	pathname: '/(sheets)/studioActions',
						// 	params: {
						// 		params: JSON.stringify(item),
						// 	}
						// })}
						{...item}
					/>
				</View>
			);
		case 'users':
			return (
				<View
					style={{
						alignItems: 'center',
						marginVertical: displayMode === 'COMPACT' ? 15 : 0,
						// marginHorizontal: 4,
						width: itemWidth,
					}}
				>
					{displayMode === 'COMPACT' ? <UserCard {...item} /> : <UserRowCard {...item} />}
				</View>
			);
		default:
			return null;
	}
};

const SearchAllSection = ({
	type,
	data,
}: {
	type: SearchAllTypes;
	data: any[] | undefined;
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
	numColumns = 3,
	...props
}: FlashListProps<any> & { headerHeight?: number }) => {
	const listRef = useRef<FlashList<any>>(null);
	const { width } = useWindowDimensions();
	// const { scrollHandler } = useScrollHandler(
	// 	headerHeight ?? undefined,
	// 	150,
	// );
	const keyExtract = useCallback(
		(item: any, index: number) => (item?.id?.toString() ?? '0') + index.toString(),
		[],
	);

	return (
		<View style={{ flex: 1, width: width }}>
			<FlashListAnim
				listRef={listRef}
				data={data ?? []}
				keyExtractor={keyExtract}
				numColumns={numColumns}
				centerContent
				// onScroll={scrollHandler}
				{...props}
			/>
			{/* {shouldShowScrollToTop && (
				<ScrollToTopButton
					onPress={() => listRef.current?.scrollToIndex({ index: 0, animated: true })}
					// top={110}
				/>
			)} */}
		</View>
	);
};

export const SearchAllList = () => {
	const { width } = useWindowDimensions();
	const { colors } = useAppTheme();

	const { query, updateSearchType, updateMediaFilter } = useSearchStore();
	const showNSFW = useSettingsStore(useShallow((state) => state.showNSFW));
	const debouncedSearch = useDebounce(query, 1000) as string;

	const { data, isFetching, isRefetching, refetch } = useSearchAllQuery(
		{ search: debouncedSearch, perPage: 6, isAdult: showNSFW ? undefined : false },
		{ enabled: debouncedSearch?.length > 0 },
	);

	const onMore = (type: SearchAllTypes) => {
		switch (type) {
			case 'anime':
				updateMediaFilter({}, { asc: false, value: 'SEARCH_MATCH' });
				updateSearchType(MediaType.Anime);
				break;
			case 'manga':
				updateMediaFilter({}, { asc: false, value: 'SEARCH_MATCH' });
				updateSearchType(MediaType.Manga);
				break;
			case 'characters':
				updateSearchType('CHARACTER');
				break;
			case 'staff':
				updateSearchType('STAFF');
				break;
			case 'studios':
				updateSearchType('STUDIO');
				break;
			case 'users':
				updateSearchType('USER');
				break;
			default:
				break;
		}
	};

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
			{data && !isFetching && (
				<LongScrollView
					stickyHeaderIndices={[0, 2, 4, 6, 8, 10]}
					scrollToTopIconTop={5}
					refreshControl={
						<GorakuRefreshControl refreshing={isRefetching} onRefresh={refetch} />
					}
				>
					{/* ANIME */}
					{(data?.Anime?.media?.length ?? 0) > 0 && (
						<ListHeading
							title={'Anime'}
							titleStyle={{ fontWeight: 'bold' }}
							icon={'arrow-right'}
							titleVariant="headlineMedium"
							onIconPress={() => onMore('anime')}
							style={{ backgroundColor: colors.background }}
						/>
					)}
					{(data?.Anime?.media?.length ?? 0) > 0 && (
						<SearchAllSection data={data?.Anime?.media ?? undefined} type="anime" />
					)}
					{/* MANGA */}
					{(data?.Manga?.media?.length ?? 0) > 0 && (
						<ListHeading
							title={'Manga'}
							titleStyle={{ fontWeight: 'bold' }}
							icon={'arrow-right'}
							titleVariant="headlineMedium"
							onIconPress={() => onMore('manga')}
							style={{ backgroundColor: colors.background }}
						/>
					)}
					{(data?.Manga?.media?.length ?? 0) > 0 && (
						<SearchAllSection data={data?.Manga?.media ?? undefined} type="manga" />
					)}
					{/* CHARACTERS */}
					{(data?.Characters?.characters?.length ?? 0) > 0 && (
						<ListHeading
							title={'Characters'}
							titleStyle={{ fontWeight: 'bold' }}
							icon={'arrow-right'}
							titleVariant="headlineMedium"
							onIconPress={() => onMore('characters')}
							style={{ backgroundColor: colors.background }}
						/>
					)}
					{(data?.Characters?.characters?.length ?? 0) > 0 && (
						<SearchAllSection
							data={data?.Characters?.characters ?? undefined}
							type="characters"
						/>
					)}
					{/* STAFF */}
					{(data?.Staff?.staff?.length ?? 0) > 0 && (
						<ListHeading
							title={'Staff'}
							titleStyle={{ fontWeight: 'bold' }}
							icon={'arrow-right'}
							titleVariant="headlineMedium"
							onIconPress={() => onMore('staff')}
							style={{ backgroundColor: colors.background }}
						/>
					)}
					{(data?.Staff?.staff?.length ?? 0) > 0 && (
						<SearchAllSection data={data?.Staff?.staff ?? undefined} type="staff" />
					)}
					{/* STUDIOS */}
					{(data?.Studios?.studios?.length ?? 0) > 0 && (
						<ListHeading
							title={'Studios'}
							titleStyle={{ fontWeight: 'bold' }}
							icon={'arrow-right'}
							titleVariant="headlineMedium"
							onIconPress={() => onMore('studios')}
							style={{ backgroundColor: colors.background }}
						/>
					)}
					{(data?.Studios?.studios?.length ?? 0) > 0 && (
						<SearchAllSection
							data={data?.Studios?.studios ?? undefined}
							type="studios"
						/>
					)}
					{/* USERS */}
					{(data?.Users?.users?.length ?? 0) > 0 && (
						<ListHeading
							title={'Users'}
							titleStyle={{ fontWeight: 'bold' }}
							icon={'arrow-right'}
							titleVariant="headlineMedium"
							onIconPress={() => onMore('users')}
							style={{ backgroundColor: colors.background }}
						/>
					)}
					{(data?.Users?.users?.length ?? 0) > 0 && (
						<SearchAllSection data={data?.Users?.users ?? undefined} type="users" />
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
	const {
		data,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		isRefetching,
		refetch,
		fetchNextPage,
	} = useInfiniteMediaSearchQuery(
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
						page: (lastPage.Page?.pageInfo.currentPage ?? 0) + 1,
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
				data={mergedResults ?? []}
				numColumns={columns}
				nestedScrollEnabled
				renderItem={({ item }: { item: MediaSearchQuery_Page_Page_media_Media }) =>
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
				// removeClippedSubviews
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					hasNextPage && fetchNextPage();
				}}
				refreshControl={
					<GorakuRefreshControl refreshing={isRefetching} onRefresh={refetch} />
				}
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
	const {
		data,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		isRefetching,
		refetch,
		fetchNextPage,
	} = useInfiniteMediaSearchQuery(
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
						page: (lastPage.Page?.pageInfo.currentPage ?? 0) + 1,
					};
				}
			},
		},
	);
	const { width } = useWindowDimensions();

	const allResults = data?.pages?.flatMap((val) => val.Page?.media);

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
				data={allResults ?? []}
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
				// removeClippedSubviews
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					hasNextPage && fetchNextPage();
				}}
				refreshControl={
					<GorakuRefreshControl refreshing={isRefetching} onRefresh={refetch} />
				}
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
	const {
		data,
		isRefetching,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		refetch,
	} = useInfiniteCharacterSearchQuery(
		{
			...characterFilter,
			isBirthday: debouncedSearch?.length > 0 ? undefined : characterFilter?.isBirthday,
			search: debouncedSearch?.length > 0 ? debouncedSearch : undefined,
		},
		{
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage?.Page?.pageInfo?.hasNextPage) {
					return {
						page: (lastPage?.Page?.pageInfo.currentPage ?? 0) + 1,
					};
				}
			},
		},
	);
	const { width } = useWindowDimensions();

	const allResults: CharacterSearchQuery_Page_Page_characters_Character[] =
		data?.pages
			?.flatMap((val) => val?.Page?.characters ?? [])
			.filter(
				(char): char is CharacterSearchQuery_Page_Page_characters_Character => char != null,
			) ?? [];

	const { columns, itemWidth, displayMode } = useColumns('search');

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
				renderItem={({ item }) =>
					displayMode === 'COMPACT' ? (
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
					) : (
						<CharacterRowCard {...item} />
					)
				}
				keyboardShouldPersistTaps="never"
				keyboardDismissMode="interactive"
				estimatedItemSize={240}
				// removeClippedSubviews
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					hasNextPage && fetchNextPage();
				}}
				refreshControl={
					<GorakuRefreshControl refreshing={isRefetching} onRefresh={refetch} />
				}
			/>
		</View>
	);
};

export const StaffSearchList = () => {
	const { query, staffFilter } = useSearchStore();
	const debouncedSearch = useDebounce(query, 1000) as string;
	const {
		data,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		isRefetching,
		refetch,
		fetchNextPage,
	} = useInfiniteStaffSearchQuery(
		{
			...staffFilter,
			search: debouncedSearch.length > 0 ? debouncedSearch : undefined,
		},
		{
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage.Page?.pageInfo?.hasNextPage) {
					return {
						page: (lastPage.Page?.pageInfo.currentPage ?? 0) + 1,
					};
				}
			},
		},
	);
	const { width } = useWindowDimensions();

	const { columns, itemWidth, displayMode } = useColumns('search');

	const allResults: NonNullable<StaffSearchQuery['Page']>['staff'] =
		data?.pages
			?.flatMap((val) => val.Page?.staff ?? [])
			.filter((staff): staff is StaffSearchQuery_Page_Page_staff_Staff => staff != null) ??
		[];

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
				renderItem={({ item }) =>
					displayMode === 'COMPACT' ? (
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
					) : (
						<CharacterRowCard {...item} isStaff />
					)
				}
				keyboardShouldPersistTaps="never"
				keyboardDismissMode="interactive"
				estimatedItemSize={240}
				// removeClippedSubviews
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					hasNextPage && fetchNextPage();
				}}
				refreshControl={
					<GorakuRefreshControl refreshing={isRefetching} onRefresh={refetch} />
				}
			/>
		</View>
	);
};

export const StudioSearchList = () => {
	const { query, studioFilter } = useSearchStore();
	const debouncedSearch = useDebounce(query, 1000) as string;
	const {
		data,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		isRefetching,
		refetch,
		fetchNextPage,
	} = useInfiniteStudioSearchQuery(
		{
			...studioFilter,
			search: debouncedSearch.length > 0 ? debouncedSearch : undefined,
		},
		{
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage.Page?.pageInfo?.hasNextPage) {
					return {
						page: (lastPage.Page?.pageInfo.currentPage ?? 0) + 1,
					};
				}
			},
		},
	);
	const { width } = useWindowDimensions();

	const allResults: NonNullable<StudioSearchQuery['Page']>['studios'] = data?.pages
		?.flatMap((val) => val.Page?.studios ?? [])
		.filter((studio): studio is NonNullable<typeof studio> => studio !== undefined);

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
				data={allResults ?? []}
				numColumns={1}
				nestedScrollEnabled
				renderItem={({
					item,
				}: {
					item: NonNullable<NonNullable<StudioSearchQuery['Page']>['studios']>[0];
				}) =>
					item?.id ? (
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
								onPress={() => router.push(`/studio/${item?.id}`)}
								// onLongPress={() => openStudioQuickSheet(item)}
							/>
						</View>
					) : null
				}
				keyboardShouldPersistTaps="never"
				keyboardDismissMode="interactive"
				estimatedItemSize={240}
				// removeClippedSubviews
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					hasNextPage && fetchNextPage();
				}}
				refreshControl={
					<GorakuRefreshControl refreshing={isRefetching} onRefresh={refetch} />
				}
			/>
		</View>
	);
};

export const UserSearchList = () => {
	const { query, userFilter } = useSearchStore();
	const debouncedSearch = useDebounce(query, 600) as string;
	const {
		data,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		isRefetching,
		refetch,
		fetchNextPage,
	} = useInfiniteUserSearchQuery(
		{
			...userFilter,
			search: debouncedSearch.length > 0 ? debouncedSearch : undefined,
		},
		{
			initialPageParam: 1,
			getNextPageParam(lastPage) {
				if (lastPage.Page?.pageInfo?.hasNextPage) {
					return {
						page: (lastPage.Page?.pageInfo.currentPage ?? 0) + 1,
					};
				}
			},
		},
	);
	const { width } = useWindowDimensions();

	const { columns, displayMode, itemWidth } = useColumns('search');

	const allResults: NonNullable<UserSearchQuery['Page']>['users'] = data?.pages
		?.flatMap((val) => val.Page?.users ?? [])
		.filter((user): user is NonNullable<typeof user> => user !== undefined);

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
				data={allResults ?? []}
				nestedScrollEnabled
				renderItem={({
					item,
				}: {
					item: NonNullable<NonNullable<UserSearchQuery['Page']>['users']>[0];
				}) =>
					item?.id ? (
						<View
							style={{
								alignItems: 'center',
								marginVertical: displayMode === 'COMPACT' ? 15 : 0,
								width: itemWidth,
							}}
						>
							{displayMode === 'COMPACT' ? (
								<UserCard {...item} />
							) : (
								<UserRowCard {...item} />
							)}
						</View>
					) : null
				}
				keyboardShouldPersistTaps="never"
				keyboardDismissMode="interactive"
				estimatedItemSize={240}
				// removeClippedSubviews
				onEndReachedThreshold={0.4}
				onEndReached={() => {
					hasNextPage && fetchNextPage();
				}}
				refreshControl={
					<GorakuRefreshControl refreshing={isRefetching} onRefresh={refetch} />
				}
			/>
		</View>
	);
};
