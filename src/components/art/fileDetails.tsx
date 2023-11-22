import { View } from 'react-native';
import { filesize } from 'filesize';
import { IconButton, List, Text } from 'react-native-paper';
import { DanRatings } from '@/store/services/danbooru/types';
import { getAR, getAspectRatio } from '../../utils';

const ratings = {
    g: { title: 'General', icon: 'account-group' },
    s: { title: 'Sensitive', icon: 'account-multiple' },
    q: { title: 'Questionable', icon: 'account' },
    e: { title: 'Explicit', icon: 'account' },
};

type FileDetailsProps = {
    size: number;
    height: number;
    width: number;
    format: string;
    rating: DanRatings | string;
};
export const FileDetails = ({ size, format, height, width, rating }: FileDetailsProps) => {
    return (
        <View>
            <List.Item
                title={'Rating'}
                left={(props) => (
                    <List.Icon {...props} icon={rating ? ratings[rating]?.icon : 'account'} />
                )}
                right={(props) => <Text {...props}>{rating ? ratings[rating]?.title : 'g'}</Text>}
            />
            <List.Item
                title={'Size'}
                left={(props) => <List.Icon {...props} icon={'database-outline'} />}
                right={(props) => (
                    <Text {...props}>
                        {/* {(size / 1024).toFixed(0)} {size / 1024 >= 1000 ? 'MB' : 'KB'} */}
                        {filesize(size)}
                    </Text>
                )}
            />
            <List.Item
                title={'Aspect Ratio'}
                description={'Estimated'}
                left={(props) => <List.Icon {...props} icon={'aspect-ratio'} />}
                right={(props) => <Text {...props}>~{getAR(width / height).join(':')}</Text>}
            />
            <List.Item
                title={'Resolution'}
                left={(props) => <List.Icon {...props} icon={'image-area'} />}
                right={(props) => <Text {...props}>{`(${width} x ${height})`}</Text>}
            />
            <List.Item
                title={'Format'}
                left={(props) => (
                    <List.Icon
                        {...props}
                        icon={['jpg', 'jpeg'].includes(format) ? 'file-jpg-box' : 'file-png-box'}
                    />
                )}
                right={(props) => <Text {...props}>{format}</Text>}
            />
        </View>
    );
};
