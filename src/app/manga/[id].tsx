import { MediaType } from '@/api/anilist/__genereated__/gql';
import MediaScreen from '@/components/media/mediaScreen';
import { useLocalSearchParams } from 'expo-router';

const MangaScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>(); // /anime/1234

	return id && <MediaScreen aniId={Number(id)} type={MediaType.Manga} />;
};

export default MangaScreen;
