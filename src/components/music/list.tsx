import { View, useWindowDimensions } from 'react-native';
import { MusicItem } from './video';
import { useRef } from 'react';
import { MainMusic } from '@/api/animethemes/types';
import { FlashListAnim } from '../list';
import { FlashList } from '@shopify/flash-list';

type MusicVideoListProps = {
	music: MainMusic;
};
export const MusicVideoList = ({ music }: MusicVideoListProps) => {
	const { width } = useWindowDimensions();
	// const [scrollOffset, setScrollOffset] = useState<number>(0);
	const listRef = useRef<FlashList<any>>(null);

	if (music?.anime?.length < 1) return null;
	return (
		<View style={{ flex: 1, width: width }}>
			<FlashListAnim
				listRef={listRef}
				data={music?.anime[0]?.animethemes}
				renderItem={(props) => (
					<MusicItem
						theme={props.item}
						anime_slug={music?.anime[0]?.slug}
						initialOpen={props.index === 0}
					/>
				)}
				keyExtractor={(item, idx) => idx.toString()}
				estimatedItemSize={70}
				numColumns={1}
				contentContainerStyle={{ paddingVertical: 15 }}
				// onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
			/>
			{/* {scrollOffset > 500 && music?.anime[0]?.animethemes?.length > 9 && (
				<ScrollToTopButton listRef={listRef} />
			)} */}
		</View>
	);
};
