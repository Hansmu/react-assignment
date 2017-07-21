import { renderComponent, expect } from '../test_helper';
import { assert } from 'chai';
import NodesIO from '../../src/containers/nodes-io';

describe('Nodes IO', () => {
    let component;

    beforeEach(() => {
        const props = { main: {nodes:  [{"name":"bob","children":[{"name":"1-2-3","children":[{"name":"5-67-","children":[],"isOpen":true}],"isOpen":true}],"isOpen":true},{"name":"richard","children":[],"isOpen":true}]}};
        component = renderComponent(NodesIO, null, props);
    });

    it('Save to local storage', () => {
        window.localStorage.setItem('nodes', []);
        component.find('#local-storage-save').simulate('click');

        assert(window.localStorage.getItem('nodes'), [{"name":"bob","children":[{"name":"1-2-3","children":[{"name":"5-67-","children":[],"isOpen":true}],"isOpen":true}],"isOpen":true},{"name":"richard","children":[],"isOpen":true}]);
    });

    it('Save and load from local storage', () => {
        window.localStorage.setItem('nodes', '[{"name":"china","children":[{"name":"1-2-3","children":[{"name":"5-67-","children":[],"isOpen":true}],"isOpen":true}],"isOpen":true},{"name":"richard","children":[],"isOpen":true}]');
        component.find('#local-storage-load').simulate('click');

        component.find('#local-storage-save').simulate('click');

        assert(window.localStorage.getItem('nodes'), [{"name":"china","children":[{"name":"1-2-3","children":[{"name":"5-67-","children":[],"isOpen":true}],"isOpen":true}],"isOpen":true},{"name":"richard","children":[],"isOpen":true}]);
    });
});