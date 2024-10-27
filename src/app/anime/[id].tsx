import { MediaType } from '@/api/anilist/__genereated__/gql';
import MediaScreen from '@/components/media/mediaScreen';
import { useLocalSearchParams } from 'expo-router';

const AnimeScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>(); // /anime/1234
	const aniId: number | null = id ? parseInt(id) : null;

	return <MediaScreen aniId={aniId} type={MediaType.Anime} />;
};

export default AnimeScreen;
