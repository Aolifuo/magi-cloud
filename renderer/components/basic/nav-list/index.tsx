import { FC, useContext } from 'react';
import { ContentContext } from '@/state/context/content-context';
import { NavItem } from '@/interfaces';
import styles from './index.module.css';

interface INavListProps {
  items: NavItem[]
}

const NavList: FC<INavListProps> = ({ items }) => {
  const [, contentDispatch] = useContext(ContentContext);
  return (
    <div className={styles.navList}>
      {
        items.map((v) => (
          <div
            className={styles.item}
            key={v.id}
            onClick={() => contentDispatch({ type: v.to, playlistId: v.id })}
          >
            {
              v.icon
                ? <img src={v.icon} alt="" />
                : null
            }
            <span>{v.name}</span>
          </div>
        ))
      }
    </div>
  );
};

export default NavList;
