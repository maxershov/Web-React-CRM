const activityData = [{"code":"111111","activity":[]},{"code":"222222","activity":[]}];
const initState = { data: JSON.stringify(activityData) };

export default function activityReducer(state = initState, action) {
    // console.log('inSTATEfirstPAGE' + JSON.stringify(state));
    switch (action.type) {
        case 'CHANGE_ACTIVITY_DATA':
            return {...state, data: action.data };
        default:
            return state;
    };
};