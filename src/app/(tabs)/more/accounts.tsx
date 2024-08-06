import { View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { List, Portal } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';
import { AnilistIcon } from '@/components/svgs';
import { ListSubheader } from '@/components/titles';
import { useAuthStore } from '@/store/authStore';
import { useAppTheme } from '@/store/theme/themes';
import { useAnilistAuth } from '@/api/anilist/useAnilistAuth';

WebBrowser.maybeCompleteAuthSession();

const AccountsPage = () => {
	const { anilist, sauceNao, waifuit } = useAuthStore();
	const { colors, dark } = useAppTheme();
	const aniAuth = useAnilistAuth();
	const [showAniAuth, setShowAniAuth] = useState(false);
	const [showWaifuIt, setShowWaifuIt] = useState(false);

	const ActiveIcon = (props: { color: string; style?: Style }) => (
		<List.Icon {...props} icon={'check'} color={'green'} />
	);

	useEffect(() => {
		setShowAniAuth(false);
	}, []);

	return (
		<View>
			<List.Section>
				<ListSubheader title="Main" />
				<List.Item
					title="Anilist"
					description={anilist.deathDate && `Expires: ${anilist.deathDate}`}
					onPress={() =>
						anilist.deathDate ? setShowAniAuth(true) : aniAuth.promptAsync()
					}
					right={(props) => (anilist.deathDate ? <ActiveIcon {...props} /> : null)}
					left={(props) => <AnilistIcon style={props.style} isDark={dark} />}
				/>
				<ListSubheader title="Extras" />
				<List.Item
					title="Waifu.It"
					description={'Anime Quotes, Facts, Emotes, Gifs, and More!'}
					onPress={() => setShowWaifuIt(true)}
					right={(props) => (waifuit.token ? <ActiveIcon {...props} /> : null)}
					left={(props) => (
						<List.Image
							source={require('../../../../assets/waifu.it.logo.png')}
							style={[props.style]}
						/>
					)}
				/>
			</List.Section>
			<Portal>
				<AniListLoginDialog
					visible={showAniAuth}
					onDismiss={() => setShowAniAuth(false)}
					onLogout={() => {
						dispatch(
							setAniAuth({
								token: '',
								deathDate: '',
								username: '',
								userID: undefined,
							}),
						);

						dispatch(
							updateListFilter({
								entryType: 'animeTabOrder',
								value: [
									'Watching',
									'Planning',
									'Completed',
									'Rewatching',
									'Paused',
									'Dropped',
								],
							}),
						);
						dispatch(
							updateListFilter({
								entryType: 'mangaTabOrder',
								value: [
									'Reading',
									'Planning',
									'Completed',
									'Rereading',
									'Paused',
									'Dropped',
								],
							}),
						);
						resetCache();
					}}
					onRelogin={() => aniAuth.promptAsync()}
				/>
				<WaifuItTokenDialog visible={showWaifuIt} onDismiss={() => setShowWaifuIt(false)} />
			</Portal>
		</View>
	);
};

export default AccountsPage;
