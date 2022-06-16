import React from 'react';
import styles from './index.module.css';

interface ITabProps {
  tabs: [number, string][]
}

const Tab: React.FC<ITabProps> = ({ tabs }) => (
  <div className={styles.tab}>
    {
      tabs
        .map((v) => (
          <div key={v[0]}><span>{v[1]}</span></div>
        ))
    }
  </div>
);

export default Tab;
