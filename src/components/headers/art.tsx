import { useState } from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import { PostImage } from '../art/image';
import { FadeHeaderScrollView } from '.';

export const ArtHeaderProvider = ({
	aspectRatio,
	title,
	imageUrl,
	titleHeight = 0,
	children,
}: {
	title?: string;
	imageUrl?: string;
	aspectRatio: number;
	titleHeight?: number;
	children: React.JSX.Element;
}) => {
	const { width } = useWindowDimensions();
	const [imageHeight, setImageHeight] = useState<number>(0);
	return (
		<FadeHeaderScrollView
			animationRange={[width / aspectRatio, width / aspectRatio + titleHeight]}
			title={title ?? ''}
			BgImage={({ style }) => (
				<PostImage
					aspectRatio={aspectRatio}
					style={style}
					img_url={imageUrl}
					blurAmount={0}
					setImageHeight={(ht) => setImageHeight(ht)}
				/>
			)}
		>
			<Pressable
				// onPress={toggleBlur}
				style={{
					// height: aspectRatio ? width / aspectRatio : 0,
					height: imageHeight + 20,
					width: width,
				}}
			/>
			{children}
		</FadeHeaderScrollView>
	);
};
