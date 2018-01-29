import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Match } from 'react-router';

// import ExampleContainer from '../../views/ExampleContainer/ExampleContainer';

class Main extends Component {
    loadView(fileName) {
        return () => {
            if (this.views[fileName]) {
                return this.views[fileName];
            }

            new Promise(resolve => require.ensure([], (require) => {
                resolve(require(`../../views/${fileName}/${fileName}`)); // eslint-disable-line
            }))
                .then((View) => {
                    this.views[fileName] = <View />;
                })
                .then(() => this.forceUpdate())
                .catch((err) => {
                    // console.error(err);
                    throw new Error(err);
                });

            return <div />;
        };
    }

    render() {
        return (
            <main>
                <Switch>
                    <Match
                        pattern="/"
                        exactly
                        component={this.loadView('home')}
                    />
                </Switch>
            </main>
        );
    }
}

export default Main;
