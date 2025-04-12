import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Appbar, Button, IconButton } from 'react-native-paper';

export const DialogHeader = ({
	navigation,
	options,
	route,
	actions,
	leftIcon,
}: NativeStackHeaderProps & {
	actions?: { label: string; onPress: () => void; loading?: boolean }[];
	leftIcon?: string;
}) => {
	const title = getHeaderTitle(options, route.name);
	return (
		<Appbar.Header mode={'small'} elevated={false}>
			<IconButton icon={leftIcon ?? 'close'} onPress={() => navigation.goBack()} />
			{/* <Appbar.BackAction ic onPress={navigation.goBack} /> */}
			<Appbar.Content
				title={title}
				// titleStyle={{ textTransform: 'capitalize' }}
				// mode={mode}
			/>
			{actions?.map((action, idx) => (
				<Button key={idx} {...action}>
					{action.label}
				</Button>
			))}
		</Appbar.Header>
	);
};
