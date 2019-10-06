
export default function(state = null, action){
  console.log('action ne', action);
  switch(action.type){
    case 'LOGIN_SUCCESS':
      return action.payload
      default:
      return state;
    }
}