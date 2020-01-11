const dayData = [{"date":"10-12-2019","notes":"10","history":[]},{"date":"11-12-2019","notes":"11","history":[]}];

const initState = { data: JSON.stringify(dayData) };

export default function dayDataReducer(state = initState, action) {
    switch (action.type) {
        case 'CHANGE_DAY_DATA':
            return {...state, data: action.data };
        default:
            return state;
    };
};