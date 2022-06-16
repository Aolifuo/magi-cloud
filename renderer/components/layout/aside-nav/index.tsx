import { FC, useContext, useEffect, useState } from 'react';
import NavList from '@/components/basic/nav-list';
import { NavItem } from '@/interfaces';
import { UserContext } from '@/state/context/user-context';
import { playlist } from '@/util/request/api';
import styles from './index.module.css';

const pre = process.env.iconPrefix;

const browse: NavItem[] = [
  {
    id: 1,
    name: '发现音乐',
    to: '',
  },
  {
    id: 2,
    name: '播客',
    to: '',
  },
  {
    id: 3,
    name: '视频',
    to: '',
  },
  {
    id: 4,
    name: '关注',
    to: '',
  },
  {
    id: 5,
    name: '直播',
    to: '',
  },
  {
    id: 6,
    name: '私人FM',
    to: '',
  },
];

const myMusic: NavItem[] = [
  {
    id: 1,
    icon: `${pre}/download.svg`,
    name: '本地与下载',
    to: 'local',
  },
  {
    id: 2,
    icon: `${pre}/recently-played.svg`,
    name: '最近播放',
    to: '',
  },
  {
    id: 3,
    icon: `${pre}/cloud.svg`,
    name: '我的音乐云盘',
    to: '',
  },
  {
    id: 4,
    icon: `${pre}/podcast.svg`,
    name: '我的播客',
    to: '',
  },
  {
    id: 5,
    icon: `${pre}/collection.svg`,
    name: '我的收藏',
    to: '',
  },
];

const AsideNav: FC = () => {
  const [userList, setUserList] = useState<NavItem[]>([]);
  const [userState] = useContext(UserContext);

  const handleUserList = (data: any) => {
    if (data === null) {
      return;
    }
    setUserList(() => data
      .playlist
      .map((item: any) => (
        {
          id: item.id,
          name: item.name,
          to: 'user-playlist',
        } as NavItem
      ))
    );
  }
  
  useEffect(() => {
    if (userState.userDetail === undefined) {
      return;
    }
    playlist(userState.userDetail.uid)
      .then((data) => handleUserList(data));
  }, [userState]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.asideNav}>
        <NavList
          items={browse}
        />
        <div className={styles.title}>
          我的音乐
        </div>
        <NavList
          items={myMusic}
        />
        <div className={styles.title}>
          创建的歌单
        </div>
        <NavList
          items={userList}
        />
      </div>
    </div>
  );
};


export default AsideNav;
