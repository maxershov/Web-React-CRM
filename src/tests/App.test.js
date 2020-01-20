import {getIndexByCode, getDaysLeft} from '../App';

test('get index by code', () => {
    const index = getIndexByCode('111111');
    expect(index).toBe(0);
})

test('getDaysLeft with null', () => {
    const daysLeft = getDaysLeft(null);
    expect(daysLeft).toBe(null);
})