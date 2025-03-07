import { MediaSeason } from '@/api/anilist/__genereated__/gql';
import { Calendar, CalendarProps, useCalendar } from '@marceloterreiro/flash-calendar';
import { memo, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

const AiringActivity = ({
	amount,
	activityColors,
}: {
	amount: number;
	activityColors: string[];
}) => {
	const Dot = ({ color }: { color: string }) => (
		<View
			style={{
				height: 6,
				width: 6,
				borderRadius: 3,
				backgroundColor: color,
			}}
		/>
	);

	return (
		<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
			{Array.from({ length: amount > 3 ? 3 : amount }).map((_, idx) => (
				<Dot key={idx} color={activityColors[idx]} />
			))}
		</View>
	);
};

export const GorakuCalendar = memo(
	(
		props: CalendarProps & {
			animeDates?: string[];
			onPreviousMonthPress: () => void;
			onNextMonthPress: () => void;
			activityColors: string[];
			openDateSelect: () => void;
			season: { current_season: MediaSeason; year: number; same_year: any };
		},
	) => {
		const { calendarRowMonth, weeksList, weekDaysList } = useCalendar(props);

		const getSeasonDateAmount = useCallback(
			(id: string) => {
				return props.animeDates?.filter((date) => date === id).length;
			},
			[props.animeDates],
		);

		return (
			<Calendar.VStack alignItems="center" spacing={props.calendarRowVerticalSpacing}>
				<Calendar.HStack
					alignItems="center"
					justifyContent="space-around"
					style={{ ...props.theme?.rowMonth?.container, gap: 8 }}
					width="100%"
				>
					<IconButton icon={'chevron-left'} onPress={props.onPreviousMonthPress} />
					<Pressable
						onPress={props.openDateSelect}
						style={{ alignItems: 'center', justifyContent: 'center' }}
					>
						<Text style={props.theme?.rowMonth?.content} variant="titleMedium">
							{calendarRowMonth}
						</Text>
						<Text variant="labelSmall">{props?.season?.current_season}</Text>
					</Pressable>

					<IconButton icon={'chevron-right'} onPress={props.onNextMonthPress} />
				</Calendar.HStack>
				<Calendar.Row.Week spacing={8} theme={props.theme?.rowWeek}>
					{weekDaysList.map((weekDay, i) => (
						<Calendar.Item.WeekName
							height={props.calendarWeekHeaderHeight as number}
							key={i}
							theme={props.theme?.itemWeekName}
						>
							{weekDay}
						</Calendar.Item.WeekName>
					))}
				</Calendar.Row.Week>
				{weeksList.map((week, i) => (
					<Calendar.Row.Week key={i}>
						{week.map((day) => (
							<Calendar.Item.Day.Container
								dayHeight={props.calendarDayHeight ?? 32}
								daySpacing={4}
								isStartOfWeek={day.isStartOfWeek}
								key={day.id}
							>
								<Calendar.Item.Day
									height={props.calendarDayHeight ?? 32}
									metadata={day}
									onPress={props.onCalendarDayPress}
									theme={props.theme?.itemDay}
								>
									<View>
										<Text
											style={{
												...props.theme?.itemDay?.['base']?.({
													...day,
													isPressed: false,
												})?.content,
												...props.theme?.itemDay?.[day.state]?.({
													...day,
													isPressed: false,
												})?.content,
												textAlign: 'center',
											}}
										>
											{day.displayLabel}
										</Text>
										<AiringActivity
											activityColors={props.activityColors}
											amount={getSeasonDateAmount(day.id)}
										/>
									</View>
								</Calendar.Item.Day>
							</Calendar.Item.Day.Container>
						))}
					</Calendar.Row.Week>
				))}
			</Calendar.VStack>
		);
	},
);
GorakuCalendar.displayName = 'GorakuCalendar';
