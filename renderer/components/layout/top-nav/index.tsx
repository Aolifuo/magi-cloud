import React, {
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { UserContext } from '@/state/context/user-context';
import LoginBox from '@/components/widget/login';
import styles from './index.module.css';

interface ITopNavState {
  toggleLoginBox: boolean;
}

interface ITopNavAction {
  type: 'toggle-login-box';
}

const pre = process.env.iconPrefix;

const topNavReducer: Reducer<ITopNavState, ITopNavAction> = (prevState, action) => {
  switch (action.type) {
    case 'toggle-login-box':
      return {
        ...prevState,
        toggleLoginBox: !prevState.toggleLoginBox,
      };
    default:
      return prevState;
  }
};

const TopNav: React.FC = () => {
  const [userState] = useContext(UserContext);
  const [topNavState, topNavDispatch] 
    = useReducer(topNavReducer, { toggleLoginBox: false });

  return (
    <div id="top-nav" className={styles.topNav}>
      <div className={styles.logo}>
        <img src={`${pre}/logo.svg`} alt="" />
        <span>Cloud云音乐</span>
      </div>
      <div className={styles.search}>
        <div>
          <img src={`${pre}/back.svg`} alt="" />
        </div>
        <div>
          <img src={`${pre}/forward.svg`} alt="" />
        </div>
        <div>
          <img src={`${pre}/search.svg`} alt="" />
        </div>
        <input type="text" />
        <div>
          <img src={`${pre}/mike.svg`} alt="" />
        </div>
      </div>
      <div className={styles.setting}>
        <div
          style={{ backgroundImage: `url(${userState.userDetail?.avatarUrl})` }}
        />
        <span
          onClick={() => topNavDispatch({ type: 'toggle-login-box' })}
        >
          {userState.userDetail?.nickname || '未登录'}
        </span>
        <img src={`${pre}/drop-down.svg`} alt="" />
        <img src={`${pre}/theme.svg`} alt="" />
        <img src={`${pre}/setting.svg`} alt="" />
        <img src={`${pre}/message.svg`} alt="" />
        <div className={styles.line} />
        <img src={`${pre}/mini-window.svg`} alt="" />
        <img 
          src={`${pre}/minimize.svg`} 
          alt="" 
          onClick={() => { (window as any).electron?.win.minimize(); }}
        />
        <img 
          src={`${pre}/maximize.svg`} 
          alt="" 
          onClick={() => { (window as any).electron?.win.maximize(); }}
        />
        <img
          id="close"
          src={`${pre}/close.svg`}
          alt="" 
          onClick={() => { (window as any).electron?.win.close(); }}
        />
      </div>
      <LoginBox
        toggle={topNavState.toggleLoginBox}
      />
    </div>
  );
};

export default TopNav;
