import React, {Component} from 'react';
import {
    ApolloProvider,
    createBatchingNetworkInterface
} from 'react-apollo';
import ApolloClient from 'apollo-boost';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomeView from './views/HomeView';
import RepoDetailView from './views/RepoDetailView';
import {constants} from './constants';

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    headers: {
        Authorization: 'bearer 40d1db69fe5e04e54edefb0fa377a6eae8edf47b'
    }
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                    <div className='container-lg clearfix'>
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
