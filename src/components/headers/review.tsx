import { openWebBrowser } from '@/utils/webBrowser';
import { Appbar } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

type ReviewHeaderProps = NativeStackHeaderProps & {
	onRenderSwitch?: () => void;
	shareLink?: string;
	render_switch_icon?: string;
};
export const ReviewHeader = ({
	navigation,
	options,
	route,
	back,
	shareLink,
	render_switch_icon,
	onRenderSwitch,
}: ReviewHeaderProps) => {
	const title = getHeaderTitle(options, route.name);
	return (
		<Appbar.Header>
			{back && <Appbar.BackAction onPress={navigation.goBack} />}
			<Appbar.Content title={title} />
			<Appbar.Action icon={render_switch_icon as IconSource} onPress={onRenderSwitch} />
			<Appbar.Action
				icon={'earth'}
				onPress={() => {
					openWebBrowser(shareLink);
				}}
				// onPress={() =>
				//     Share.share({
				//         url: shareLink,
				//         title: shareLink,
				//         message: shareLink,
				//     })
				// }
			/>
		</Appbar.Header>
	);
};
