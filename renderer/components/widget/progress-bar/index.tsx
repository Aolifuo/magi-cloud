import {
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MusicContext } from '@/state/context/music-context';
import { timeTransfer } from '@/util/toolkit';
import { useAudio } from '@/components/widget/audio';
import styles from './index.module.css';

const pre = process.env.iconPrefix;

const ProgressBar: FC = () => {
  const [playOrPause, setPlayOrPause] = useState(true);
  const [progress, setProgress] = useState(0);
  const [musicState, musicDispatch] = useContext(MusicContext);
  const [myAudio, audioDispatch] = useAudio();
  const playOrPauseRef = useRef<boolean>();
  const timeHandle = useRef<NodeJS.Timer>();

  const syncAudioToProgress = () => {
    if (playOrPauseRef.current) {
      const curTime = myAudio?.currentTime || 0;
      setProgress(() => curTime);
    }
  };

  const togglePlayOrder = () => {
    musicDispatch({ type: 'toggle-play-order' });
  };

  useEffect(() => {
    playOrPauseRef.current = playOrPause;
  });

  useEffect(() => {
    if (musicState.current) {
      setPlayOrPause(true);
    }
  }, [musicState.current]);

  useEffect(() => {
    if (musicState.current === undefined) {
      return () => {};
    }
    timeHandle.current = setInterval(syncAudioToProgress, 1000);
    return () => clearInterval(timeHandle.current);
  }, [musicState.current]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.control}>
        <img
          src={`${pre}/${musicState.playOrder}.svg`}
          alt=""
          onClick={togglePlayOrder}
        />
        <img 
          src={`${pre}/prev.svg`} 
          alt="" 
          onClick={() => musicDispatch({ type: 'prev' })} />
        <div>
          <img
            src={`${pre}/${playOrPause ? 'pause' : 'play'}.svg`}
            alt=""
            onClick={() => {
              setPlayOrPause(!playOrPause);
              audioDispatch({ type: `${playOrPause ? 'pause' : 'play'}` });
            }}
          />
        </div>
        <img 
          src={`${pre}/next.svg`}
          alt="" 
          onClick={() => musicDispatch({ type: 'next' })} />
        <img src={`${pre}/words.svg`} alt="" />
      </div>
      <div className={styles.progressView}>
        <span>{ timeTransfer(progress) }</span>
        <div className={styles.progressBar}>
          <div>
            <div
              style={{ width: `${progress / (myAudio?.duration || 1) * 100}%` }}
            />
          </div>
          <input 
              type="range"
              min="0"
              max={myAudio?.duration || 0}
              value={progress}
              onChange={(e) => setProgress(() => parseFloat(e.target.value))}
              onMouseDown={() => clearInterval(timeHandle.current)}
              onMouseUp={() => {
                audioDispatch({ type: 'jump', time: Math.abs(progress - 0.1) });
                timeHandle.current = setInterval(syncAudioToProgress, 1000);
              }}
          />
        </div>
        <span>{ timeTransfer(myAudio?.duration || 0)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
