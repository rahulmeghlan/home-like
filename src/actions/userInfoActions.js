import {FETCH_USER_INFO} from "./types";
import gql from "graphql-tag";
import constants from './../constants';
import client from './../ApolloClient'

export const fetchUserInfo = () => dispatch => {
    client.query({
        query: gql`query {
          user(login: ${constants.username}){
            avatarUrl, name, login, id
          }
        }`
    })
        .then(userInfo => dispatch({
            type: FETCH_USER_INFO,
            payload: userInfo
        }));
};


