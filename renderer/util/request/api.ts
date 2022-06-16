import request from './base';

export async function cellphoneLogin(phone: string, md5Password: string) {
  const data = await request.get(`/login/cellphone?phone=${phone}&md5_password=${md5Password}`);
  return data;
}

export async function loginStatus() {
  const data = await request.get('/login/status');
  return data;
}

export async function playlist(uid: number) {
  const data = await request.get(`/user/playlist?uid=${uid}`);
  return data;
}

export async function playlistTrack(id: number) {
  const data = await request.get(`/playlist/track/all?id=${id}`);
  return data;
}

export async function playlistDetail(id: number) {
  const data = await request.get(`/playlist/detail?id=${id}`);
  return data;
}

export async function songUrl(id: number) {
  const data = await request.get(`/song/url?id=${id}`);
  return data;
}

export async function checkMusic(id: number) {
  const data = await request.get(`/check/music?id=${id}`);
  return data;
}
