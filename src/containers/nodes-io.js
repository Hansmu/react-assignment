import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone'
import { Glyphicon, Button, Row } from 'react-bootstrap';
import FileUtils from '../../utils/file-utils';
import FileSaver from 'file-saver';

import { updateNodes, saveStateToLocalStorage, loadStateFromLocalStorage, readStateFromServer, saveStateToServer } from '../actions';

class NodesView extends Component {

    constructor(props) {
        super(props);

        this.onDrop = this.onDrop.bind(this);
        this.saveFile = this.saveFile.bind(this);
        this.saveStateToServer = this.saveStateToServer.bind(this);
    }

    onDrop(files) {
        const file = files[0];

        FileUtils.readAsText(file, (result) => {
            const nodes = JSON.parse(result);
            this.props.dispatch(updateNodes(nodes));
        });
    }

    saveFile() {
        const nodes = JSON.stringify(this.props.nodes);
        const blob = new Blob([nodes], {type: 'text/plain;charset=utf-8'});
        FileSaver.saveAs(blob, 'nodes.txt');
    }

    saveStateToServer() {
        const nodes = JSON.stringify(this.props.nodes);
        const blob = new Blob([nodes], {type: 'text/plain;charset=utf-8'});
        FileUtils.readAsDataUrl(blob, (result) => {
            const base64data = {encoding: result};
            this.props.dispatch(saveStateToServer(base64data));
        });
    }

    render() {
        return (
            <div>
                <Button id="local-storage-save"
                        onClick={() => this.props.dispatch(saveStateToLocalStorage())}>
                    Save To Local Storage
                </Button>
                <Button id="local-storage-load"
                        onClick={() => this.props.dispatch(loadStateFromLocalStorage())}>
                    Load From Local Storage
                </Button>

                <hr/>

                <Button id="file-save"
                        onClick={this.saveFile}>
                    Save To File
                </Button>
                <div className="dropzone">
                    <Dropzone multiple={false}
                              onDrop={this.onDrop}>
                        <p>Load From File</p>
                    </Dropzone>
                </div>

                <hr/>

                <Button id="remote-load"
                        onClick={() => this.props.dispatch(readStateFromServer())}>
                    Load From Server
                </Button>
                <Button id="remote-save"
                        onClick={this.saveStateToServer}>
                    Save To Server
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    nodes: state.main.nodes
});

export default connect(mapStateToProps, dispatch => ({dispatch}))(NodesView);
