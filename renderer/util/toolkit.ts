import { songUrl, checkMusic } from './request/api';

export const timeTransfer = (num: number) => {
  const floorNum = Math.floor(num);
  const minute = Math.floor(floorNum / 60);
  const second = floorNum % 60;
  return `${minute < 10 ? 0 : ''}${minute}:${second < 10 ? 0 : ''}${second}`;
};

export const fetchMusicUrl = async (id: number) => {
  const data = await songUrl(id);
  if (data === null) {
    console.log('音乐获取失败');
    return null;
  }
  const checkResult: any = await checkMusic(id);
  if (checkResult === null) {
    console.log('检查结果获取失败');
    return null;
  }
  if (checkResult.success === false) {
    console.log(checkResult.message);
    return null;
  }

  return (data.data[0]?.url ?? '');
};