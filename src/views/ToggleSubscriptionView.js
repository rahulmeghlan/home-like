import React from 'react';
import gql from "graphql-tag";
import client from './../ApolloClient';

export default class ToggleSubscriptionView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false, viewerSubscription: '', watcherCount: undefined};
        this.toggleSubscriptionModal = this.toggleSubscriptionModal.bind(this);
        this.updateSubscription = this.updateSubscription.bind(this);
    }

    componentWillReceiveProps(newProps) {
        const {viewerSubscription, watcherCount} = newProps;
        if (typeof viewerSubscription !== 'undefined') {
            this.setState({
                viewerSubscription: viewerSubscription,
                watcherCount: watcherCount
            })
        }
    }

    toggleSubscriptionModal() {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    }

    async changeSubscription(state) {
        const query = gql`mutation{
                      updateSubscription(input: {
                        subscribableId:"${this.props.repoId}",
                        state: ${state},
                        clientMutationId: "${window.sessionStorage.userId}"
                      }){
                        clientMutationId
                      }
                      
                    }`;
        return await client.mutate({
            mutation: query
        });
    }

    updateSubscription(state) {
        this.changeSubscription(state).then((res) => {
            this.setState(prevState => ({
                viewerSubscription: state,
                watcherCount: state === 'SUBSCRIBED' ? prevState.watcherCount + 1 : prevState.watcherCount > 0 ? prevState.watcherCount - 1 : 0
            }));
        }, (err) => {
        });
    }

    render() {
        if (!this.state.viewerSubscription) {
            return <div></div>
        }
        return <div className={this.state.showModal ? 'select-menu active' : "select-menu"}>
            <a className="btn btn-sm btn-with-count select-menu-button"
               role="button">
                    <span onClick={this.toggleSubscriptionModal}>
                        <svg className="octicon octicon-eye" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                             aria-hidden="true"><path fillRule="evenodd"
                                                      d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>
                        {this.state.viewerSubscription === 'SUBSCRIBED' ? 'Unwatch' : 'Watch'}
                    </span>
            </a>
            <a className="social-count">
                {this.state.watcherCount}
            </a>
            <div className="select-menu-modal-holder">
                <div className="select-menu-modal subscription-menu-modal" aria-expanded="false">
                    <div className="select-menu-header" tabIndex="-1">
                        <svg onClick={this.toggleSubscriptionModal}
                             className="octicon octicon-x js-menu-close"
                             role="img" aria-label="Close"
                             viewBox="0 0 12 16" version="1.1" width="12" height="16">
                            <path fillRule="evenodd"
                                  d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
                        </svg>
                        <span className="select-menu-title">Notifications</span>
                    </div>

                    <div className="select-menu-list js-navigation-container" role="menu">

                        <div
                            className={this.state.viewerSubscription === "UNSUBSCRIBED" ? "select-menu-item selected" : "select-menu-item"}
                            role="menuitem"
                            onClick={this.updateSubscription.bind(this, "UNSUBSCRIBED")}>
                            <svg className="octicon octicon-check select-menu-item-icon" viewBox="0 0 12 16"
                                 version="1.1" width="12" height="16" aria-hidden="true">
                                <path fillRule="evenodd"
                                      d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
                            </svg>
                            <div className="select-menu-item-text">
                                <span className="select-menu-item-heading">Not watching</span>
                                <span
                                    className="description">Be notified when participating or @mentioned.</span>
                                <span className="hidden-select-button-text">
                                      Watch
                                    </span>
                            </div>
                        </div>

                        <div
                            className={this.state.viewerSubscription === "SUBSCRIBED" ? "select-menu-item selected" : "select-menu-item"}
                            onClick={this.updateSubscription.bind(this, "SUBSCRIBED")}>
                            <svg className="octicon octicon-check select-menu-item-icon" viewBox="0 0 12 16"
                                 version="1.1" width="12" height="16" aria-hidden="true">
                                <path fillRule="evenodd"
                                      d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
                            </svg>
                            <div className="select-menu-item-text">
                                <span className="select-menu-item-heading">Watching</span>
                                <span className="description">Be notified of all conversations.</span>
                                <span className="hidden-select-button-text">
                                      Unwatch
                                    </span>
                            </div>
                        </div>

                        <div
                            className={this.state.viewerSubscription === "IGNORED" ? "select-menu-item selected" : "select-menu-item"}
                            role="menuitem"
                            onClick={this.updateSubscription.bind(this, "IGNORED")}>
                            <svg className="octicon octicon-check select-menu-item-icon" viewBox="0 0 12 16"
                                 version="1.1" width="12" height="16" aria-hidden="true">
                                <path fillRule="evenodd"
                                      d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
                            </svg>
                            <div className="select-menu-item-text">
                                <span className="select-menu-item-heading">Ignoring</span>
                                <span className="description">Never be notified.</span>
                                <span className="hidden-select-button-text">
                                          Stop Ignoring
                                        </span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    }
}
