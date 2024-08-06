import { useToggleFavMutation } from '@/api/anilist/__genereated__/gql';

export const useListEntry = () => {
	const [toggleFav, favResults] = useToggleFavMutation();
	const [saveListItem, savedMediaResults] = useSaveMediaListItemMutation();
	const [deleteListItem, deletedListItemResults] = useDeleteMediaListItemMutation();

	return {
		toggleFav,
		saveListItem,
		deleteListItem,
		favLoading: favResults.isLoading,
		savedMediaLoading: savedMediaResults.isLoading,
		deletedListItemLoading: deletedListItemResults.isLoading,
	};
};
