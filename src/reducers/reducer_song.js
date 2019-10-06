
export default function(state = null, action){
    switch(action.type){
      case 'PLAY_SONG':
        return action.payload
      case 'ACTIVE_SONG':
        return state.activeSong;
        default:
        return state;
      }
  }