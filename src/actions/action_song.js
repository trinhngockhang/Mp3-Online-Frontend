export const playSong = (songId) => {
  return dispatch => {
    dispatch({
      type: 'PLAY_SONG',
      payload: {songActive: songId}
    });
  };
};
