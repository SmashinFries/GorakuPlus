import {
	DefaultScoreDialog,
	MediaTileCustomizer,
	ScoreColorDialog,
} from '@/components/more/settings/appearance/dialogs';
import {
	DefaultDescDialog,
	ExploreTabsDialog,
	ListTabsDialog,
	NSFWLevelDialog,
} from '@/components/more/settings/media/dialog';
import { ListSubheader } from '@/components/titles';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { List, Portal, Text } from 'react-native-paper';
import { MaterialSwitchListItem } from '@/components/switch';
import { useSettingsStore } from '@/store/settings/settingsStore';
import { useThemeStore } from '@/store/theme/themeStore';
import { useAuthStore } from '@/store/authStore';
import { ThemeOptions, useAppTheme } from '@/store/theme/themes';
import { MediaType, useUpdateViewerMutation } from '@/api/anilist/__genereated__/gql';
import { useQueryClient } from '@tanstack/react-query';
import { DanbooruRating } from '@/api/danbooru/types';
import { ScrollView } from 'react-native-gesture-handler';
import { useShallow } from 'zustand/react/shallow';

const MediaSettingsPage = () => {
	const {
		defaultDescription,
		showNSFW,
		blurNSFW,
		blurNSFWLevel,
		tagBlacklist,
		exploreTabs,
		exploreTabOrder,
		scoreColors,
		defaultScore,
		setSettings,
	} = useSettingsStore(
		useShallow((state) => ({
			defaultDescription: state.defaultDescription,
			showNSFW: state.showNSFW,
			blurNSFW: state.blurNSFW,
			blurNSFWLevel: state.blurNSFWLevel,
			tagBlacklist: state.tagBlacklist,
			exploreTabs: state.exploreTabs,
			exploreTabOrder: state.exploreTabOrder,
			scoreColors: state.scoreColors,
			defaultScore: state.defaultScore,
			setSettings: state.setSettings,
		})),
	);
	const mode = useThemeStore(useShallow((state) => state.mode));
	const userID = useAuthStore(useShallow((state) => state.anilist.userID));
	const queryClient = useQueryClient();

	const { colors } = useAppTheme();
	const [showDefDescDialog, setShowDefDescDialog] = useState(false);

	const [showScoreColorDialog, setShowScoreColorDialog] = useState(false);
	const [showDefaultScoreDialog, setShowDefaultScoreDialog] = useState(false);
	const [showMTCustomizer, setShowMTCustomizer] = useState(false);
	const [showNsfwLevelDialog, setShowNsfwLevelDialog] = useState(false);

	const [expTbsVis, setExpTbsVis] = useState<boolean>(false);
	const [animeListTabVis, setAnimeListTabVis] = useState<boolean>(false);
	const [mangaListTabVis, setMangaListTabVis] = useState<boolean>(false);

	const toggleExploreTabOptions = (isVis: boolean) => setExpTbsVis(isVis);
	const toggleAnimeListTabOptions = (isVis: boolean) => setAnimeListTabVis(isVis);
	const toggleMangaListTabOptions = (isVis: boolean) => setMangaListTabVis(isVis);

	const viewerMutation = useUpdateViewerMutation();

	return (
		<View>
			<ScrollView>
				<ListSubheader title="Tab Order" />
				<List.Item
					title={'Explore Tabs'}
					description={exploreTabOrder
						?.filter((item) => exploreTabs?.includes(item))
						?.join(', ')}
					descriptionStyle={{ textTransform: 'capitalize' }}
					onPress={() => toggleExploreTabOptions(true)}
				/>
				<List.Item
					title={'Anime List Tabs'}
					description={'Customize the order of your anime lists'}
					onPress={() => toggleAnimeListTabOptions(true)}
					disabled={!userID}
				/>
				<List.Item
					title={'Manga List Tabs'}
					description={'Customize the order of your manga lists'}
					onPress={() => toggleMangaListTabOptions(true)}
					disabled={!userID}
				/>
				<ListSubheader title="Description Source" />
				<List.Item
					title="Default Description"
					description={defaultDescription === 'ani' ? 'AniList' : 'MyAnimeList'}
					onPress={() => setShowDefDescDialog(true)}
				/>
				<ListSubheader title="NSFW" />
				<MaterialSwitchListItem
					title="NSFW"
					fluid
					description={
						Constants.expoConfig?.extra?.isStore
							? 'Permenantly disabled. \nApp store does not allow NSFW content.'
							: ''
					}
					selected={!!showNSFW}
					onPress={() => {
						userID && viewerMutation.mutate({ displayNSFW: !showNSFW });
						setSettings({ showNSFW: !showNSFW });
						queryClient.invalidateQueries({
							queryKey: ['DanbooruSearch', 'DanbooruPost'],
						});
					}}
					disabled={Constants.expoConfig?.extra?.isStore as boolean}
				/>
				<MaterialSwitchListItem
					title="NSFW Blur"
					selected={!!blurNSFW}
					fluid
					onPress={() => {
						setSettings({ blurNSFW: !blurNSFW });
						queryClient.invalidateQueries({
							queryKey: ['DanbooruSearch', 'DanbooruPost'],
						});
					}}
					disabled={Constants.expoConfig?.extra?.isStore || !showNSFW}
				/>
				<List.Item
					title="NSFW Blur Level (fanart)"
					description={'Blur anything more severe than this'}
					right={(props) => (
						<Text
							style={[
								props.style,
								{ color: !blurNSFW ? colors.onSurfaceDisabled : props.color },
							]}
						>
							{
								Object.entries(DanbooruRating).find(
									(value) => value[1] === blurNSFWLevel,
								)?.[0]
							}
						</Text>
					)}
					onPress={() => setShowNsfwLevelDialog(true)}
					disabled={!blurNSFW || !showNSFW}
				/>
				<ListSubheader title="Tags" />
				<List.Item
					title="Blacklisted Tags"
					description={'Never show content with selected tags'}
					right={(props) => <Text {...props}>{tagBlacklist?.length}</Text>}
					// onPress={() => navigation.navigate('bannedTags', { screen: 'btags' })}
					onPress={() => router.push('/more/settings/media/tagBlacklist')}
				/>
				<List.Section>
					<ListSubheader title="Scoring" />
					<List.Item
						title={'Default Score Type'}
						description={defaultScore}
						descriptionStyle={{ textTransform: 'capitalize' }}
						onPress={() => setShowDefaultScoreDialog(true)}
					/>
					<List.Item
						title={'Score Weights'}
						onPress={() => setShowScoreColorDialog(true)}
						description={`0 <-- ${scoreColors?.red} <--> ${scoreColors?.yellow} --> 100`}
					/>
				</List.Section>
			</ScrollView>
			<Portal>
				<DefaultDescDialog
					defaultValue={defaultDescription ?? 'ani'}
					visible={showDefDescDialog}
					onDismiss={() => setShowDefDescDialog(false)}
				/>
				<ExploreTabsDialog
					visible={expTbsVis}
					onDismiss={() => toggleExploreTabOptions(false)}
				/>
				<ListTabsDialog
					visible={animeListTabVis}
					onDismiss={() => toggleAnimeListTabOptions(false)}
					type={MediaType.Anime}
				/>
				<ListTabsDialog
					visible={mangaListTabVis}
					onDismiss={() => toggleMangaListTabOptions(false)}
					type={MediaType.Manga}
				/>
				<DefaultScoreDialog
					visible={showDefaultScoreDialog}
					onDismiss={() => setShowDefaultScoreDialog(false)}
					defaultScore={defaultScore ?? 'average'}
					updateDefaultScore={(scoreType: 'average' | 'mean') =>
						setSettings({ defaultScore: scoreType })
					}
				/>
				<ScoreColorDialog
					visible={showScoreColorDialog}
					onDismiss={() => setShowScoreColorDialog(false)}
					updateScoreColor={(red: number, yellow: number) =>
						setSettings({ scoreColors: { red, yellow } })
					}
				/>
				<NSFWLevelDialog
					visible={showNsfwLevelDialog}
					onDismiss={() => setShowNsfwLevelDialog(false)}
				/>
				<MediaTileCustomizer
					themeMode={mode as ThemeOptions}
					visible={showMTCustomizer}
					onDismiss={() => setShowMTCustomizer(false)}
				/>
			</Portal>
		</View>
	);
};

export default MediaSettingsPage;
