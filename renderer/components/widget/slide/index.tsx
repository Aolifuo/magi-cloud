import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { MusicContext, setMusic } from '@/state/context/music-context';
import { IMusicBasic } from '@/interfaces';
import eventBus from '@/state/event/event-bus';
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
  const [display, setDisplay] = useState(false);
  const [musicState, musicDispatch] = useContext(MusicContext);

  const handleDisplay = () => {
    setDisplay((prev) => !prev);
  };

  const handleMusicState = useCallback((target: IMusicBasic[], index: number) => {
    musicDispatch(setMusic(index));
  }, []);

  useEffect(() => {
    eventBus.on('toggle-slide', handleDisplay);
    return () => eventBus.off('toggle-slide', handleDisplay);
  }, []);

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
    <div className={styles.slide}>
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
