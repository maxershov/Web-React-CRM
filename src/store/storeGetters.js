import store from './store';


export function getStoreId() {
    return store.getState().idStore.id;
}

export function getPersonStore() {
    console.log('getPersonStoreFromGETTER');
    return store.getState().personStore.data;
}

export function getDayDataStore() {
    return store.getState().dayDataStore.data;
}

export function getActivityStore() {
    return store.getState().activityStore.data;
}

export function getActivityStoreCode(codeTo) {
    const data = JSON.parse(getActivityStore());
    return JSON.stringify(data.filter(obj => { return obj.code === codeTo }));
}

store.subscribe(() => {
    // console.log('From subscr ' + store.getState().idStore.id);
    // console.log('SUBSCRIBE RFID ' + store.getState().dayDataStore.data);
    // console.log('SUBSCRIBE PERSON ' + store.getState().personStore.data);
    // console.log('From subscr ' + store.getState().renderStore.page);
    // console.log('SUBSCRIBE ACTIVITY ' + store.getState().activityStore.data);
})