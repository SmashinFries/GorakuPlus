import { useAuthStore } from '@/store/authStore';
import { openWebBrowser } from '@/utils/webBrowser';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Divider, TextInput } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import * as Clipboard from 'expo-clipboard';
import { useTextInputKeyboardUnfocus } from '@/hooks/useTextInputKeyboardUnfocus';
import { DialogHeader } from '@/components/headers/dialog';

const SauceNaoConfigDialog = () => {
	const { api_key } = useAuthStore(useShallow((state) => state.sauceNao));
	const setSauceNaoAuth = useAuthStore(useShallow((state) => state.setSauceNaoAuth));
	const [tempApiKey, setTempApiKey] = useState(api_key ?? '');

	const onSubmit = () => {
		setSauceNaoAuth(tempApiKey);
		router.back();
	};

	const onPaste = async () => {
		const apiKey = await Clipboard.getStringAsync();
		setTempApiKey(apiKey);
	};

	useTextInputKeyboardUnfocus();

	return (
		<ScrollView contentContainerStyle={{ paddingHorizontal: 12 }}>
			<Stack.Screen
				options={{
					header(props) {
						return (
							<DialogHeader
								{...props}
								actions={[{ label: 'Save', onPress: onSubmit }]}
							/>
						);
					},
				}}
			/>
			<View style={{ gap: 12 }}>
				<TextInput
					label={'API Key'}
					value={tempApiKey}
					onChangeText={(txt) => setTempApiKey(txt)}
					mode="outlined"
					right={
						tempApiKey?.length > 0 && (
							<TextInput.Icon icon={'close'} onPress={() => setTempApiKey('')} />
						)
					}
					multiline
				/>
				<View style={{ flexDirection: 'row', gap: 12 }}>
					<Button
						mode="outlined"
						onPress={() => openWebBrowser('https://saucenao.com/user.php')}
						style={{ flexGrow: 1 }}
						icon={'launch'}
					>
						Get API key
					</Button>
					<Button onPress={onPaste} icon={'content-paste'}>
						Paste Key
					</Button>
				</View>
				<Divider />
				<Button icon={'launch'} onPress={() => openWebBrowser('https://saucenao.com/')}>
					Open Webview
				</Button>
			</View>
		</ScrollView>
	);
};

export default SauceNaoConfigDialog;
