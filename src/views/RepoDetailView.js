import React from 'react';
import gql from 'graphql-tag';
import {ApolloConsumer} from 'react-apollo';
import Octicon from 'react-octicon'
import EditRepoDetailView from './EditRepoDetailView';
import ToggleStarView from './ToggleStarView';

export default class RepoDetailView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {detail: null, description: undefined, nameWithOwner: undefined};
    }

    setRepoDetailDep(client) {
        this.query = gql`{
          viewer {
            repository(name: "${this.props.match.params.reponame}") {
              description, nameWithOwner, id, stargazers(first:100) {
                totalCount, nodes{
                 isViewer
                }
              }
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
            let repositoryInfo = res.data.viewer.repository;
            let isSelfStarred = false;
            repositoryInfo.stargazers.nodes.map((item) => {
                if (item.isViewer) {
                    isSelfStarred = true;
                }
            });
            this.setState({
                detail: repositoryInfo.object ? repositoryInfo.object.entries : [{
                    name: '',
                    type: ''
                }],
                id: repositoryInfo.id,
                starCount: repositoryInfo.stargazers.totalCount,
                starStatus: isSelfStarred,
                description: repositoryInfo.description,
                nameWithOwner: repositoryInfo.nameWithOwner
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
                                <li>
                                    <ToggleStarView
                                        count={this.state.starCount}
                                        status={this.state.starStatus}/>
                                </li>
                            </ul>
                            <h1 className='public'>{this.state.nameWithOwner}</h1>
                        </div>
                    </div>
                    {this.setRepoDetailDep(client)}
                    <div className='container'>
                        <EditRepoDetailView description={this.state.description}/>
                        <div className='commit-tease'></div>
                        <table className='files'>
                            <tbody>
                            {this.state.detail && this.state.detail.map((item, index) => (
                                <tr key={index}>
                                    <td className='icon'>
                                        <Octicon
                                            name={item.type === 'tree' ? 'file-directory' : item.type === 'blob' ? 'file' : ''}/>
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
