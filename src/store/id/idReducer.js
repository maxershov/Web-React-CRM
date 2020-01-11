const initialState = {id:0};

export default function idReducer(state = initialState, action){
    switch (action.type) {
      case 'CHANGE_ID':
        return {...state, id: action.id};
      case 'SET_TO_DEFAULT':
        return {...state, id: 0};
      default:
        return state;
    };
};