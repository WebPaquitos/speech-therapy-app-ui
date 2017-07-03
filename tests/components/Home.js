import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Home from '../../app/components/home';

describe('Home Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Home />);
    });

    it('should exist', () => {
        expect(wrapper).to.exist;
    });

    it('should have one heading', () => {
        expect(wrapper.find('#cenas').type()).to.equal('h2');
    });
});
