import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExampleComponent from '../ExampleComponent/ExampleComponent';

class ExampleContainer extends Component {
    constructor(props) {
        super(props);
        this.testMethod();
    }

    testMethod() {
        const x = 1;
        return x;
    }

    render() {
        return (
          <div className="example-container">
            <h1>{this.props.name}</h1>
            <ExampleComponent />
          </div>
        );
    }
}

ExampleContainer.propTypes = {
    name: PropTypes.string.isRequired
};

export default ExampleContainer;
