import React from 'react';
import {fetchUserInfo} from "../actions/userInfoActions";
import {connect} from "react-redux";

class UserProfileInfoView extends React.Component {

    render() {
        console.log(this.props);
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

const mapStateToProps = state => ({
    userInfo: state.userInfo.details
});

export default connect(mapStateToProps, {fetchUserInfo})(UserProfileInfoView)
