import { createStore, combineReducers } from 'redux';
import dayDataReducer from './dayData/dayDataReducer';
import personReducer from './allPersons/allPersonsReducer';
import activityReducer from './activities/ActivitiesReducer';

const store = createStore(
    combineReducers({
        dayDataStore: dayDataReducer,
        personStore: personReducer,
        activityStore: activityReducer
    })
);


export default store;