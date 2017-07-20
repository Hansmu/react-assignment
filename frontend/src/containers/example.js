import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getHelloWorldExample, getExamples } from '../actions';

class Example extends Component {

    componentWillMount() {
        this.props.dispatch(getHelloWorldExample());
        this.props.dispatch(getExamples());
    }

    createListOfExamples(examples) {
        console.log(examples);
        return examples.map((example, index) => {
            return (
                <div key={index}>
                    <p> { example.id } </p>
                    <p> { example.firstName } </p>
                    <p> { example.lastName } </p>
                </div>
            );
        });
    }

    render () {
        return (
            <div>
                { this.props.helloMessage }
                { this.createListOfExamples(this.props.examples) }
            </div>
        );
    }
}

Example.propTypes = {
    helloMessage: PropTypes.string,
    examples: PropTypes.array,
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
    helloMessage: state.main.helloWorldMessage,
    examples: state.main.examples
});

export default connect(mapStateToProps, dispatch => ({dispatch}))(Example);
