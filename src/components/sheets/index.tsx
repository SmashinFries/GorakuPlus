import { registerSheet, SheetDefinition } from 'react-native-actions-sheet';
import {
	AnilistAccountSheet,
	CalendarFilterProps,
	CalendarFilterSheet,
	CharacterSearchProps,
	CharacterSearchSheet,
	DisplayConfigProps,
	DisplayConfigSheet,
	MediaReleasesSheet,
	MediaReleasesSheetProps,
	MediaSearchProps,
	MediaSearchSheet,
	QuickActionAniTrendzProps,
	QuickActionAniTrendzSheet,
	QuickActionCharStaffProps,
	QuickActionCharStaffSheet,
	QuickActionProps,
	QuickActionSheet,
	QuickActionStudioProps,
	QuickActionStudioSheet,
	QuickActionUserProps,
	QuickActionUserSheet,
	ReviewOverviewSheet,
	ReviewOverviewSheetProps,
	SauceNaoSheet,
	SauceNaoSheetProps,
	ThreadOverviewSheet,
	ThreadOverviewSheetProps,
	TraceMoeSheet,
	TraceMoeSheetProps,
	ListEntrySheet,
	ListEntrySheetProps,
} from './bottomsheets';
import { AppUpdaterSheet, AppUpdaterSheetProps } from './updatesheet';
import { ListFilterProps, ListFilterSheet } from './listsheets';
import { NekosApiSheet, NekosApiSheetProps } from './weeblabSheets';

registerSheet('QuickActionSheet', QuickActionSheet);
registerSheet('ThreadOverviewSheet', ThreadOverviewSheet);
registerSheet('ReviewOverviewSheet', ReviewOverviewSheet);
registerSheet('QuickActionCharStaffSheet', QuickActionCharStaffSheet);
registerSheet('QuickActionUserSheet', QuickActionUserSheet);
registerSheet('QuickActionAniTrendzSheet', QuickActionAniTrendzSheet);
registerSheet('MediaSearchSheet', MediaSearchSheet);
registerSheet('CharacterSearchSheet', CharacterSearchSheet);
registerSheet('AppUpdaterSheet', AppUpdaterSheet);
registerSheet('CalendarFilterSheet', CalendarFilterSheet);
registerSheet('ListFilterSheet', ListFilterSheet);
registerSheet('DisplayConfigSheet', DisplayConfigSheet);
registerSheet('AnilistAccountSheet', AnilistAccountSheet);
registerSheet('QuickActionStudioSheet', QuickActionStudioSheet);
registerSheet('TraceMoeSheet', TraceMoeSheet);
registerSheet('SauceNaoSheet', SauceNaoSheet);
registerSheet('MediaReleasesSheet', MediaReleasesSheet);
registerSheet('ListEntrySheet', ListEntrySheet);
registerSheet('NekosApiSheet', NekosApiSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
	interface Sheets {
		QuickActionSheet: SheetDefinition<{ payload: QuickActionProps }>;
		ThreadOverviewSheet: SheetDefinition<{ payload: ThreadOverviewSheetProps }>;
		ReviewOverviewSheet: SheetDefinition<{ payload: ReviewOverviewSheetProps }>;
		QuickActionCharStaffSheet: SheetDefinition<{ payload: QuickActionCharStaffProps }>;
		QuickActionUserSheet: SheetDefinition<{ payload: QuickActionUserProps }>;
		QuickActionAniTrendzSheet: SheetDefinition<{ payload: QuickActionAniTrendzProps }>;
		CharacterSearchSheet: SheetDefinition<{ payload: CharacterSearchProps }>;
		MediaSearchSheet: SheetDefinition<{ payload: MediaSearchProps }>;
		AppUpdaterSheet: SheetDefinition<{ payload: AppUpdaterSheetProps }>;
		CalendarFilterSheet: SheetDefinition<{ payload: CalendarFilterProps }>;
		ListFilterSheet: SheetDefinition<{ payload: ListFilterProps }>;
		DisplayConfigSheet: SheetDefinition<{ payload: DisplayConfigProps }>;
		AnilistAccountSheet: SheetDefinition<{}>;
		QuickActionStudioSheet: SheetDefinition<{ payload: QuickActionStudioProps }>;
		TraceMoeSheet: SheetDefinition<{ payload: TraceMoeSheetProps }>;
		SauceNaoSheet: SheetDefinition<{ payload: SauceNaoSheetProps }>;
		MediaReleasesSheet: SheetDefinition<{ payload: MediaReleasesSheetProps }>;
		ListEntrySheet: SheetDefinition<{ payload: ListEntrySheetProps }>;
		NekosApiSheet: SheetDefinition<{ payload: NekosApiSheetProps }>;
	}
}

export {};
