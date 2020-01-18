import React from 'react';
import './App.css';
import './react-table.css';
import moment from 'moment';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';
import MainContent from './Components/MainContent';
import Header from './Components/Header';
import store from './store/store'
import { getPersonStore, getDayDataStore, getActivityStore, getActivityStoreCode } from './store/storeGetters'


const App = (props) => {
    return (
      <Provider store={store}>
        <Router>        
          <Header />
          <MainContent />
        </Router>
      </Provider>
    );
}



function changeCodeDayData(oldCode, newCode) {
    const data = JSON.parse(getDayDataStore());
    data.forEach(element => {
        element.history = element.history.filter(obj => {
            if (obj.code === oldCode) return obj.code = newCode;
        });
    });
    saveData(data, 'DAY');
}

export function deletePerson(codeToDel) {
    deleteCodeDayData(codeToDel);
    const personData = JSON.parse(getPersonStore());
    const newPersonData = personData.filter(obj => {return obj.code !== codeToDel});

    const activityData = JSON.parse(getActivityStore());
    const newActivityData = activityData.filter(obj => {return obj.code !== codeToDel});
    saveData(newPersonData, 'PERSON');
    saveData(newActivityData, 'ACTIVITY');
    store.dispatch({ type: 'CHANGE_PAGE', page: 'TABLE_PAGE' })
    store.dispatch({ type: 'CHANGE_ID', id: 0});
}

function deleteCodeDayData(codeToDel) {
    const data = JSON.parse(getDayDataStore());
    data.forEach(element => {
        element.history = element.history.filter(obj => {
            return obj.code !== codeToDel
        });
    }
    );
    saveData(data, 'DAY');
}

export function getIndexByCode(code) {
    return JSON.parse(getPersonStore()).findIndex(x => x.code === code);
}

export function getDateObj(dateTo) {
    const data = JSON.parse(getDayDataStore());
    const indexDate = data.findIndex(x => x.date === dateTo);
    if (indexDate !== -1) {
        return JSON.stringify(data[indexDate]);
    } 
        const newDateObj = { "date": dateTo, "notes": "", "history": [] };
        addNewDayDataToJSON(newDateObj);
        return JSON.stringify(newDateObj);
    
}

export function addNewDayDataToJSON(obj) {
    const data = JSON.parse(getDayDataStore());
    const indexDate = data.findIndex(x => x.date === obj.date);
    if (indexDate !== -1) {
        data[indexDate] = obj;
        saveData(data, 'DAY');
    } else {
        data.push(obj);
        saveData(data, 'DAY');
    }
}


export function addNewPersonToJSON(code, renderProfile) {
    const data = JSON.parse(getPersonStore());
    const indexDate = data.findIndex(x => x.code === code);
    if (indexDate !== -1) code+='*';
    const newPerson = { "personName": code, "contract": "", "dateBirth": "", "telNum": "", "code": code, "autoMonth": "", "notes": "", "remain": null, "days": null, "photoId": 0, "rent": null, "deposite": null, };
    data.push(newPerson);
    saveData(data, 'PERSON');
    addNewActivityDataToJSON({ "code": code, "activity": [{ "date": moment(new Date()).format('DD-MM-YYYY'), "time": moment(new Date()).format('HH:mm:ss'), "type": "Создание профиля", "person": "", "amount": "" }] });
    
    if (renderProfile) {
        store.dispatch({ type: 'CHANGE_ID', id: JSON.parse(getPersonStore()).length - 1});
        store.dispatch({ type: 'CHANGE_PAGE', page: 'PROFILE_PAGE' })
    }
}


export function pushNewActivity(code, activityObj) {
    const data = JSON.parse(getActivityStoreCode(code));
    data[0].activity.push(JSON.parse(activityObj));
    addNewActivityDataToJSON(data[0]);
}

export function addNewActivityDataToJSON(obj) {
    // take JSON string like {code:'123456, activity:[{...}]} and find, if already in list => change; if not in list => push new
    const data = JSON.parse(getActivityStore());
    const indexDate = data.findIndex(x => x.code === obj.code);
    if (indexDate !== -1) {
        data[indexDate] = obj;
        saveData(data, 'ACTIVITY');
    } else {
        data.push(obj);
        saveData(data, 'ACTIVITY');
    }
}

function changeCode(oldCode, newCode, activityObj) {
    const data = JSON.parse(getActivityStore());
    const id = data.findIndex(x => x.code === oldCode);
    data[id].code = newCode;
    data[id].activity.push(activityObj);
    saveData(data, 'ACTIVITY');
    changeCodeDayData(oldCode, newCode);
}





export function ChangeProfileValue(codeLink, inputValue, inputType, date = moment(new Date()).format('DD-MM-YYYY')) {
    /** Change field in profiles page -> get data from field and change in JSON file -> send to SQL dB */
    const data = JSON.parse(store.getState().personStore.data);
    const id = getIndexByCode(codeLink);
    const oldFieldValue = data[id][inputType];
    data[id][inputType] = inputValue;

    // in LEAD person date field for rent == field for first call => if change LEAD to other => rent=null
    if (oldFieldValue === 'ЛИД' && inputType === 'contract') data[id].rent = null;

    let time = moment(new Date()).format('HH:mm:ss');
    if (date !== moment(new Date()).format('DD-MM-YYYY')) time = '00:00:00'
    const activityObj = { "date": date, "time": time, "type": `Изменение ${  inputType}`, "person": "", "amount": `${oldFieldValue  } => ${  inputValue}` };

    if (inputType === 'code') changeCode(oldFieldValue, inputValue, activityObj);
    if (inputType !== 'photoId' && inputType !== 'notes' && inputType !== 'code') pushNewActivity(data[id].code, JSON.stringify(activityObj));

    saveData(data, 'PERSON');
}

export function getDaysLeft(date) {
    if (date === undefined || date === null) {
        return null;
    } 
        return (moment(date, 'DD-MM-YYYY').startOf('day').diff(moment().startOf('day'), 'days'))
}

export function renderPersonFunc(code) {
    /** Take id and render page for person with this id */
    const idNum = getIndexByCode(code);
    store.dispatch({ type: 'CHANGE_ID', id: idNum });
    store.dispatch({ type: 'CHANGE_PAGE', page: 'PROFILE_PAGE' })
}


export function getPhotoFunc(photoId) {
    /* Get path to photo/string with base64 */
    const NAME_MAX_LENGTH = 50;
    // Let's the magic begins!
    if (photoId === 0 || photoId === undefined) {
        return require('./images/0.jpg')
    } if ((photoId).toString().length < NAME_MAX_LENGTH && (photoId).toString().length > 1) {
        try {
            return require(`./images/${  photoId  }.JPG`)
        } catch (err) {
            try {
                return require(`./images/${  photoId  }.jpeg`);
            } catch (err) {
                try {
                    return require(`./images/${  photoId  }.jpg`);
                } catch (err) {
                    return require('./images/0.jpg');
                }
            }
        }
    } else {
        return photoId;
    }
}

function saveData(data, dataType) {
    switch (dataType) {
        case 'PERSON':
            store.dispatch({ type: 'CHANGE_PERSON_DATA', data: JSON.stringify(data) });
            break;
        case 'DAY':
            store.dispatch({ type: 'CHANGE_DAY_DATA', data: JSON.stringify(data) });
            break;
        case 'ACTIVITY':
            store.dispatch({ type: 'CHANGE_ACTIVITY_DATA', data: JSON.stringify(data) });
            break;
        default:
            break;
    }
}

export default App;