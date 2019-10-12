
export default function(state = {activeSong: [], list: true}, action){
    switch(action.type){
      case 'PLAY_SONG':
        let oldTrack = null;
        state.activeSong.forEach((data, index) => 
          oldTrack = data.id === action.payload.songActive.id? index : oldTrack);
        if(oldTrack != null){
          const newList = [...state.activeSong];
          console.log(oldTrack);
          newList.push(newList.splice(oldTrack,1)[0]);
          return {...state, activeSong: newList, list: true};
        }else{
          return { ...state, list: true, activeSong: [...state.activeSong, action.payload.songActive]} 
        }
      case 'REMOVE_LIST':
        return { ...state, list: false}
        default:
        return state;
      }
}
