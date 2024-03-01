import * as Burnt from 'burnt';

export const sendErrorMessage = (title: string, message: string) => Burnt.toast({ title: title, message: message, duration: 5000, preset: 'error', from: 'bottom', haptic: 'error' });