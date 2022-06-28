import React, { PropsWithChildren } from 'react';
import styles from './index.module.css';

const MainBox: React.FC<PropsWithChildren<unknown>> = ({ children }) => {

  return ( 
    <div 
      id="main-box" 
      className={styles.mainBox}
    >
      {children}
    </div>
  )
};

export default MainBox;
