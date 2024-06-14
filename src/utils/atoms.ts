import { atom } from 'jotai'


export const selectedPresetAtom = atom('default')

export const trackDataAtom = atom({
    id: '',
    timestamp: 0,
    isPaused: false,
})