import React, {
  createRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UserContext } from '@/state/context/user-context';
import { cellphoneLogin } from '@/util/request/api';
import Float from '@/components/basic/float/float';
import md5 from 'js-md5';
import styles from './index.module.css';

interface ILoginBoxProps {
  toggle: boolean;
}

const pre = process.env.iconPrefix;

const LoginBox: React.FC<ILoginBoxProps> = ({ toggle }) => {
  const [,userDispatch] = useContext(UserContext);
  const [display, setDisplay] = useState(false);
  const loginBoxRef = createRef<HTMLDivElement>();

  const handleCloseLoginBox = (e: MouseEvent) => {
    if (!loginBoxRef.current?.contains(e.target as Node)
        && loginBoxRef.current !== e.target) {
      setDisplay(false);
    }
  };

  const handleLogin = async () => {
    const phone = document.getElementById('phone-number') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const data = await cellphoneLogin(phone.value, md5(password.value));

    if (data === null) {
      console.log('登陆失败');
      return;
    }
    console.log('登陆成功');
    userDispatch({ type: 'set-user-state', data });
  };

  useEffect(() => {
    setDisplay(toggle);
  }, [toggle]);

  useEffect(() => {
    if (!display) {
      return () => {};
    }
    setTimeout(() => document.addEventListener('click', handleCloseLoginBox), 0);
    return () => document.removeEventListener('click', handleCloseLoginBox);
  }, [display]);

  if (display === false) {
    return null;
  }

  return (
    <Float>
      <div className={styles.loginBox} ref={loginBoxRef}>
        <div className={styles.content}>
          <div className={styles.title}>
            <img src={`${pre}/logo.svg`} alt="" />
            <span>使用手机登陆</span>
          </div>
          <div className={styles.inputBox}>
            <input id="phone-number" type="text" placeholder="手机号" />
            <input id="password" type="password" placeholder="密码" />
          </div>
          <button
            className={styles.loginButton}
            type="button"
            onClick={handleLogin}
          >
            登陆
          </button>
        </div>
      </div>
    </Float>
  );
};

export default LoginBox;
