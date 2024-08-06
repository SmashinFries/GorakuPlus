import { useRef, useState } from 'react';
import { Linking, Pressable, ScrollView, View } from 'react-native';
import * as Updates from 'expo-updates';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { ActivityIndicator, Button, List, Portal, Surface, Text } from 'react-native-paper';
import { Accordion } from '@/components/animations';
import { LinkButton } from '@/components/more/settings/about/buttons';
import {
	AnilistIcon,
	AnimeThemesIcon,
	DanbooruIcon,
	GumroadIcon,
	MalIcon,
	MangaUpdatesIcon,
} from '@/components/svgs';
import { Image } from 'expo-image';
import { openWebBrowser } from '@/utils/webBrowser';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import useAppUpdates from '@/hooks/useAppUpdates';
import { UpdaterBottomSheet } from '@/components/updates';
import { useSettingsStore } from '@/store/settings/settingsStore';

const OtherAppItem = ({
	title,
	imgUrl,
	link,
	status = 'Coming Soon!',
}: {
	title: string;
	imgUrl?: string;
	link?: string;
	status?: string;
}) => {
	return (
		<Pressable
			onPress={() => openWebBrowser(link, true)}
			style={{ maxWidth: 100, marginHorizontal: 10 }}
		>
			<Surface
				elevation={2}
				style={{
					borderRadius: 12,
					justifyContent: 'center',
					alignItems: 'center',
					height: 90,
					width: 90,
				}}
			>
				{imgUrl ? (
					<Image
						source={{
							uri: imgUrl,
						}}
						style={{ height: '100%', width: '100%' }}
					/>
				) : (
					<Text style={{ textAlign: 'center' }}>{status}</Text>
				)}
			</Surface>
			<Text numberOfLines={2} style={{ paddingTop: 5, textAlign: 'center' }}>
				{title}
			</Text>
		</Pressable>
	);
};

const AboutPage = () => {
	const { showNSFW } = useSettingsStore();
	const updaterBtmSheetRef = useRef<BottomSheetModal>(null);
	const { updateDetails, checkForUpdates } = useAppUpdates();
	const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);

	const runUpdateChecker = async () => {
		setIsCheckingUpdate(true);
		const hasUpdate = await checkForUpdates();
		if (hasUpdate) {
			updaterBtmSheetRef.current?.present();
		}
		setIsCheckingUpdate(false);
	};

	return (
		<View style={{ flex: 1 }}>
			<List.Item
				title={'Version'}
				description={`${Constants?.expoConfig?.version}${
					Constants.executionEnvironment !== ExecutionEnvironment.StoreClient
						? ' (uncensored)'
						: ' (censored)'
				}${Updates.createdAt ? `\n📅 ${Updates.createdAt?.toLocaleString()}` : ''}`}
				descriptionStyle={{ textTransform: 'capitalize' }}
				descriptionNumberOfLines={3}
			/>
			{Constants.executionEnvironment !== ExecutionEnvironment.StoreClient && (
				<List.Item
					title={'Check for Updates'}
					onPress={runUpdateChecker}
					right={(props) => (isCheckingUpdate ? <ActivityIndicator {...props} /> : null)}
				/>
			)}
			<Accordion title="More Apps" titleFontSize={16}>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					<OtherAppItem
						title={'WaifuTagger'}
						imgUrl="https://github.com/KuzuLabz/WaifuTagger/blob/master/assets/adaptive-icon.png?raw=true"
						link="https://github.com/KuzuLabz/WaifuTagger"
					/>
					<OtherAppItem title={'AniThemes'} />
					<OtherAppItem title={'VN Browser'} />
					<OtherAppItem title={'KuzuChat'} />
					<OtherAppItem title={'BooruPromptCreator'} status={'Hiatus'} />
				</ScrollView>
			</Accordion>
			<Accordion title="Data Sources" titleFontSize={16} initialExpand>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					<LinkButton
						url="https://anilist.co/home"
						label="Anilist"
						icon={() => <AnilistIcon isDark />}
					/>
					<LinkButton
						url="https://jikan.moe/"
						label="Jikan"
						icon={(props) => (
							<Image
								source={require('../../../../assets/jikan.logo.png')}
								style={{ height: 46, width: 46 }}
							/>
						)}
						transparentBg
					/>
					<LinkButton
						url="https://myanimelist.net/"
						label="MyAnimeList"
						icon={() => <MalIcon />}
						transparentBg
					/>
					<LinkButton
						url="https://www.mangaupdates.com/"
						label="MangaUpdates"
						icon={() => <MangaUpdatesIcon />}
						transparentBg
					/>
					<LinkButton
						url="https://books.google.com/"
						label="Google Books"
						icon={'google'}
					/>
					<LinkButton
						url={
							showNSFW
								? 'https://danbooru.donmai.us/'
								: 'https://safebooru.donmai.us/'
						}
						label="Danbooru"
						icon={() => <DanbooruIcon />}
						transparentBg
					/>
					<LinkButton
						url={'https://animethemes.moe/'}
						label="AnimeThemes"
						icon={() => <AnimeThemesIcon />}
						transparentBg
					/>
					<LinkButton
						url={'https://trace.moe/'}
						label="trace.moe"
						icon={(props) => (
							<Image
								source={{ uri: 'https://trace.moe/favicon128.png' }}
								style={{ height: 46, width: 46 }}
							/>
						)}
						transparentBg
					/>
					{/* <LinkButton
                        url="https://waifu.it/"
                        label="Waifu.It"
                        icon={(props) => (
                            <Image
                                source={require('../../../../assets/waifu.it.logo.png')}
                                style={{ height: 46, width: 46 }}
                            />
                        )}
                        transparentBg
                    /> */}
				</ScrollView>
			</Accordion>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'flex-end',
				}}
			>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'flex-end',
						marginBottom: 10,
					}}
				>
					<Text>Created by KuzuLabz ❤️</Text>
				</View>

				<View
					style={{
						alignItems: 'flex-end',
						justifyContent: 'center',
						flexDirection: 'row',
					}}
				>
					{/* <Text>When you find bugs or issues, send me a DM!</Text>
                <Button
                    icon={'instagram'}
                    onPress={() => Linking.openURL('https://www.instagram.com/smashinfries')}
                >
                    @smashinfries
                </Button> */}
					<LinkButton url="https://goraku.kuzulabz.com/" icon={'earth'} size={28} />
					{/* <LinkButton
                    url="https://github.com/KuzuLabz/gorakusite"
                    icon={'github'}
                    size={28}
                /> */}
					<LinkButton url="https://discord.gg/gdenWHjXBv" icon={'discord'} size={28} />
					{/* <LinkButton url="https://www.instagram.com/kuzulabz" icon={'instagram'} size={28} /> */}
					<LinkButton
						url="https://www.kuzumerch.com"
						icon={'storefront-outline'}
						size={28}
					/>
				</View>
			</View>
			<UpdaterBottomSheet ref={updaterBtmSheetRef} updateDetails={updateDetails} />
		</View>
	);
};

export default AboutPage;
