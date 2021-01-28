import * as types from './constants';

const initialState = {
  isPlaying: false,
};
function notesReducer(state = initialState, action) {
  switch (action.type) {
    case types.PLAYING:
      return {
        ...state,
        isPlaying: action.isPlaying,
      };

    default:
      return state;
  }
}

export default notesReducer;
