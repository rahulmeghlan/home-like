import React from 'react';
import gql from 'graphql-tag';
import {ApolloConsumer} from 'react-apollo';

export default class RepoDetailView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {detail: null};
    }

    setRepoDetailDep(client) {
        this.query = gql`{
          viewer {
            repository(name: "${this.props.match.params.reponame}") {
              object(expression: "master:") {
              ... on Tree{
                entries{
                  name
                  type
                  mode
                }
              }
            }
            }
          }
        }`;
        this.client = client;
    }

    async getRepoDetail(client, query) {
        return await client.query({
            query: query
        });
    }

    componentDidMount() {
        this.getRepoDetail(this.client, this.query).then((res) => {
            this.setState({
                detail: res.data.viewer.repository.object.entries
            });
        })
    }

    render() {
        return <ApolloConsumer>
            {client => (
                <div>
                    {this.setRepoDetailDep(client)}
                    {this.state.detail && this.state.detail.map((item, index) => (
                        <div key={index}>{item.name} ==== {item.type}</div>
                    ))}
                </div>
            )}
        </ApolloConsumer>
    }
}
