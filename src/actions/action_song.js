export const playSong = (song) => {
  return dispatch => {
    dispatch({
      type: 'PLAY_SONG',
      payload: {songActive: song}
    });
  };
};

export const removeOldList = () => {
    return dispatch => {
      dispatch({
        type: 'REMOVE_LIST',
      });
    };
  };
  