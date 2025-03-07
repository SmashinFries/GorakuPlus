import { AnilistIcon, MalIcon } from '@/components/svgs';
import { useAuthStore } from '@/store/authStore';
import { useAppTheme } from '@/store/theme/themes';
import { openWebBrowser } from '@/utils/webBrowser';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { View } from 'react-native';
import { Avatar, Divider, Icon, Drawer as PaperDrawer, Text } from 'react-native-paper';

export default function Layout() {
	const { colors, dark } = useAppTheme();
	const { avatar, username } = useAuthStore((state) => state.anilist);
	return (
		<Drawer
			screenOptions={{
				drawerStyle: { backgroundColor: colors.surface },
				drawerHideStatusBarOnOpen: false,
				drawerStatusBarAnimation: 'fade',
			}}
			drawerContent={(props) => (
				<DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
					<PaperDrawer.Section title="Weeb Lab">
						<PaperDrawer.Item
							label="AniTrendz"
							icon={(props) => (
								<Image
									style={{
										height: props.size,
										width: props.size,
										borderRadius: 4,
									}}
									source={require('../../../../../assets/anitrendz-icon.webp')}
								/>
							)}
							onPress={() => router.push('/weeblab/anitrendz')}
						/>
						<PaperDrawer.Item
							label="NekosAPI"
							icon={(props) => (
								<Image
									style={{
										height: props.size,
										width: props.size,
										borderRadius: 4,
									}}
									source={require('../../../../../assets/nekosapi.png')}
								/>
							)}
							onPress={() => router.push('/weeblab/nekosapi')}
						/>
						<PaperDrawer.Item
							label="Panelsdesu"
							icon={(props) => (
								<Avatar.Text
									style={{
										borderRadius: 4,
									}}
									label="P"
									size={props.size}
								/>
							)}
							onPress={() => router.push('/weeblab/panelsdesu')}
						/>
					</PaperDrawer.Section>
					<PaperDrawer.Section title="Emergency Room">
						<PaperDrawer.Item
							label="AniList Webview"
							icon={(props) => (
								<AnilistIcon width={props.size} height={props.size} isDark={dark} />
							)}
							onPress={() => openWebBrowser('https://anilist.co/search')}
						/>
						<PaperDrawer.Item
							label="MAL Webview"
							icon={(props) => <MalIcon width={props.size} height={props.size} />}
							onPress={() => openWebBrowser('https://myanimelist.net')}
						/>
					</PaperDrawer.Section>
					<PaperDrawer.Item
						label="AniList Stats"
						icon={'chart-line'}
						onPress={() => router.push('/statistics/sitestats')}
					/>
					<View style={{ flex: 1 }} />
					<PaperDrawer.Item
						label="KuzuMerch"
						icon={(props) => (
							<Image
								style={{
									height: props.size,
									width: props.size,
									borderRadius: 4,
								}}
								source={require('../../../../../assets/kuzumerch.png')}
							/>
						)}
						right={(props) => <Icon size={18} {...props} source={'launch'} />}
						onPress={() => openWebBrowser('https://www.kuzumerch.com', true)}
					/>
					<PaperDrawer.Item
						label="Goraku Website"
						icon={(props) => (
							<Image
								style={{
									height: props.size,
									width: props.size,
									borderRadius: 4,
								}}
								source={require('../../../../../assets/iconsv3/icon.png')}
							/>
						)}
						right={(props) => <Icon size={18} {...props} source={'launch'} />}
						onPress={() => openWebBrowser('https://goraku.kuzulabz.com/', true)}
					/>
				</DrawerContentScrollView>
			)}
		>
			<Drawer.Screen
				name="index" // This is the name of the page and must match the url from root
				options={{
					title: 'Explore',
					drawerItemStyle: { display: 'none' },
				}}
			/>
		</Drawer>
	);
}
