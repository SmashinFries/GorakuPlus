import { getHeaderTitle } from '@react-navigation/elements';
import { Appbar, AppbarProps } from 'react-native-paper';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { HeaderActions, HeaderActionsProps } from './components/actions';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
import { ScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import { Stack } from 'expo-router';
import { useHeaderAnim } from '../animations';
import { ReactNode } from 'react';

type PaperHeaderProps = NativeStackHeaderProps & {
	mode?: AppbarProps['mode'];
	dark?: boolean;
	elevated?: boolean;
	actions?: HeaderActionsProps['actions'];
	showBack?: boolean;
};

export const PaperHeader = ({
	navigation,
	options,
	route,
	back,
	mode,
	dark,
	elevated,
	actions,
}: PaperHeaderProps) => {
	const title = getHeaderTitle(options, route.name);
	return (
		<Appbar.Header mode={mode} dark={dark} elevated={elevated}>
			{back && <Appbar.BackAction onPress={navigation.goBack} />}
			<Appbar.Content
				title={title}
				titleStyle={{ textTransform: 'capitalize' }}
				// mode={mode}
			/>
			{actions && <HeaderActions actions={actions} />}
			{/* {actions?.map((action, idx) => <Appbar.Action key={idx} {...action} />)} */}
		</Appbar.Header>
	);
};

export const AnimPaperHeader = ({
	navigation,
	options,
	route,
	showBack = true,
	actions,
	headerStyle,
	headerActionStyle,
	headerTitleStyle,
}: PaperHeaderProps & {
	headerStyle: StyleProp<ViewStyle>;
	headerActionStyle: StyleProp<ViewStyle>;
	headerTitleStyle: StyleProp<ViewStyle>;
}) => {
	const title = getHeaderTitle(options, route.name);
	return (
		<Animated.View style={[headerStyle]}>
			<Appbar.Header style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
				{showBack && (
					<Animated.View
						style={[
							{
								borderRadius: 100,
								height: 42,
								width: 42,
								marginLeft: 5,
								justifyContent: 'center',
								alignItems: 'center',
							},
							headerActionStyle,
						]}
					>
						<Appbar.BackAction onPress={navigation.goBack} />
					</Animated.View>
				)}
				<Animated.View
					style={[
						headerTitleStyle,
						{
							flex: 1,
							height: '50%',
							justifyContent: 'center',
							paddingLeft: 6,
						},
					]}
				>
					<Appbar.Content
						title={title ?? ''}
						titleStyle={{ textTransform: 'capitalize' }}
					/>
				</Animated.View>
				{/* {actions?.map((action, idx) => <Appbar.Action key={idx} {...action} />)} */}
				{actions && (
					<HeaderActions actions={actions} headerActionStyle={headerActionStyle} />
				)}
			</Appbar.Header>
		</Animated.View>
	);
};

type FadeHeaderProps = NativeStackHeaderProps & {
	headerStyle: StyleProp<ViewStyle>;
	headerActionStyle: StyleProp<ViewStyle>;
	headerTitleStyle: StyleProp<ViewStyle>;
};
type FadeHeader = ((props: FadeHeaderProps) => ReactNode) | undefined;

export const FadeHeaderScrollView = ({
	children,
	animationRange = [40, 110],
	refreshControl,
	isLoading,
	Header = (props) => <AnimPaperHeader {...props} />,
	BgImage,
	title,
}: {
	children: React.ReactNode;
	BgImage?: ({
		style,
	}: {
		style?: AnimatedStyle<StyleProp<ViewStyle>>;
	}) => React.JSX.Element | undefined;
	Header?: FadeHeader;
	animationRange?: [number, number];
	refreshControl?: ScrollViewProps['refreshControl'];
	isLoading?: boolean;
	title?: string;
}) => {
	const { headerStyle, headerTitleStyle, headerActionStyle, bgImageStyle, scrollHandler } =
		useHeaderAnim(animationRange[0], animationRange[1]);

	return (
		<>
			{BgImage && <BgImage style={bgImageStyle} />}
			<Animated.ScrollView
				refreshControl={refreshControl ?? undefined}
				showsVerticalScrollIndicator={false}
				scrollEventThrottle={16}
				onScroll={scrollHandler}
			>
				<Stack.Screen
					options={{
						headerTransparent: true,
						headerShown: !isLoading,
						title: title,
						header: (props) => (
							<Header
								{...props}
								headerStyle={headerStyle}
								headerTitleStyle={headerTitleStyle}
								headerActionStyle={headerActionStyle}
							/>
						),
					}}
				/>
				{children}
			</Animated.ScrollView>
		</>
	);
};
