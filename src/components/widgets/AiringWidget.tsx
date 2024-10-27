import { AiringTodayQuery } from '@/api/anilist/__genereated__/gql';
import React from 'react';
import {
	FlexWidget,
	ImageWidget,
	ImageWidgetSource,
	ListWidget,
} from 'react-native-android-widget';

export const AiringWidget = ({ data }: { data: AiringTodayQuery['Page']['airingSchedules'] }) => {
	return (
		<ListWidget
			style={{
				height: 'match_parent',
				width: 'match_parent',
				backgroundColor: '#1F3529',
			}}
		>
			<FlexWidget
				style={{
					width: 'match_parent',
					alignItems: 'center',
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					padding: 8,
				}}
				clickAction="OPEN_URI"
				clickActionData={{
					uri: `androidwidgetexample://list/list-demo/`,
				}}
			>
				{data?.map(
					(item, i) =>
						item.media?.coverImage?.extraLarge && (
							<ImageWidget
								key={i}
								image={item.media.coverImage.extraLarge as ImageWidgetSource}
								imageWidth={48}
								imageHeight={200 / 2.5}
								radius={6}
							/>
						),
				)}
			</FlexWidget>
		</ListWidget>
	);
};
