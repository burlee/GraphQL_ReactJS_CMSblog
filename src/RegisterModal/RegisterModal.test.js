import React from 'react';
import { shallow , configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RegisterModal from './RegisterModal'

configure({adapter: new Adapter()});
describe('<RegisterModal/>', () => {
    it('should render registerModal component', () => {
        const wrapper = shallow(<RegisterModal/>);
    })
})