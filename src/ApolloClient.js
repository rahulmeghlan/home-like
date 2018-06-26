import ApolloClient from "apollo-boost/lib/index";
import constants from "./constants";

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    headers: {
        Authorization: 'bearer ' + constants.token
    }
});

export default client;
