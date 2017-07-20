import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone'
import { Glyphicon, Button, Row } from 'react-bootstrap';
import FileSaver from 'file-saver';

import { updateNodes, saveStateToLocalStorage, loadStateFromLocalStorage, saveStateToFile, loadStateFromFile } from '../actions';

class NodesView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAddingNode: false,
            isEditingNode: false,
            nodeBeingModified: '',
            nodeName: ''
        };

        this.onDrop = this.onDrop.bind(this);
        this.addNode = this.addNode.bind(this);
        this.renderNode = this.renderNode.bind(this);
        this.findAndModifyNode = this.findAndModifyNode.bind(this);
        this.findAndRemoveNode = this.findAndRemoveNode.bind(this);
        this.renderNodeChildren = this.renderNodeChildren.bind(this);
    }

    createNode(name, children=[], isOpen=true) {
        return { name, children, isOpen };
    }

    addNode(hierarchyLocation=[]) {
        const nodeName = this.state.nodeName;
        const nodes = this.props.nodes;
        let currentNode = nodes;
        const newNode = this.createNode(nodeName);

        if (hierarchyLocation.length > 0) {
            hierarchyLocation.forEach(location => {
                currentNode = currentNode[location].children;
            });
        }

        currentNode.push(newNode);

        this.props.dispatch(updateNodes(nodes));

        this.setState({
            isAddingNode: false,
            nodeBeingModified: '',
            nodeName: ''
        });
    }

    findAndRemoveNode(hierarchyLocation = []) {
        const nodes = this.props.nodes;
        let currentNode = nodes;

        if (hierarchyLocation.length > 0) {
            hierarchyLocation.forEach((location, index) => {
                if (index + 1 === hierarchyLocation.length) {
                    currentNode.splice(location, 1);
                } else {
                    currentNode = currentNode[location].children;
                }
            });
        }

        this.props.dispatch(updateNodes(nodes));
    }

    findAndModifyNode(hierarchyLocation = []) {
        const nodes = this.props.nodes;
        let currentNode = nodes;

        if (hierarchyLocation.length > 0) {
            hierarchyLocation.forEach((location, index) => {
                if (index + 1 === hierarchyLocation.length) {
                    currentNode[location].name = this.state.nodeName;
                } else {
                    currentNode = currentNode[location].children;
                }
            });
        }

        this.props.dispatch(updateNodes(nodes));

        this.setState({
            isEditingNode: false,
            nodeBeingModified: '',
            nodeName: ''
        });
    }

    renderNodeAddField(hierarchyLocation = []) {
        return this.renderNodeModificationField(this.addNode, hierarchyLocation);
    }

    renderNodeModifyField(hierarchyLocation = []) {
        return this.renderNodeModificationField(this.findAndModifyNode, hierarchyLocation);
    }

    renderNodeModificationField(modificationAction, hierarchyLocation=[]) {
        return (
            <div>
                <input type="text"
                       value={this.state.nodeName}
                       onChange={event => this.setState({nodeName: event.target.value})}/>
                <Button bsStyle="success"
                        onClick={() => modificationAction(hierarchyLocation)}>
                    <Glyphicon glyph="ok"/>
                </Button>
                <Button bsStyle="danger"
                        onClick={() => this.setState({isAddingNode: false, isEditingNode: false, nodeBeingModified: ''})}>
                    <Glyphicon glyph="remove"/>
                </Button>
            </div>
        );
    }

    renderNodeModificationControls(hierarchyLocation) {
        return (
            <div>
                <Button bsStyle="success"
                        onClick={() => this.setState({isAddingNode: true, nodeBeingModified: hierarchyLocation.toString()})}>
                    Add Child <Glyphicon glyph="plus"/>
                </Button>
                <Button bsStyle="success"
                        onClick={() => this.setState({isEditingNode: true, nodeBeingModified: hierarchyLocation.toString()})}>
                    <Glyphicon glyph="pencil"/>
                </Button>
                <Button bsStyle="danger" onClick={() => this.findAndRemoveNode(hierarchyLocation)}>
                    <Glyphicon glyph="trash"/>
                </Button>
            </div>
        );
    }

    renderNode(node, hierarchyLocation) {
        const isNodeBeingModified = this.state.nodeBeingModified === hierarchyLocation.toString();

        return (
            <div>
                <a href="javascript:void(0)"> { node.name } </a>
                { (!this.state.isAddingNode && !this.state.isEditingNode) && this.renderNodeModificationControls(hierarchyLocation) }
                { this.state.isAddingNode && isNodeBeingModified && this.renderNodeAddField(hierarchyLocation) }
                { this.state.isEditingNode && isNodeBeingModified && this.renderNodeModifyField(hierarchyLocation)}
            </div>
        );
    }

    renderNodeChildren(nodeChildren, hierarchyLocation=[]) {
        return (
            <ul>
                {
                    nodeChildren.map((children, index) => {
                        hierarchyLocation.push(index);
                        const currentNodeLocation = hierarchyLocation.slice();

                        return (
                            <li key={`${children.name}-${hierarchyLocation.toString()}`}>
                                { this.renderNode(children, currentNodeLocation) }
                                { children.isOpen && this.renderNodeChildren(children.children, hierarchyLocation) }
                                { hierarchyLocation.length > 0 && hierarchyLocation.pop() }
                            </li>
                        );
                    })
                }
            </ul>
        );
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
        const nodes = JSON.stringify(this.props.nodes)
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
                <Button onClick={() => this.saveFile()}>
                    Save To File
                </Button>
                <div className="dropzone">
                    <Dropzone multiple={false} onDrop={this.onDrop.bind(this)}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </div>

                <Button onClick={() => this.props.dispatch(loadStateFromFile())}>
                    Load From File
                </Button>

                <br/>

                { this.state.isAddingNode && this.state.nodeBeingModified.length === 0 &&  this.renderNodeAddField() }

                { !this.state.isAddingNode &&
                    <Button bsStyle="success"
                            onClick={() => this.setState({isAddingNode: true})}>
                        Add Parent <Glyphicon glyph="plus"/>
                    </Button>
                }

                <ul>
                    { this.renderNodeChildren(this.props.nodes) }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    nodes: state.main.nodes
});

export default connect(mapStateToProps, dispatch => ({dispatch}))(NodesView);
