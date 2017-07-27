import { renderComponent } from '../test_helper';
import { assert } from 'chai';
import NodesIO from '../../src/containers/nodes-io';

describe('Nodes IO', () => {
    let component;

    const defaultState = [{"name":"bob","children":[{"name":"1-2-3","children":[{"name":"5-67-","children":[],"isOpen":true}],"isOpen":true}],"isOpen":true},{"name":"richard","children":[],"isOpen":true}];
    const defaultStateAsString = '[{"name":"bob","children":[{"name":"1-2-3","children":[{"name":"5-67-","children":[],"isOpen":true}],"isOpen":true}],"isOpen":true},{"name":"richard","children":[],"isOpen":true}]';

    const modifiedStateAsString = '[{"name":"china","children":[{"name":"1-2-3","children":[{"name":"5-67-","children":[],"isOpen":true}],"isOpen":true}],"isOpen":true},{"name":"richard","children":[],"isOpen":true}]';
    const modifiedState = [{"name":"china","children":[{"name":"1-2-3","children":[{"name":"5-67-","children":[],"isOpen":true}],"isOpen":true}],"isOpen":true},{"name":"richard","children":[],"isOpen":true}];

    beforeEach(() => {
        window.localStorage.setItem('nodes', []);

        const props = { main: {nodes:  defaultState}};
        component = renderComponent(NodesIO, null, props);
    });

    it('Save to local storage', () => {
        component.find('#local-storage-save').simulate('click');

        assert(window.localStorage.getItem('nodes'), defaultState);
    });

    it('Save and load from local storage', () => {
        window.localStorage.setItem('nodes', modifiedStateAsString);
        component.find('#local-storage-load').simulate('click');

        component.find('#local-storage-save').simulate('click');

        assert(window.localStorage.getItem('nodes'), modifiedState);
    });

    it('Load state from local file', () => {
        component = renderComponent(NodesIO);

        const fileContents = { fileContents: defaultStateAsString };
        const file = new Blob([fileContents], { type: 'text/plain' });

        component.find('input').simulate('change', {target: {files: [file]}});
        component.find('#local-storage-save').simulate('click');

        assert(window.localStorage.getItem('nodes'), defaultState);
    });

    it('Save to and load from server', () => {
        component.find('#remote-save').simulate('click');

        window.localStorage.setItem('nodes', '[]');
        component.find('#local-storage-load').simulate('click');

        component.find('#remote-load').simulate('click');
        component.find('#local-storage-save').simulate('click');

        assert(window.localStorage.getItem('nodes'), defaultState);
    });
});