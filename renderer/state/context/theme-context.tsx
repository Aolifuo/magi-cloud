import { 
  createContext,
  Dispatch,
  FC, 
  PropsWithChildren, 
  Reducer, 
  useReducer
} from 'react';

interface IThemeState {

}

interface IThemeAction {
  type: 'set-mode';
  mode?: 'electron' | 'browser';
}

const themeReducer: Reducer<IThemeState, IThemeAction> = (prevState, action) => {
  switch (action.type) {
    case 'set-mode':
      return {
        ...prevState,
        mode: action.mode!,
      }
    default:
      return prevState;
  }
}

type IThemeContextValue = [IThemeState, Dispatch<IThemeAction>];

const ThemeContext = createContext({} as IThemeContextValue);

const ThemeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [themeState, themeDispatch] 
    = useReducer(themeReducer, {} as IThemeState);

  return (
    <ThemeContext.Provider value={[themeState, themeDispatch]}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export { ThemeContext };
