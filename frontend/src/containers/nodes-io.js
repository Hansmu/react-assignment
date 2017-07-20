import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone'
import { Glyphicon, Button, Row } from 'react-bootstrap';
import FileSaver from 'file-saver';

import { updateNodes, saveStateToLocalStorage, loadStateFromLocalStorage } from '../actions';

class NodesView extends Component {

    constructor(props) {
        super(props);

        this.onDrop = this.onDrop.bind(this);
        this.saveFile = this.saveFile.bind(this);
    }

    onDrop(files) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const nodes = JSON.parse(event.target.result);
            this.props.dispatch(updateNodes(nodes));
        };

        reader.readAsText(file);
    }

    saveFile() {
        const nodes = JSON.stringify(this.props.nodes);
        const blob = new Blob([nodes], {type: 'text/plain;charset=utf-8'});
        FileSaver.saveAs(blob, 'nodes.txt');
    }

    render() {
        return (
            <div>
                <Button onClick={() => this.props.dispatch(saveStateToLocalStorage())}>
                    Save To Local Storage
                </Button>
                <Button onClick={() => this.props.dispatch(loadStateFromLocalStorage())}>
                    Load From Local Storage
                </Button>

                <hr/>

                <Button onClick={this.saveFile}>
                    Save To File
                </Button>
                <div className="dropzone">
                    <Dropzone multiple={false}
                              onDrop={this.onDrop}>
                        <p>Load From File</p>
                    </Dropzone>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    nodes: state.main.nodes
});

export default connect(mapStateToProps, dispatch => ({dispatch}))(NodesView);
