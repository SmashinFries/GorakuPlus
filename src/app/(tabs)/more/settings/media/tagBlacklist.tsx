import { TagBLSetup } from '@/app/setup';
import { BanTagHeader } from '@/components/headers';
import { useAppTheme } from '@/store/theme/themes';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, router } from 'expo-router';

const TagBlackListPage = () => {
	const { colors } = useAppTheme();
	const queryClient = useQueryClient();

	const onSave = () => {
		queryClient.invalidateQueries();
		router.back();
	};

	return (
		<>
			<Stack.Screen
				options={{
					headerShown: true,
					header: (props) => (
						<BanTagHeader {...props} iconColor={colors.primary} onSave={onSave} />
					),
				}}
			/>
			<TagBLSetup />
		</>
	);
};

export default TagBlackListPage;
