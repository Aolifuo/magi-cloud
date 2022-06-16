import { FC, MouseEventHandler, ChangeEventHandler } from 'react';
import styles from './index.module.css';

interface IVolumeBarProps {
  pos: { left: number, top: number };
  defaultValue: number;
  onValueChange: ChangeEventHandler<HTMLInputElement>;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
}

const VolumeBar: FC<IVolumeBarProps> = (props) => {
  const { 
    pos, 
    defaultValue, 
    onValueChange, 
    onMouseEnter,
    onMouseLeave
   } = props;
  return (
    <div
      className={styles.orient}
      style={pos}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.wrapper}>
        <div className={styles.triangle} />
        <div className={styles.volumeBar}>
          <input
            id="volume-bar"
            type="range"
            min="0"
            max="1"
            step="0.1"
            defaultValue={defaultValue}
            onChange={onValueChange}
          />
        </div>
      </div>
    </div>
  );
};

export default VolumeBar;
