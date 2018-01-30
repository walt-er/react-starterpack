import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';

import ExampleContainer from '../../views/ExampleContainer/ExampleContainer';
import ExampleContainer2 from '../../views/ExampleContainer2/ExampleContainer2';

const allViews = {
    home: ExampleContainer,
    test: ExampleContainer2
};

class Main extends Component {

    componentWillMount() {
        this.views = [];
    }

    loadView(view) {
        return () => {

            // Return the view if we found it before
            if (this.views && this.views[view]) {
                return this.views[view];
            }

            // Get and save component by nicename
            const TheComponent = allViews[view];
            this.views[view] = <TheComponent {...this.props} />;
            return this.views[view];

        };
    }

    render() {
        return (
            <main>
                <Switch>
                    <Route
                        path="/"
                        component={this.loadView('home')}
                    />
                    <Route
                        path="/test/"
                        component={this.loadView('test')}
                    />
                </Switch>
            </main>
        );
    }
}

export default Main;
