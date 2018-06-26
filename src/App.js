import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-boost';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomeView from './views/HomeView';
import RepoDetailView from './views/RepoDetailView';
import client from './ApolloClient';


class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                    <div>
                        <Route exact path="/" component={HomeView}/>
                        <Switch>
                            <Route exact path="/:reponame" component={RepoDetailView}/>
                        </Switch>
                    </div>
                </Router>
            </ApolloProvider>
        );
    }
}

export default App;
