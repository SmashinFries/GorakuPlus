import {
    ActivityIndicator,
    Avatar,
    Button,
    Dialog,
    IconButton,
    Portal,
    Text,
} from 'react-native-paper';
import {
    AniMediaQuery,
    MediaTag,
    useExtUserDataQuery,
    useLazyUserDataQuery,
    useLazyUserOverviewQuery,
} from '../../../app/services/anilist/generated-anilist';
import { View } from 'react-native';
import { ReactNode, useEffect } from 'react';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';
import { Image } from 'expo-image';

type TagDialogProps = {
    visible: boolean;
    onDismiss: () => void;
    tag: MediaTag;
};
export const TagDialog = ({ visible, onDismiss, tag }: TagDialogProps) => {
    const userData = useExtUserDataQuery({ id: tag.userId }, { skip: !tag?.userId });
    const Section = ({
        icon,
        children,
        isUser = false,
    }: {
        icon: IconSource;
        children: ReactNode;
        isUser?: boolean;
    }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                {isUser ? (
                    // <Avatar.Image source={{ uri: userData?.data?.User?.avatar?.large }} size={24} />
                    <IconButton
                        icon={() => (
                            <Avatar.Image
                                source={{ uri: userData?.data?.User?.avatar?.large }}
                                size={24}
                            />
                        )}
                    />
                ) : (
                    <IconButton icon={icon} />
                )}
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text>{children}</Text>
                </View>
            </View>
        );
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss}>
                <Dialog.Title>{tag?.name}</Dialog.Title>
                <Dialog.Content>
                    {tag.isMediaSpoiler || tag.isGeneralSpoiler ? (
                        <Section icon="information-outline">Spoiler</Section>
                    ) : null}
                    <Section icon="card-text-outline">{tag?.description}</Section>
                    <Section icon="format-list-numbered">{tag?.rank}%</Section>
                    <Section icon="folder-outline">{tag?.category}</Section>
                    <Section icon="account-outline" isUser>
                        {userData?.isLoading ? '' : userData?.data?.User?.name}
                    </Section>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onDismiss}>Cool</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

type EpisodeDialogProps = {
    visible: boolean;
    onDismiss: () => void;
    episodes: AniMediaQuery['Media']['streamingEpisodes'];
};
export const EpisodeDialog = ({ episodes, visible, onDismiss }: EpisodeDialogProps) => {
    // const reversedEpisodes = episodes.reverse();
    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Episodes</Dialog.Title>
            <Dialog.Content>
                <Dialog.ScrollArea>
                    {episodes.map((episode, idx) => (
                        <Text key={idx}>{episode.title}</Text>
                    ))}
                </Dialog.ScrollArea>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onDismiss}>Done</Button>
            </Dialog.Actions>
        </Dialog>
    );
};
