// import { useEffect, useState } from 'react';
// // import { Audio } from 'expo-av';

// type SoundTypes = 'selection';
// const SOUNDS = {
//     selection: 'select.mp3',
// };

// export const useSound = (soundLoc: SoundTypes) => {
//     const [sound, setSound] = useState<Audio.Sound>();

//     const playSound = async () => {
//         const { sound } = await Audio.Sound.createAsync(
//             require(`../../assets/${SOUNDS[soundLoc]}`),
//         );
//         setSound(sound);
//         await sound.playAsync();
//     };

//     useEffect(() => {
//         return sound ? () => sound.unloadAsync() : () => undefined;
//     }, [sound]);

//     return playSound;
// };
