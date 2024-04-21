import { FlashList } from '@shopify/flash-list';
import { Animetheme, MainMusic } from '@/store/services/animethemes/types';
import { View, useWindowDimensions } from 'react-native';
import { MusicItem } from './video';
import { useRef, useState } from 'react';
import { ScrollToTopButton } from '../buttons';

type MusicVideoListProps = {
	music: MainMusic;
};
export const MusicVideoList = ({ music }: MusicVideoListProps) => {
	const { width, height } = useWindowDimensions();
	const [scrollOffset, setScrollOffset] = useState<number>(0);
	const listRef = useRef<FlashList<Animetheme>>(null);

	if (music?.anime?.length < 1) return null;
	return (
		<View style={{ flex: 1, width: width }}>
			<FlashList
				ref={listRef}
				data={music?.anime[0]?.animethemes}
				renderItem={(props) => (
					<MusicItem
						theme={props.item}
						anime_slug={music?.anime[0]?.slug}
						initialOpen={props.index === 0}
					/>
				)}
				keyExtractor={(item, idx) => idx.toString()}
				estimatedItemSize={66}
				numColumns={1}
				contentContainerStyle={{ paddingVertical: 15 }}
				onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
			/>
			{scrollOffset > 500 && music?.anime[0]?.animethemes?.length > 9 && (
				<ScrollToTopButton listRef={listRef} />
			)}
		</View>
	);
};
