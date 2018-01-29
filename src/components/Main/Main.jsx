import React, { Component } from 'react';
// import { Switch, Route } from 'react-router-dom';
import { Match, Miss, Redirect } from 'react-router'

import ExampleContainer from '../ExampleContainer/ExampleContainer';

class Main extends Component {
    loadView(fileName) {
        if (this.views[fileName]) {
            return this.views[fileName]
        }

        new Promise(resolve => require.ensure([], require => {
                resolve(require(`./views/${fileName}`))
            }))
            .then(View => this.views[fileName] = <View />)
            .then(() => this.forceUpdate())
            .catch(err => {
                console.error(err)
                throw new Error(err)
            })

        return <div />
    }

    render() {
        return (
            <main>
                <Switch>
                    <Match
                        pattern="/"
                        exactly
                        component={this.loadView.bind(this, 'home')}
                    />
                </Switch>
            </main>
        );
    }
}

export default Main;
