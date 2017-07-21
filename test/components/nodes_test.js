import { renderComponent, expect } from '../test_helper';
import Nodes from '../../src/containers/nodes-view';

describe('Nodes View', () => {
    let component;

    beforeEach(() => {
        component = renderComponent(Nodes);
    });

    it('Add nested children', () => {
        component.find('button').simulate('click');
        component.find('#node-name-field').simulate('change', 'bob');
        component.find('#modify-field').simulate('click');

        component.find('#add-parent').simulate('click');
        component.find('#node-name-field').simulate('change', 'richard');
        component.find('#modify-field').simulate('click');

        component.find('#add-child-0').simulate('click');
        component.find('#node-name-field').simulate('change', '1-2-3');
        component.find('#modify-field').simulate('click');

        expect(component.find('a').length).to.equal(3);
        expect(component.find('#node-name-0')).to.have.text(' bob ');
        expect(component.find('#node-name-1')).to.have.text(' richard ');
        expect(component.find('#node-name-0-0')).to.have.text(' 1-2-3 ');
    });

    describe('Edit elements', () => {

        beforeEach(() => {
            const props = { main: {nodes:  [{"name":"bob","children":[{"name":"1-2-3","children":[{"name":"5-67-","children":[],"isOpen":true}],"isOpen":true}],"isOpen":true},{"name":"richard","children":[],"isOpen":true}]}};
            component = renderComponent(Nodes, null, props);
        });

        it('Remove parent', () => {
            component.find('#delete-child-0').simulate('click');

            expect(component.find('a').length).to.equal(1);
            expect(component.find('#node-name-0')).to.have.text(' richard ');
        });

        it('Edit child', () => {
            expect(component.find('#node-name-0-0')).to.have.text(' 1-2-3 ');

            component.find('#edit-child-0-0').simulate('click');
            component.find('#node-name-field').simulate('change', 'middle-node');
            component.find('#modify-field').simulate('click');

            expect(component.find('a').length).to.equal(4);
            expect(component.find('#node-name-0-0')).to.have.text(' middle-node ');
        });
    });

});