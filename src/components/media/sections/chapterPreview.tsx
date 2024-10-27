import { useGetAtHomeServerChapterId, useGetChapter } from '@/api/mangadex/mangadex';
import { useGetSearchManga } from '@/api/mangadex/mangadexExtended';
import { ImageViewer } from '@/components/imageViewer';
import { ListHeading } from '@/components/text';
import { useMatchStore } from '@/store/matchStore';
import { useAppTheme } from '@/store/theme/themes';
import { openWebBrowser } from '@/utils/webBrowser';
import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { Portal } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

export const ChapterPreview = ({ aniId, title }: { aniId: number; title: string }) => {
	const { colors } = useAppTheme();
	const { mangadexDB, isMangaDexEnabled, addMangaDexID } = useMatchStore(
		useShallow((state) => ({
			mangadexDB: state.mangadex,
			isMangaDexEnabled: state.isMangaDexEnabled,
			addMangaDexID: state.addMangaDexID,
		})),
	);

	const currentImageIndex = useRef(0);

	const [isImageViewerVisible, setImageViewerVisible] = useState(false);

	const { data: mangaData, isFetched: mangaIsFetched } = useGetSearchManga(
		{ title: title, limit: 1, order: { relevance: 'desc' } },
		{ enabled: !!title && !mangadexDB[aniId] && isMangaDexEnabled },
	);
	const { data: chapterData, isFetched: chapterIsFetched } = useGetChapter(
		{
			manga: mangaData?.data?.data[0]?.id,
			'translatedLanguage[]': ['en'],
			limit: 1,
			order: { chapter: 'asc' },
		},
		{
			query: {
				enabled: !!mangaData?.data?.data[0] && !mangadexDB[aniId] && isMangaDexEnabled,
			},
		},
	);
	const { data: pagesData } = useGetAtHomeServerChapterId(
		mangadexDB[aniId]?.firstChapterId ?? chapterData?.data?.data[0]?.id,
		undefined,
		{
			query: {
				enabled:
					(!!chapterData?.data?.data[0]?.id || !!mangadexDB[aniId]) && isMangaDexEnabled,
			},
		},
	);

	const imageSelect = (idx: number) => {
		currentImageIndex.current = idx;
		setImageViewerVisible(true);
	};

	useEffect(() => {
		if (!mangadexDB[aniId] && mangaIsFetched && mangaData?.data?.data?.length > 0) {
			if (chapterIsFetched) {
				addMangaDexID(aniId, mangaData?.data?.data[0]?.id, chapterData?.data?.data[0]?.id);
			}
		}
	}, [mangaIsFetched, chapterIsFetched, mangaData, chapterData, mangadexDB, aniId]);

	if (
		!isMangaDexEnabled ||
		(mangaIsFetched && mangaData?.data?.total === 0) ||
		pagesData?.data?.chapter?.data?.length < 1
	)
		return null;

	return (
		<View style={{ overflow: 'visible' }}>
			<ListHeading
				title="Preview (beta)"
				subtitle={'Read more on MangaDex! (RTL)'}
				subtitleStyle={{ color: colors.onSurfaceVariant }}
				icon="launch"
				onIconPress={() =>
					openWebBrowser('https://mangadex.org/title/' + mangaData?.data?.data[0]?.id)
				}
			/>
			<View style={{ width: '100%', height: 260 }}>
				<FlatList
					data={pagesData?.data?.chapter?.data}
					renderItem={({ item, index }) =>
						index < 20 && (
							<Pressable
								onPress={() => imageSelect(index)}
								style={{ marginRight: 6 }}
							>
								<Image
									source={{
										uri: `${pagesData?.data?.baseUrl}/data/${pagesData?.data?.chapter?.hash}/${item}`,
									}}
									style={{ width: 180, height: 260 }}
									contentFit="contain"
								/>
							</Pressable>
						)
					}
					keyExtractor={(item, index) => index.toString()}
					inverted
					horizontal
					contentContainerStyle={{ padding: 15 }}
					showsHorizontalScrollIndicator={false}
					// drawDistance={225 * data?.data?.length}
				/>
			</View>
			{pagesData?.data?.chapter?.data && (
				<Portal>
					<ImageViewer
						rtl
						urls={pagesData?.data?.chapter?.data
							.map(
								(url) =>
									`${pagesData?.data?.baseUrl}/data/${pagesData?.data?.chapter?.hash}/${url}`,
							)
							.filter((url, idx) => (idx > 20 ? false : true))}
						visible={isImageViewerVisible}
						onDismiss={() => setImageViewerVisible(false)}
						initialIndex={currentImageIndex.current}
					/>
				</Portal>
			)}
		</View>
	);
};
