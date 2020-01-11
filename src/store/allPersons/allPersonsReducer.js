const personData = [{"personName":"Иванов Иван Иванович","contract":"6 мес","dateBirth":"","telNum":"","code":"111111","autoMonth":"","remain":null,"days":null,"photoId":0,"rent":null,"deposite":2000,"notes":""},{"personName":"Test Person One","contract":"3 мес","dateBirth":"01-01-1970","telNum":"","code":"222222","autoMonth":"","remain":null,"days":null,"photoId":0,"rent":null,"deposite":null,"notes":""}];

const initialState = { data: JSON.stringify(personData) };

export default function personReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_PERSON_DATA':
            return {...state, data: action.data };
        case 'LOAD_PERSON_DATA':
            return {...state, data: [] };
        default:
            return state;
    };
};