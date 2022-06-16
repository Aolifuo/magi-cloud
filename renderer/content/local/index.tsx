import { FC } from 'react';
import { createTable } from '@/components/basic/table';
import Tab from '@/components/basic/tab';
import styles from './index.module.css';

const tabs: [number, string][] = [
  [0, '下载管理'],
  [1, '本地音乐'],
];

const DownloadTable = createTable();

const Local: FC = () => {
  return (
    <div>
      <div className={styles.topTab}>
        <Tab tabs={tabs} />
      </div>
      <div />
      <div>

      </div>
    </div>
  );
};

export default Local;