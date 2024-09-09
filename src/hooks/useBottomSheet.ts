import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';

export const useCharacterSearchBottomSheet = () => {
	const characterSearchSheetRef = useRef<BottomSheetModal>(null);
	const [selectedName, setSelectedName] = useState<string>(null);

	const onNameSelect = (name: string) => {
		console.log(name);
		setSelectedName(name);
		characterSearchSheetRef.current?.present();
	};

	return { characterSearchSheetRef, selectedName, onNameSelect };
};

export const useMediaSearchBottomSheet = () => {
	const mediaSearchSheetRef = useRef<BottomSheetModal>(null);
	const [selectedMediaTitle, setSelectedMediaTitle] = useState<string>('');

	const onMediaTitleSelect = (name: string) => {
		setSelectedMediaTitle(name);
		mediaSearchSheetRef.current?.present();
	};

	return { mediaSearchSheetRef, selectedMediaTitle, onMediaTitleSelect };
};
