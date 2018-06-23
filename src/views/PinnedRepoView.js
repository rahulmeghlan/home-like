import React from 'react';

export default class PinnedRepoView extends React.Component {
    render() {
        let {info} = this.props;
        return <div className='pinned-repo-item'>
            <div className='pinned-repo-item-content'>
                <a className='title'>{info.name}</a>
                <p className='description'>{info.description}</p>
            </div>
        </div>
    }
}
