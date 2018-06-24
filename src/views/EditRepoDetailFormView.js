import React from 'react';

export default class EditRepoDetailFormView extends React.Component {
    render() {
        return <form className="edit-repository-meta js-edit-repository-meta">
            <div className="field">
                <label htmlFor="repo_description">Description</label>
                <input type="text" id="repo_description"
                       className="form-control input-contrast repo-description-field"
                       name="repo_description"
                       placeholder="Short description of this repository"/>
            </div>
            <div className="field">
                <label htmlFor="repo_homepage">Website</label>
                <input type="url" id="repo_homepage" className="form-control input-contrast repo-website-field"
                       name="repo_homepage" value="" placeholder="Website for this repository (optional)"/>
            </div>
            <button className="btn" type="submit">Save</button>
            or <button type="button" className="btn-link"
                       onClick={this.props.toggleEditForm}
                       aria-expanded="true" data-initial-state="true">Cancel</button>
        </form>
    }
}
