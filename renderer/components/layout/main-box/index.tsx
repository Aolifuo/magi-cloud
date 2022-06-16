import { ThemeContext } from '@/state/context/theme-context';
import React, { PropsWithChildren, useContext } from 'react';
import styles from './index.module.css';

const MainBox: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [themeState] = useContext(ThemeContext);
  const electronStyle = themeState.onElectron
    ? {
      flexBasis: 'calc(100vw - 1rem)',
      backgroundColor: 'rgb(41, 44, 52)',
      border: 'none',
      clipPath: 'none',
    }
    : {};
  return ( 
    <div 
      id="main-box" 
      className={styles.mainBox}
      style={electronStyle}
    >
      {children}
    </div>
  )
};

export default MainBox;
