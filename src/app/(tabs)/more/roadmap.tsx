import { GorakuActivityIndicator } from '@/components/loading';
import { useAppTheme } from '@/store/theme/themes';
import { openWebBrowser } from '@/utils/webBrowser';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { View } from 'react-native';
import Markdown, { MarkdownIt } from 'react-native-markdown-display';

const RoadmapPage = () => {
	const { colors } = useAppTheme();
	const { data, isFetching } = useQuery({
		queryKey: ['roadmap'],
		queryFn: async () => {
			const result = await axios.get<string>(
				'https://raw.githubusercontent.com/KuzuLabz/GorakuSite/refs/heads/main/roadmap/index.md',
			);
			return result;
		},
	});

	const markdownit: MarkdownIt = new MarkdownIt({ typographer: true, html: false });

	return (
		<View style={{ flex: 1 }}>
			{isFetching && (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<GorakuActivityIndicator />
				</View>
			)}
			{/* {data?.data && !isFetching ? <MarkdownViewer markdown={data.data} /> : null} */}
			{data?.data && !isFetching ? (
				<View style={{ paddingHorizontal: 12 }}>
					<Markdown
						onLinkPress={(url) => {
							openWebBrowser(url);
							return false;
						}}
						markdownit={markdownit}
						style={{
							body: {
								backgroundColor: 'transparent',
								color: colors.onBackground,
							},
							link: {
								color: colors.primary,
							},
							heading2: {
								paddingVertical: 12,
								fontWeight: 'bold',
							},
							heading1: {
								display: 'none',
							},
						}}
					>
						{data?.data}
					</Markdown>
				</View>
			) : null}
		</View>
	);
};

export default RoadmapPage;
