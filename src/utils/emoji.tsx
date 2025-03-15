export const getStreamingSiteEmoji = (lang: string) => {
	switch (lang) {
		case 'Japanese':
			return '🇯🇵';
		case 'English':
			return '🇺🇸';
		case 'Korean':
			return '🇰🇷';
		case 'Chinese':
			return '🇨🇳';
		case 'Thai':
			return '🇹🇭';
		case 'French':
			return '🇫🇷';
		case 'German':
			return '🇩🇪';
		case 'Italian':
			return '🇮🇹';
		case 'Spanish':
			return '🇪🇸';
		default:
			return '';
	}
};
