import React, { PropsWithChildren } from 'react';
import styles from './index.module.css';

const MainContent: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
  <div className={styles.mainContent}>
    { children }
  </div>
);

export default MainContent;
