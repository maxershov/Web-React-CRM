const initialState = { data: [] };

export default function personReducer(state = initialState, action) {
    // console.log('inSTATEfirstId' + JSON.stringify(state));
    switch (action.type) {
        case 'CHANGE_PERSON_DATA':
            // console.log('ACTION' + action)
            // console.log('ACTION.id' + action.id);
            return {...state, data: action.data };
        case 'LOAD_PERSON_DATA':
            // console.log('Set store ID to default');
            return {...state, data: [] };
        default:
            return state;
    };
};