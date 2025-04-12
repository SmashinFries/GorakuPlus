import { useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Appbar, Menu, MenuItemProps, MenuProps } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { HeaderStyles } from '../styles';

export const HeaderMenu = ({
	anchorPosition = 'bottom',
	// children,
	anchorIcon = 'dots-vertical',
	headerActionStyle,
	items,
}: {
	// children: MenuProps['children'];
	items: (MenuItemProps | null | undefined)[];
	anchorIcon?: string;
	anchorPosition?: MenuProps['anchorPosition'];
	headerActionStyle?: StyleProp<ViewStyle>;
}) => {
	const [vis, setVis] = useState(false);
	const onOpen = () => setVis(true);
	const onDismiss = () => setVis(false);
	return (
		<Menu
			visible={vis}
			onDismiss={onDismiss}
			anchor={
				<Animated.View style={[HeaderStyles.icon, headerActionStyle]}>
					<Appbar.Action icon={anchorIcon} onPress={onOpen} />
				</Animated.View>
			}
			anchorPosition={anchorPosition}
		>
			{items
				?.filter((item) => item !== undefined && item !== null)
				?.map((item, idx) => (
					<Menu.Item
						key={idx}
						{...item}
						onPress={(e) => {
							item.onPress?.(e);
							onDismiss();
						}}
					/>
				))}
		</Menu>
	);
};

export type HeaderActionsProps = {
	actions: (
		| {
				icon: string;
				title: string;
				menuItems?: (MenuItemProps | null | undefined)[];
				onPress?: () => void;
		  }
		| null
		| undefined
	)[];
	headerActionStyle?: StyleProp<ViewStyle>;
};
export const HeaderActions = ({ actions, headerActionStyle }: HeaderActionsProps) => {
	return (
		<>
			{actions
				.filter((action) => action !== undefined && action !== null)
				.map((action, idx) => {
					if (idx < 2) {
						return action.menuItems ? (
							<HeaderMenu
								key={idx}
								items={action.menuItems}
								headerActionStyle={headerActionStyle}
								anchorIcon={action.icon}
							/>
						) : (
							<Animated.View key={idx} style={[HeaderStyles.icon, headerActionStyle]}>
								<Appbar.Action
									icon={action.icon}
									onPress={() => action.onPress?.()}
								/>
							</Animated.View>
						);
					}
				})}
			{actions.filter((action) => action !== undefined && action !== null).length > 3 && (
				<HeaderMenu
					headerActionStyle={headerActionStyle}
					items={actions
						.filter((action) => action !== undefined && action !== null)
						.map((action, idx) => {
							if (idx >= 2) {
								return {
									title: action.title,
									leadingIcon: action.icon,
									onPress: action.onPress,
								} as MenuItemProps;
							}
						})
						.filter((val) => val !== undefined)}
				/>
			)}
		</>
	);
};
