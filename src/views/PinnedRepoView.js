import React from 'react';

export default class PinnedRepoView extends React.Component {
    render() {
        let {info} = this.props;
        let url = '/' + info.name;
        return <div className='pinned-repo-item'>
            <div className='pinned-repo-item-content'>
                <a className='title' href={url}>{info.name}</a>
                <p className='description'>{info.description}</p>
            </div>
        </div>
    }
}
