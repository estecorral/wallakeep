import React from "react";
import { shallow } from 'enzyme';
import Detail from "./Detail";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('Detail', () => {
    const props = {
        getAdd: jest.fn(),
        adID: '1',
    };
    const render = props => shallow(<Detail {...props} />);
    let wrapper;

    beforeEach(() => {
        wrapper = render();

    });
    it ('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it ('should render', () => {
        expect(wrapper.exists()).toBe(true);
    });
});

