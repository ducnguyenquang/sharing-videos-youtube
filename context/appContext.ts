import { createContext } from 'react';

interface IAppContextProps {
  baseUrl: string;
  isLogged: boolean;
}

export const Context = createContext<IAppContextProps>({
  baseUrl: '',
  isLogged: false,
});