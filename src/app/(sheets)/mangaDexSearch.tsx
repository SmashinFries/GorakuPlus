import { MediaType } from '@/api/anilist/__genereated__/gql';
import { getGetChapterQueryOptions } from '@/api/mangadex/mangadex';
import { useGetSearchManga } from '@/api/mangadex/mangadexExtended';
import { Manga } from '@/api/mangadex/models';
import { MediaCard } from '@/components/cards';
import { GorakuActivityIndicator } from '@/components/loading';
import { GlobalBottomSheetParent } from '@/components/sheets/bottomsheets';
import { useColumns } from '@/hooks/useColumns';
import { useMatchStore } from '@/store/matchStore';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useRef } from 'react';
import { FlatList, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

const MangaDexSearchSheet = () => {
	const { aniId, search } = useLocalSearchParams<{ aniId: string; search: string }>();
	const sheet = useRef<TrueSheet>(null);
	const { addMangaDexID } = useMatchStore(
		useShallow((state) => ({ addMangaDexID: state.addMangaDexID })),
	);
	const queryClient = useQueryClient();
	const { data, isFetching } = useGetSearchManga(
		{
			title: search,
			limit: 10,
			'includes[]': ['cover_art'],
			order: { relevance: 'desc' },
		},
		{ enabled: !!search || search?.length < 1 },
	);

	const { columns, itemWidth } = useColumns('search');

	const onSelection = async (mangaId: string) => {
		const result = await queryClient.fetchQuery({
			...getGetChapterQueryOptions({
				manga: mangaId,
				'translatedLanguage[]': ['en'],
				limit: 1,
				order: { chapter: 'asc' },
			}),
		});
		aniId && addMangaDexID(Number(aniId), mangaId, result?.data?.data?.[0]?.id);
		sheet.current?.dismiss();
	};

	const MediaRenderItem = ({ item }: { item: Manga }) => {
		const englishTitle = item?.attributes?.title?.en;
		const nativeTitle =
			item?.attributes?.altTitles?.find(
				(title) => title?.[item?.attributes?.originalLanguage as string],
			)?.[item?.attributes?.originalLanguage as string] ?? englishTitle;
		// `${item?.attributes?.originalLanguage}-ro`
		const romajiTitle =
			item?.attributes?.altTitles?.find(
				(title) => title?.[`${item?.attributes?.originalLanguage}-ro`],
			)?.[`${item?.attributes?.originalLanguage}-ro`] ?? englishTitle;

		const coverFilename = item?.relationships?.find((relation) => relation.type === 'cover_art')
			?.attributes?.fileName;

		return (
			<View style={{ width: itemWidth }}>
				<View
					style={{
						// flex: 1,
						alignItems: 'center',
						justifyContent: 'flex-start',
						marginVertical: 10,
						marginHorizontal: 5,
					}}
				>
					<MediaCard
						id={item.id as any}
						type={MediaType.Manga}
						isFavourite={false}
						title={{
							english: englishTitle,
							romaji: romajiTitle,
							native: nativeTitle,
						}}
						coverImage={{
							// extraLarge: `https://uploads.mangadex.org/covers/${item?.id}/${coverFilename}`,
							extraLarge: coverFilename
								? `https://uploads.mangadex.org/covers/${item?.id}/${coverFilename}`
								: 'https://mangadex.org/covers/f1aa643f-6921-4eeb-b1c9-a1619e7f07c0/a34a2ff4-309c-4de6-ad42-ef08583ad3e5.jpg',
						}}
						fitToParent
						isMangaDex
						navigate={() => item.id && onSelection(item.id)}
					/>
				</View>
			</View>
		);
	};

	return (
		<GlobalBottomSheetParent sheetRef={sheet}>
			{isFetching ? (
				<View
					style={{
						height: 100,
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<GorakuActivityIndicator />
				</View>
			) : (
				<FlatList
					key={columns}
					data={data?.data?.data}
					keyExtractor={(_item, idx) => idx.toString()}
					numColumns={columns}
					centerContent
					nestedScrollEnabled
					ListHeaderComponent={() => (
						<View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
							<Text variant="headlineMedium">MangaDex Search</Text>
							<Divider />
						</View>
					)}
					renderItem={(props) => <MediaRenderItem {...props} />}
				/>
			)}
		</GlobalBottomSheetParent>
	);
};

export default MangaDexSearchSheet;
