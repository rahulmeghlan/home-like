import React from 'react';

export default class ToggleStarView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {starCount: 0, isStarred: false};
    }

    componentDidMount() {
        this.setState({
            starCount: this.props.count,
            isStarred: this.props.status
        })
    }

    render() {
        return <div className='starring-container'>
            <button type="submit" className="btn btn-sm btn-with-count">
                <svg className='octicon' viewBox="0 0 14 16" version="1.1"
                     width="14" height="16" aria-hidden="true">
                    <path fillRule="evenodd"
                          d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path>
                </svg>
                {this.props.status ? 'Unstar' : 'Star'}
            </button>
            <a className="social-count">
                {this.props.count}
            </a>
        </div>
    }
}
