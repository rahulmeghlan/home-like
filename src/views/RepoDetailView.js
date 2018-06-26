import React from 'react';
import gql from 'graphql-tag';
import Octicon from 'react-octicon'
import constants from "./../constants";
import client from './../ApolloClient';
import EditRepoDetailView from './EditRepoDetailView';
import ToggleStarView from './ToggleStarView';
import ToggleSubscriptionView from "./ToggleSubscriptionView";

const query = gql`query {
  user(login: ${constants.username}){
    avatarUrl, name, login, id
  }
}`;

export default class RepoDetailView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {detail: null, description: undefined, nameWithOwner: undefined};
    }

    async getRepoDetail() {
        const query = gql`{
          viewer {
            repository(name: "${this.props.match.params.reponame}") {
              description, nameWithOwner, id, viewerSubscription,
              watchers{
                totalCount
              },
              stargazers(first:100) {
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
        return await client.query({
            query: query
        });
    }

    async getUserId() {
        return await client.query({
            query: query
        })
    }

    componentDidMount() {
        this.getRepoDetail().then((res) => {
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
                watcherCount: repositoryInfo.watchers.totalCount,
                description: repositoryInfo.description,
                nameWithOwner: repositoryInfo.nameWithOwner,
                viewerSubscription: repositoryInfo.viewerSubscription
            });
        });

        if (!window.sessionStorage.userId) {
            this.getUserId().then((res) => {
                window.sessionStorage.userId = res.data.user.id;
            });
        }
    }

    render() {
        return <div>
            <div className='pagehead repohead'>
                <div className='repohead-details-container clearfix'>
                    <ul className='pagehead-actions'>
                        <li>
                            <ToggleSubscriptionView
                                watcherCount={this.state.watcherCount}
                                viewerSubscription={this.state.viewerSubscription}
                                repoId={this.state.id}/>
                        </li>
                        <li>
                            <ToggleStarView
                                repoId={this.state.id}
                                count={this.state.starCount}
                                status={this.state.starStatus}/>
                        </li>
                    </ul>
                    <h1 className='public'>{this.state.nameWithOwner}</h1>
                </div>
            </div>
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
    }
}
