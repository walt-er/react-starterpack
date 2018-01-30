import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';

import ExampleContainer from '../../views/ExampleContainer/ExampleContainer';

const allViews = {
    home: ExampleContainer
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
                </Switch>
            </main>
        );
    }
}

export default Main;
