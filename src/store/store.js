import { createStore, combineReducers } from 'redux';
import idReducer from './id/idReducer';
import renderPageReducer from './renderPage/renderPageReducer';
import dayDataReducer from './dayData/dayDataReducer';
import personReducer from './allPersons/allPersonsReducer';
import activityReducer from './activities/ActivitiesReducer';

const store = createStore(
    combineReducers({
        idStore: idReducer,
        renderStore: renderPageReducer,
        dayDataStore: dayDataReducer,
        personStore: personReducer,
        activityStore: activityReducer
    })
);


export default store;