import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface DisplaySettingState {
    calendar: {
        list_only?: boolean;
        grid_size?: number;
    };
    list: {
        grid_size?: number;
    };
    search: {
        grid_size?: number;
    };
}

// Define the initial state using that type
const initialState: DisplaySettingState = {
    calendar: {
        list_only: false,
        grid_size: 2,
    },
    list: {
        grid_size: 2,
    },
    search: {
        grid_size: 2,
    },
};

export const displaySettingSlice = createSlice({
    name: 'displaySettings',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateCalendarDisplay: (state, action: PayloadAction<DisplaySettingState['calendar']>) => {
            state.calendar = { ...state.calendar, ...action.payload };
        },
        updateListDisplay: (state, action: PayloadAction<DisplaySettingState['list']>) => {
            state.list = { ...state.list, ...action.payload };
        },
        updateSearchDisplay: (state, action: PayloadAction<DisplaySettingState['search']>) => {
            state.search = { ...state.search, ...action.payload };
        },
    },
});

export const { updateCalendarDisplay, updateListDisplay, updateSearchDisplay } =
    displaySettingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.persistedReducer.;

export default displaySettingSlice.reducer;
