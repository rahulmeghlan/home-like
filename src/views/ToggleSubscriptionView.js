import React from 'react';

export default class ToggleSubscriptionView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: '', showModal: false};
        this.toggleSubscriptionModal = this.toggleSubscriptionModal.bind(this);
    }

    toggleSubscriptionModal() {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    }

    updateSubscription(status) {
        /*this.setState({
            status: status
        })*/
    }

    render() {
        return <div>
            <div className={this.state.showModal ? 'select-menu active' : "select-menu"}>
                <a className="btn btn-sm btn-with-count select-menu-button"
                   role="button">
            <span onClick={this.toggleSubscriptionModal}>
                <svg className="octicon octicon-eye" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                     aria-hidden="true"><path fillRule="evenodd"
                                              d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>
                Unwatch
            </span>
                </a>
                <a className="social-count">
                    1
                </a>

                <div className="select-menu-modal-holder">
                    <div className="select-menu-modal subscription-menu-modal" aria-expanded="false">
                        <div className="select-menu-header" tabIndex="-1">
                            <svg onClick={this.toggleSubscriptionModal} className="octicon octicon-x js-menu-close"
                                 role="img" aria-label="Close"
                                 viewBox="0 0 12 16" version="1.1" width="12" height="16">
                                <path fillRule="evenodd"
                                      d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
                            </svg>
                            <span className="select-menu-title">Notifications</span>
                        </div>

                        <div className="select-menu-list js-navigation-container" role="menu">

                            <div className="select-menu-item" role="menuitem">
                                <svg className="octicon octicon-check select-menu-item-icon" viewBox="0 0 12 16"
                                     version="1.1" width="12" height="16" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
                                </svg>
                                <div className="select-menu-item-text">
                                    <input type="radio" name="do" id="do_included" value="included"
                                           onChange={this.updateSubscription('unwatch')}/>
                                    <span className="select-menu-item-heading">Not watching</span>
                                    <span className="description">Be notified when participating or @mentioned.</span>
                                    <span className="hidden-select-button-text">
                                      <svg className="octicon octicon-eye" viewBox="0 0 16 16" version="1.1" width="16"
                                           height="16"
                                           aria-hidden="true"><path fillRule="evenodd"
                                                                    d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>
                                      Watch
                                    </span>
                                </div>
                            </div>

                            <div className="select-menu-item" role="menuitem" tabIndex="0"
                                 aria-selected="false">
                                <svg className="octicon octicon-check select-menu-item-icon" viewBox="0 0 12 16"
                                     version="1.1" width="12" height="16" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
                                </svg>
                                <div className="select-menu-item-text">
                                    <input type="radio" name="do" id="do_subscribed"
                                           value="subscribed" checked="checked"
                                           onChange={this.updateSubscription('watch')}/>
                                    <span className="select-menu-item-heading">Watching</span>
                                    <span className="description">Be notified of all conversations.</span>
                                    <span className="hidden-select-button-text">
                                      <svg className="octicon octicon-eye" viewBox="0 0 16 16" version="1.1" width="16"
                                           height="16"
                                           aria-hidden="true"><path fillRule="evenodd"
                                                                    d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>
                                        Unwatch
                                    </span>
                                </div>
                            </div>

                            <div className="select-menu-item selected" role="menuitem" tabIndex="0">
                                <svg className="octicon octicon-check select-menu-item-icon" viewBox="0 0 12 16"
                                     version="1.1" width="12" height="16" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
                                </svg>
                                <div className="select-menu-item-text">
                                    <input type="radio" name="do" id="do_ignore" value="ignore"
                                           onChange={this.updateSubscription('ignore')}/>
                                    <span className="select-menu-item-heading">Ignoring</span>
                                    <span className="description">Never be notified.</span>
                                    <span className="hidden-select-button-text">
                                      <svg className="octicon octicon-mute" viewBox="0 0 16 16" version="1.1" width="16"
                                           height="16"
                                           aria-hidden="true">
                                          <path fillRule="evenodd"
                                                d="M8 2.81v10.38c0 .67-.81 1-1.28.53L3 10H1c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h2l3.72-3.72C7.19 1.81 8 2.14 8 2.81zm7.53 3.22l-1.06-1.06-1.97 1.97-1.97-1.97-1.06 1.06L11.44 8 9.47 9.97l1.06 1.06 1.97-1.97 1.97 1.97 1.06-1.06L13.56 8l1.97-1.97z"></path></svg>
                                        Stop ignoring
                                    </span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>


        </div>
    }
}
