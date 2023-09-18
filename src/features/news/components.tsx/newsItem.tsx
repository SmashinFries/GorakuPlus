import { Pressable } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { GetAnimeNewsApiResponse, GetMangaNewsApiResponse } from '../../../app/services/mal/malApi';
import { openWebBrowser } from '../../../utils/webBrowser';

type NewsItemProps = {
    news: GetAnimeNewsApiResponse['data'][0] | GetMangaNewsApiResponse['data'][0];
};
export const NewsItem = ({ news }: NewsItemProps) => {
    const { colors } = useTheme();
    return (
        <Card mode="contained" style={{ margin: 10 }}>
            <Card.Cover source={{ uri: news.images?.jpg.image_url }} />
            <Card.Title
                title={news.title}
                titleVariant="titleMedium"
                titleNumberOfLines={3}
                subtitle={`By ${news.author_username} · ${new Date(
                    news.date,
                ).toLocaleDateString()}`}
            />
            <Card.Content style={{ marginTop: 10 }}>
                {/* <Text variant="titleMedium">{news.title}</Text> */}
                <Text variant="bodyMedium">{news.excerpt}</Text>
            </Card.Content>
            <Card.Actions>
                <Button onPress={() => openWebBrowser(news?.forum_url)}>Forum</Button>
                <Button onPress={() => openWebBrowser(news?.url)}>Article</Button>
            </Card.Actions>
        </Card>
    );
};
