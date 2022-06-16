import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
  memo,
} from 'react';
import { 
  MusicContext, 
  setProfile,
  setPlaylist,
} from '@/state/context/music-context';
import { ContentContext } from '@/state/context/content-context';
import { IMusicBasic, IPlaylistProfile } from '@/interfaces';
import { playlistDetail } from '@/util/request/api';
import { timeTransfer } from '@/util/toolkit';
import { createTable } from '@/components/basic/table';
import Tab from '@/components/basic/tab';
import styles from './index.module.css';

interface IRecord extends IMusicBasic {
  timeFormat: string;
  [index: string]: number | string | undefined;
}

const fieldMap: [number, string, string][] = [
  [0, 'op', '操作'],
  [1, 'name', '标题'],
  [2, 'singer', '歌手'],
  [3, 'album', '专辑'],
  [4, 'timeFormat', '时间'],
];

const ratios = [2, 12, 4, 8, 2];

const tabs = [
  [0, '歌曲列表'],
  [1, '评论'],
  [2, '收藏者'],
] as [number, string][];

const PlaylistTable = memo(createTable<IRecord>());

const MyPlaylist: FC = () => {
  const [records, setRecords] = useState<IRecord[]>([]);
  const [musicState, musicDispatch] = useContext(MusicContext);
  const [contentState] = useContext(ContentContext);

  const fetchPlaylistDetail = async () => {
    const data: any = await playlistDetail(contentState.userPlaylist!.id);
    if (data === null) {
      return;
    }
    const records_tmp = data
      .playlist
      .tracks
      .map((song: any) => (
        {
          id: song.id,
          name: song.name,
          singer: song.ar.map((v: any) => v.name).join('/'),
          album: song.al.name,
          time: (song.h.size * 8) / song.h.br,
          timeFormat: timeTransfer((song.h.size * 8) / song.h.br),
          imgUrl: song.al.picUrl,
        } as IRecord
      ));

    const profile: IPlaylistProfile = {
      id: data.playlist.id,
      name: data.playlist.name,
      coverImgUrl: data.playlist.coverImgUrl,
    };
    musicDispatch(setProfile(profile));
    setRecords(() => records_tmp);
  };

  const handleMusicState = useCallback((target: IRecord[], index: number) => {
    musicDispatch(setPlaylist(target, index));
  }, []);

  useEffect(() => {
    if (contentState.userPlaylist !== undefined) {
      fetchPlaylistDetail();
    }
  }, [contentState.userPlaylist?.id]);

  return (
    <div className={styles.myPlaylist}>
      <div className={styles.playlistInfo}>
        <div
          className={styles.playlistImage}
          style={{ backgroundImage: `url(${musicState.profile?.coverImgUrl || ''})` }}
        />
      </div>
      <div className={styles.tab}>
        <Tab tabs={tabs} />
      </div>
      <div className={styles.tableBox}>
        <PlaylistTable
          records={records}
          fieldMap={fieldMap}
          ratios={ratios}
          hideTitle
          hasOrderId
          handleDoubleClick={handleMusicState}
        />
      </div>
    </div>
  );
};

export default MyPlaylist;
