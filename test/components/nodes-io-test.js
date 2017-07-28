import { renderComponent } from '../test_helper';
import { assert } from 'chai';
import sinon from 'sinon';
import FileSaver from 'file-saver';
import FileUtils from '../../utils/file-utils';
import RequestUtils from '../../utils/request-utils';
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

        assert.equal(window.localStorage.getItem('nodes'), defaultStateAsString);
    });

    it('Save and load from local storage', () => {
        window.localStorage.setItem('nodes', modifiedStateAsString);
        component.find('#local-storage-load').simulate('click');

        component.find('#local-storage-save').simulate('click');

        assert.equal(window.localStorage.getItem('nodes'), modifiedStateAsString);
    });

    it('Load state from local file', () => {
        component = renderComponent(NodesIO);

        const fileContents = { fileContents: defaultStateAsString };
        const file = new Blob([fileContents], { type: 'text/plain' });

        const stub = sinon.stub(FileUtils, 'readAsText').callsFake((blob) => {
            assert.deepEqual(blob, file);
        });

        component.find('input').simulate('change', {target: {files: [file]}});
    });

    it('Save state to file', () => {
        const nodes = JSON.stringify(defaultState);
        const expectedBlob = new Blob([nodes], {type: 'text/plain;charset=utf-8'});

        const stub = sinon.stub(FileSaver, 'saveAs').callsFake((blob, fileName) => {
            assert.deepEqual(blob, expectedBlob);
        });

        component.find('#file-save').simulate('click');
    });

    it('Save to server', () => {
        const nodes = JSON.stringify(defaultState);
        const expectedBlob = new Blob([nodes], {type: 'text/plain;charset=utf-8'});

        const stub = sinon.stub(FileUtils, 'readAsDataUrl').callsFake((blob) => {
            assert.deepEqual(blob, expectedBlob);
        });

        component.find('#remote-save').simulate('click');
    });

    it('Load from server', () => {
        const stub = sinon.stub(RequestUtils, 'getRequest');
        stub.returns({data: {encoding: "data:text/plain;charset=utf-8;base64,W3sibmFtZSI6ImJvYiIsImNoaWxkcmVuIjpbeyJuYW1lIjoiMS0yLTMiLCJjaGlsZHJlbiI6W3sibmFtZSI6IjUtNjctIiwiY2hpbGRyZW4iOltdLCJpc09wZW4iOnRydWV9XSwiaXNPcGVuIjp0cnVlfV0sImlzT3BlbiI6dHJ1ZX0seyJuYW1lIjoicmljaGFyZCIsImNoaWxkcmVuIjpbXSwiaXNPcGVuIjp0cnVlfV0="}});

        window.localStorage.setItem('nodes', '[]');
        component.find('#local-storage-load').simulate('click');

        component.find('#remote-load').simulate('click');
        component.find('#local-storage-save').simulate('click');

        assert.equal(window.localStorage.getItem('nodes'), defaultStateAsString);
    });
});