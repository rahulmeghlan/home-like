import React from 'react';
import PinnedRepoView from './PinnedRepoView'
import UserProfileInfoView from './UserProfileInfoView';
import {connect} from 'react-redux';
import {fetchRepoList} from './../actions/repoListActions';

class HomeView extends React.Component {
    componentWillMount() {
        this.props.fetchRepoList();
    }

    render() {
        let {repoList} = this.props;
        if (!Object.keys(repoList).length) {
            return <div>Loading...</div>
        }

        return (
            <div className='container-lg clearfix'>
                <div className='col-3 float-left'>
                    <UserProfileInfoView/>
                </div>
                <div className='col-9 float-left'>
                    <div className='pinned-repos-list'>
                        {repoList.data.viewer.repositories.edges.map((item, index) => (
                            <PinnedRepoView key={index} info={item.node}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    repoList: state.repoList.repos
});

export default connect(mapStateToProps, {fetchRepoList})(HomeView)
