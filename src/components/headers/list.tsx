import { Appbar, Badge, Searchbar } from 'react-native-paper';
import { AnimViewMem } from '../animations';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackHandler } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { MediaType } from '@/api/anilist/__genereated__/gql';
import { useMemo, useState } from 'react';
import { useAppTheme } from '@/store/theme/themes';
import { useListFilterStore } from '@/store/listStore';

export const ListHeader = ({
	title = 'List',
	isViewer = true,
	currentType,
	openFilter = () => null,
}: {
	title?: string;
	isViewer?: boolean;
	currentType: MediaType;
	openFilter?: () => void;
}) => {
	const { updateListFilter, ...listParams } = useListFilterStore();
	const { colors } = useAppTheme();
	const [isOpen, setIsOpen] = useState(false);

	const total_filters = useMemo(
		() =>
			listParams?.tags_include.length +
			listParams?.tags_exclude.length +
			listParams?.genre_include.length +
			listParams?.genre_exclude.length +
			listParams?.[currentType === MediaType.Anime ? 'anime_format_in' : 'manga_format_in']
				.length +
			listParams?.[
				currentType === MediaType.Anime ? 'anime_format_not_in' : 'manga_format_not_in'
			].length +
			(listParams?.countryOfOrigin ? 1 : 0),
		[
			listParams?.tags_include,
			listParams?.tags_exclude,
			listParams?.genre_include,
			listParams?.genre_exclude,
			listParams?.anime_format_in,
			listParams?.anime_format_not_in,
			listParams?.manga_format_in,
			listParams?.manga_format_not_in,
			listParams?.countryOfOrigin,
			currentType,
		],
	);

	useFocusEffect(() => {
		const backAction = () => {
			setIsOpen((prev) => {
				if (prev === false) {
					router.back();
				}
				return false;
			});
			return true;
		};

		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

		return () => {
			backHandler.remove();
		};
	});

	const { right, left } = useSafeAreaInsets();

	return (
		<Appbar.Header>
			{!isViewer && !isOpen && <Appbar.BackAction onPress={() => router.back()} />}
			{isOpen ? (
				<AnimViewMem
					entering={FadeIn}
					exiting={FadeOut}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: Math.max(left, right),
						flexShrink: 1,
					}}
				>
					{/* <Appbar.BackAction onPress={() => setIsOpen(false)} /> */}
					<Searchbar
						value={listParams?.query ?? ''}
						onChangeText={(txt) => {
							updateListFilter?.({ query: txt });
						}}
						icon={'arrow-left'}
						onIconPress={() => setIsOpen(false)}
						style={{ backgroundColor: colors.surface }}
						mode="bar"
						autoFocus
					/>
				</AnimViewMem>
			) : (
				<Appbar.Content title={title} />
			)}
			{!isOpen && (
				<AnimViewMem exiting={FadeOut}>
					<Appbar.Action icon="magnify" onPress={() => setIsOpen(true)} />
				</AnimViewMem>
			)}
			{/* <Appbar.Action icon="refresh" onPress={onRefresh} /> */}
			<Appbar.Action
				icon={'view-module'}
				onPress={() =>
					router.push({
						pathname: '/(sheets)/displayConfig',
						params: { type: 'list' },
					})
				}
			/>
			{!!openFilter && (
				<>
					<Badge
						visible={total_filters > 0}
						size={18}
						style={{ position: 'absolute', top: 8, right: 6 }}
					>
						{total_filters}
					</Badge>
					<Appbar.Action icon="filter-variant" onPress={openFilter} />
				</>
			)}
			{/* <Appbar.Action icon="filter-outline" onPress={openFilter} /> */}
		</Appbar.Header>
	);
};
