import { ScoreColors, StatusColors } from '@/constants/colors';
import { AniMediaQuery, MediaListStatus } from '@/store/services/anilist/generated-anilist';
import { LinearGradient } from 'expo-linear-gradient';
import { View, useWindowDimensions } from 'react-native';
import { Button, Chip, MD3DarkTheme, Text } from 'react-native-paper';

type StatusItemProps = {
    status: AniMediaQuery['Media']['stats']['statusDistribution'][0];
};
export const StatusItem = ({ status }: StatusItemProps) => {
    return (
        <View style={{ margin: 10, alignItems: 'center' }}>
            <Chip
                mode="flat"
                elevated
                textStyle={{ color: MD3DarkTheme.colors.onBackground }}
                style={{ backgroundColor: StatusColors[status.status], padding: 2 }}
            >
                {status.status}
            </Chip>
            <Text>
                <Text style={{ color: StatusColors[status.status] }}>
                    {status?.amount.toLocaleString()}
                </Text>{' '}
                Users
            </Text>
        </View>
    );
};

type ScoreItemProps = {
    score: AniMediaQuery['Media']['stats']['scoreDistribution'][0];
    highestScore: number;
};
export const ScoreItem = ({ score, highestScore }: ScoreItemProps) => {
    return (
        <View style={{ margin: 10, alignItems: 'center' }}>
            <Chip
                mode="flat"
                elevated
                textStyle={{ color: MD3DarkTheme.colors.onBackground }}
                style={{ backgroundColor: ScoreColors[score.score], padding: 2 }}
            >
                {score.score} %
            </Chip>
            <Text>
                <Text style={{ color: ScoreColors[score.score] }}>
                    {score.score === highestScore
                        ? '🔥' + score?.amount.toLocaleString()
                        : score?.amount.toLocaleString()}
                </Text>{' '}
                Users
            </Text>
        </View>
    );
};

type StatusBarProps = {
    data:
        | AniMediaQuery['Media']['stats']['statusDistribution']
        | AniMediaQuery['Media']['stats']['scoreDistribution'];
};
export const StatBar = ({ data }: StatusBarProps) => {
    const { width } = useWindowDimensions();
    const bar_width = width - 20; // 20 = padding
    const total_users = data?.reduce((acc, curr) => acc + curr.amount, 0);
    const colors: string[] = data?.map((stat) => {
        if (stat?.status) return StatusColors[stat?.status];
        else return ScoreColors[stat?.score];
    });
    // const locations = data?.map((stat) => {
    //     return (stat.amount / total_users) * 100;
    // });
    const locations = data?.reduce((acc, stat, index) => {
        const percentage = stat.amount / total_users;
        const previousValue = index > 0 ? acc[index - 1] : 0;
        acc.push(percentage + previousValue);
        return acc;
    }, []);
    const sortedLocations = locations?.sort((a, b) => a - b);

    return (
        <View style={{ width: bar_width, alignSelf: 'center' }}>
            {/* {data?.map((stat, idx) => (
                <View
                    key={idx}
                    style={{
                        backgroundColor: stat?.status
                            ? StatusColors[stat?.status]
                            : ScoreColors[stat?.score],
                        height: 10,
                        width: `${(stat.amount / total_users) * 100}%`,
                        borderTopLeftRadius: idx === 0 ? 12 : 0,
                        borderBottomLeftRadius: idx === 0 ? 12 : 0,
                        borderTopRightRadius: idx === data.length - 1 ? 12 : 0,
                        borderBottomRightRadius: idx === data.length - 1 ? 12 : 0,
                    }}
                />
            ))} */}
            <Button onPress={() => console.log(sortedLocations)}>TEST</Button>
            <LinearGradient
                colors={colors}
                locations={sortedLocations}
                start={[0, 1]}
                end={[1, 0]}
                style={{ height: 10, borderRadius: 12, width: '100%' }}
            />
        </View>
    );
};
