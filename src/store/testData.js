import moment from 'moment';

export const dayData = [{"date": moment(new Date()).format('DD-MM-YYYY'),"notes":"Заметки меняются при изменении даты","history":[]}];

export const personData = [
    {"personName":"Иванов Иван Иванович","contract":"12 мес","dateBirth":"29-02-1980","telNum":"","code":"111111","autoMonth":"02","remain":null,"days":"10-10-2021","photoId":0,"rent":"10-02-2021","deposite":2000,"notes":"Работает строителем"},
{"personName":"Первый Иван Иванович","contract":"3 мес","dateBirth":"01-01-1970","telNum":"+7916*******","code":"222222","autoMonth":"","remain":null,"days":"10-12-2020","photoId":0,"rent":null,"deposite":null,"notes":""},
{"personName":"Второй Иван Иванович","contract":"6 мес","dateBirth":"","telNum":"+7916*******","code":"333333","autoMonth":"","remain":null,"days":"10-11-2020","photoId":0,"rent":null,"deposite":1000,"notes":""},
{"personName":"Test 0","contract":"ЛИД","dateBirth":"","telNum":"+7916","code":"444444","autoMonth":"","remain":null,"days":"10-11-2020","photoId":0,"rent":null,"deposite":1000,"notes":""},
{"personName":"Test 1","contract":"ЛИД","dateBirth":"","telNum":"+791","code":"555555","autoMonth":"","remain":null,"days":"10-11-2020","photoId":0,"rent":null,"deposite":1000,"notes":""},
{"personName":"Test 2","contract":"НЕТ","dateBirth":"","telNum":"+791","code":"666666","autoMonth":"","remain":null,"days":"10-11-2020","photoId":0,"rent":null,"deposite":1000,"notes":""},
{"personName":"Test 3","contract":"НЕТ","dateBirth":"","telNum":"+791","code":"777777","autoMonth":"","remain":null,"days":"10-11-2020","photoId":0,"rent":null,"deposite":1000,"notes":""},
{"personName":"Test 4","contract":"СОТРУДНИК","dateBirth":"","telNum":"+791","code":"888888","autoMonth":"","remain":null,"days":"10-11-2020","photoId":0,"rent":null,"deposite":1000,"notes":""},
{"personName":"Test 5","contract":"СОТРУДНИК","dateBirth":"","telNum":"+791","code":"999999","autoMonth":"","remain":null,"days":"10-11-2020","photoId":0,"rent":null,"deposite":1000,"notes":""},
{"personName":"Test 6","contract":"СОТРУДНИК","dateBirth":"","telNum":"+791","code":"0000000","autoMonth":"","remain":null,"days":"10-11-2020","photoId":0,"rent":null,"deposite":1000,"notes":""}
];

export const activityData = [{"code":"111111","activity":[{"date":"18-12-2019","time":"10:35:44","type":"Посещение","person":"","amount":""}]},
{"code":"222222","activity":[{"date":"19-12-2019","time":"21:23:01","type":"Посещение","person":"","amount":""},
{"date":"19-12-2019","time":"21:25:20","type":"Парковка","person":"","amount":"За январь"}]},
{"code":"333333","activity":[{"date":"21-12-2019","time":"11:59:05","type":"Посещение","person":"","amount":""},
{"date":"21-12-2019","time":"12:25:40","type":"Продажа","person":"","amount":"Продажа доп.услуги"},
{"date":"21-12-2019","time":"11:30:21","type":"ПТ","person":"Иванов Сергей Сергеевич","amount":""}]},
{"code":"333333","activity":[]},
{"code":"444444","activity":[]},
{"code":"555555","activity":[]},
{"code":"666666","activity":[]},
{"code":"777777","activity":[]},
{"code":"888888","activity":[]},
{"code":"999999","activity":[]},
{"code":"0000000","activity":[]}
];