export type ToPaths =  'user-playlist' | 'local' | '';

export interface NavItem  {
  id: number;
  icon?: string;
  name: string;
  to: ToPaths;
};

export interface IMusicBasic {
  id: number;
  name: string;
  singer: string;
  album: string;
  time: number;
  imgUrl: string;
}

export interface IPlaylistProfile {
  id: number;
  name: string;
  coverImgUrl: string;
}

type A = {};

export default A;
