import React from 'react';

export default class ToggleStarView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: props.count, status: props.status};
    }

    componentWillReceiveProps(newProps) {
        const {count, status} = newProps;
        if (typeof count !== 'undefined') {
            this.setState({
                count: count,
                status: status
            })
        }
    }

    render() {
        if (typeof this.state.count === 'undefined') {
            return <div></div>
        } else {
            return <div className='starring-container'>
                <button type="submit" className="btn btn-sm btn-with-count">
                    <svg className='octicon' viewBox="0 0 14 16" version="1.1"
                         width="14" height="16" aria-hidden="true">
                        <path fillRule="evenodd"
                              d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path>
                    </svg>
                    {this.state.status ? 'Unstar' : 'Star'}
                </button>
                <a className="social-count">
                    {this.state.count}
                </a>
            </div>
        }
    }
}
