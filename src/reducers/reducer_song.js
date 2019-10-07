
export default function(state = null, action){
    switch(action.type){
      case 'PLAY_SONG':
        return action.payload
        default:
        return state;
      }
  }