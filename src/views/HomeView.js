import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

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
                {data.viewer.repositories.edges.map((item, index) => (
                    <div>
                        <p>{item.node.name}</p>
                        <p>{item.node.description}</p>
                    </div>
                ))}
            </div>
        )
    }
}

HomeView = graphql(query)(HomeView);
export default HomeView;
