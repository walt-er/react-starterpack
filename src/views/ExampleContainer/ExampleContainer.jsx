import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ExampleComponent from '../../components/ExampleComponent/ExampleComponent';

class ExampleContainer extends Component {

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
