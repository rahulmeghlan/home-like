import {FETCH_REPO_LIST} from "./types";
import gql from "graphql-tag";
import client from './../ApolloClient'

export const fetchRepoList = () => dispatch => {
    client.query({
        query: gql`{
          viewer {
            repositories(first: 30) {
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  name, description
                }
              }
            }
          }
        }`
    })
        .then(repos => dispatch({
            type: FETCH_REPO_LIST,
            payload: repos
        }));
};


