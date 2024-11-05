import { View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { List, Portal } from 'react-native-paper';
import { useState } from 'react';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';
import { AnilistIcon } from '@/components/svgs';
import { ListSubheader } from '@/components/titles';
import { useAuthStore } from '@/store/authStore';
import { useAppTheme } from '@/store/theme/themes';
import { useAnilistAuth } from '@/api/anilist/useAnilistAuth';
import { SheetManager } from 'react-native-actions-sheet';
import { SauceNaoAuthDialog } from '@/components/dialogs';
import { useShallow } from 'zustand/react/shallow';

WebBrowser.maybeCompleteAuthSession();

const AccountsPage = () => {
	const anilist = useAuthStore(useShallow((state) => state.anilist));
	const sauceNao = useAuthStore(useShallow((state) => state.sauceNao));
	const { dark } = useAppTheme();
	const aniAuth = useAnilistAuth();
	const [isSauceNaoVis, setIsSauceNaoVis] = useState(false);
	// const dayStart = Math.round(new Date(new Date().setUTCHours(0, 0, 0, 0)).getTime() / 1000);
	// const dayEnd = Math.round(new Date(new Date().setUTCHours(23, 59, 59, 999)).getTime() / 1000);
	// const { data } = useAiringTodayQuery({ dayStart, dayEnd }, { enabled: !!dayStart && !!dayEnd });
	// const { userID } = useAnilistAuthStore();

	const ActiveIcon = (props: { color: string; style?: Style }) => (
		<List.Icon {...props} icon={'check'} color={'green'} />
	);

	return (
		<View>
			<List.Section>
				<ListSubheader title="Main" />
				<List.Item
					title="Anilist"
					description={anilist.deathDate && `Expires: ${anilist.deathDate}`}
					onPress={() =>
						anilist.deathDate
							? SheetManager.show('AnilistAccountSheet')
							: aniAuth.promptAsync()
					}
					right={(props) => (anilist.deathDate ? <ActiveIcon {...props} /> : null)}
					left={(props) => <AnilistIcon style={[props.style]} isDark={dark} />}
				/>
				<ListSubheader title="Extras" />
				<List.Item
					title="SauceNao"
					description={'Manga image search'}
					onPress={() => setIsSauceNaoVis(true)}
					right={(props) => (sauceNao?.api_key ? <ActiveIcon {...props} /> : null)}
					left={(props) => (
						<List.Image
							source={require('../../../../../assets/saucenao-icon.webp')}
							style={[props.style]}
						/>
					)}
				/>
			</List.Section>
			<Portal>
				<SauceNaoAuthDialog
					visible={isSauceNaoVis}
					onDismiss={() => setIsSauceNaoVis(false)}
				/>
			</Portal>
		</View>
	);
};

export default AccountsPage;
