const initState = { data: "[\"date\":\"01-01-2019\",\"notes\":\"\",\"history\":[]}]" };

export default function dayDataReducer(state = initState, action) {
    switch (action.type) {
        case 'CHANGE_DAY_DATA':
            return {...state, data: action.data };
        default:
            return state;
    };
};