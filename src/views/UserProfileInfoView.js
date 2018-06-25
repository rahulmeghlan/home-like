import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import constants from './../constants';

const query = gql`query {
  user(login: ${constants.username}){
    avatarUrl, name, login, id
  }
}`;

class UserProfileInfoView extends React.Component {

    render() {
        let {data} = this.props;
        if (data.loading) {
            return <div>Loading...</div>
        } else {
            window.sessionStorage.userId = data.user.id;
            return <div>
                <a href="/"><img className="avatar" alt={data.user.name} src={data.user.avatarUrl}/> </a>
                <p className='user-name'>{data.user.name}</p>
                <p className='login-name'>{data.user.login}</p>
            </div>;
        }
    }
}

UserProfileInfoView = graphql(query)(UserProfileInfoView);
export default UserProfileInfoView;
