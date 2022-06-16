import {
  FC,
  createContext,
  Dispatch,
  PropsWithChildren,
  Reducer,
  useMemo,
  useReducer,
} from 'react';
import { IMusicBasic, IPlaylistProfile } from '@/interfaces';

type IPlayOrder = 'sequential' | 'list-loop' | 'single-loop' | 'random';

interface IMusicState {
  profile: IPlaylistProfile;
  playlist: IMusicBasic[];
  index: number;
  current: IMusicBasic;
  playOrder: IPlayOrder;
}

interface IAction extends Partial<IMusicState> {
  type: 'set-profile' | 'set-playlist' | 'next' | 'prev' | 'set-music'| 'auto' | 'toggle-play-order';
}

type IMusicContextValue = [IMusicState, Dispatch<IAction>];

const musicStateReducer: Reducer<IMusicState, IAction> = (prev, action) => {
  switch (action.type) {
    case 'set-profile': 
      return { ...prev, profile: action.profile! };
    case 'set-playlist':
      return { 
        ...prev, 
        playlist: action.playlist!,
        index: action.index!,
        current: action.current!,
      }
    case 'next': {
      let nextIndex = prev.index;
      if (prev.playOrder === 'random') {
        while ((nextIndex = Math.round(Math.random() * (prev.playlist.length - 1))) === prev.index);
      } else {
        nextIndex = (prev.index + 1) % prev.playlist.length;
      }
      return {
        ...prev,
        index: nextIndex,
        current: prev.playlist[nextIndex],
      };
    }
    case 'prev': {
      let prevIndex = prev.index;
      if (prev.playOrder === 'random') {
        while ((prevIndex = Math.round(Math.random() * (prev.playlist.length - 1))) === prev.index);
      } else {
        prevIndex = prev.index === 0
        ? prev.playlist.length - 1
        : prev.index - 1;
      }
      return {
        ...prev,
        index: prevIndex,
        current: prev.playlist[prevIndex],
      };
    }
    case 'set-music': 
      return {
        ...prev,
        index: action.index!,
        current: prev.playlist[action.index!],
      };
    case 'toggle-play-order': {
      const playOrderList: IPlayOrder[] = ['sequential', 'list-loop', 'single-loop', 'random'];
      const curIndex = playOrderList.findIndex((cur) => cur === prev.playOrder);
      return {
        ...prev,
        playOrder: playOrderList[(curIndex + 1) % playOrderList.length],
      };
    }
    default:
      return prev;
  }
};

const setProfile = (profile: IPlaylistProfile): IAction => (
  { type: 'set-profile', profile }
);
const setPlaylist = (playlist: IMusicBasic[], index: number): IAction => (
  { type: 'set-playlist', playlist, index, current: playlist[index] }
);
const nextMusic = (): IAction => ({ type: 'next' });
const prevMusic = (): IAction => ({ type: 'prev' });
const setMusic = (index: number): IAction => ({ type: 'set-music', index });
const togglePlayOrder = (): IAction => ({ type: 'toggle-play-order' });

// 
const MusicContext = createContext({} as IMusicContextValue);

const MusicStateProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [musicState, musicDispatch] 
    = useReducer(musicStateReducer, { playOrder: 'sequential' } as IMusicState);
  const valueCache: IMusicContextValue 
    = useMemo(() => ([musicState, musicDispatch]), [musicState]);

  return (
    <MusicContext.Provider value={valueCache}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicStateProvider;
export { MusicContext };
export { setProfile, setPlaylist, nextMusic, prevMusic, setMusic, togglePlayOrder };
export type { IMusicState, IPlayOrder };
