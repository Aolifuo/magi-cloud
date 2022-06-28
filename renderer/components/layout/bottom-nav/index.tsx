import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MusicContext } from '@/state/context/music-context';
import ProgressBar from '@/components/widget/progress-bar';
import VolumeBar from '@/components/widget/volume-bar';
import { useAudio } from '@/components/widget/audio';
import eventBus from '@/state/event/event-bus';
import styles from './index.module.css';

const pre = process.env.iconPrefix;

const BottomNav: React.FC<unknown> = () => {
  const [volumeDisplay, setVolumeDisplay] = useState(false);
  const [volumePos, setvolumePos] = useState({ left: 0, top: 0 });
  const [musicState] = useContext(MusicContext);
  const [myAudio] = useAudio();
  const delayRef = useRef<NodeJS.Timeout>();

  const handleAudioVolume = (e: ChangeEvent<HTMLInputElement>) => {
    myAudio!.volume = parseFloat(e.target.value);
  };

  useEffect(() => {
    if (!volumeDisplay) {
      return;
    }
    const volumeButton = document.getElementById('volume-button');
    setvolumePos(() => (
      {
        left: volumeButton!.offsetLeft,
        top: volumeButton!.offsetTop,
      }
    ));
  }, [volumeDisplay]);

  return (
    <div id="bottom-nav" className={styles.bottomNav}>
      <div className={styles.left}>
        <div
          style={{ backgroundImage: `url(${musicState.current?.imgUrl})` }}
        />
        <div>
          <span>{musicState.current?.name}</span>
          <br />
          <span>{musicState.current?.singer}</span>
        </div>
        {
          musicState.current?.id
            ? <img src={`${pre}/favorite.svg`} alt="" />
            : null
        }
      </div>
      <div className={styles.middle}>
        <ProgressBar />
      </div>
      <div className={styles.right}>
        <div>
          <span>极高</span>
        </div>
        <img src={`${pre}/effect.svg`} alt="" />
        <img
          id="volume-button"
          src={`${pre}/volume.svg`}
          alt=""
          onMouseEnter={() => setVolumeDisplay(true)}
          onMouseLeave={() => delayRef.current = setTimeout(() => setVolumeDisplay(false), 100)}
        />
        <img src={`${pre}/invite.svg`} alt="" />
        <img
          src={`${pre}/playlist.svg`}
          alt=""
          onClick={() => eventBus.dispatch('toggle-slide')}
        />
      </div>
      {
        volumeDisplay
          ? (
            <VolumeBar
              pos={volumePos}
              defaultValue={myAudio?.volume || 0.5}
              onValueChange={handleAudioVolume}
              onMouseEnter={() => clearTimeout(delayRef.current)}
              onMouseLeave={() => delayRef.current = setTimeout(() => setVolumeDisplay(false), 100)}
            />
          )
          : null
      }
    </div>
  );
};

export default BottomNav;
