import { ThreadsOverviewQuery_Page_Page_threads_Thread } from '@/api/anilist/__genereated__/gql';
import { GlobalBottomSheetParent } from '@/components/sheets/bottomsheets';
import { router, useLocalSearchParams } from 'expo-router';
import { Avatar, List } from 'react-native-paper';

export type ThreadOverviewSheetProps = {
	data: ThreadsOverviewQuery_Page_Page_threads_Thread;
};
const ThreadOverviewSheet = () => {
	const { params } = useLocalSearchParams<{ params: string }>();
	const data = JSON.parse(params) as ThreadOverviewSheetProps['data'];
	// const sheet = useRef<TrueSheet>(null);
	const onUserNav = () => {
		router.back();
		router.navigate(`/user/${data?.user?.name}`);
	};

	return (
		<GlobalBottomSheetParent name="ThreadOverviewSheet" enabledHaptic sizes={['auto']}>
			<List.Item
				title={'View Thread'}
				left={(props) => <List.Icon {...props} icon={'forum-outline'} />}
			/>
			<List.Item
				title={'View Creator'}
				onPress={onUserNav}
				left={(props) => (
					<Avatar.Image
						source={{ uri: data?.user?.avatar?.large ?? undefined }}
						size={24}
						style={[props.style]}
					/>
				)}
			/>
		</GlobalBottomSheetParent>
	);
};

export default ThreadOverviewSheet;
