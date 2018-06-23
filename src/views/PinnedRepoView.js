import React from 'react';

export default class PinnedRepoView extends React.Component {
    render() {
        let {info} = this.props;
        return <div>
            <p>{info.name}</p>
            <p>{info.description}</p>
        </div>
    }
}
