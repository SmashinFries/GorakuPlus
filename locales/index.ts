import enTabs from './en/tabs.json';
import enDialogs from './en/dialogs.json';

import esTabs from './es/tabs.json';
import esDialogs from './es/dialogs.json';

import frTabs from './fr/tabs.json';
import frDialogs from './fr/dialogs.json';

import deTabs from './de/tabs.json';
import deDialogs from './de/dialogs.json';

import jaTabs from './ja/tabs.json';
import jaDialogs from './ja/dialogs.json';

import koTabs from './ko/tabs.json';
import koDialogs from './ko/dialogs.json';

import zhTabs from './zh/tabs.json';
import zhDialogs from './zh/dialogs.json';

export const LANGUAGES = {
	en: 'English',
	es: 'Spanish',
	fr: 'French',
	de: 'German',
	ja: 'Japanese',
	ko: 'Korean',
	zh: 'Chinese',
};

export default {
	en: {
		tabs: enTabs,
		dialogs: enDialogs,
	},
	es: {
		tabs: esTabs,
		dialogs: esDialogs,
	},
	fr: {
		tabs: frTabs,
		dialogs: frDialogs,
	},
	de: {
		tabs: deTabs,
		dialogs: deDialogs,
	},
	ja: {
		tabs: jaTabs,
		dialogs: jaDialogs,
	},
	ko: {
		tabs: koTabs,
		dialogs: koDialogs,
	},
	zh: {
		tabs: zhTabs,
		dialogs: zhDialogs,
	},
};
