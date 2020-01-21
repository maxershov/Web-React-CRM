import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MainPage } from '../Components/MainPage'
import { personData, dayData } from '../store/testData'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

test('should render MainPage correctly', () => {
  const wrapper = shallow(<MainPage personData={JSON.stringify(personData)} dayData={JSON.stringify(dayData)} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});