import { useFavoritesFilterStore } from '@/store/favoritesStore';
import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const FavoritesHeader = ({
	navigation,
	options,
	route,
	isMediaRoute,
	onFilterOpen,
}: NativeStackHeaderProps & { isMediaRoute: boolean; onFilterOpen: () => void }) => {
	const { query, updateFilter } = useFavoritesFilterStore();
	const [isOpen, setIsOpen] = useState(false);
	const title = getHeaderTitle(options, route.name);

	useEffect(() => {
		const backAction = () => {
			if (isOpen) {
				setIsOpen(false);
			} else {
				navigation.goBack();
			}
			return true;
		};

		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

		return () => backHandler.remove();
	}, [isOpen]);

	const { right, left } = useSafeAreaInsets();

	return (
		<Appbar.Header>
			<Appbar.BackAction onPress={isOpen ? () => setIsOpen(false) : navigation.goBack} />
			{isOpen ? (
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: Math.max(left, right),
						flexShrink: 1,
					}}
				>
					{/* <Appbar.BackAction onPress={() => setIsOpen(false)} /> */}
					<TextInput
						autoFocus
						value={query}
						onChangeText={(txt) => {
							updateFilter({ query: txt });
						}}
						style={{ width: '100%', backgroundColor: 'transparent' }}
						placeholder={'Search favorites...'}
						underlineColor="transparent"
						underlineColorAndroid={'transparent'}
						activeUnderlineColor="transparent"
						// mode="flat"
					/>
				</View>
			) : (
				<Appbar.Content title={title} />
			)}
			{!isOpen && <Appbar.Action icon="magnify" onPress={() => setIsOpen(true)} />}
			<Appbar.Action
				icon={'view-module'}
				onPress={() =>
					router.push({
						pathname: '/(sheets)/displayConfig',
						params: { type: 'list' },
					})
				}
			/>
			{isMediaRoute && <Appbar.Action icon="filter-variant" onPress={onFilterOpen} />}
		</Appbar.Header>
	);
};
