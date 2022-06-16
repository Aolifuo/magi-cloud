import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { MusicContext, setMusic } from '@/state/context/music-context';
import { IMusicBasic } from '@/interfaces';
import useEventBus from '@/state/event/event-bus';
import { timeTransfer } from '@/util/toolkit';
import { createTable } from '@/components/basic/table';
import styles from './index.module.css';



interface IRecord extends IMusicBasic {
  timeFormat: string;
  [index: string]: number | string | undefined;
}

const fieldMap = [
  [0, 'name', ''],
  [1, 'singer', ''],
  [2, 'timeFormat', ''],
] as [number, string, string][];

const ratios = [3, 1, 1];

const SlideTable = React.memo(createTable<IRecord>());

const Slide:React.FC = () => {
  const [right, setRight] = useState(0);
  const [display, setDisplay] = useState(false);
  const [musicState, musicDispatch] = useContext(MusicContext);
  const [, startTransition] = useTransition();
  const eventBus = useEventBus();
  const mainBoxRef = useRef<HTMLDivElement>();

  const handleDisplay = () => {
    setDisplay((prev) => !prev);
  };

  const handleSlidePos = () => {
    if (!display) {
      return;
    }
    startTransition(() => {
      setRight(() => mainBoxRef.current!.offsetLeft + 10);
    });
  };

  const handleMusicState = useCallback((target: IMusicBasic[], index: number) => {
    musicDispatch(setMusic(index));
  }, []);

  useEffect(() => {
    mainBoxRef.current = document.getElementById('main-box') as HTMLDivElement;
    eventBus.subscribe('toggle-slide', handleDisplay);
    return () => eventBus.unsubscribe('toggle-slide', handleDisplay);
  }, []);

  useEffect(() => {
    if (!display) {
      return () => {};
    }
    handleSlidePos();
    window.addEventListener('resize', handleSlidePos);
    return () => window.removeEventListener('resize', handleSlidePos);
  }, [display]);

  const records = useMemo(() => (
    musicState.playlist
      ? musicState.playlist
        .map((record) => (
          {
            ...record,
            timeFormat: timeTransfer(record.time),
          } as IRecord
        ))
      : []
  ), [musicState.playlist]);

  if (!display) {
    return null;
  }

  return (
    <div
      className={styles.slide}
      style={{ right }}
    >
      <div className={styles.title}>
        <div>当前播放</div>
        <div>
          总
          {musicState.playlist?.length || 0}
          首
        </div>
      </div>
      <div className={styles.line} />
      <div 
        className={styles.tableBox}
      >
        <SlideTable
          records={records}
          fieldMap={fieldMap}
          ratios={ratios}
          handleDoubleClick={handleMusicState}
        />
      </div>
    </div>
  );
};

export default Slide;
