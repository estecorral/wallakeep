import React from "react";
import { shallow } from 'enzyme';
import Detail from "./Detail";

describe('Detail', () => {
    const props = {
        getAdd: jest.fn(),
        adID: '1',
        add: {
            photo: 'photo',
            name: 'NameAd',
            price: '300',
            type: 'sell',
            description: 'lalalalalala',
            tags: ['work'],
        }
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
    it ('should render a advert info', () => {
       expect(wrapper.find('Figure').props.items);
    });
});

