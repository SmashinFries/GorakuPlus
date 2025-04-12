import { checkSuwayomiStatus } from '@/api/suwayomi/suwayomi';
import { useAuthStore } from '@/store/authStore';
import { router, Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { sendErrorMessage } from '@/utils/toast';
import { Button, IconButton, List, Menu, TextInput } from 'react-native-paper';
import { AboutServerQuery } from '@/api/suwayomi/types';
import { openWebBrowser } from '@/utils/webBrowser';
import { useTextInputKeyboardUnfocus } from '@/hooks/useTextInputKeyboardUnfocus';
import { DialogHeader } from '@/components/headers/dialog';
import { AccordionMemo } from '@/components/animations';

type ServerConfig = {
	protocol: 'http' | 'https';
	ip: string;
	port: string;
	username: string;
	password: string;
};

const createServerUrl = (config: ServerConfig | null) => {
	return `${config?.protocol}://${config?.ip}${config?.port ? ':' + config?.port : ''}/api/graphql`;
};

const createWebUIUrl = (config: ServerConfig | null) => {
	return `${config?.protocol}://${config?.ip}${config?.port ? ':' + config?.port : ''}`;
};

const getServerUrlInfo = (
	url: string,
): { protocol: 'http' | 'https'; ip: string; port: string } => {
	if (url.length > 0) {
		const protocol = url.includes('https') ? 'https' : 'http';
		const ip = url
			.replace(protocol + '://', '')
			.split(':')[0]
			?.replace('/api/graphql', '');
		const port = url.split(':').at(-1)?.split('/')[0] ?? '';
		return { protocol, ip, port };
	}
	return { protocol: 'http', ip: '', port: '' };
};

const getShouldDisableTest = (lastConfig: ServerConfig | null, newConfig: ServerConfig | null) => {
	if (lastConfig) {
		return (
			lastConfig.protocol === newConfig?.protocol &&
			lastConfig.ip === newConfig?.ip &&
			lastConfig.port === newConfig?.port &&
			lastConfig.username === newConfig?.username &&
			lastConfig.password === newConfig?.password
		);
	}
	return false;
};

// type SourceListItem = {
// 	serverUrl?: string;
// 	selectedSources: AuthState['suwayomi']['selectedSources'];
// };
// const SourceListItem = ({ serverUrl, selectedSources }: SourceListItem) => {
// 	const { data } = useSuwayomiGetSourcesQuery({ enabled: !!serverUrl });
// 	const [optionsVis, setOptionsVis] = useState(false);

// 	return (
// 		<>
// 			<List.Item
// 				title={'Sources'}
// 				description={(props) => (
// 					<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
// 						{selectedSources?.map((source, idx) => (
// 							<Chip key={idx}>{source.name}</Chip>
// 						))}
// 					</View>
// 				)}
// 				onPress={() => setOptionsVis(true)}
// 			/>
// 			<Portal>
// 				<Dialog
// 					visible={optionsVis}
// 					onDismiss={() => setOptionsVis(false)}
// 					style={{ maxHeight: '90%' }}
// 				>
// 					<Dialog.Title>Sources</Dialog.Title>
// 					<Dialog.ScrollArea>
// 						<ScrollView>
// 							{data?.data?.sources?.nodes?.map((node, idx) => (
// 								<Checkbox.Item
// 									key={idx}
// 									label={node?.displayName}
// 									status="unchecked"
// 								/>
// 							))}
// 						</ScrollView>
// 					</Dialog.ScrollArea>
// 					<Dialog.Actions>
// 						<Button
// 							onPress={() => {
// 								setOptionsVis(false);
// 							}}
// 						>
// 							Confirm
// 						</Button>
// 					</Dialog.Actions>
// 				</Dialog>
// 			</Portal>
// 		</>
// 	);
// };

const SuwayomiConfigDialog = () => {
	const { suwayomi, setSuwayomi } = useAuthStore();
	const serverUrlData = useMemo(
		() => getServerUrlInfo(suwayomi.serverUrl ?? ''),
		[suwayomi.serverUrl],
	);
	// const [protocol, setProtocol] = useState<'http' | 'https'>(serverUrlData.protocol);
	// const [ip, setIp] = useState<string>(serverUrlData.ip);
	// const [port, setPort] = useState<string>(serverUrlData.port);

	const [tempConfig, setTempConfig] = useState<ServerConfig>({
		...serverUrlData,
		username: suwayomi?.username ?? '',
		password: suwayomi?.password ?? '',
	});
	// const [tempUrl, setTempUrl] = useState(suwayomi?.serverUrl ?? 'http://');
	// const [tempAuth, setTempAuth] = useState({
	// 	username: suwayomi?.username ?? '',
	// 	password: suwayomi?.password ?? '',
	// });
	const [isChecking, setIsChecking] = useState(false);
	const [isTesting, setIsTesting] = useState(false);

	const [lastTestedUrlData, setLastTestedUrlData] = useState<{
		protocol: 'http' | 'https';
		ip: string;
		port: string;
		username: string;
		password: string;
	} | null>({
		...serverUrlData,
		username: suwayomi.username ?? '',
		password: suwayomi.password ?? '',
	});
	const [aboutServerData, setAboutServerData] = useState<
		AboutServerQuery['data']['aboutServer'] | null
	>(suwayomi.info ?? null);

	const [isProtocolVis, setIsProtocolVis] = useState(false);

	const onTempProtocolChange = (protocol: ServerConfig['protocol']) => {
		setTempConfig((prev) => ({ ...prev, protocol }));
	};

	const onTempConfigUpdate = (type: keyof ServerConfig, value: string) => {
		setTempConfig((prev) => ({ ...prev, [type]: value }));
	};

	const onTempAuthChange = (type: 'username' | 'password', txt: string) => {
		setTempConfig((prev) => ({ ...prev, [type]: txt }));
	};

	const onTestConfig = async () => {
		setIsTesting(true);
		const url = createServerUrl(tempConfig);
		const server = await checkSuwayomiStatus(
			url,
			tempConfig.username.length > 0 ? tempConfig : undefined,
		);
		setLastTestedUrlData(tempConfig);
		setIsTesting(false);
		if (server?.data?.data?.aboutServer) {
			setAboutServerData(server.data?.data?.aboutServer);
			return true;
		} else {
			sendErrorMessage(
				server?.status === 401 ? 'Authentication failed!' : 'Server not found!',
			);
			return false;
		}
	};

	const isTestConfigDisabled = useMemo(
		() => getShouldDisableTest(lastTestedUrlData, tempConfig),
		[lastTestedUrlData, tempConfig],
	);

	const onSubmit = async () => {
		const url = createServerUrl(tempConfig);
		if (isTestConfigDisabled && !!aboutServerData) {
			setSuwayomi({
				serverUrl: url,
				info: aboutServerData,
				username: !!tempConfig.username ? tempConfig.username : undefined,
				password: !!tempConfig.password ? tempConfig.password : undefined,
			});
			router.back();
		} else {
			setIsChecking(true);
			const server = await checkSuwayomiStatus(
				url,
				tempConfig.username.length > 0
					? { username: tempConfig.username, password: tempConfig.password }
					: undefined,
			);
			setIsChecking(false);
			if (!!server && server.status === 200 && server.data?.data?.aboutServer) {
				setSuwayomi({
					serverUrl: url,
					username: !!tempConfig.username ? tempConfig.username : undefined,
					password: !!tempConfig.password ? tempConfig.password : undefined,
					info: server?.data?.data?.aboutServer,
				});
				router.back();
			} else {
				sendErrorMessage('Server not found!');
			}
		}
	};

	const onURLPaste = async () => {
		const url = await Clipboard.getStringAsync();
		if (url.includes('http')) {
			const serverInfo = getServerUrlInfo(url);
			setTempConfig((prev) => ({ ...prev, ...serverInfo }));
		} else {
			sendErrorMessage('URL not valid!');
		}
	};

	useTextInputKeyboardUnfocus();

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingHorizontal: 12 }}
		>
			<Stack.Screen
				options={{
					header(props) {
						return (
							<DialogHeader
								{...props}
								actions={[
									{ label: 'Save', onPress: onSubmit, loading: isChecking },
								]}
							/>
						);
					},
				}}
			/>
			<AccordionMemo
				title="Server Config"
				initialExpand={(suwayomi.serverUrl?.length ?? 0) === 0}
			>
				<View style={{ gap: 12 }}>
					<Menu
						visible={isProtocolVis}
						onDismiss={() => setIsProtocolVis(false)}
						anchorPosition="bottom"
						anchor={
							<Pressable onPress={() => setIsProtocolVis(true)}>
								<TextInput
									label={'* Protocol'}
									value={tempConfig.protocol.toUpperCase()}
									mode="outlined"
									editable={false}
									right={
										<TextInput.Icon
											icon={'menu-down'}
											onPress={() => setIsProtocolVis(true)}
										/>
									}
								/>
							</Pressable>
						}
					>
						<Menu.Item
							title="HTTP"
							onPress={() => {
								onTempProtocolChange('http');
								setIsProtocolVis(false);
							}}
						/>
						<Menu.Item
							title="HTTPS"
							onPress={() => {
								onTempProtocolChange('https');
								setIsProtocolVis(false);
							}}
						/>
					</Menu>
					<View style={{ flexDirection: 'row', gap: 8 }}>
						<TextInput
							label={'* IP / Domain'}
							placeholder="0.0.0.0"
							value={tempConfig.ip}
							onChangeText={(txt) => onTempConfigUpdate('ip', txt)}
							mode="outlined"
							right={
								tempConfig?.ip.length > 0 && (
									<TextInput.Icon
										icon={'close'}
										onPress={() => onTempConfigUpdate('ip', '')}
									/>
								)
							}
							autoCapitalize="none"
							style={{ flexGrow: 1 }}
						/>
						<TextInput
							label={'Port'}
							placeholder="0000"
							value={tempConfig.port}
							keyboardType="number-pad"
							onChangeText={(txt) => onTempConfigUpdate('port', txt)}
							mode="outlined"
							autoCapitalize="none"
							right={
								tempConfig.port?.length > 0 && (
									<TextInput.Icon
										icon={'close'}
										onPress={() => onTempConfigUpdate('port', '')}
									/>
								)
							}
						/>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
						<Button
							onPress={() =>
								setTempConfig({
									...serverUrlData,
									username: suwayomi?.username ?? '',
									password: suwayomi?.password ?? '',
								})
							}
							icon={'restart'}
						>
							Reset
						</Button>
						<Button onPress={onURLPaste} icon={'content-paste'}>
							Paste URL
						</Button>
					</View>
				</View>
				<List.Subheader>Basic Auth (optional)</List.Subheader>
				<View style={{ gap: 12 }}>
					<TextInput
						label={'Username'}
						value={tempConfig.username}
						onChangeText={(txt) => onTempAuthChange('username', txt)}
						mode="outlined"
						autoCapitalize="none"
						right={
							tempConfig?.username?.length > 0 && (
								<TextInput.Icon
									icon={'close'}
									onPress={() => onTempAuthChange('username', '')}
								/>
							)
						}
					/>
					<TextInput
						label={'Password'}
						value={tempConfig.password}
						onChangeText={(txt) => onTempAuthChange('password', txt)}
						secureTextEntry
						mode="outlined"
						autoCapitalize="none"
						right={
							tempConfig?.password?.length > 0 && (
								<TextInput.Icon
									icon={'close'}
									onPress={() => onTempAuthChange('password', '')}
								/>
							)
						}
					/>
				</View>
			</AccordionMemo>
			<View style={{ paddingVertical: 12 }}>
				<View style={{ alignItems: 'center', flexDirection: 'row' }}>
					<Button
						mode="elevated"
						loading={isTesting && !isTestConfigDisabled}
						onPress={onTestConfig}
						style={{ flexGrow: 1 }}
						disabled={isTestConfigDisabled}
					>
						Test Config
					</Button>
					<IconButton
						icon={'refresh'}
						disabled={!isTestConfigDisabled}
						onPress={onTestConfig}
						loading={isTesting}
					/>
				</View>
				{aboutServerData && isTestConfigDisabled && (
					<>
						<List.Item
							title={'Sources'}
							description={`Select sources for search`}
							right={(props) => <List.Icon {...props} icon={'cog-outline'} />}
							onPress={() => router.navigate('/(dialogs)/(suwayomi)/sources')}
						/>
						<List.Item
							title={'Open WebUI'}
							description={createWebUIUrl(tempConfig)}
							right={(props) => <List.Icon {...props} icon={'launch'} />}
							onPress={() => openWebBrowser(createWebUIUrl(tempConfig))}
						/>
						<List.Item
							title={'Server Name'}
							description={`${aboutServerData.name} ${aboutServerData.buildType}`}
						/>
						<List.Item
							title={'Version'}
							description={`${aboutServerData.version}-${aboutServerData.revision}`}
						/>
						<List.Item
							title={'Build time'}
							description={new Date(
								Number(aboutServerData.buildTime) * 1000,
							)?.toLocaleDateString()}
						/>
					</>
				)}
			</View>
		</ScrollView>
	);
};

export default SuwayomiConfigDialog;
