import {
  FC,
  createContext,
  Dispatch,
  PropsWithChildren,
  Reducer, 
  useReducer,
  useMemo,
} from 'react';
import { ToPaths } from '@/interfaces';
 
interface IContentState {
  to: ToPaths;
  userPlaylist?: { id: number };
}

interface IContentAction {
  type: ToPaths;
  playlistId?: number;
}

type IContentContextValue = [IContentState, Dispatch<IContentAction>];

const contentReducer: Reducer<IContentState, IContentAction> = (prev, action) => {
  switch (action.type) {
    case 'user-playlist':
      return {
        to: 'user-playlist',
        userPlaylist: { id:  action.playlistId!}
      };
    default:
      return { to: action.type };
  }
};

const ContentContext = createContext({} as IContentContextValue);

const ContentProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [contentState, contentDispatch] = useReducer(contentReducer, {} as IContentState);
  const valueCache = useMemo<IContentContextValue>(
    () => [contentState, contentDispatch],
    [contentState],
  );

  return (
    <ContentContext.Provider value={valueCache}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;
export { ContentContext };
