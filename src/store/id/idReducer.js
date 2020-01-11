const initialState = {id:0};

export default function idReducer(state = initialState, action){
    // console.log('inSTATEfirstId' + JSON.stringify(state));
    switch (action.type) {
      case 'CHANGE_ID':
        // console.log('ACTION' + action)
        // console.log('ACTION.id' + action.id);
        return {...state, id: action.id};
      case 'SET_TO_DEFAULT':
        // console.log('Set store ID to default');
        return {...state, id: 0};
      default:
        return state;
    };
};


// export function getStoreId(){
//   return store.getState().idStore.id;
// }