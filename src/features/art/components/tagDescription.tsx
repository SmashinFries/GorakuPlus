import { Dialog, Button, Text, useTheme, ActivityIndicator } from 'react-native-paper';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { useGetTagWikiQuery } from '../../../app/services/danbooru/danbooruApi';
import RenderHTML from 'react-native-render-html';

type DanTagDescDialogProps = {
    tag: string;
    onDimiss: () => void;
};
export const DanTagDescDialog = ({ tag, onDimiss }: DanTagDescDialogProps) => {
    const { width } = useWindowDimensions();
    const { data, isLoading, isFetching } = useGetTagWikiQuery(tag, { skip: !tag });

    const processBody = (body: string) => {
        const newBody = body
            .replaceAll('[i]', '')
            .replaceAll('[/i]', '')
            .replaceAll('[b]', '')
            .replaceAll('[/b]', '')
            .split('h4.')[0];
        const doubleBracket = newBody.match(/\[\[.*?\]\]/g);
        if (doubleBracket) {
            const splitBody = newBody.split(/[[\]]{1,2}/g);
            for (let i = 0; i < splitBody.length; i++) {
                if (splitBody[i].includes('|')) {
                    const splitBracket = splitBody[i].split('|');
                    splitBody[i] = splitBracket.at(-1);
                }
            }
            const removedBrackets = splitBody.join('');
            return removedBrackets;
        } else {
            return newBody;
        }
    };

    if (!tag) {
        return null;
    }

    return (
        <Dialog visible={tag ? true : false} style={{ maxHeight: '90%' }} onDismiss={onDimiss}>
            <Dialog.Title style={{ textTransform: 'capitalize' }}>
                {tag?.replaceAll('_', ' ')}
            </Dialog.Title>
            <Dialog.ScrollArea>
                {isLoading || isFetching ? (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={'large'} />
                    </View>
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: 10 }}
                    >
                        <Text selectable>
                            {processBody(data?.body)}
                            {'\n'}
                        </Text>
                        {data?.other_names ? (
                            <Text selectable>{processBody(data?.other_names?.join('、'))}</Text>
                        ) : null}
                    </ScrollView>
                )}
            </Dialog.ScrollArea>
            <Dialog.Actions>
                <Button onPress={onDimiss}>Cool</Button>
            </Dialog.Actions>
        </Dialog>
    );
};
