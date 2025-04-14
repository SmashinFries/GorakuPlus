import { View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Button, Dialog, List, Portal, Text } from 'react-native-paper';
import { useRef, useState } from 'react';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';
import { AnilistIcon } from '@/components/svgs';
import { ListSubheader } from '@/components/titles';
import { AuthState, useAuthStore } from '@/store/authStore';
import { useAppTheme } from '@/store/theme/themes';
import { useAnilistAuth } from '@/api/anilist/useAnilistAuth';
import { useShallow } from 'zustand/react/shallow';
import { AnilistAccountSheet } from '@/components/sheets/bottomsheets';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { router } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

const logos: { [key in keyof Partial<AuthState>]: any } = {
	sauceNao: require('../../../../../assets/saucenao-icon.webp'),
	suwayomi: require('../../../../../assets/suwayomi-logo.png'),
};

const AccountsPage = () => {
	const { colors } = useAppTheme();
	const anilist = useAuthStore(useShallow((state) => state.anilist));
	const sauceNao = useAuthStore(useShallow((state) => state.sauceNao));
	const suwayomi = useAuthStore(useShallow((state) => state.suwayomi));
	const clearAuth = useAuthStore(useShallow((state) => state.clearAuth));
	const { dark } = useAppTheme();
	const aniAuth = useAnilistAuth();
	const sheetRef = useRef<TrueSheet>(null);
	const [disableDialogState, setDisableDialogState] = useState<{
		vis: boolean;
		type?: keyof AuthState | null;
	}>({ vis: false });

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
						anilist.deathDate ? sheetRef.current?.present() : aniAuth.promptAsync()
					}
					right={(props) => (anilist.deathDate ? <ActiveIcon {...props} /> : null)}
					left={(props) => <AnilistIcon style={[props.style]} isDark={dark} />}
				/>
				<ListSubheader title="Extras" />
				<List.Item
					title="SauceNao"
					description={'Manga image search'}
					// onPress={() => setIsSauceNaoVis(true)}
					onPress={() => router.navigate('/(dialogs)/(sauceNao)/settings')}
					onLongPress={() =>
						sauceNao?.api_key && setDisableDialogState({ vis: true, type: 'sauceNao' })
					}
					right={(props) => (sauceNao?.api_key ? <ActiveIcon {...props} /> : null)}
					left={(props) => (
						<List.Image
							source={require('../../../../../assets/saucenao-icon.webp')}
							style={[props.style]}
						/>
					)}
				/>
			</List.Section>
			<List.Section>
				<ListSubheader title="Experimental" />
				<List.Item
					title="Suwayomi Server"
					description={'Add manga to your Suwayomi library'}
					// onPress={() => setIsSuwayomiVis(true)}
					onPress={() => router.navigate('/(dialogs)/(suwayomi)/settings')}
					onLongPress={() =>
						suwayomi?.serverUrl &&
						setDisableDialogState({ vis: true, type: 'suwayomi' })
					}
					right={(props) => (suwayomi?.serverUrl ? <ActiveIcon {...props} /> : null)}
					left={(props) => (
						<List.Image
							source={require('../../../../../assets/suwayomi-logo.png')}
							style={[props.style]}
						/>
					)}
				/>
			</List.Section>
			<AnilistAccountSheet sheetRef={sheetRef} />
			<Portal>
				<Dialog
					visible={disableDialogState.vis}
					onDismiss={() => setDisableDialogState({ vis: false, type: null })}
				>
					<Dialog.Title>Disable Account</Dialog.Title>
					<Dialog.Content style={{ gap: 12 }}>
						<List.Item
							title={`Account`}
							description={disableDialogState.type}
							descriptionStyle={{ textTransform: 'capitalize' }}
							left={(props) =>
								disableDialogState.type ? (
									disableDialogState.type === 'anilist' ? (
										<AnilistIcon style={[props.style]} isDark={dark} />
									) : (
										<List.Image
											{...props}
											source={logos[disableDialogState.type]}
										/>
									)
								) : null
							}
						/>
						<Text>Are you sure you want to disable this account / service?</Text>
						<Text
							variant="labelSmall"
							style={{ color: colors.onSurfaceVariant, fontStyle: 'italic' }}
						>
							* This will clear all credentials!
						</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => setDisableDialogState({ vis: false, type: null })}>
							Cancel
						</Button>
						<Button
							onPress={() => {
								disableDialogState.type && clearAuth(disableDialogState.type);
								setDisableDialogState({ vis: false, type: null });
							}}
						>
							Confirm
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);
};

export default AccountsPage;
