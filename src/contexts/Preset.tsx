import React, { createContext, Dispatch, SetStateAction } from 'react';

interface PresetContextProps {
  selectedGradient: string;
  setSelectedGradient: Dispatch<SetStateAction<string>>;
}

export const PresetContext = createContext<PresetContextProps>({
  selectedGradient: 'bg-ocean',
  setSelectedGradient: () => {},
});