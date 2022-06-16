import { FC, ReactNode, useContext } from 'react';
import { ContentContext } from '@/state/context/content-context';
import { ToPaths } from '@/interfaces';
import MyPlaylist from '@/content/my-playlist';
import Local from '@/content/local';

const contents: { to: ToPaths, content: ReactNode }[] = [
  {
    to: 'user-playlist',
    content: <MyPlaylist />,
  },
  {
    to: 'local',
    content: <Local />
  },
  {
    to: '',
    content: '',
  }
];

const SwitchContent: FC = () => {
  const [contentState] = useContext(ContentContext);

  return (
    <>
      {
        contents
          .find((item) => (item.to === contentState.to))
          ?.content
          || null
      }
    </>
  );
};

export default SwitchContent;



