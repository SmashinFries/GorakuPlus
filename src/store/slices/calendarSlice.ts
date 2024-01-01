import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface CalendarFilterState {
    showListOnly: boolean;
}

// Define the initial state using that type
const initialState: CalendarFilterState = {
    showListOnly: false,
};

type filterActions = {
    entryType: keyof CalendarFilterState;
    value: CalendarFilterState[keyof CalendarFilterState];
};

export const calendarFilterSlice = createSlice({
    name: 'calendarFilter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateCalendarFilter: (state, action: PayloadAction<filterActions>) => {
            state[action.payload.entryType] = action.payload.value;
        },
    },
});

export const { updateCalendarFilter } = calendarFilterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.persistedReducer.;

export default calendarFilterSlice.reducer;
