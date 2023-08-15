import { createContext } from "react";

type AppContextProps = {
  baseUrl: string;
  isLogged: boolean;
};

export const Context = createContext<AppContextProps>({
  baseUrl: "",
  isLogged: false,
});
