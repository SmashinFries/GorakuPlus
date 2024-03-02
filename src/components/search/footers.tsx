import { LoadMoreButton } from '../buttons';

type SearchFooterProps = {
    hasMore: boolean;
    isUnitialized: boolean;
    nextPage: () => void;
};
export const SearchFooter = ({ hasMore, isUnitialized, nextPage }: SearchFooterProps) => {
	if (hasMore) {
		return <LoadMoreButton title={'Load More'} vertical onPress={nextPage} />;
	} else if (isUnitialized) {
		return <></>;
	}
	// } else {
	//     return (
	//         <View style={{ alignItems: 'center', marginTop: 20 }}>
	//             <Text>＞︿＜ No more weeb results! ＞︿＜</Text>
	//             <Button onPress={() => nextPage()}>Try again</Button>
	//         </View>
	//     );
	// }
};
