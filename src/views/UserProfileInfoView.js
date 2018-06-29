import React from 'react';
import {fetchUserInfo} from "../actions/userInfoActions";
import {connect} from "react-redux";

class UserProfileInfoView extends React.Component {

    componentWillMount() {
        this.props.fetchUserInfo();
    }

    render() {
        let {userInfo} = this.props;
        if (!Object.keys(userInfo).length) {
            return <div>Loading...</div>
        } else {
            window.sessionStorage.userId = userInfo.data.user.id;
            return <div>
                <a href="/"><img className="avatar"
                                 alt={userInfo.data.user.name}
                                 src={userInfo.data.user.avatarUrl}/> </a>
                <p className='user-name'>{userInfo.data.user.name}</p>
                <p className='login-name'>{userInfo.data.user.login}</p>
            </div>;
        }
    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo.details
});

export default connect(mapStateToProps, {fetchUserInfo})(UserProfileInfoView)
