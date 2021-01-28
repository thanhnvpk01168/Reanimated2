import * as types from './constants';
//USER
export function PlayMusic(isPlaying) {
  return {
    type: types.PLAYING,
    isPlaying,
  };
}
