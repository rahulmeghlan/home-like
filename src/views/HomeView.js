import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import PinnedRepoView from './PinnedRepoView'
import UserProfileInfoView from './UserProfileInfoView';

const query = gql`{
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
}`;

class HomeView extends React.Component {
    render() {
        let {data} = this.props;
        if (data.loading) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <div className='col-3 float-left'>
                    <UserProfileInfoView/>
                </div>
                <div className='col-9 float-left'>
                    <div className='pinned-repos-list'>
                        {data.viewer.repositories.edges.map((item, index) => (
                            <PinnedRepoView key={index} info={item.node}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

HomeView = graphql(query)(HomeView);
export default HomeView;
