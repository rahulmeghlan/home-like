import React from 'react';
import gql from 'graphql-tag';
import {ApolloConsumer} from 'react-apollo';
import Octicon from 'react-octicon'

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
                detail: res.data.viewer.repository.object ? res.data.viewer.repository.object.entries : []
            });
        })
    }

    render() {
        return <ApolloConsumer>
            {client => (
                <div>
                    <div className='pagehead repohead'>
                        <div className='repohead-details-container clearfix'>
                            <ul className='pagehead-actions'>

                            </ul>
                            <h1 className='public'>{this.props.match.params.reponame}</h1>
                        </div>
                    </div>
                    {this.setRepoDetailDep(client)}
                    <div className='container'>
                        <div className='commit-tease'></div>
                        <table className='files'>
                            <tbody>
                            {this.state.detail && this.state.detail.map((item, index) => (
                                <tr key={index}>
                                    <td className='icon'>
                                        <Octicon name={item.type === 'tree' ? 'file-directory' : 'file'}/>
                                    </td>
                                    <td className={index === 0 ? "first-child content" : "content"}>{item.name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </ApolloConsumer>
    }
}
