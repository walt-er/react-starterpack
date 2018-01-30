import React, { Component } from 'react';
import ExampleComponent from '../../components/ExampleComponent/ExampleComponent';

class ExampleContainer2 extends Component {

    render() {
        return (
          <div className="example-container">
            <h1>Another Test</h1>
            <ExampleComponent />
          </div>
        );
    }
}

export default ExampleContainer2;
