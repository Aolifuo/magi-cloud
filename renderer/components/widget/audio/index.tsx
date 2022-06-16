import {
  FC,
  useContext,
  Reducer,
  useReducer,
  useEffect,
  Dispatch,
  useState,
  useRef,
} from 'react';
import { 
  MusicContext, 
  IMusicState, 
  nextMusic,
  prevMusic,
} from '@/state/context/music-context';
import Float from '@/components/basic/float/float';
import { fetchMusicUrl } from '@/util/toolkit';

interface IAction {
  type: 'pause' | 'play' | 'jump' | 'set-volume' | 'toggle-play-order';
  time?: number;
  volume?: number;
}

let globAudio: HTMLAudioElement | null;

const audioReducer: Reducer<{}, IAction> = (prevState, action) => {
  const myAudio = globAudio;
  if (myAudio === null) {
    return prevState;
  }

  switch (action.type) {
    case 'pause':
      myAudio.pause();
      break;
    case 'play':
      myAudio.play();
      break;
    case 'jump':
      myAudio.currentTime = action.time || myAudio.currentTime;
      break;
    case 'set-volume':
      myAudio.volume = action.volume || myAudio.volume;
      break;
    default:
      break;
  }
  return prevState;
};

const useAudio: () => [HTMLAudioElement | null, Dispatch<IAction>] = () => {
  const [, audioDispatch] = useReducer(audioReducer, {});

  return [globAudio, audioDispatch];
};

const Audio: FC = () => {
  const [musicState, musicDispatch] = useContext(MusicContext);
  const [url, setUrl] = useState('');
  const myAudioRef = useRef<HTMLAudioElement>(null);
  const musicStateRef = useRef<IMusicState>();

  const handleAutoPlay = () => {
    const state = musicStateRef.current!;
    switch (state.playOrder) {
      case 'sequential':
        if (state.index + 1 !== state.playlist.length) {
          musicDispatch(nextMusic());
        }
        break;
      case 'list-loop':
      case 'random':
        musicDispatch(prevMusic());
        break;
      case 'single-loop':
        globAudio!.currentTime = 0;
        globAudio!.play();
        break;
    }
  };

  const getMyAudio = () => {
    globAudio = myAudioRef.current;
    globAudio!.volume = 0.5;
    globAudio!.onended = handleAutoPlay;
  };

  useEffect(() => {
    musicStateRef.current = musicState;
  }, [musicState]);

  useEffect(() => {
    if (musicState.current === undefined) {
      return;
    }
    fetchMusicUrl(musicState.current.id)
      .then((res) => setUrl(res));
  }, [musicState.current?.id]);

  return (
    <Float notify={getMyAudio}>
      <audio
        autoPlay
        src={url}
        ref={myAudioRef}
      >
        <track kind="captions" />
      </audio>
    </Float>
  );
};

export default Audio;
export { useAudio };
