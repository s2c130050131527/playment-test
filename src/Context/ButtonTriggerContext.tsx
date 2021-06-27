import { createContext, useContext } from 'react';

export type TriggerVal = {
  trigger: string;
  setTrigger: (c: string) => void;
};
export const TriggerContext = createContext<TriggerVal>({
  trigger: '',
  setTrigger: () => {},
});

export const useGlobalContext = () => useContext(TriggerContext);
