import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import HomeView from './views/HomeView';
import RepoDetailView from './views/RepoDetailView';
import client from './ApolloClient';
import store from './store';

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <Router>
                        <div>
                            <Route exact path="/" component={HomeView}/>
                            <Switch>
                                <Route exact path="/:reponame" component={RepoDetailView}/>
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </ApolloProvider>
        );
    }
}

export default App;
